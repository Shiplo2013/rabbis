import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import historyImage1 from "../../assets/images/history-image1.jpg";
import historyImage2 from "../../assets/images/history-image2.jpg";
import historyImage3 from "../../assets/images/history-image3.jpg";
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
      title: `שנת תרע"ד:<br/>בעיר מינסק שברוסיה הלבנה`,
      image: historyImage1,
    },
    {
      title: `שנת תרע"ו:<br/>בעיר קרמנצ'וג שבאוקראינה`,
      image: historyImage2,
    },
    {
      title: `שנת תש"פ:<br/>חזרה לסלבודקא`,
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
          // Section Title 1
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
      <div className="section-row w-full h-full flex px-[6.3vw] py-[4.5vw] gap-x-[10vw]">
        {sectionData?.map((item, index) => (
          <div
            key={index}
            className="section-content flex items-center gap-x-[2.6vw] w-[60vw]"
          >
            <div className="image w-[33.33vw] h-103.25">
              <Image
                className="w-full object-cover object-center h-full"
                src={item?.image?.src}
                width={"640"}
                height={"413"}
                blurDataURL={item?.image?.blurDataURL}
                placeholder={"blur"}
                loading="lazy"
                alt={"Section Image"}
              />
            </div>
            <div className="title w-[24vw]">
              <h4 className="text-[43px] text-(--theme-color) leading-[0.7em]">
                {parse(item?.title)}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
