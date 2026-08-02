import BackgroundImage2 from "@/app/ui/BackgroundImage2";
import GetRightPosition from "@/app/ui/GetRightPosition";
import RabbisSlider from "@/app/ui/RabbisSlider";
import ThemeButton2 from "@/app/ui/ThemeButton2";
import parse from "html-react-parser";
import { usePathname } from "next/navigation";
import { RefObject, useEffect, useRef, useState } from "react";
import contentBG from "../../assets/images/history-section-bg.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  panel?: RefObject<HTMLDivElement | null>;
  activeMenu?: boolean;
  activeMenuFunction?: (state: boolean) => void;
  data: any;
  rabbisData?: (data: RabbiPost[]) => void;
  offsetTopTimeline?: number;
  offsetTopAdded?: boolean;
  rabbisPosts?: RabbiPost[]; // Add this line to accept rabbisPosts as a prop
}

type RabbiPost = {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: string;
  acf: {
    thumbnail: {
      sizes: {
        thumbnail: any;
        RabbiPost: any;
      };
    };
    time: string;
  };
};

type SlideItem = {
  buttonText: string;
  title: string;
  subtitle: string;
  thumbnail: any;
  text: string;
  buttonLink?: string;
};

export default function RabbisPeriodSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const [slideData, setSlideData] = useState<SlideItem[]>([]);
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
  useEffect(() => {
    if (props.rabbisPosts) {
      const mappedData: SlideItem[] = props.rabbisPosts.map(
        (post: RabbiPost) => ({
          buttonText: "הרחב קריאה",
          title: post.title.rendered,
          subtitle: post.acf?.time as string,
          thumbnail: post.acf?.thumbnail,
          text: post.acf?.time as string,
          buttonLink: `/past-rabbis/${post.slug}`,
        }),
      );
      setSlideData(mappedData);
    }
  }, [props.rabbisPosts]);

  // Section Animation
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    if (
      typeof window === "undefined" ||
      !wrapper.current ||
      !props.offsetTopAdded
    ) {
      return;
    }
    document.fonts.ready.then(() => {
      // Section Title 1
      if (title.current) {
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
                  return window.innerWidth > 1024
                    ? getTimelineOffset() +
                        GetRightPosition(title.current) -
                        window.innerWidth * 0.5
                    : (title.current?.getBoundingClientRect().top || 0) +
                        window.scrollY -
                        window.innerHeight * 0.7;
                },
                toggleActions: "restart none none reverse",
              },
            });
            animations.push(splititle);
            return splititle;
          },
        });
      }
      // Section Slider
      if (slider.current) {
        const sliderAnimation = gsap.from(slider.current, {
          yPercent: 50,
          opacity: 0,
          duration: 2,
          delay: -0.5,
          ease: "expo.inOut",
          scrollTrigger: {
            start: () => {
              return window.innerWidth > 1024
                ? getTimelineOffset() +
                    GetRightPosition(slider.current) -
                    window.innerWidth * 0.5
                : (slider.current?.getBoundingClientRect().top || 0) +
                    window.scrollY -
                    window.innerHeight * 0.7;
            },
            toggleActions: "restart none none reverse",
          },
        });
        animations.push(sliderAnimation);
      }
      // Section Button
      if (button.current) {
        gsap.set(button.current, { opacity: 0, yPercent: 100 });
        const buttonAnimation = gsap.to(button.current, {
          yPercent: 0,
          opacity: 1,
          duration: 2,
          delay: 0,
          ease: "expo.inOut",
          scrollTrigger: {
            start: () => {
              return window.innerWidth > 1024
                ? getTimelineOffset() +
                    GetRightPosition(button.current) -
                    window.innerWidth * 0.5
                : (button.current?.getBoundingClientRect().top || 0) +
                    window.scrollY -
                    window.innerHeight * 0.7;
            },
            toggleActions: "restart none none reverse",
          },
        });
        animations.push(buttonAnimation);
      }
    });

    // Cleanup function to kill animations on unmount or dependency change
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [props.offsetTopAdded, pathname]);

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
      data-scroll-section={props.animWidthText}
    >
      {/* <ImageRevealWithParallaxBG
        bgImage={contentBG}
        overlayLeft={true}
        overlayLeftColor={"#0a0a0a"}
        animatePosition={props.animWidthText - 0.3}
        panel={props.panel}
      /> */}
      <BackgroundImage2
        bgImage={contentBG}
        start={props.animWidthText - 0.3}
        panel={props.panel}
        offsetTopTimeline={props.offsetTopTimeline}
        offsetTopAdded={props.offsetTopAdded}
      />
      <div className="period-content-wrapper flex items-center justify-center w-full h-full relative z-20 px-[8vw] pt-[8vh] pb-[6vh] lg:pb-0 lg:pr-[10vw] lg:pl-[10vw] lg:pt-[6vh] flex-col lg:flex-row gap-y-[7vh]">
        <div
          ref={button}
          onClick={() => {
            props.activeMenuFunction?.(!props.activeMenu);
            props.rabbisData?.(slideData as any);
          }}
          className="period-button absolute left-6 top-6 lg:top-[7.8vh] lg:left-[12.7vw] cursor-pointer"
        >
          <ThemeButton2
            extraClass="w-18 h-18 sm:w-24 sm:h-24 lg:w-32 lg:h-32 flex items-center justify-center border-2 lg:border-4 border-[#D1A941] leading-[0.8em] p-4 lg:p-6 text-center font-bold"
            bgColor="bg-[#ffffff]"
            fontSize="text-[16px] sm:text-[22px] lg:text-[28px]"
            textColor="text-[#000000]"
            hoverBgColor="bg-[#C3A13F]"
            text={`כל הרבנים`}
            svgIconClass={""}
          />
        </div>
        <div
          dir="ltr"
          className="period-title w-full lg:w-auto relative lg:absolute lg:top-[9.5vh] lg:right-[9vw] pl-[15vw]"
        >
          {props?.data?.title && (
            <h2
              ref={title}
              className="text-[25px] sm:text-[35px] lg:text-[45px] leading-[0.9em] sm:leading-[0.7em] text-[#FBF4E6] text-right"
            >
              {parse(props?.data?.title || "")}
            </h2>
          )}
        </div>
        <div ref={slider} className="period-slider w-full max-w-155">
          {props.rabbisPosts && <RabbisSlider data={slideData as any} />}
        </div>
      </div>
    </section>
  );
}
