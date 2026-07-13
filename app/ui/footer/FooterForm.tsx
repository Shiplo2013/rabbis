import { sendSubscribeData } from "@/app/server/subscribe";
import { useActionState } from "react";

export default function FooterForm() {
  const [state, action, isPending] = useActionState(sendSubscribeData, {});

  return (
    <form
      action={action}
      className="form w-full flex flex-col text-[20px] leading-[1em]"
    >
      <div className="form-col flex items-stretch h-10">
        <div className="input-field w-3/4 flex items-center justify-center">
          <input
            dir="rtl"
            className="bg-[#000000] text-white focus:outline-0 w-full h-full px-4 py-2 placeholder:text-white"
            id="subscribe-email"
            name="subscribe-email"
            type="email"
            placeholder="מייל"
            defaultValue={state?.payload?.get("subscribe-email") || ""}
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
