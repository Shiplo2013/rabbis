"use client";
import GetRightPosition from "@/app/ui/GetRightPosition";
import ParallaxBackground from "@/app/ui/ParallaxBackground";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import bookIcon from "../../assets/images/lamb-book-icon.png";
import rabbisImage10 from "../../assets/images/rabbis-timeline10.jpg";
import rabbisImage11 from "../../assets/images/rabbis-timeline11.jpg";
import rabbisImage12 from "../../assets/images/rabbis-timeline12.jpg";
import rabbisImage13 from "../../assets/images/rabbis-timeline13.jpg";
import rabbisImage5 from "../../assets/images/rabbis-timeline5.jpg";
import rabbisImage6 from "../../assets/images/rabbis-timeline6.jpg";
import rabbisImage7 from "../../assets/images/rabbis-timeline7.jpg";
import rabbisImage8 from "../../assets/images/rabbis-timeline8.jpg";
import rabbisImage9 from "../../assets/images/rabbis-timeline9.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
  panel?: RefObject<HTMLDivElement | null>;
}
function RabbisTimeline2(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };

  // Section Data
  const RabbisData = [
    {
      type: "history",
      image: rabbisImage5,
      text: `שנת תר"ץ:<br/>מינוי רבי מאיר חדש כמשגיח`,
      size: "portrait",
    },
    {
      type: "history",
      image: rabbisImage6,
      text: `שנת תרצ"ד:<br/>פטירת רבי משה מרדכי אפשטיין`,
      size: "portrait",
    },
    {
      type: "history",
      image: rabbisImage7,
      text: `שנת תרצ"ד:<br/>מינוי רבי אהרן כהן ורבי משה חברוני לראשי ישיבה`,
      size: "landscape",
    },
    {
      type: "history",
      image: rabbisImage8,
      text: `שנת תרצ"ו:<br/>פטירת רבי  אריה יהודה לייב חסמן`,
      size: "portrait",
    },
    {
      type: "history",
      image: rabbisImage9,
      text: `שנת תרצ"ט:<br/> כניסה לבניין החדש`,
      size: "landscape",
    },
    {
      type: "history",
      image: rabbisImage10,
      text: `שנת תש"ז:<br/>מינוי רבי שמחה זיסל ברוידא ורבי אברהם יהודה פרבשטיין לרמי"ם`,
      size: "landscape",
    },
    {
      type: "history",
      image: rabbisImage11,
      text: `שנת תש"ח:<br/>הקמת סניף זמני לישיבה בראשות ראש הישיבה רבי אהרן כהן ב'היכל התלמוד' בתל אביב`,
      size: "landscape",
    },
    {
      type: "notification",
      image: bookIcon,
      text: `ירושלים מופגזת ונצורה - מכתב חיזוק מרבי יחזקאל סרנא`,
      size: "small",
    },
    {
      type: "history",
      image: rabbisImage12,
      text: `שנת תש"כ: <br/>מינוי הרב יצחק חברוני להנהלת הישיבה ולימים מונה לנשיא הישיבה.`,
      size: "landscape",
    },
    {
      type: "history",
      image: rabbisImage13,
      text: `שנת תשכ"ב:<br/>הנחת אבן הפינה לישיבה בגבעת מרדכי`,
      size: "landscape",
    },
  ];

  // Section Animation
  useGSAP(
    () => {
      // Selector
      const secTitle = wrapper?.current?.querySelector(".rabbis-title>h2");
      const sectionItems = wrapper?.current?.querySelectorAll(
        ".rabbis-timeline>.timeline-content",
      );
      // Section Title
      document.fonts.ready.then(() => {
        // Section Title
        if (secTitle) {
          gsap.set(secTitle, { opacity: 1 });
          let splititle;
          SplitText.create(secTitle, {
            type: "lines",
            linesClass: "line direction-rtl",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
              splititle = gsap.from(self.lines, {
                duration: 2,
                yPercent: 120,
                stagger: 0.025,
                delay: -0.5,
                ease: "expo.inOut",
                scrollTrigger: {
                  start: () => {
                    return (
                      getTimelineOffset() +
                      GetRightPosition(wrapper.current) -
                      window.innerWidth * 0.3
                    );
                  },
                  toggleActions: "restart pause play reverse",
                },
              });
              return splititle;
            },
          });
        }
      });

      // Section Items
      if (sectionItems) {
        sectionItems?.forEach((item, index) => {
          const image = item.querySelector(".image");
          const title = item.querySelector(".title>h4");
          if (item.classList.contains("notification-button")) {
            const notificationIcon = item?.querySelector(".notify-icon");
            // Notification
            gsap.set(item, {
              y: 100,
              opacity: 0,
            });
            gsap.to(item, {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "expo.out",
              scrollTrigger: {
                start: () => {
                  return (
                    getTimelineOffset() +
                    GetRightPosition(item) +
                    window.innerWidth * 0.1
                  );
                },
                toggleActions: "restart pause play reverse",
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
                  return (
                    getTimelineOffset() +
                    GetRightPosition(item) +
                    window.innerWidth * 0.1
                  );
                },
                toggleActions: "restart pause play reverse",
              },
            });
          } else {
            // Item Image
            if (image) {
              gsap.set(image, {
                x: -100,
                opacity: 0,
              });
              gsap.to(image, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "expo.out",
                scrollTrigger: {
                  start: () => {
                    return (
                      getTimelineOffset() +
                      GetRightPosition(item) +
                      window.innerWidth * 0.1
                    );
                  },
                  toggleActions: "restart pause play reverse",
                },
              });
            }
            // Rubbis Title
            document.fonts.ready.then(() => {
              // Section Title 1
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
                      duration: 1,
                      yPercent: 100,
                      opacity: 0,
                      stagger: 0.05,
                      ease: "expo.out",
                      scrollTrigger: {
                        start: () => {
                          return (
                            getTimelineOffset() +
                            GetRightPosition(item) +
                            window.innerWidth * 0.1
                          );
                        },
                        toggleActions: "restart pause play reverse",
                      },
                    });
                    return splititle;
                  },
                });
              }
            });
          }
        });
      }
    },
    { scope: wrapper, dependencies: [pathname] },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
      data-scroll-section={props.animWidthText}
    >
      <ParallaxBackground
        bgImage={props.bgImage}
        overlayLeft={false}
        overlayLeftColor={""}
        animatePosition={props.animWidthText}
      />
      <div className="section-row w-full h-full flex px-[10vw] py-[5vh] items-center justify-start relative z-30 gap-x-[8vw]">
        <div dir="ltr" className="rabbis-title self-end text-right">
          <h2 className="text-[160px] leading-[0.7em] text-[#C3A13F]">
            ציוני
            <br />
            דרך
          </h2>
        </div>
        <div className="rabbis-timeline flex gap-x-[20vw] relative">
          {RabbisData.map((item, index) => {
            //console.log(item);
            if (item.type === "notification") {
              return (
                <div
                  key={index}
                  className="timeline-content notification-button py-5 px-8 w-108 bg-[#5A7C4E] relative self-start pl-19 mx-auto z-40 mt-[14vh] -ml-[8vw] -mr-[12vw] cursor-pointer"
                >
                  <div className="notify-icon w-50.5 h-33.75 absolute top-0 left-0 -translate-x-1/2">
                    <Image
                      className="w-full object-cover object-center h-full"
                      src={item?.image?.src || ""}
                      width={"202"}
                      height={"135"}
                      //blurDataURL={item?.image?.blurDataURL || ""}
                      //placeholder={"blur"}
                      loading="lazy"
                      alt={"Book Icon"}
                    />
                  </div>
                  <p className="text-[20px] leading-[1.25em] text-right">
                    {parse(item?.text)}
                  </p>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className={`timeline-content ${item.size === "portrait" ? "w-64.5" : "w-111.5"} flex flex-col gap-y-[5.5vh]`}
                >
                  {item.size === "portrait" ? (
                    <div className="image w-64.5 h-76.25">
                      <Image
                        className="w-full object-cover object-center h-full relative z-10"
                        src={item.image.src}
                        width="258"
                        height="305"
                        blurDataURL={item.image.blurDataURL}
                        placeholder={"blur"}
                        loading="lazy"
                        alt="Rabbis Image"
                      />
                    </div>
                  ) : (
                    <div className="image w-111.5 h-76.25">
                      <Image
                        className="w-full object-cover object-center h-full relative z-10"
                        src={item?.image?.src}
                        width="446"
                        height="305"
                        blurDataURL={item?.image.blurDataURL}
                        placeholder={"blur"}
                        loading="lazy"
                        alt="Rabbis Image"
                      />
                    </div>
                  )}
                  <div dir="ltr" className="title mt-auto text-right">
                    <h4 className="text-[43px] leading-[0.7em] text-[#FBF4E6]">
                      {parse(item?.text)}
                    </h4>
                  </div>
                </div>
              );
            }
          })}
          <div className="timeline h-2.25 w-full bg-[#C3A13F] absolute top-[36vh] right-0"></div>
        </div>
      </div>
    </section>
  );
}

export default RabbisTimeline2;
