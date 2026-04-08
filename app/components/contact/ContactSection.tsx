import EmailIcon from "@/app/assets/icons/EmailIcon";
import MarkerIcon from "@/app/assets/icons/MarkerIcon";
import PhoneIcon from "@/app/assets/icons/PhoneIcon";
import WazeIcon from "@/app/assets/icons/WazeIcon";
import ThemeButton2 from "@/app/ui/ThemeButton2";
import VerticalBackgroundImage from "@/app/ui/VerticalBackgroundImage";
import { StaticImageData } from "next/image";
import Link from "next/link";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: { bgImage: StaticImageData };
}

export default function ContactSection(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20 overflow-hidden`}
    >
      {props.data?.bgImage && (
        <div className="intro-background absolute top-0 left-0 w-full h-full z-10">
          <VerticalBackgroundImage
            bgImage={props.data.bgImage}
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
                לכל פניה או שאלה
                <br />
                מלאו את הטופס ונחזור אליכם בהקדם.
              </h2>
            </div>
            <div className="contact-info flex flex-col gap-y-2">
              <div className="info-item overflow-hidden">
                <div className="info-item-wrapper flex items-center gap-x-4.5">
                  <div className="icon">
                    <MarkerIcon />
                  </div>
                  <div className="text text-[30px] leading-[1.2em]">
                    <address>הרב חיים הלר 8 ירושלים ישראל</address>
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
                      href={"mailto:office@chevron.org.il"}
                      className="hover:text-(--theme-color) transition-all duration-500"
                    >
                      office@chevron.org.il
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
                      href={"tel:02-6209331"}
                      className="hover:text-(--theme-color) transition-all duration-500"
                    >
                      02-6209331
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
                      href={"/"}
                      className="hover:text-(--theme-color) transition-all duration-500"
                    >
                      נווט בוויז
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-left w-[35vw]">
            <div className="contact-form w-full overflow-hidden">
              <div className="contact-form-wrapper bg-white text-[#231F20] text-[22px] leading-[100%] py-11.25 px-10 flex flex-col gap-y-[4vh]">
                <div className="contact-row flex gap-x-[2vw]">
                  <div className="contact-col w-1/2 flex items-center gap-x-3.25">
                    <label htmlFor="name">שם</label>
                    <input
                      className="border-b border-b-[#000000] focus:outline-0 w-full"
                      id="name"
                      name="name"
                      type="text"
                    />
                  </div>
                  <div className="contact-col w-1/2 flex items-center gap-x-3.25">
                    <label htmlFor="family">משפחה</label>
                    <input
                      className="border-b border-b-[#000000] focus:outline-0 w-full"
                      id="family"
                      name="family"
                      type="text"
                    />
                  </div>
                </div>
                <div className="contact-row flex gap-x-[2vw]">
                  <div className="contact-col w-1/2 flex items-center gap-x-3.25">
                    <label htmlFor="mobile">נייד</label>
                    <input
                      className="border-b border-b-[#000000] focus:outline-0 w-full"
                      id="mobile"
                      name="mobile"
                      type="tel"
                    />
                  </div>
                  <div className="contact-col w-1/2 flex items-center gap-x-3.25">
                    <label htmlFor="email">דוא״ל</label>
                    <input
                      className="border-b border-b-[#000000] focus:outline-0 w-full"
                      id="email"
                      name="email"
                      type="email"
                    />
                  </div>
                </div>
                <div className="contact-row flex flex-col">
                  <label>נושא הפניה</label>
                  <textarea
                    className="border-b border-b-[#000000] focus:outline-0 w-full"
                    cols={10}
                    rows={3}
                  ></textarea>
                </div>
                <div className="contact-row flex justify-end">
                  <ThemeButton2
                    svgIconClass={""}
                    extraClass="bg-[#D4AF37] pt-2 pb-1.25 px-5 rounded-none cursor-pointer"
                    fontSize="text-[22px]"
                    text={`שלח טופס`}
                    textColor="text-black"
                    hoverBgColor="bg-black"
                    hoverTextColor="group-hover:text-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
