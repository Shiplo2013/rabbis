import { sendSubscribeData } from "@/app/server/actions";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function SubscribeForm({ mode }: { mode?: "dark" | "light" }) {
  const [state, action, isPending] = useActionState(sendSubscribeData, {});
  const [isChecked, setIsChecked] = useState(false);
  return (
    <form
      action={action}
      className={`subscribe-form px-[2.5vw] py-[3.7vh] w-full lg:w-[26.35vw] will-change-transform flex flex-col justify-center ${mode === "dark" ? "bg-[#000000] text-white" : "bg-[#C3A13F] text-white"}`}
    >
      <div className="subscribe-form-wrapper">
        <h2 className="2xl:text-[38px] xl:text-[30px] sm:text-[24px] leading-[0.8em]">
          קבלו ישירות למייל מאמרים חדשים, גיליונות תורניים ועדכוני תוכן מן
          הישיבה.
        </h2>
        <div className="form group 2xl:text-[22px] xl:text-[18px] sm:text-[16px] leading-[0.8em] mt-[4vh] flex justify-between items-end gap-x-2">
          <div className="flex flex-col gap-y-1.25 w-full">
            <div className="flex items-center gap-x-1 ">
              <label>שם</label>
              <input
                className="w-full border-b border-white p-0 text-[14px] leading-[0.7em] focus:outline-0"
                name="news-name"
                type="text"
                defaultValue={
                  (state.status !== "mail_sent" &&
                    state?.payload?.get("news-name")) ||
                  ""
                }
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
          <div className="flex flex-col gap-y-1.25 relative w-full">
            <div className="flex items-center gap-x-1">
              <label>דוא״ל</label>
              <input
                className="w-full border-b border-white p-0 text-[14px] leading-[0.7em] focus:outline-0"
                name="news-email"
                type="email"
                defaultValue={
                  (state.status !== "mail_sent" &&
                    state?.payload?.get("news-email")) ||
                  ""
                }
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
            disabled={isPending}
            className="2xl:text-[28px] xl:text-[24px] sm:text-[20px] leading-[0.8em] text-[#000000] bg-[#E7D45E] px-2.5 pb-2 pt-2.5 hover:bg-black hover:text-[#E7D45E] transition-all duration-300 cursor-pointer"
          >
            שלח
          </button>
        </div>

        {state?.message && (
          <div className="contact-row mt-7">
            <p
              dir="rtl"
              className={`${state?.status === "mail_sent" ? "text-black" : "text-gray-800"} text-[14px] text-center leading-[1em]`}
            >
              {state.message}
            </p>
          </div>
        )}
        <div className="text xl:text-[14px] sm:text-[12px] leading-[1em] mt-3 text-center flex gap-x-2 items-center">
          <input
            type="checkbox"
            id="privacy"
            name="privacy-consent"
            className="w-3 h-auto"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
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
