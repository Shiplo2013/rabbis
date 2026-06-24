import { sendFormData } from "@/app/server/actions";
import SubmitButton from "@/app/ui/SubmitButton";
import { useActionState } from "react";

export default function ContactForm() {
  const [state, action, isPending] = useActionState(sendFormData, {});
  return (
    <form
      action={action}
      className="contact-form-wrapper bg-white text-[#231F20] text-[22px] leading-[100%] py-11.25 px-10 flex flex-col gap-y-[4vh]"
    >
      <div className="contact-row flex gap-x-[2vw]">
        <div className="contact-col w-1/2 flex flex-col gap-y-1.25">
          <div className="flex items-center gap-x-3.25">
            <label htmlFor="form-name">שם</label>
            <input
              dir="rtl"
              className="border-b border-b-[#000000] focus:outline-0 w-full"
              id="form-name"
              name="form-name"
              type="text"
              defaultValue={state?.payload?.get("form-name") || ""}
            />
          </div>
          {state?.invalid_fields_object?.["form-name"] && (
            <p dir="rtl" className="text-red-500 text-xs mt-1">
              {state.invalid_fields_object["form-name"]}
            </p>
          )}
        </div>
        <div className="contact-col w-1/2 flex flex-col gap-y-1.25">
          <div className="flex items-center gap-x-3.25">
            <label htmlFor="form-family">משפחה</label>
            <input
              dir="rtl"
              className="border-b border-b-[#000000] focus:outline-0 w-full"
              id="form-family"
              name="form-family"
              type="text"
              defaultValue={state?.payload?.get("form-family") || ""}
            />
          </div>
          {state?.invalid_fields_object?.["form-family"] && (
            <p dir="rtl" className="text-red-500 text-xs mt-1">
              {state.invalid_fields_object["form-family"]}
            </p>
          )}
        </div>
      </div>
      <div className="contact-row flex gap-x-[2vw]">
        <div className="contact-col w-1/2 flex flex-col gap-y-1.25">
          <div className="flex items-center gap-x-3.25">
            <label htmlFor="form-phone">נייד</label>
            <input
              dir="rtl"
              className="border-b border-b-[#000000] focus:outline-0 w-full"
              id="form-phone"
              name="form-phone"
              type="tel"
              defaultValue={state?.payload?.get("form-phone") || ""}
            />
          </div>
          {state?.invalid_fields_object?.["form-phone"] && (
            <p dir="rtl" className="text-red-500 text-xs mt-1">
              {state.invalid_fields_object["form-phone"]}
            </p>
          )}
        </div>
        <div className="contact-col w-1/2 flex flex-col gap-y-1.25">
          <div className="flex items-center gap-x-3.25">
            <label htmlFor="form-email">דוא״ל</label>
            <input
              dir="rtl"
              className="border-b border-b-[#000000] focus:outline-0 w-full"
              id="form-email"
              name="form-email"
              type="email"
              defaultValue={state?.payload?.get("form-email") || ""}
            />
          </div>
          {state?.invalid_fields_object?.["form-email"] && (
            <p dir="rtl" className="text-red-500 text-xs mt-1">
              {state.invalid_fields_object["form-email"]}
            </p>
          )}
        </div>
      </div>
      <div className="contact-row flex flex-col">
        <div className="flex flex-col gap-y-1.25">
          <label htmlFor="form-message">נושא הפניה</label>
          <textarea
            dir="rtl"
            className="border-b border-b-[#000000] focus:outline-0 w-full"
            id="form-message"
            name="form-message"
            cols={10}
            rows={3}
            defaultValue={state?.payload?.get("form-message") || ""}
          ></textarea>
        </div>
        {state?.invalid_fields_object?.["form-message"] && (
          <p dir="rtl" className="text-red-500 text-xs mt-1">
            {state.invalid_fields_object["form-message"]}
          </p>
        )}
      </div>
      <div className="contact-row flex justify-end">
        <SubmitButton
          disabled={isPending}
          svgIconClass={""}
          extraClass="bg-[#D4AF37] pt-2 pb-1.25 px-5 rounded-none cursor-pointer"
          fontSize="text-[22px]"
          text={isPending ? `מהגשה...` : `שלח טופס`}
          textColor="text-black"
          hoverBgColor="bg-black"
          hoverTextColor="group-hover:text-[#D4AF37]"
        />
      </div>
      {state?.message && (
        <div className="contact-row">
          <p
            dir="rtl"
            className={`${state?.status === "mail_sent" ? "text-green-500 border-green-500" : "text-red-500 border-red-500"} text-base px-4 py-2.5 border text-center leading-[1.2em] rounded-md`}
          >
            {state.message}
          </p>
        </div>
      )}
    </form>
  );
}
