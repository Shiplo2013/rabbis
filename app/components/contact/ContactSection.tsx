"use client";
import EmailIcon from "@/app/assets/icons/EmailIcon";
import MarkerIcon from "@/app/assets/icons/MarkerIcon";
import PhoneIcon from "@/app/assets/icons/PhoneIcon";
import WazeIcon from "@/app/assets/icons/WazeIcon";
import VerticalBackgroundImage from "@/app/ui/VerticalBackgroundImage";
import parse from "html-react-parser";
import { StaticImageData } from "next/image";
import Link from "next/link";
import ContactForm from "./ContactForm";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: StaticImageData;
  data: any;
}

export default function ContactSection(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20 overflow-hidden`}
    >
      {props.bgImage && (
        <div className="intro-background absolute top-0 left-0 w-full h-full z-10">
          <VerticalBackgroundImage
            bgImage={props.bgImage}
            overlayClass={""}
            imagePosition={""}
            bgClass={""}
            animatePosition={0.1}
          />
          <div className="intro-bg-mask absolute top-0 left-0 w-full h-full bg-black z-30 will-change-transform"></div>
        </div>
      )}
      <div className="contact-wrapper w-full h-full relative z-30 py-[15vh] px-[10vw]">
        <div className="contact-content flex justify-between">
          <div className="contact-right flex flex-col gap-y-[10vh]">
            <div dir="ltr" className="contact-heading text-right">
              <h2 className="text-[40px] leading-[1em] text-[#FBF4E6] font-bold max-w-96.75">
                {parse(
                  props.data?.contact_info?.title ||
                    "לכל פניה או שאלה מלאו את הטופס ונחזור אליכם בהקדם.",
                )}
              </h2>
            </div>
            <div className="contact-info flex flex-col gap-y-2">
              <div className="info-item overflow-hidden">
                <div className="info-item-wrapper flex items-center gap-x-4.5">
                  <div className="icon">
                    <MarkerIcon />
                  </div>
                  <div className="text text-[30px] leading-[1.2em]">
                    <address>
                      {parse(
                        props.data?.contact_info?.address ||
                          "הרב חיים הלר 8 ירושלים ישראל",
                      )}
                    </address>
                  </div>
                </div>
              </div>
              <div className="info-item overflow-hidden">
                <div className="info-item-wrapper flex items-center gap-x-4.5">
                  <div className="icon">
                    <EmailIcon />
                  </div>
                  <div className="text text-[30px] leading-[1.2em]">
                    <Link
                      href={`mailto:${props.data?.contact_info?.email}`}
                      className="hover:text-(--theme-color) transition-all duration-500"
                    >
                      {parse(
                        props.data?.contact_info?.email ||
                          "office@chevron.org.il",
                      )}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="info-item overflow-hidden">
                <div className="info-item-wrapper flex items-center gap-x-4.5">
                  <div className="icon">
                    <PhoneIcon />
                  </div>
                  <div className="text text-[30px] leading-[1.2em]">
                    <Link
                      href={`tel:${props.data?.contact_info?.phone}`}
                      className="hover:text-(--theme-color) transition-all duration-500"
                    >
                      {parse(props.data?.contact_info?.phone || "02-6209331")}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="info-item mt-4 overflow-hidden">
                <div className="info-item-wrapper flex items-center gap-x-4.5">
                  <div className="icon">
                    <WazeIcon />
                  </div>
                  <div className="text text-[30px] leading-[1.2em]">
                    <Link
                      href={props.data?.contact_info?.waze_link || "/"}
                      className="hover:text-(--theme-color) transition-all duration-500"
                    >
                      נווט בוויז
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-left w-[35vw] mt-[15vh]">
            <div className="contact-form w-full overflow-hidden">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
