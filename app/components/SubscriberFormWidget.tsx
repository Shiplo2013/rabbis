import FormIcon from "@/app/assets/images/form-icon.png";
import Image from "next/image";

export default function SubscriberFormWidget() {
  return (
    <>
      <button
        className={`fixed left-5 bottom-20 z-50 bg-white rounded-full cursor-pointer`}
      >
        <Image
          src={FormIcon.src}
          width={50}
          height={50}
          alt={"Subscriber Form"}
          className="block w-12.5 h-auto"
        />
      </button>
    </>
  );
}
