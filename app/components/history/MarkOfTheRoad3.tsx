"use client";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
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
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  panel: React.RefObject<HTMLDivElement | null>;
  data?: any;
  offsetTopTimeline?: number;
  offsetTopAdded?: boolean;
}
export default function MarkOfTheRoad3(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  const { notificationData, setNotificationData, setOpenNotificationPopup } =
    useAppState();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };

  // Section Data
  const title = props?.data?.title || `ציוני<br/>דרך`;
  const sectionData = [
    {
      title: props?.data?.content_1?.title || `שנת תרפ"ד:<br/>ייסוד הישיבה`,
      image: props?.data?.content_1?.image || markImage1,
      notification: "",
    },
    {
      title:
        props?.data?.content_2?.title ||
        `שנת תרפ"ה:<br/>עליית הסבא והגרמ"מ אפשטיין`,
      image: props?.data?.content_2?.image || markImage2,
      notification: "",
    },
    {
      title:
        props?.data?.content_3?.title ||
        `שנת תרפ"ה:<br/>עליית הסבא והגרמ"מ אפשטיין`,
      image: props?.data?.content_3?.image || markImage3,
      notification: "",
    },
    {
      title:
        props?.data?.content_4?.title ||
        `שנת תרפ"ו:<br/>מינוי רבי  אריה יהודה לייב חסמן כמשגיח`,
      image: props?.data?.content_4?.image || markImage4,
      notification:
        props?.data?.content_4?.notification?.notification_title ||
        `מכתב מרן המשגיח רבי יהודה אריה לייב חסמן זצוק"ל אל ראשי הישיבה בחברון`,
    },
  ];
  const secTitle5 =
    props?.data?.content_5?.title || `שנת תרפ"ז:<br/>פטירת הסבא`;

  // Section Animaton
  useGSAP(
    () => {
      //console.log("MarkOfTheRoad3 Animation", props.data);
      const animations: gsap.core.Animation[] = [];
      if (
        typeof window === "undefined" ||
        !wrapper.current ||
        !props.offsetTopAdded
      ) {
        return;
      }
      // Section Text Here
      document.fonts.ready.then(() => {
        // Selectors
        const mainTitle = wrapper.current?.querySelector(".main-title");
        // Section Title
        if (mainTitle && mainTitle?.textContent?.length !== 0) {
          gsap.set(mainTitle, { opacity: 1 });
          let maintitleSplit;
          SplitText.create(mainTitle, {
            type: "lines",
            linesClass: "line direction-rtl",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
              maintitleSplit = gsap.from(self.lines, {
                duration: 2,
                yPercent: 150,
                stagger: 0.025,
                delay: -0.5,
                ease: "expo.inOut",
                scrollTrigger: {
                  start: () => {
                    return (
                      getTimelineOffset() +
                      GetRightPosition(mainTitle) -
                      window.innerWidth * 0.4
                    );
                  },
                  toggleActions: "restart none none reverse",
                },
              });
              animations.push(maintitleSplit);
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
            const notificationAnimation = gsap.to(notification, {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: "easeIn",
              delay: 0.5,
              scrollTrigger: {
                start: () => {
                  return (
                    getTimelineOffset() +
                    GetRightPosition(image) -
                    window.innerWidth * 0.4
                  );
                },
                toggleActions: "restart none none reverse",
              },
            });
            animations.push(notificationAnimation);
            // Notification Icon
            gsap.set(notificationIcon, {
              y: 20,
              x: -30,
              rotate: -15,
              opacity: 0,
            });
            const notificationIconAnimation = gsap.to(notificationIcon, {
              y: 0,
              x: 0,
              rotate: 0,
              opacity: 1,
              duration: 1.5,
              delay: 1,
              ease: "expo.inOut",
              scrollTrigger: {
                start: () => {
                  return (
                    getTimelineOffset() +
                    GetRightPosition(image) -
                    window.innerWidth * 0.4
                  );
                },
                toggleActions: "restart none none reverse",
              },
            });
            animations.push(notificationIconAnimation);
          }
          // Section Image
          if (image) {
            gsap.set(image, {
              y: 100,
              opacity: 0,
            });
            const imageAnimation = gsap.to(image, {
              y: 0,
              opacity: 1,
              duration: 1.5,
              ease: "expo.inOut",
              scrollTrigger: {
                start: () => {
                  return (
                    getTimelineOffset() +
                    GetRightPosition(image) -
                    window.innerWidth * 0.4
                  );
                },
                toggleActions: "restart none none reverse",
              },
            });
            animations.push(imageAnimation);
          }
          // Section Title
          if (title && title?.textContent?.length !== 0) {
            gsap.set(title, { opacity: 1 });
            let splititle;
            SplitText.create(title, {
              type: "lines",
              linesClass: "line direction-rtl",
              autoSplit: true,
              mask: "lines",
              onSplit: (self) => {
                splititle = gsap.from(self.lines, {
                  duration: 2,
                  yPercent: 150,
                  stagger: 0.025,
                  delay: -0.5,
                  ease: "expo.inOut",
                  scrollTrigger: {
                    start: () => {
                      return (
                        getTimelineOffset() +
                        GetRightPosition(title) -
                        window.innerWidth * 0.4
                      );
                    },
                    toggleActions: "restart none none reverse",
                  },
                });
                animations.push(splititle);
                return splititle;
              },
            });
          }
        });
      });

      // Return function to kill animations on unmount or dependency change
      return () => {
        animations.forEach((animation) => animation.kill());
      };
    },
    { scope: wrapper, dependencies: [pathname, props.offsetTopAdded] },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
      data-scroll-section={props.animWidthText}
    >
      <div className="section-row w-full h-full flex px-[6.3vw] py-[9vh]">
        <div
          dir="ltr"
          className="section-title flex items-end w-[15vw] ml-[10vw] mb-[4vh]"
        >
          <h2 className="main-title text-[161px] leading-[0.7em] text-(--theme-color) text-right">
            {parse(title)}
          </h2>
        </div>
        {sectionData?.map((item: any, index: number) => (
          <div
            key={index}
            className="group section-content flex flex-col items-start gap-y-[10vh] w-48.5vw self-end -mb-[9vh] px-[2.7vw] pt-[9vh] relative cursor-pointer"
          >
            {item?.notification !== "" && (
              <div
                onClick={() => {
                  setNotificationData(
                    props?.data?.content_4?.notification?.notification_popup,
                  );
                  setOpenNotificationPopup(true);
                }}
                className="notifiaction notification-button py-5 px-8 w-108 bg-[#5A7C4E] relative pl-19 mx-auto z-20 cursor-pointer select-none"
              >
                <div className="notify-icon w-33.75 h-25 absolute top-0 left-0 -translate-x-1/2">
                  <Image
                    className="w-full object-cover object-center h-full"
                    src={notifyIcon?.src}
                    width={"135"}
                    height={"100"}
                    blurDataURL={notifyIcon?.blurDataURL}
                    placeholder={"blur"}
                    loading="lazy"
                    alt={"Notify Icon"}
                  />
                </div>
                <div className="text-[20px] leading-[1.25em]">
                  {parse(item?.notification)}
                </div>
              </div>
            )}
            <div dir="ltr" className="title relative z-20">
              <h4 className="text-[43px] text-(--theme-color) leading-[0.7em] transition-all duration-300 delay-100 group-hover:text-black group-hover text-right">
                {parse(item?.title)}
              </h4>
            </div>
            <div className="image w-161 h-106.25 relative z-20">
              <div className="image-wrapper w-full h-full transition-all duration-500 ease-[cubic-bezier(.625, .05, 0, 1)] group-hover:scale-105">
                <Image
                  className="w-full object-cover object-center h-full"
                  src={item?.image?.sizes?.large || item?.image?.src}
                  width={"644"}
                  height={"425"}
                  blurDataURL={
                    CreateShimmerDataUrl(644, 425) || item?.image?.blurDataURL
                  }
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
              src={
                props?.data?.content_5?.image?.sizes?.large || markImage4.src
              }
              width={"1205"}
              height={"614"}
              blurDataURL={
                CreateShimmerDataUrl(1205, 614) || markImage4?.blurDataURL
              }
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
