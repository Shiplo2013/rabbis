import GetRightPosition from "@/app/ui/GetRightPosition";
import TimelineCardItem from "@/app/ui/TimelineCardItem";
import VideoItem from "@/app/ui/VideoItem";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import rabbisImage1 from "../../assets/images/timeline4image1.jpg";
import rabbisImage2 from "../../assets/images/timeline4image2.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}
export default function RabbisTimeline4(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  // Section Data
  const RabbisData = [
    {
      title: `שנת תשנ"ז`,
      text: `מינוי רבי משה מרדכי פרבשטיין ורבי שלמה כץ ורבי דוד כהן לראשי ישיבה`,
      images: {
        image1: rabbisImage1,
        image2: rabbisImage2,
      },
    },
    {
      title: `שנת תשנ"ז`,
      text: `חנוכת הבית לבית המדרש החדש`,
      images: {
        image1: rabbisImage1,
        image2: rabbisImage2,
      },
    },
    {
      title: `שנת תשנ"ח`,
      text: `מינוי רבי יוסף חברוני לר"מ`,
      images: {
        image1: rabbisImage1,
        image2: rabbisImage2,
      },
    },
    {
      title: `שנת תשנ"ח`,
      text: `מינוי רבי יצחק לנדא לר"מ`,
      images: {
        image1: rabbisImage1,
        image2: rabbisImage2,
      },
    },
    {
      title: `שנת תש"ס`,
      text: `מינוי רבי יוסף חברוני לראש ישיבה`,
      images: {
        image1: rabbisImage1,
        image2: rabbisImage2,
      },
    },
    {
      title: `שנת תשס"ו`,
      text: `פטירת רבי צבי הירש פלאי שריד לדור דעה`,
      images: {
        image1: rabbisImage1,
        image2: rabbisImage2,
      },
    },
    {
      title: `שנת תש"ע`,
      text: `פטירת נשיא הישיבה רבי יצחק זאב חברוני`,
      images: {
        image1: rabbisImage1,
        image2: rabbisImage2,
      },
    },
    {
      title: `שנת תשע"א:`,
      text: `מינוי רבי חיים יצחק קפלן למשגיח`,
      images: {
        image1: rabbisImage1,
        image2: rabbisImage2,
      },
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
                    return window.innerWidth * props.animWidthText - 0.4;
                  },
                  toggleActions: "restart pause resume reverse",
                },
              });
              return splititle;
            },
          });
        }
      });
      // Selector
      const cardItems = wrapper.current?.querySelectorAll(".timeline-card");
      cardItems?.forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          x: "-10vw",
          duration: 1,
          scrollTrigger: {
            start: () => {
              return GetRightPosition(item) - window.innerWidth * 0.3;
            },
            toggleActions: "restart pause resume reverse",
          },
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
      <div className="section-row w-full h-screen flex px-[10vw] py-[10vh] items-center relative z-30 gap-x-[8vw]">
        <div className="rabbis-title self-end">
          <h2 className="text-[160px] leading-[0.7em] text-[#C3A13F]">
            ציוני
            <br />
            דרך
          </h2>
        </div>
        <div className="rabbis-timeline flex h-full items-center relative">
          <TimelineCardItem
            extraClass={"z-10"}
            animWidthText={0}
            cardClass={"bg-[#C3A13F] rotate-[7.3deg]"}
            data={RabbisData[0]}
            dataIndex={1}
          />
          <TimelineCardItem
            extraClass={"z-20 -mr-[4vw]"}
            animWidthText={0}
            cardClass={"bg-[#D4AF37] -rotate-[6.53deg]"}
            data={RabbisData[1]}
            dataIndex={2}
          />
          <TimelineCardItem
            extraClass={"z-30 -mr-[3.5vw]"}
            animWidthText={0}
            cardClass={"bg-[#D1A941] rotate-[4.61deg]"}
            data={RabbisData[2]}
            dataIndex={3}
          />
          <TimelineCardItem
            extraClass={"z-10 -mr-[2.5vw]"}
            animWidthText={0}
            cardClass={"bg-[#C3A13F] rotate-[7.3deg]"}
            data={RabbisData[3]}
            dataIndex={4}
          />
          <TimelineCardItem
            extraClass={"z-20 -mr-[4vw]"}
            animWidthText={0}
            cardClass={"bg-[#D4AF37] -rotate-[6.53deg]"}
            data={RabbisData[4]}
            dataIndex={5}
          />
          <TimelineCardItem
            extraClass={"z-20 -mr-[3vw]"}
            animWidthText={0}
            cardClass={"bg-[#D1A941] rotate-[4.61deg]"}
            data={RabbisData[5]}
            dataIndex={6}
          />
          <TimelineCardItem
            extraClass={"z-20 -mr-[3vw]"}
            animWidthText={0}
            cardClass={"bg-[#C3A13F] -rotate-[4.61deg]"}
            data={RabbisData[6]}
            dataIndex={7}
          />
          <VideoItem
            extraClass={"card-video mr-[10vw]"}
            animWidthText={props.animWidthText}
          />
          <TimelineCardItem
            extraClass={"z-20 -mr-[1vw]"}
            animWidthText={0}
            cardClass={"bg-[#D4AF37] rotate-[2.79deg]"}
            data={RabbisData[7]}
            dataIndex={8}
          />
        </div>
      </div>
    </section>
  );
}
