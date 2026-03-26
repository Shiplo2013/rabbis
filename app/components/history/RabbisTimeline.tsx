import ParallaxBackground from "@/app/ui/ParallaxBackground";
import { useGSAP } from "@gsap/react";
import parse from "html-react-parser";
import Image from "next/image";
import { useRef } from "react";
import rabbisImage1 from "../../assets/images/rabbis-timeline1.jpg";
import rabbisImage2 from "../../assets/images/rabbis-timeline2.jpg";
import rabbisImage3 from "../../assets/images/rabbis-timeline3.jpg";
import rabbisImage4 from "../../assets/images/rabbis-timeline4.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
}
export default function RabbisTimeline(props: ChildProps) {
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
      document.fonts.ready.then(() => {
        // Section text
        // gsap.utils.toArray(
        // );
        // gsap.set(titleRef.current, { opacity: 1 });
        // let splititle;
        // SplitText.create(titleRef.current, {
        //   type: "lines",
        //   linesClass: "line direction-rtl",
        //   autoSplit: true,
        //   mask: "lines",
        //   onSplit: (self) => {
        //     splititle = gsap.from(self.lines, {
        //       duration: 0.7,
        //       yPercent: 100,
        //       opacity: 0,
        //       stagger: 0.05,
        //       ease: "expo.out",
        //       scrollTrigger: {
        //         start: () => {
        //           return window.innerWidth * props.animWidthText;
        //         },
        //       },
        //     });
        //     return splititle;
        //   },
        // });
      });
    },
    { scope: wrapper },
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
            <div key={index} className="w-64.5 flex flex-col gap-y-[5.5vh]">
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
              <div className="title mt-auto">
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
