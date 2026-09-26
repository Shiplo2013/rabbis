import { CheckIcon } from "lucide-react";
import { useState } from "react";

export default function FooterCredits() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Use the browser Clipboard API
      await navigator.clipboard.writeText("sitodigitalltd@gmail.com");
      setCopied(true);

      // Reset the feedback text after 2 seconds
      setTimeout(() => setCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <>
      <button
        onClick={handleCopy}
        className="text-[16px] lg:text-[18px] cursor-pointer transition-all flex gap-x-1 hover:text-[#555555]"
      >
        <span
          className={`text-green-700 transition-all ${copied ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          <CheckIcon />
        </span>
        <span>SiTO</span>
      </button>
      <div
        className={`message transition-all text-[16px] flex gap-x-1 ${copied ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <span className={`text-green-700 [&>svg]:w-5`}>
          <CheckIcon />
        </span>{" "}
        <span>המייל הועתק. רוצים אתר כזה? כתבו לנו.</span>
      </div>
    </>
  );
}
