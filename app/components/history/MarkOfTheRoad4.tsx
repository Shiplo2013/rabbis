import BigSectionBackground from "@/app/ui/BigSectionBackground";
import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import historyImage1 from "../../assets/images/2013.jpg";
import historyImage3 from "../../assets/images/2016-2.jpg";
import historyImage2 from "../../assets/images/2016.jpg";
import BgImage from "../../assets/images/section-bg12.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function MarkOfTheRoad2(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);

  // Section Data
  const sectionData = [
    {
      title: `שנת תשע״ג`,
      text: `הרחבת פנימיה א ב2 קומות נוספות`,
      image: historyImage1,
    },
    {
      title: `שנת תשע״ו:`,
      text: `שיפוץ המטבח וחדר האוכל החדשים בישיבה`,
      image: historyImage2,
    },
    {
      title: ``,
      text: ``,
      image: historyImage3,
    },
  ];

  // Section Aniamtion
  useGSAP(
    () => {
      const items = wrapper.current?.querySelectorAll(".section-content");
      items?.forEach((item) => {
        const image = item.querySelector(".image");
        const title = item.querySelector(".title>h4");
        const text = item.querySelector(".title>.text");
        // Rubbis Image
        gsap.set(image, {
          y: 100,
          opacity: 0,
        });
        gsap.to(image, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "expo.inOut",
          scrollTrigger: {
            start: () => {
              return GetRightPosition(image) - window.innerWidth / 3;
            },
            toggleActions: "restart pause play reverse",
          },
        });
        // Rubbis Title
        document.fonts.ready.then(() => {
          // Section Title
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
                    return GetRightPosition(title) - window.innerWidth / 2;
                  },
                  toggleActions: "restart pause resume reverse",
                },
              });
              return splititle;
            },
          });
          // Section Text
          gsap.set(text, { opacity: 1 });
          let splitext;
          SplitText.create(text, {
            type: "lines",
            linesClass: "line direction-rtl",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
              splitext = gsap.from(self.lines, {
                duration: 2,
                yPercent: 100,
                opacity: 0,
                delay: -0.5,
                stagger: 0.02,
                ease: "expo.inOut",
                scrollTrigger: {
                  start: () => {
                    return GetRightPosition(title) - window.innerWidth / 2;
                  },
                  toggleActions: "restart pause resume reverse",
                },
              });
              return splitext;
            },
          });
        });
      });
      if (items && items[0]) {
        gsap.set(items[0], {
          x: "-10vw",
        });
        const tl = gsap.timeline({
          scrollTrigger: {
            start: () => {
              return GetRightPosition(items[0]) - window.innerWidth / 2;
            },
            end: () => "+=" + window.innerWidth * 2,
            scrub: 2,
          },
        });
        tl.to(items[0], {
          x: "30vw",
          ease: "none",
        });
      }
    },
    { scope: wrapper, dependencies: [pathname] },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-white flex items-center relative z-20`}
      data-scroll-section={props.animWidthText}
    >
      <div className="mark-background absolute top-0 left-0 w-full h-full z-10 overflow-hidden">
        <BigSectionBackground
          bgImage={BgImage}
          bgClass=""
          animatePosition={props.animWidthText}
          imagePosition={""}
          overlayClass=""
        />
      </div>
      <div className="section-row w-full h-full flex px-[6.3vw] py-[4.5vw] items-center relative z-30">
        <div className="content-wrapper flex items-end gap-x-[2vw]">
          <div className="section-content flex items-center gap-x-[2.6vw] w-[50vw]">
            <div className="image w-[27.8vw] h-[38.3vh]">
              <Image
                className="w-full object-cover object-center h-full"
                src={sectionData[0]?.image?.src}
                width={"534"}
                height={"356"}
                blurDataURL={sectionData[0]?.image?.blurDataURL}
                placeholder={"blur"}
                loading="lazy"
                alt={"Section Image"}
              />
            </div>
            <div
              dir="ltr"
              className="title w-[24vw] text-[30px] text-black leading-[90%] text-right"
            >
              <h4 className="font-bold">{parse(sectionData[0]?.title)}</h4>
              <div className="text">
                <p>{parse(sectionData[0]?.text)}</p>
              </div>
            </div>
          </div>
          <div className="section-content flex flex-col items-center gap-x-[2.6vw] w-[18vw] gap-y-[4.4vh]">
            <div
              dir="ltr"
              className="title w-full text-[30px] text-black leading-[90%] text-right"
            >
              <h4 className="font-bold">{parse(sectionData[1]?.title)}</h4>
              <div className="text">
                <p>{parse(sectionData[1]?.text)}</p>
              </div>
            </div>
            <div className="image w-full h-[50vh]">
              <Image
                className="w-full object-cover object-center h-full"
                src={sectionData[1]?.image?.src}
                width={"346"}
                height={"462"}
                blurDataURL={sectionData[1]?.image?.blurDataURL}
                placeholder={"blur"}
                loading="lazy"
                alt={"Section Image"}
              />
            </div>
          </div>
          <div className="section-content flex flex-col items-center gap-x-[2.6vw] w-[42.4vw] gap-y-[4.4vh]">
            <div className="image w-full h-[58.5vh]">
              <Image
                className="w-full object-cover object-center h-full"
                src={sectionData[2]?.image?.src}
                width={"815"}
                height={"544"}
                blurDataURL={sectionData[2]?.image?.blurDataURL}
                placeholder={"blur"}
                loading="lazy"
                alt={"Section Image"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
