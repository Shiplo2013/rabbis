import BackgroundImage2 from "@/app/ui/BackgroundImage2";
import TextSplitLines from "@/app/ui/TextSplitLines";
import { usePathname } from "next/dist/client/components/navigation";
import Image from "next/image";
import { useRef } from "react";
import Juniper from "../../assets/images/juniper.jpg";
import sectionBg from "../../assets/images/section-bg.jpg";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  animWidthImage: number;
}

export default function HomeSection3(props: ChildProps) {
  // Selectors
  const wrapper = useRef<HTMLElement>(null);
  // Route
  const pathname = usePathname();

  // Section Animations
  useGSAP(() => {
    // Selectors
    const sectionImage = wrapper.current?.querySelector(".section-image");
    // Animations
    if (sectionImage) {
      gsap.set(sectionImage, {
        scale: 0.6,
      });
      // Section 2 Image
      gsap.to(sectionImage, {
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthImage;
          },
          toggleActions: "restart pause play reverse",
        },
        scale: 1,
        duration: 0.6,
        ease: "none",
      });
    }
    document.fonts.ready.then(() => {
      const text = wrapper.current?.querySelector(".section-content .text");
      if (!text) return;
      const textSplit = TextSplitLines(text);
      gsap.set(text, {
        perspective: 400,
      });
      gsap.set(textSplit, {
        yPercent: 150,
        opacity: 0,
      });
      gsap.to(textSplit, {
        scrollTrigger: {
          start: () => {
            return window.innerWidth * (props.animWidthText - 0.7);
          },
          end: () => {
            return "+=" + window.innerWidth * 2;
          },
          scrub: 2,
        },
        yPercent: 0,
        opacity: 1,
        delay: 0,
        ease: "expo.inOut",
        duration: 3,
      });
    });
    // Parallax Effect
    const bigTitle = wrapper.current?.querySelector(
      ".section-content .over-title",
    );
    if (bigTitle) {
      gsap.to(bigTitle, {
        translateX: "-15vw",
        ease: "none",
        scrollTrigger: {
          start: () => {
            return window.innerWidth * props.animWidthImage;
          },
          end: () => {
            return "+=" + window.innerWidth * 2;
          },
          scrub: 2,
        },
      });
    }
  }, [pathname]);
  return (
    <section
      ref={wrapper}
      style={{ backgroundImage: `url(${sectionBg.src})` }}
      dir="rtl"
      // onMouseMove={(e) => {
      //   moveImage(e);
      // }}
      className={`${props.extraClass} home-section3 h-screen bg-no-repeat bg-center bg-cover flex items-center overflow-hidden`}
      data-scroll-section={props.animWidthText}
    >
      <BackgroundImage2
        bgImage={sectionBg}
        panel={wrapper}
        start={props.animWidthImage}
        end={0}
      />
      <div
        className={`section-content w-full h-auto flex items-center justify-start pl-[5%] relative z-40`}
      >
        <div className="section-image w-[50%] h-screen">
          <Image
            className="relative z-10 w-full h-full object-center object-cover"
            src={Juniper?.src}
            width={Juniper?.width}
            height={Juniper?.height}
            loading="lazy"
            blurDataURL={Juniper?.blurDataURL}
            placeholder={"blur"}
            alt="Juniper"
          />
        </div>
        <div className="section-content w-[50%] relative pt-12 pr-[10%]">
          <h2 className="over-title absolute top-[7%] right-[20%] text-[#D1A941] text-[290px] font-bold leading-[0.75] opacity-20 z-0">
            עוז
            <br />
            רוח
          </h2>
          <div
            dir="ltr"
            className="text text-[55px] leading-[0.8] w-107.5 max-w-[70%] relative"
          >
            <p className="mb-7.5">מרן רבי משה מרדכי אפשטיין זצוק"ל </p>
            <p className="font-bold">
              הנהיג את הישיבה במסירות נפש מופלאה בתקופות סוערות, והנחיל לתלמידיו
              מושגים נעלים של עיון התורה ועמלה.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
