import GetRightPosition from "@/app/ui/GetRightPosition";
import ParallaxBackground from "@/app/ui/ParallaxBackground";
import RabbisSlider from "@/app/ui/RabbisSlider";
import ThemeButton from "@/app/ui/ThemeButton";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import contentBG from "../../assets/images/history-section-bg.jpg";
import { gsap, SplitText, useGSAP } from "../../ui/plugins";

gsap.registerPlugin(SplitText);

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function RabbisPeriodSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const slider = useRef<HTMLDivElement>(null);

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
              duration: 0.7,
              yPercent: 100,
              opacity: 0,
              stagger: 0.05,
              ease: "expo.out",
              scrollTrigger: {
                start: () => {
                  return (
                    GetRightPosition(title.current) - window.innerWidth / 3
                  );
                },
              },
            });
            return splititle;
          },
        });
        // Section Button
        gsap.from(button.current, {
          yPercent: 100,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(1)",
          scrollTrigger: {
            start: () => {
              return GetRightPosition(button.current) - window.innerWidth / 3;
            },
          },
        });
        // Section Slider
        gsap.from(slider.current, {
          yPercent: 50,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(1)",
          scrollTrigger: {
            start: () => {
              return GetRightPosition(slider.current) - window.innerWidth / 3;
            },
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
    >
      <ParallaxBackground
        bgImage={contentBG}
        overlayLeft={true}
        overlayLeftColor={"#0a0a0a"}
        animatePosition={props.animWidthText}
      />
      <div className="period-content-wrapper flex items-center justify-center w-full h-full relative z-20 pr-[10vw] pl-[10vw] pt-[10vh]">
        <div
          ref={button}
          className="period-button absolute top-[7.8vh] left-[12.7vw]"
        >
          <ThemeButton
            extraClass="w-38.25 h-38.25 flex item-center justify-center border-[4px] border-[#D1A941] text-[37px] leading-[0.8em] p-6 text-center font-bold"
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
            className="text-[55px] leading-[0.7em] text-[#FBF4E6]"
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
