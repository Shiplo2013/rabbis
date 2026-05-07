import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import rabbisImage1 from "../../assets/images/rabbis-timeline14.jpg";
import rabbisImage2 from "../../assets/images/rabbis-timeline15.jpg";
import rabbisImage3 from "../../assets/images/rabbis-timeline16.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
  panel?: RefObject<HTMLDivElement | null>;
}
export default function RabbisTimeline3(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const timeline = props.panel;
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };
  // Section Data
  const RabbisData = [
    {
      image: rabbisImage1,
      text: `שנת תשמ"ז:<br/>מינוי רבי שלמה כץ ורבי דוד כהן לרמי"ם`,
    },
    {
      image: rabbisImage2,
      text: `שנת????:<br/>פתיחת פנימיה ב'`,
    },
    {
      image: rabbisImage3,
      text: `שנת תשנ"ה:<br/> פתיחת פנימיה ג'`,
    },
  ];
  // Section Animation
  useGSAP(
    () => {
      // Selector
      const secTitle = wrapper?.current?.querySelector(".rabbis-title>h2");
      // Section Title
      document.fonts.ready.then(() => {
        // Section Title
        if (secTitle) {
          gsap.set(secTitle, { opacity: 1 });
          let splititle;
          SplitText.create(secTitle, {
            type: "lines",
            linesClass: "line direction-rtl",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
              splititle = gsap.from(self.lines, {
                duration: 2,
                yPercent: 120,
                stagger: 0.025,
                delay: -0.5,
                ease: "expo.inOut",
                scrollTrigger: {
                  start: () => {
                    return (
                      getTimelineOffset() +
                      GetRightPosition(secTitle) +
                      window.innerWidth * 0.1
                    );
                  },
                  toggleActions: "restart pause resume reverse",
                },
              });
              return splititle;
            },
          });
        }
      });
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
              return (
                getTimelineOffset() +
                GetRightPosition(item) +
                window.innerWidth * 0.1
              );
            },
            toggleActions: "restart pause resume reverse",
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
                ease: "expo.inOut",
                scrollTrigger: {
                  start: () => {
                    return (
                      getTimelineOffset() +
                      GetRightPosition(item) +
                      window.innerWidth * 0.1
                    );
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
      data-scroll-section={props.animWidthText}
    >
      <div className="section-row w-full h-full flex px-[15.5vw] py-[10vh] items-center justify-center relative z-30 gap-x-[8vw]">
        <div dir="ltr" className="rabbis-title self-end mb-[3vh]">
          <h2 className="text-[160px] leading-[0.7em] text-[#C3A13F] text-right">
            ציוני
            <br />
            דרך
          </h2>
        </div>
        <div className="rabbis-timeline flex gap-x-[20vw] relative">
          {RabbisData.map((item, index) => (
            <div
              key={index}
              className="current-rubbis w-64.5 flex flex-col gap-y-[7vh]"
            >
              <div className="image w-[13.44vw] h-[32.83vh] relative overflow-hidden">
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
              <div dir="ltr" className="title mt-auto">
                <h4 className="text-[40px] leading-[0.7em] text-[#FBF4E6] text-right pt-2">
                  {parse(item.text)}
                </h4>
              </div>
            </div>
          ))}
          <div className="timeline h-2.25 w-full bg-[#C3A13F] absolute top-[36.5vh] right-0"></div>
        </div>
      </div>
    </section>
  );
}
