import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import historyImage1 from "../../assets/images/history-image1.jpg";
import historyImage2 from "../../assets/images/history-image2.jpg";
import historyImage3 from "../../assets/images/history-image3.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  panel?: RefObject<HTMLDivElement | null>;
  data: any;
  offsetTopTimeline?: number;
}
export default function MarkOfTheRoad2(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);

  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };

  // Section Data
  const sectionData = [
    {
      title:
        props?.data?.content_1?.title ||
        `שנת תרע"ד:<br/>בעיר מינסק שברוסיה הלבנה`,
      image: props?.data?.content_1?.image || historyImage1,
    },
    {
      title:
        props?.data?.content_2?.title ||
        `שנת תרע"ו:<br/>בעיר קרמנצ'וג שבאוקראינה`,
      image: props?.data?.content_2?.image || historyImage2,
    },
    {
      title: props?.data?.content_3?.title || `שנת תש"פ:<br/>חזרה לסלבודקא`,
      image: props?.data?.content_3?.image || historyImage3,
    },
  ];

  // Section Aniamtion
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];

      document.fonts.ready.then(() => {
        const sections = wrapper.current?.querySelectorAll(".section-content");
        sections?.forEach((item, index) => {
          const image = item.querySelector(".image") as HTMLElement | null;
          const title = item.querySelector(".title>h4") as HTMLElement | null;
          // Rubbis Image
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
                  return window.innerWidth > 1024
                    ? getTimelineOffset() +
                        GetRightPosition(image) -
                        window.innerWidth * 0.3
                    : (wrapper.current?.getBoundingClientRect().top || 0) +
                        window.scrollY;
                },
                toggleActions: "restart none none reverse",
              },
            });
            animations.push(imageAnimation);
          }
          // Section Title 1
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
                  yPercent: 100,
                  opacity: 0,
                  delay: -0.5,
                  stagger: 0.02,
                  ease: "expo.inOut",
                  scrollTrigger: {
                    start: () => {
                      return window.innerWidth > 1024
                        ? getTimelineOffset() +
                            GetRightPosition(title) -
                            window.innerWidth * 0.3
                        : (wrapper.current?.getBoundingClientRect().top || 0) +
                            window.scrollY;
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
    { scope: wrapper, dependencies: [pathname, props.data] },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
      data-scroll-section={props.animWidthText}
    >
      <div className="section-row w-full h-full flex px-[8vw] lg:px-[6.3vw] py-[10vh] lg:py-[4.5vw] gap-x-[10vw] lg:gap-x-[6.3vw] flex-col lg:flex-row gap-y-[7vh] lg:gap-y-0">
        {sectionData?.map((item, index) => (
          <div
            key={index}
            className="section-content flex items-center gap-x-6 lg:gap-x-[2.6vw] w-full lg:w-[60vw] flex-col lg:flex-row gap-y-[4vh] lg:gap-y-0"
          >
            <div className="image w-full h-auto lg:w-[33.33vw] lg:h-103.25">
              <Image
                className="w-full object-cover object-center h-full"
                src={item?.image?.sizes?.committee_thumb || item?.image?.src}
                width={"640"}
                height={"413"}
                blurDataURL={
                  item?.image?.blurDataURL || CreateShimmerDataUrl(640, 413)
                }
                placeholder={"blur"}
                loading="lazy"
                alt={"Section Image"}
              />
            </div>
            <div className="title w-full lg:w-[24vw]">
              <h4 className="text-[22px] sm:text-[32px] lg:text-[43px] text-(--theme-color) leading-[0.9em] lg:leading-[0.7em]">
                {parse(item?.title || "")}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
