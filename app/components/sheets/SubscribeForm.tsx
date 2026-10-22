"use client";
import { sendSubscribeData } from "@/app/server/actions";
import SignUpButton from "@/app/ui/SignUpButton";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function SubscribeForm({ mode }: { mode?: "dark" | "light" }) {
  const [state, action, isPending] = useActionState(sendSubscribeData, {});
  const [isChecked, setIsChecked] = useState(false);
  return (
    <form
      action={action}
      dir="rtl"
      className={`subscribe-form p-5 w-full lg:w-full flex flex-col justify-center ${mode === "dark" ? "bg-[#000000] text-white" : "bg-[#C3A13F] text-white"}`}
    >
      <div className="subscribe-form-wrapper">
        <h2 className="text-[22px] leading-[0.8em]">
          קבלו ישירות למייל מאמרים חדשים, גיליונות תורניים ועדכוני תוכן מן
          הישיבה.
        </h2>
        <div className="mt-5">
          <SignUpButton
            text={"להרשמה"}
            extraClass="bg-[#D4AF37] pt-2 pb-1.25 px-5 rounded-none cursor-pointer"
            fontSize="text-[16px] lg:text-[18px]"
            textColor="text-black"
            hoverBgColor="bg-white"
            hoverTextColor="group-hover:text-[#D4AF37]"
          />
        </div>
        <div className="form group text-[18px] leading-[0.8em] mt-6 flex-col justify-between items-end gap-x-2 gap-y-5 hidden">
          <div className="flex flex-row gap-x-2 w-full">
            <div className="flex w-full items-center gap-x-2">
              <label htmlFor="name">שם</label>
              <input
                className="w-full border-b border-white p-0 text-[14px] leading-[0.7em] focus:outline-0"
                name="news-name"
                id="name"
                type="text"
                defaultValue={
                  (state.status !== "mail_sent" &&
                    state?.payload?.get("news-name")) ||
                  ""
                }
                aria-label="Name Input"
              />
            </div>
            {state?.invalid_fields_object?.["news-name"] && (
              <p
                dir="rtl"
                className="text-[10px] text-black mt-1 text-center absolute top-full left-0 w-full"
              >
                {state.invalid_fields_object["news-name"]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-x-2 gap-y-1.25 relative w-full">
            <div className="flex w-full items-center gap-x-2">
              <label htmlFor="email">דוא״ל</label>
              <input
                className="w-full border-b border-white p-0 text-[14px] leading-[0.7em] focus:outline-0"
                name="news-email"
                id="email"
                type="email"
                defaultValue={
                  (state.status !== "mail_sent" &&
                    state?.payload?.get("news-email")) ||
                  ""
                }
                aria-label="Email Input"
              />
            </div>
            {state?.invalid_fields_object?.["news-email"] && (
              <p
                dir="rtl"
                className="text-[10px] text-black mt-1 text-center absolute top-full left-0 w-full"
              >
                {state.invalid_fields_object["news-email"]}
              </p>
            )}
          </div>
          <button
            type="submit"
            aria-label="Submit Subscription"
            disabled={isPending}
            className={`text-[20px] w-full leading-[0.8em] text-[#000000] bg-[#E7D45E] ${mode === "dark" ? "hover:bg-[#f2f2f2] hover:text-black" : "hover:bg-black hover:text-[#E7D45E]"} px-2.5 pb-2 pt-2.5 transition-colors duration-300 cursor-pointer`}
          >
            שלח
          </button>
        </div>

        {state?.message && (
          <div className="contact-row mt-5">
            <p
              dir="rtl"
              className={`${state?.status === "mail_sent" ? (mode !== "dark" ? "text-black" : "text-white") : mode !== "dark" ? "text-gray-800" : "text-gray-50"} text-[14px] text-center leading-[1em]`}
            >
              {state.message}
            </p>
          </div>
        )}
        <div className="text xl:text-[14px] sm:text-[12px] leading-[1em] mt-3 text-center gap-x-2 items-center hidden">
          <input
            type="checkbox"
            id="privacy"
            name="privacy-consent"
            className="w-3 h-auto"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            aria-label="Privacy Consent"
          />
          <label onClick={() => setIsChecked(!isChecked)} htmlFor="privacy">
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
    </form>
  );
}
