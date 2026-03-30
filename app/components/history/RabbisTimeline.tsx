import ParallaxBackground from "@/app/ui/ParallaxBackground";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import rabbisImage1 from "../../assets/images/rabbis-timeline1.jpg";
import rabbisImage2 from "../../assets/images/rabbis-timeline2.jpg";
import rabbisImage3 from "../../assets/images/rabbis-timeline3.jpg";
import rabbisImage4 from "../../assets/images/rabbis-timeline4.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
}
export default function RabbisTimeline(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);

  // Section Data
  const RabbisData = [
    {
      image: rabbisImage1,
      text: `שנת תרמ״א:<br/>מינוי רבי דב צבי הלר כמשגיח`,
    },
    {
      image: rabbisImage2,
      text: `שנת תר"ן:<br/>מינוי רבי יצחק מפוניבז'`,
    },
    {
      image: rabbisImage3,
      text: `שנת תרנ"ד:<br/>מינוי הגרמ"מ אפשטיין`,
    },
    {
      image: rabbisImage4,
      text: `שנת תרנ"ד:<br/>מינוי הגרא"ז מלצר`,
    },
  ];
  // Section Animation
  useGSAP(
    () => {
      // Current Rabbis Animatin
      const items = wrapper.current?.querySelectorAll(".current-rubbis");
      items?.forEach((item, index) => {
        const image = item.querySelector(".image");
        const title = item.querySelector(".title>h4");
        // Rubbis Image
        gsap.set(image, {
          x: -100,
          opacity: 0,
        });
        gsap.to(image, {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            start: () => {
              return window.innerWidth * (props.animWidthText + index * 0.4);
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
                duration: 1,
                yPercent: 100,
                opacity: 0,
                stagger: 0.05,
                ease: "expo.out",
                scrollTrigger: {
                  start: () => {
                    return (
                      window.innerWidth * (props.animWidthText + index * 0.4)
                    );
                  },
                  toggleActions: "restart pause play reverse",
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
      <ParallaxBackground
        bgImage={props.bgImage}
        overlayLeft={false}
        overlayLeftColor={""}
        animatePosition={props.animWidthText}
      />
      <div className="section-row w-full h-full flex px-[15.5vw] py-[5vh] items-center justify-center relative z-30">
        <div className="rabbis-timeline flex gap-x-[20vw]">
          {RabbisData.map((item, index) => (
            <div
              key={index}
              className="current-rubbis w-64.5 flex flex-col gap-y-[5.5vh]"
            >
              <div className="image w-64.5 h-76.25">
                <Image
                  className="w-full object-cover object-center h-full relative z-10"
                  src={item?.image?.src}
                  width="258"
                  height="305"
                  blurDataURL={item?.image?.blurDataURL}
                  placeholder={"blur"}
                  loading="lazy"
                  alt="Rabbis Image"
                />
              </div>
              <div dir="ltr" className="title mt-auto text-right">
                <h4 className="text-[43px] leading-[0.7em] text-[#FBF4E6]">
                  {parse(item.text)}
                </h4>
              </div>
            </div>
          ))}
        </div>
        <div className="timeline h-2.25 w-10/12 bg-[#C3A13F] absolute top-[59vh] right-[17vw]"></div>
      </div>
    </section>
  );
}
