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
  rabbisData?: (data: SlideItem[]) => void;
  offsetTopTimeline?: number;
  offsetTopAdded?: boolean;
  rabbisPosts?: { posts: RabbiPost[] }; // Add this line to accept rabbisPosts as a prop
}

type RabbiPost = {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  acf: Record<string, unknown> | unknown[] | null;
};

type SlideItem = {
  buttonText: string;
  title: string;
  subtitle: string;
  thumbnail: any;
  text: string;
  buttonLink?: string;
};

function parsePastRabbis(input: unknown): unknown[] {
  if (Array.isArray(input)) {
    return input;
  }

  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function extractPostId(item: unknown): number | undefined {
  if (typeof item === "number") {
    return Number.isFinite(item) ? item : undefined;
  }

  if (typeof item === "string") {
    const parsed = Number(item);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  if (item && typeof item === "object") {
    const candidate = (item as Record<string, unknown>).ID;
    const fallback = (item as Record<string, unknown>).id;
    const value = candidate ?? fallback;

    if (typeof value === "number") {
      return Number.isFinite(value) ? value : undefined;
    }

    if (typeof value === "string") {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    }
  }

  return undefined;
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

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

  useEffect(() => {
    if (props.rabbisPosts?.posts && props.rabbisPosts.posts.length > 0) {
      const mappedSlides: SlideItem[] = props.rabbisPosts?.posts.map((post) => {
        const acf = (post.acf ?? {}) as Record<string, unknown>;
        const title =
          typeof acf?.title === "string" ? acf.title : post.title || "";
        const subtitle = typeof acf.time === "string" ? acf.time : "";
        const thumbnail = acf.thumbnail || null;

        return {
          buttonText: "הרחב קריאה",
          title,
          subtitle,
          thumbnail,
          text: "מייסד וראש הישיבה. מראשי תנועת המוסר ידוע בכינויו הסבא מסלבודקה.",
          buttonLink: post.slug ? `/past-rabbis/${post.slug}` : "/past-rabbis",
        };
      });
      setSlideData(mappedSlides);
      props.rabbisData?.(mappedSlides);
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
                  return (
                    getTimelineOffset() +
                    GetRightPosition(title.current) -
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
      // Section Slider
      if (slideData.length > 0 && slider.current) {
        const sliderAnimation = gsap.from(slider.current, {
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
                window.innerWidth * 0.5
              );
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
              return (
                getTimelineOffset() +
                GetRightPosition(button.current) -
                window.innerWidth * 0.5
              );
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
      <div className="period-content-wrapper flex items-center justify-center w-full h-full relative z-20 pr-[10vw] pl-[10vw] pt-[6vh]">
        <div
          ref={button}
          onClick={() => {
            props.activeMenuFunction?.(!props.activeMenu);
            props.rabbisData?.(slideData);
          }}
          className="period-button absolute top-[7.8vh] left-[12.7vw] cursor-pointer"
        >
          <ThemeButton2
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
          {props?.data?.title && (
            <h2
              ref={title}
              className="text-[45px] leading-[0.7em] text-[#FBF4E6]"
            >
              {parse(props?.data?.title || "")}
            </h2>
          )}
        </div>
        <div ref={slider} className="period-slider max-w-155">
          {slideData.length > 0 && <RabbisSlider data={slideData} />}
        </div>
      </div>
    </section>
  );
}
