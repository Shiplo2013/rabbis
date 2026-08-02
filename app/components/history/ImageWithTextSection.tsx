import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import Image1 from "../../assets/images/text-image1.jpg";
import Image2 from "../../assets/images/text-image2.jpg";
import Image3 from "../../assets/images/text-image3.jpg";
import Image4 from "../../assets/images/text-image4.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  panel?: RefObject<HTMLDivElement | null>;
  data?: any;
  offsetTopTimeline?: number;
  offsetTopAdded?: boolean;
}

export default function ImageWithTextSection(props: ChildProps) {
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  // Path
  const pathname = usePathname();
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
  const sectionData = {
    title: `שנת תש״פ`,
    text: `הנחת אבן הפינה להרחבת בניין פנימיה ב' ב2 קומות נוספות`,
    image1: Image1,
    image2: Image2,
    image3: Image3,
    image4: Image4,
  };
  // Section Animation
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];

      if (
        typeof window === "undefined" ||
        !wrapper.current ||
        !props.offsetTopAdded ||
        window.innerWidth < 1024
      ) {
        return;
      }
      // Content Image 1
      const imageRef1 = wrapper.current?.querySelector(".content-image1");
      const imageRef1image1 = wrapper.current?.querySelector(
        ".content-image1>.image1",
      );
      // Image 1
      if (imageRef1) {
        gsap.set(imageRef1, {
          y: 100,
          opacity: 0,
        });
        const animation = gsap.to(imageRef1, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.inOut",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(imageRef1) -
                window.innerWidth * 0.5
              );
            },
            toggleActions: "restart none none reverse",
          },
        });
        animations.push(animation);
      }
      if (imageRef1image1) {
        gsap.set(imageRef1image1, {
          x: "-30vw",
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(imageRef1) -
                window.innerWidth * 0.7
              );
            },
            end: () => "+=" + window.innerWidth * 2,
            scrub: 2,
          },
        });
        tl.to(imageRef1image1, {
          x: "20vw",
          ease: "none",
        });
        animations.push(tl);
      }

      // Content text
      const imageTextheading =
        wrapper.current?.querySelector(".content-text>h3");
      const imageTexttext = wrapper.current?.querySelector(".content-text>p");
      document.fonts.ready.then(() => {
        // Section Title
        if (imageTextheading) {
          gsap.set(imageTextheading, { opacity: 1 });
          let splititle;
          SplitText.create(imageTextheading, {
            type: "lines",
            linesClass: "line direction-rtl",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
              splititle = gsap.from(self.lines, {
                duration: 2,
                yPercent: 100,
                opacity: 0,
                delay: 0,
                stagger: 0.02,
                ease: "expo.inOut",
                scrollTrigger: {
                  start: () => {
                    return (
                      getTimelineOffset() +
                      GetRightPosition(imageTextheading) -
                      window.innerWidth * 0.5
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
        // Section Text
        if (imageTexttext) {
          gsap.set(imageTexttext, { opacity: 1 });
          let splitext;
          SplitText.create(imageTexttext, {
            type: "lines",
            linesClass: "line direction-rtl",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
              splitext = gsap.from(self.lines, {
                duration: 2,
                yPercent: 100,
                opacity: 0,
                delay: 0,
                stagger: 0.02,
                ease: "expo.inOut",
                scrollTrigger: {
                  start: () => {
                    return (
                      getTimelineOffset() +
                      GetRightPosition(imageTexttext) -
                      window.innerWidth * 0.7
                    );
                  },
                  toggleActions: "restart none none reverse",
                },
              });
              animations.push(splitext);
              return splitext;
            },
          });
        }
      });
      // Content Image 2
      const imageRef2 = wrapper.current?.querySelector(".content-image2");
      const imageRef2image3 = wrapper.current?.querySelector(
        ".content-image2>.image3",
      );
      // Image 2
      if (imageRef2) {
        gsap.set(imageRef2, {
          y: 100,
          opacity: 0,
        });
        const animation = gsap.to(imageRef2, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "expo.inOut",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(imageRef2) -
                window.innerWidth * 0.7
              );
            },
            toggleActions: "restart none none reverse",
          },
        });
        animations.push(animation);
      }
      if (imageRef2image3) {
        gsap.set(imageRef2image3, {
          x: "-30vw",
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(imageRef2) -
                window.innerWidth * 0.7
              );
            },
            end: () => "+=" + window.innerWidth * 2,
            scrub: 2,
          },
        });
        tl.to(imageRef2image3, {
          x: "20vw",
          ease: "none",
        });
        animations.push(tl);
      }

      // Return Animations
      return () => {
        animations.forEach((animation) => animation.kill());
      };
    },
    { scope: wrapper, dependencies: [pathname, props.offsetTopAdded] },
  );
  return (
    <section
      dir="rtl"
      ref={wrapper}
      className={`${props.extraClass} bg-black flex items-center relative z-20 px-[8vw] lg:px-[11.25vw] py-[7vh]`}
      data-scroll-section={props.animWidthText}
    >
      <div className="content-wrapper w-full h-full flex items-center flex-col lg:flex-row gap-y-[7vh]">
        <div className="content-image1 relative w-full lg:ml-[10vw] flex flex-col gap-y-10">
          <div className="image1 w-full lg:w-[25.67vw] lg:h-[35.4vh] lg:absolute lg:bottom-10 lg:right-0 lg:-mr-[15vw]">
            <Image
              className="w-full object-cover object-center h-full"
              src={
                props?.data?.floating_image_1?.sizes?.medium ||
                sectionData?.image1?.src
              }
              width={"493"}
              height={"329"}
              blurDataURL={
                CreateShimmerDataUrl(493, 329) ||
                sectionData?.image1?.blurDataURL
              }
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
          <div className="image2 w-full h-auto lg:w-[39.68vw] lg:h-[54.68vh]">
            <Image
              className="w-full object-cover object-center h-full"
              src={
                props?.data?.image_1?.sizes?.large || sectionData?.image2?.src
              }
              width={"762"}
              height={"508"}
              blurDataURL={
                CreateShimmerDataUrl(762, 508) ||
                sectionData?.image2?.blurDataURL
              }
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
        </div>
        <div
          dir="ltr"
          className="content-text text-[20px] sm:text-[26px] lg:text-[30px] leading-[90%] text-[#FBF4E6] min-w-[14vw] lg:ml-[2vw] self-baseline lg:mt-[15vh] text-right"
        >
          {parse(props?.data?.text || sectionData?.text)}
        </div>
        <div className="content-image2 relative w-full flex flex-col gap-y-10">
          <div className="image3 w-full h-auto lg:w-[27.65vw] lg:h-[38.1vh] lg:absolute lg:bottom-0 lg:right-0 lg:-mb-[6.8vh] lg:-mr-[8.9vw]">
            <Image
              className="w-full object-cover object-center h-full"
              src={
                props?.data?.floating_image_2?.sizes?.medium ||
                sectionData?.image3?.src
              }
              width={"531"}
              height={"354"}
              blurDataURL={
                CreateShimmerDataUrl(531, 354) ||
                sectionData?.image3?.blurDataURL
              }
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
          <div className="image4 w-full h-auto lg:w-[47.86vw] lg:h-[65.87vh]">
            <Image
              className="w-full object-cover object-center h-full"
              src={
                props?.data?.image_2?.sizes?.large || sectionData?.image4?.src
              }
              width={"919"}
              height={"612"}
              blurDataURL={
                CreateShimmerDataUrl(919, 612) ||
                sectionData?.image4?.blurDataURL
              }
              placeholder={"blur"}
              loading="lazy"
              alt={"Section Image"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
