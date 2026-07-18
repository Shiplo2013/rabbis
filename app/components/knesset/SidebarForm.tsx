import ArrowLeftBottom from "@/app/assets/icons/ArrowLeftBottom";
import { sendSubscribeData } from "@/app/server/subscribe";
import { useActionState } from "react";

export default function SidebarForm() {
  const [state, action, isPending] = useActionState(sendSubscribeData, {});
  return (
    <form action={action} className="subscription overflow-hidden relative">
      <div className="input-wrapper w-full flex bg-[#FDF9F5] rounded-full items-center relative h-10.75">
        <input
          type="hidden"
          name="text-name"
          id="text-name"
          value="sidebar-subscribe-form"
        />
        <input
          type="email"
          name="email-subscibe"
          className="w-full h-full focus:outline-0 rounded-full p-2.5 pl-15"
          defaultValue={state?.payload?.get("email-subscibe") || ""}
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#C3A13F] w-14.5 h-full flex items-center justify-center rounded-full absolute top-0 left-0 cursor-pointer hover:bg-[#ce9d09]"
        >
          <ArrowLeftBottom extraClass={""} />
        </button>
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
