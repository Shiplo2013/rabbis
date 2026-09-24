import { sendSubscribeData } from "@/app/server/subscribe";
import Link from "next/link";
import { useActionState } from "react";

export default function FooterForm() {
  const [state, action, isPending] = useActionState(sendSubscribeData, {});

  return (
    <form
      action={action}
      className="form w-full flex flex-col text-[20px] leading-[1em]"
    >
      <div className="text xl:text-[16px] sm:text-[14px] leading-[1em] mb-3 text-center flex gap-x-2 items-center">
        <input
          type="checkbox"
          id="footer-privacy"
          name="privacy-consent"
          className="w-4 h-4"
        />
        <label htmlFor="footer-privacy">
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
      <div className="form-col flex items-stretch h-10">
        <div className="input-field w-3/4 flex items-center justify-center">
          <input
            dir="rtl"
            className="bg-[#000000] text-white focus:outline-0 w-full h-full px-4 py-2 placeholder:text-white"
            id="email-subscibe"
            name="email-subscibe"
            type="email"
            placeholder="מייל"
            defaultValue={
              (state.status !== "mail_sent" &&
                state?.payload?.get("email-subscibe")) ||
              ""
            }
          />
        </div>
        <div className="submit-button w-1/4 flex items-center justify-center">
          <button
            type="submit"
            disabled={isPending}
            className="bg-[#C3A13F] text-[#010101] py-2 px-4 cursor-pointer w-full h-full hover:bg-[#B39234] transform transition duration-300 ease-in-out"
          >
            שלח
          </button>
        </div>
      </div>

      {state?.message && (
        <div
          dir="rtl"
          className="form-message mt-4 text-center text-[14px] leading-[1.2em]"
        >
          {state?.message && (
            <p
              className={`${state?.status === "mail_sent" ? "text-black" : "text-red-500"} text-center leading-[1.2em]`}
            >
              {state.message}
            </p>
          )}
        </div>
      )}
    </form>
  );
}
