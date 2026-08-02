import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import IntroductionBackground from "@/app/ui/IntroductionBackground";
import parse from "html-react-parser";
import { usePathname } from "next/dist/client/components/navigation";
import Image from "next/image";
import { RefObject, useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  animWidthText: number;
  extraClass: string;
  animated: boolean;
  audioControl: () => void;
  panel?: RefObject<HTMLDivElement | null>;
  bgImage: any;
  bgOverlay: any;
  overlayClass: string;
  bgPosition: string;
  bgClass: string;
  data: { title: string; subtitle: string; background: any; overlay: any };
  timeline?: string;
  offsetTopTimeline?: number;
  offsetTopAdded: boolean;
}

export default function Introduction2(props: ChildProps) {
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const subtitle = useRef<HTMLHeadingElement>(null);
  const pathname = usePathname();
  const timeline = props.panel;

  // Section animation
  useGSAP(() => {
    const animations: gsap.core.Animation[] = [];
    if (
      typeof window === "undefined" ||
      !wrapper.current ||
      !props.offsetTopAdded ||
      window.innerWidth < 1024
    ) {
      return;
    }

    // Get Offset Top of Timeline
    const getTimelineOffset = () => {
      return (
        props.offsetTopTimeline ||
        (timeline?.current ? timeline.current.offsetTop : 0)
      );
    };

    document.fonts.ready.then(() => {
      // Section Title
      if (title.current) {
        gsap.set(title.current, { opacity: 1 });
        let splititle;
        SplitText.create(title.current, {
          type: "lines",
          linesClass: "line direction-rtl2",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            splititle = gsap.from(self.lines, {
              duration: 2,
              yPercent: 100,
              opacity: 0,
              stagger: 0.05,
              ease: "expo.out",
              scrollTrigger: {
                start: () => {
                  return window.innerWidth > 1024
                    ? getTimelineOffset() - 10
                    : (wrapper.current?.getBoundingClientRect().top || 0) +
                        window.scrollY -
                        window.innerHeight / 2;
                },
                toggleActions: "play none none reset",
              },
            });
            animations.push(splititle);
            return splititle;
          },
        });
      }
      // Section Subtitle
      if (subtitle.current) {
        gsap.set(subtitle.current, { opacity: 1 });
        let splitSubtitle;
        SplitText.create(subtitle.current, {
          type: "lines",
          linesClass: "line direction-rtl",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            splitSubtitle = gsap.from(self.lines, {
              duration: 2,
              yPercent: 120,
              stagger: 0.025,
              ease: "expo.out",
              scrollTrigger: {
                start: () => {
                  return window.innerWidth > 1024
                    ? getTimelineOffset() - 10
                    : (wrapper.current?.getBoundingClientRect().top || 0) +
                        window.scrollY;
                },
                toggleActions: "play none none reset",
              },
            });
            animations.push(splitSubtitle);
            return splitSubtitle;
          },
        });
      }
    });

    // Return function to kill animations on unmount or dependency change
    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [props.offsetTopAdded, pathname]);
  return (
    <section
      ref={wrapper}
      className={`${props.extraClass} overflow-hidden relative h-screen bg-black`}
      data-scroll-section={props.animWidthText}
    >
      {props.data && props.data?.background && (
        <IntroductionBackground
          bgImage={props.data.background || props.bgImage}
          overlayClass={props.overlayClass}
          imagePosition={props.bgPosition}
          bgClass={props.bgClass}
          animatePosition={props.animWidthText}
          offsetTopTimeline={props.offsetTopTimeline}
          offsetTopAdded={props.offsetTopAdded}
          panel={props.panel}
          timeline={props.timeline}
        />
      )}
      {props.data && props.data?.overlay && (
        <div className="absolute top-0 left-0 w-full h-full z-20">
          <Image
            className={`w-full object-contain h-full relative`}
            src={
              props?.data?.overlay?.src ||
              props?.data?.overlay?.url ||
              props?.bgOverlay.src ||
              ""
            }
            width={`${props?.data?.overlay?.width > 1920 ? props?.data?.overlay?.width : "1920"}`}
            height={`${props?.data?.overlay?.height > 1080 ? props?.data?.overlay?.height : "1080"}`}
            blurDataURL={
              props?.data?.overlay?.blurDataURL ||
              CreateShimmerDataUrl(
                props?.data?.overlay?.width > 1920
                  ? props?.data?.overlay?.width
                  : 1920,
                props?.data?.overlay?.height > 1080
                  ? props?.data?.overlay?.height
                  : 1080,
              )
            }
            placeholder={"blur"}
            loading="lazy"
            alt="Introduction Background Overlay"
          />
        </div>
      )}
      <div dir="ltr" className="flex items-center w-full h-full relative z-30">
        <div className="section-wrapper text-center">
          {props.data && props.data?.title && (
            <h1
              ref={title}
              className="text-[80px] sm:text-[124px] lg:text-[204px] text-[#AC832E] leading-[0.7em] overflow-hidden relative z-20 py-7.5"
            >
              {parse(props?.data?.title)}
            </h1>
          )}
          {props.data && props.data?.subtitle && (
            <h4
              ref={subtitle}
              className="overflow-hidden text-[25px] sm:text-[35px] lg:text-[55px] leading-[1em] text-[#FBF4E6] sm:mt-2 lg:mt-[5vh] relative z-30"
            >
              {parse(props?.data?.subtitle)}
            </h4>
          )}
        </div>
      </div>
    </section>
  );
}
