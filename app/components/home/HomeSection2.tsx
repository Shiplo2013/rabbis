import TextSplitLines from "@/app/ui/TextSplitLines";
import { usePathname } from "next/dist/client/components/navigation";
import Image from "next/image";
import { useRef } from "react";
import Koddisha from "../../assets/images/kaddisha.jpg";
import sectionImage from "../../assets/images/section-image2.jpg";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  animWidthImage: number;
}

export default function HomeSection2(props: ChildProps) {
  // Selectors
  const wrapper = useRef<HTMLElement>(null);
  // Route
  const pathname = usePathname();

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
          toggleActions: "restart pause resume reverse",
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
    const bigTitle = wrapper.current?.querySelector(".over-title");
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
    const overImage = wrapper.current?.querySelector(".mouse-follower");
    if (overImage) {
      gsap.to(overImage, {
        translateX: "10vw",
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
      dir="rtl"
      // onMouseMove={(e) => {
      //   moveImage(e);
      // }}
      className={`${props.extraClass} home-section2 h-screen flex items-center`}
      data-scroll-section={props.animWidthText}
    >
      <div className="section-image h-screen w-[40vw]">
        <Image
          className="relative z-10 object-cover object-center w-full h-full"
          src={sectionImage?.src}
          width={sectionImage?.width}
          height={sectionImage?.height}
          loading="lazy"
          blurDataURL={sectionImage?.blurDataURL}
          placeholder={"blur"}
          alt="Section Image"
        />
      </div>
      <div
        className={`section-content w-[60vw] h-full flex items-center justify-center pr-[10%] pl-[5%] pt-[8%] relative z-40`}
      >
        <h2 className="over-title absolute top-[52%] right-[7%] text-[#D1A941] text-[290px] font-bold leading-[0.75] -mt-[22%] opacity-20 z-0">
          סבא
          <br />
          קדישא
        </h2>
        <div className="mouse-follower absolute top-[20%] right-[20%]">
          <Image
            className="relative z-10"
            src={Koddisha?.src}
            width={Koddisha?.width}
            height={Koddisha?.height}
            loading="lazy"
            blurDataURL={Koddisha?.blurDataURL}
            placeholder={"blur"}
            alt="Koddisha"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-30"></div>
        </div>
        <div
          dir="ltr"
          className="text text-[#EEECDD] text-[70px] leading-[0.8] w-4/5 relative z-40 text-right"
        >
          <p>
            הסבא מסלבודקא מחולל ומייסד הישיבה שהצמיח ברוממותו דורות של תלמידים
            נעלים, עיצב נפשות ברוח גדלות האדם ומאז ועד היום ניכרת השפעתו בכל בית
            מדרש הנושא את רוחו ומורשתו
          </p>
        </div>
      </div>
    </section>
  );
}
