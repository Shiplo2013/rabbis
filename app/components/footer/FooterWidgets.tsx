import SignUpButton from "@/app/ui/SignUpButton";
import parse from "html-react-parser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAppState } from "../AppContext";

export default function FooterWidgets({ footerData }: { footerData: any }) {
  const router = useRouter();
  const { setIsLoading } = useAppState();
  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (window.location.pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };
  return (
    <div className="footer-widgets mt-15 sm:mt-34 flex justify-between flex-col lg:flex-row gap-y-12 overflow-hidden">
      <div className="footer-widget3 w-full lg:w-1/4">
        <ul className="flex flex-col text-[20px] sm:text-2xl leading-[2em]">
          {footerData?.acf?.widget_3?.menu_items?.map(
            (item: any, index: number) => (
              <li key={item.link}>
                <Link
                  href={item.link}
                  onClick={handleLinkClick}
                  prefetch={false}
                  className="hover:text-(--theme-color) transition-colors duration-300"
                >
                  {item.title}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
      <div className="footer-widget2 w-full lg:w-1/3">
        {footerData?.acf?.widget_2?.widget_title && (
          <h3 className="text-[35px] sm:text-[52px] leading-[0.9] font-bold mb-4">
            {footerData?.acf?.widget_2?.widget_title}
          </h3>
        )}
        {footerData?.acf?.widget_2?.content && (
          <div className="footer-info text-[20px] sm:text-[28px] leading-[1.5em] [&>p>a]:hover:text-(--theme-color) [&>p>a]:transition-colors [&>p>a]:duration-300">
            {parse(footerData?.acf?.widget_2?.content || "")}
          </div>
        )}
      </div>
      <div className="footer-widget1 w-full lg:w-1/4">
        {footerData?.acf?.widget_1?.widget_title && (
          <h3 className="text-[35px] sm:text-[52px] leading-[0.9] font-bold mb-4">
            {footerData?.acf?.widget_1?.widget_title}
          </h3>
        )}
        {footerData?.acf?.widget_1?.content && (
          <div className="text-[20px] sm:text-[28px] leading-[0.9] [&>p>a]:hover:text-(--theme-color) [&>p>a]:transition-colors [&>p>a]:duration-300">
            {parse(footerData?.acf?.widget_1?.content || "")}
          </div>
        )}
        <div className="footer-form mt-7.5 w-full max-w-100">
          <SignUpButton
            text={"להרשמה"}
            extraClass="bg-[#D4AF37] pt-2 pb-1.25 px-5 rounded-none cursor-pointer"
            fontSize="text-[16px] lg:text-[22px]"
            textColor="text-black"
            hoverBgColor="bg-[#000000]"
            hoverTextColor="group-hover:text-[#D4AF37]"
          />
          {/* <FooterForm /> */}
        </div>
      </div>
    </div>
  );
}
