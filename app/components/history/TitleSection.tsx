import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import TitleImage from "../../assets/images/title-image.png";
import rightShape from "../../assets/images/title-shape1.png";
import leftShape from "../../assets/images/title-shape2.png";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  rightShape: boolean;
  leftShape: boolean;
  panel?: RefObject<HTMLDivElement | null>;
  data: any;
  offsetTopTimeline?: number;
  offsetTopAdded?: boolean;
}

export default function TitleSection(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Ref
  const wrapper = useRef<HTMLDivElement>(null);
  const introTitle = useRef<HTMLHeadingElement>(null);
  const introImage = useRef<HTMLDivElement>(null);
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return (
      props.offsetTopTimeline ||
      (timeline?.current ? timeline.current.offsetTop : 0)
    );
  };
  // Content
  const Title = props?.data?.title || `רבנים<br/> בתקופה<br/> זו`;
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];
      if (
        typeof window === "undefined" ||
        !wrapper.current ||
        !props.offsetTopAdded
      ) {
        return;
      }
      document.fonts.ready.then(() => {
        // Section Image
        gsap.set(introImage.current, { x: 100 });
        const tl = gsap.timeline({
          scrollTrigger: {
            start: () => {
              return window.innerWidth > 1024
                ? getTimelineOffset() +
                    GetRightPosition(wrapper.current) -
                    window.innerWidth * 0.7
                : (wrapper.current?.getBoundingClientRect().top || 0) +
                    window.scrollY -
                    window.innerHeight * 0.7;
            },
            end: () => "+=" + window.innerWidth * 2,
            scrub: 2,
          },
        });
        tl.to(introImage.current, {
          x: -300,
          ease: "easeIn",
        });
        animations.push(tl);
        // Section Title
        gsap.set(introTitle.current, { opacity: 1 });
        let splititle;
        SplitText.create(introTitle.current, {
          type: "lines",
          linesClass: "line direction-rtl",
          autoSplit: true,
          mask: "lines",
          onSplit: (self) => {
            splititle = gsap.from(self.lines, {
              yPercent: 120,
              stagger: 0.02,
              ease: "expo.inOut",
              duration: 1,
              delay: 0,
              opacity: 0,
              scrollTrigger: {
                start: () => {
                  return window.innerWidth > 1024
                    ? getTimelineOffset() +
                        GetRightPosition(wrapper.current) -
                        window.innerWidth * 0.7
                    : (wrapper.current?.getBoundingClientRect().top || 0) +
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
      });

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
      className={`${props.extraClass} bg-black flex items-center relative z-20 min-h-[50vh]`}
      data-scroll-section={props.animWidthText}
    >
      {props.leftShape && (
        <div className="absolute top-0 right-full w-[13vw] h-full -mr-2 select-none pointer-events-none">
          <Image
            className="parallax-image w-full object-cover object-center h-full"
            src={leftShape?.src}
            width="288"
            height="1080"
            blurDataURL={leftShape?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Shape"
          />
        </div>
      )}
      <div className="w-full pr-[15%] pt-[10%] pb-[10%] pl-[15%]">
        <div
          ref={introImage}
          className="title-image absolute w-40 h-auto lg:w-61.75 lg:h-61.75 top-[21%] right-[9%] z-30 mix-blend-lighten pointer-events-none"
        >
          <Image
            className="avatar-image w-full object-cover object-center h-full"
            src={
              props.data?.image?.url ||
              props?.data?.image?.src ||
              TitleImage?.src
            }
            width="247"
            height="247"
            blurDataURL={
              CreateShimmerDataUrl(247, 247) || TitleImage?.blurDataURL
            }
            placeholder={"blur"}
            loading="lazy"
            alt="Shape"
          />
        </div>
        <h2
          dir="ltr"
          ref={introTitle}
          className="intro-title text-[64px] sm:text-[90px] lg:text-[135px] text-(--theme-color) leading-[0.8em] sm:leading-[0.8em] lg:leading-24 relative z-10 text-right"
        >
          {parse(Title)}
        </h2>
      </div>
      {props.rightShape && (
        <div className="absolute top-0 left-full w-[13vw] h-full -ml-2 select-none pointer-events-none">
          <Image
            className="parallax-image w-full object-cover object-center h-full"
            src={rightShape?.src}
            width="288"
            height="1080"
            blurDataURL={rightShape?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Shape"
          />
        </div>
      )}
    </section>
  );
}
