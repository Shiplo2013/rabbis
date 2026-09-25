"use client";
import FormIcon from "@/app/assets/images/form-icon.png";
import HebronBook from "@/app/assets/images/hebron-book.png";
import { sendFormData } from "@/app/server/visitor";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import CloseIcon2 from "../assets/icons/CloseIcon2";
import { gsap, useGSAP } from "../ui/plugins";
import SubmitButton from "../ui/SubmitButton";
import { useAppState } from "./AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function SubscriberFormWidget() {
  const [state, action, isPending] = useActionState(sendFormData, {});
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [activeFormPopup, setActiveFormPopup] = useState(false);
  const { animationPlayed } = useAppState();

  useGSAP(() => {
    gsap.set(formRef.current, {
      yPercent: 110,
    });
  }, []);

  useGSAP(() => {
    if (activeFormPopup) {
      gsap.to(formRef.current, {
        yPercent: 0,
      });
    } else {
      gsap.to(formRef.current, {
        yPercent: 110,
      });
    }
  }, [activeFormPopup]);

  useEffect(() => {
    // Check if the user has visited before
    const hasSeenPopup = localStorage.getItem("hasSeenNewsletter");

    if (!hasSeenPopup && animationPlayed) {
      // Show popup after a small delay (e.g., 2 seconds)
      const timer = setTimeout(() => {
        setActiveFormPopup(true);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [animationPlayed]);

  const handleClose = () => {
    setActiveFormPopup(false);
    // Mark as seen in localStorage so it doesn't open again
    localStorage.setItem("hasSeenNewsletter", "true");
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setActiveFormPopup(true)}
        className={`subcribe-button w-12 fixed left-5 bottom-20 z-50 bg-white rounded-full cursor-pointer transition-transform hover:scale-105`}
      >
        <Image
          src={FormIcon.src}
          width={48}
          height={48}
          alt={"Subscriber Form"}
          className="block w-12.5 h-auto"
        />
      </button>
      <div
        ref={formRef}
        id="visitor-form"
        className="fixed bottom-5 right-5 lg:right-20 z-50 bg-[#0A0A0A] w-85 max-w-[86vw] px-6 py-10 rounded-2xl shadow-md shadow-[#C3A13F] inset-shadow-sm ring-1 ring-[#C3A13F]"
      >
        <button
          onClick={handleClose}
          className="close-form w-10 h-10 absolute top-0 right-0 p-3 border-l border-b border-[#C3A13F] rounded-bl-2xl group cursor-pointer"
        >
          <CloseIcon2 className="w-full h-auto transition-all group-hover:rotate-180" />
        </button>

        <div className="form-content flex flex-col gap-y-4 mb-5">
          <div className="image">
            <Image
              src={HebronBook.src}
              width={160}
              height={80}
              alt="Visitor Form"
              blurDataURL={HebronBook.blurDataURL}
              placeholder={"blur"}
            />
          </div>
          <div className="content flex flex-col gap-y-3">
            <h3 className="text-[25px] lg:text-[35px] text-[#C3A13F] leading-[1em]">
              האתר בהרצה
            </h3>
            <p className="text-[18px] lg:text-[22px] leading-[1em]">
              מצאתם פרט הדורש תיקון?
              <br />
              נשמח שתעדכנו אותנו.
            </p>
          </div>
        </div>

        <form action={action}>
          <div className="contact-row mb-5">
            <div className="flex items-center gap-x-3.25">
              <input
                dir="rtl"
                className="border-b border-b-[#C3A13F] focus:outline-0 w-full text-[16px] lg:text-[22px] leading-[1em] py-1 placeholder:text-[#C3A13F] text-[#C3A13F]"
                id="form-name"
                name="form-name"
                type="text"
                placeholder="שם"
                defaultValue={
                  (state.status !== "mail_sent" &&
                    state?.payload?.get("form-name")) ||
                  ""
                }
              />
            </div>
            {state?.invalid_fields_object?.["form-name"] && (
              <p dir="rtl" className="text-red-500 text-xs mt-1">
                {state.invalid_fields_object["form-name"]}
              </p>
            )}
          </div>
          <div className="contact-row mb-5">
            <div className="flex items-center gap-x-3.25">
              <input
                dir="rtl"
                className="border-b border-b-[#C3A13F] focus:outline-0 w-full text-[16px] lg:text-[22px] leading-[1em] py-1 placeholder:text-[#C3A13F] text-[#C3A13F]"
                id="form-email"
                name="form-email"
                type="email"
                placeholder="דוא״ל"
                defaultValue={
                  (state.status !== "mail_sent" &&
                    state?.payload?.get("form-email")) ||
                  ""
                }
              />
            </div>
            {state?.invalid_fields_object?.["form-email"] && (
              <p dir="rtl" className="text-red-500 text-xs mt-1">
                {state.invalid_fields_object["form-email"]}
              </p>
            )}
          </div>
          <div className="contact-row mb-5">
            <div className="flex flex-col gap-y-1.25">
              <textarea
                dir="rtl"
                className="border-b border-b-[#C3A13F] focus:outline-0 w-full text-[16px] lg:text-[22px] leading-[1em] py-1 placeholder:text-[#C3A13F] text-[#C3A13F]"
                id="form-message"
                name="form-message"
                cols={10}
                rows={3}
                placeholder="נושא הפניה"
                defaultValue={
                  (state.status !== "mail_sent" &&
                    state?.payload?.get("form-message")) ||
                  ""
                }
              ></textarea>
            </div>
            {state?.invalid_fields_object?.["form-message"] && (
              <p dir="rtl" className="text-red-500 text-xs mt-1">
                {state.invalid_fields_object["form-message"]}
              </p>
            )}
          </div>
          <div className="contact-row mb-7">
            <div className="text xl:text-[16px] sm:text-[14px] leading-[1em] mb-3 text-center flex gap-x-2 items-center">
              <input
                type="checkbox"
                id="privacy"
                name="privacy-consent"
                className="w-4 h-4"
              />
              <label htmlFor="privacy">
                קראתי ואני מסכים/ה ל
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener"
                  className="underline"
                >
                  מדיניות הפרטיות
                </Link>
              </label>
            </div>
          </div>
          <div className="form-submit flex justify-end">
            <SubmitButton
              disabled={isPending}
              svgIconClass={""}
              extraClass="bg-[#D4AF37] pt-2 pb-1.25 px-5 rounded-none cursor-pointer"
              fontSize="text-[22px]"
              text={isPending ? `מהגשה...` : `שלח טופס`}
              textColor="text-black"
              hoverBgColor="bg-white"
              hoverTextColor="group-hover:text-[#D4AF37]"
            />
          </div>
          {state?.message && (
            <div className="contact-row mt-5">
              <p
                dir="rtl"
                className={`${state?.status === "mail_sent" ? "text-white" : "text-red-500"} text-[14px] text-center leading-[1.2em] rounded-md`}
              >
                {state.message}
              </p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
