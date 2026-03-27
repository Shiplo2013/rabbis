"use client";
import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import markImage1 from "../../assets/images/markofroad3-image1.jpg";
import markImage2 from "../../assets/images/markofroad3-image2.jpg";
import markImage3 from "../../assets/images/markofroad3-image3.jpg";
import markImage4 from "../../assets/images/markofroad3-image4.jpg";
import notifyIcon from "../../assets/images/notify-icon.png";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

gsap.registerPlugin(SplitText, ScrollTrigger);
interface ChildProps {
  extraClass: string;
  animWidthText: number;
}
export default function MarkOfTheRoad3(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);

  // Section Data
  const title = `ציוני<br/>דרך`;
  const sectionData = [
    {
      title: `שנת תרפ"ד:<br/>ייסוד הישיבה`,
      image: markImage1,
      notification: "",
    },
    {
      title: `שנת תרפ"ה:<br/>עליית הסבא והגרמ"מ אפשטיין`,
      image: markImage2,
      notification: "",
    },
    {
      title: `שנת תרפ"ה:<br/>עליית הסבא והגרמ"מ אפשטיין`,
      image: markImage3,
      notification: "",
    },
    {
      title: `שנת תרפ"ו:<br/>מינוי רבי  אריה יהודה לייב חסמן כמשגיח`,
      image: markImage3,
      notification: `מכתב מרן המשגיח רבי יהודה אריה לייב חסמן זצוק"ל אל ראשי הישיבה בחברון`,
    },
  ];
  const secTitle5 = `שנת תרפ"ז:<br/>פטירת הסבא`;

  // Section Animaton
  useGSAP(
    () => {
      // Section Text Here
      document.fonts.ready.then(() => {
        // Selectors
        const mainTitle = wrapper.current?.querySelector(".main-title");
        // Section Title
        if (mainTitle) {
          gsap.set(mainTitle, { opacity: 1 });
          let maintitleSplit;
          SplitText.create(mainTitle, {
            type: "lines",
            linesClass: "line direction-rtl",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
              maintitleSplit = gsap.from(self.lines, {
                duration: 3,
                yPercent: 120,
                stagger: 0.025,
                ease: "expo.out",
                scrollTrigger: {
                  start: () => {
                    return GetRightPosition(mainTitle) - window.innerWidth / 2;
                  },
                },
              });
              return maintitleSplit;
            },
          });
        }
        // Conent Group
        const items = wrapper.current?.querySelectorAll(".section-content");
        items?.forEach((item) => {
          const image = item.querySelector(".image");
          const title = item.querySelector(".title>h4");
          const notification = item.querySelector(".notifiaction");
          if (notification) {
            const notificationIcon =
              notification?.querySelector(".notify-icon");
            // Notification
            gsap.set(notification, {
              y: 100,
              opacity: 0,
            });
            gsap.to(notification, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: {
                start: () => {
                  return GetRightPosition(image) - window.innerWidth / 3;
                },
              },
            });
            // Notification Icon
            gsap.set(notificationIcon, {
              y: 20,
              x: -30,
              rotate: -15,
              opacity: 0,
            });
            gsap.to(notificationIcon, {
              y: 0,
              x: 0,
              rotate: 0,
              opacity: 1,
              duration: 1,
              delay: 0.5,
              ease: "expo.out",
              scrollTrigger: {
                start: () => {
                  return GetRightPosition(image) - window.innerWidth / 3;
                },
              },
            });
          }
          // Section Image
          if (image) {
            gsap.set(image, {
              y: 100,
              opacity: 0,
            });
            gsap.to(image, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: {
                start: () => {
                  return GetRightPosition(image) - window.innerWidth / 2;
                },
              },
            });
          }
          // Seection Title
          if (title) {
            gsap.set(title, { opacity: 1 });
            let splititle;
            SplitText.create(title, {
              type: "lines",
              linesClass: "line direction-rtl",
              autoSplit: true,
              mask: "lines",
              onSplit: (self) => {
                splititle = gsap.from(self.lines, {
                  duration: 3,
                  yPercent: 120,
                  stagger: 0.025,
                  ease: "expo.out",
                  scrollTrigger: {
                    start: () => {
                      return GetRightPosition(title) - window.innerWidth / 3;
                    },
                  },
                });
                return splititle;
              },
            });
          }
        });
      });
    },
    { scope: wrapper, dependencies: [pathname] },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
    >
      <div className="section-row w-full h-full flex px-[6.3vw] py-[9vh]">
        <div
          dir="ltr"
          className="section-title flex items-end w-[15vw] ml-[10vw]"
        >
          <h2 className="main-title text-[161px] leading-[0.7em] text-(--theme-color) text-right">
            {parse(title)}
          </h2>
        </div>
        {sectionData?.map((item, index) => (
          <div
            key={index}
            className="group section-content flex flex-col items-start gap-y-[10vh] w-48.5vw self-end -mb-[9vh] px-[2.7vw] pt-[9vh] relative cursor-pointer"
          >
            {item.notification !== "" && (
              <div className="notifiaction py-5 px-8 w-108 bg-[#5A7C4E] relative pl-19 mx-auto z-20">
                <div className="notify-icon w-33.75 h-25 absolute top-0 left-0 -translate-x-1/2">
                  <Image
                    className="w-full object-cover object-center h-full"
                    src={notifyIcon.src}
                    width={"135"}
                    height={"100"}
                    blurDataURL={notifyIcon?.blurDataURL}
                    placeholder={"blur"}
                    loading="lazy"
                    alt={"Notify Icon"}
                  />
                </div>
                <p className="text-[20px] leading-[1.25em]">
                  {parse(item.notification)}
                </p>
              </div>
            )}
            <div dir="ltr" className="title relative z-20">
              <h4 className="text-[43px] text-(--theme-color) leading-[0.7em] transition-all duration-300 delay-100 group-hover:text-black group-hover text-right">
                {parse(item.title)}
              </h4>
            </div>
            <div className="image w-161 h-106.25 relative z-20">
              <div className="image-wrapper w-full h-full transition-all duration-500 ease-[cubic-bezier(.625, .05, 0, 1)] group-hover:scale-105">
                <Image
                  className="w-full object-cover object-center h-full"
                  src={item.image.src}
                  width={"644"}
                  height={"425"}
                  blurDataURL={item.image?.blurDataURL}
                  placeholder={"blur"}
                  loading="lazy"
                  alt={"Section Image"}
                />
              </div>
            </div>
            <div className="overlay absolute left-0 bottom-0 w-full h-full bg-white z-10 transition-all duration-500 ease-[cubic-bezier(.625, .05, 0, 1)] opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100"></div>
          </div>
        ))}
        <div className="section-content flex items-center gap-x-[2.6vw] w-[90vw] mr-[2.5vw]">
          <div className="image w-[62.7vw] h-[56.8vh]">
            <Image
              className="w-full object-cover object-center h-full"
              src={markImage4.src}
              width={"1205"}
              height={"614"}
              blurDataURL={markImage4?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
          <div className="title w-[23vw]">
            <h4 className="text-[90px] text-(--theme-color) leading-[0.7em]">
              {parse(secTitle5)}
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}
