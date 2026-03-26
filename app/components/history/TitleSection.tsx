import parse from "html-react-parser";
import Image from "next/image";
import { useRef } from "react";
import TitleImage from "../../assets/images/title-image.png";
import rightShape from "../../assets/images/title-shape1.png";
import leftShape from "../../assets/images/title-shape2.png";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

gsap.registerPlugin(ScrollTrigger);

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  rightShape: boolean;
  leftShape: boolean;
}

export default function TitleSection(props: ChildProps) {
  // Ref
  const wrapper = useRef<HTMLDivElement>(null);
  const introTitle = useRef<HTMLHeadingElement>(null);
  const introImage = useRef<HTMLDivElement>(null);
  // Content
  const Title = `רבנים<br/> בתקופה<br/> זו`;
  useGSAP(
    () => {
      // Section Title 2
      gsap.set(introImage.current, { x: 100 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#panel-wrapper",
          start: () => {
            return window.innerWidth * (props.animWidthText - 0.2);
          },
          end: () => "+=" + window.innerWidth * 2,
          scrub: 2,
        },
      });
      tl.to(introImage.current, {
        x: -300,
        ease: "easeIn",
      });
      document.fonts.ready.then(() => {
        // Section Title 1
        gsap.set(introTitle.current, { opacity: 1 });
        let splititle;
        SplitText.create(introTitle.current, {
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
                  return window.innerWidth * (props.animWidthText + 0.4);
                },
              },
            });
            return splititle;
          },
        });
      });
    },
    { scope: wrapper },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
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
          className="title-image absolute w-61.75 h-61.75 top-[21%] right-[9%] z-30 mix-blend-lighten pointer-events-none"
        >
          <Image
            className="avatar-image w-full object-cover object-center h-full"
            src={TitleImage?.src}
            width="247"
            height="247"
            blurDataURL={TitleImage?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Shape"
          />
        </div>
        <h2
          dir="ltr"
          ref={introTitle}
          className="intro-title text-[135px] text-(--theme-color) leading-24 relative z-10 text-right"
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
