import GetRightPosition from "@/app/ui/GetRightPosition";
import ImageRevealWithParallaxBG from "@/app/ui/ImageRevealWithParallaxBG";
import RabbisSlider from "@/app/ui/RabbisSlider";
import ThemeButton from "@/app/ui/ThemeButton";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import contentBG from "../../assets/images/history-section-bg.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  panel?: RefObject<HTMLDivElement | null>;
}

export default function RabbisPeriodSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };

  // Section Data
  const SlideData = [
    {
      buttonText: "",
      title: "",
      subtitle: "",
      text: "",
    },
    {
      buttonText: "",
      title: "",
      subtitle: "",
      text: "",
    },
    {
      buttonText: "",
      title: "",
      subtitle: "",
      text: "",
    },
    {
      buttonText: "",
      title: "",
      subtitle: "",
      text: "",
    },
    {
      buttonText: "",
      title: "",
      subtitle: "",
      text: "",
    },
    {
      buttonText: "",
      title: "",
      subtitle: "",
      text: "",
    },
  ];

  // Section Animation
  useGSAP(
    () => {
      document.fonts.ready.then(() => {
        // Section Title 1
        gsap.set(title.current, { opacity: 1 });
        let splititle;
        SplitText.create(title.current, {
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
                  return (
                    getTimelineOffset() +
                    GetRightPosition(title.current) -
                    window.innerWidth / 2
                  );
                },
                toggleActions: "restart pause play reverse",
              },
            });
            return splititle;
          },
        });
        // Section Slider
        gsap.from(slider.current, {
          yPercent: 50,
          opacity: 0,
          duration: 2,
          delay: -0.5,
          ease: "expo.inOut",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(slider.current) -
                window.innerWidth / 2
              );
            },
            toggleActions: "restart pause play reverse",
          },
        });
        // Section Button
        gsap.from(button.current, {
          yPercent: 100,
          opacity: 0,
          duration: 2,
          delay: -0.5,
          ease: "expo.inOut",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(button.current) -
                window.innerWidth / 2
              );
            },
            toggleActions: "restart pause play reverse",
          },
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
      data-scroll-section={props.animWidthText}
    >
      <ImageRevealWithParallaxBG
        bgImage={contentBG}
        overlayLeft={true}
        overlayLeftColor={"#0a0a0a"}
        animatePosition={props.animWidthText - 0.3}
        panel={props.panel}
      />
      <div className="period-content-wrapper flex items-center justify-center w-full h-full relative z-20 pr-[10vw] pl-[10vw] pt-[6vh]">
        <div
          ref={button}
          className="period-button absolute top-[7.8vh] left-[12.7vw]"
        >
          <ThemeButton
            extraClass="w-32 h-32 flex item-center justify-center border-[4px] border-[#D1A941] text-[28px] leading-[0.8em] p-6 text-center font-bold"
            bgColor="bg-[#ffffff]"
            textColor="text-[#000000]"
            hoverBgColor="bg-[#C3A13F]"
            text={`כל הרבנים`}
            svgIconClass={""}
          />
        </div>
        <div
          dir="ltr"
          className="period-title absolute top-[9.5vh] right-[9vw]"
        >
          <h2
            ref={title}
            className="text-[45px] leading-[0.7em] text-[#FBF4E6]"
          >
            הרבנים בתקופת תרל"ז - תרע"ד
          </h2>
        </div>
        <div ref={slider} className="period-slider max-w-155">
          <RabbisSlider data={SlideData} />
        </div>
      </div>
    </section>
  );
}
