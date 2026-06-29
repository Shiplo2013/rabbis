import MinusIcon from "@/app/assets/icons/MinusIcon";
import BackgroundImageContain from "@/app/ui/BackgroundImageContain";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import GetRightPosition from "@/app/ui/GetRightPosition";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { RefObject, useRef } from "react";
import PlayIcon from "../../assets/icons/PlayIcon";
import videoThumb from "../../assets/images/evidence-video-thumb.jpg";
import evidanceBG from "../../assets/images/evidenceBG.png";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  panel?: RefObject<HTMLDivElement | null>;
  videoControl: any;
  data: any;
}

export default function EvidenceOfPeriod(props: ChildProps) {
  // Navigation
  const pathname = usePathname();
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  // Section Ref
  const timeline = props.panel;
  // Get Offset Top of Timeline
  const getTimelineOffset = () => {
    return timeline?.current ? timeline.current.offsetTop : 0;
  };

  // Section Data
  const sectionData = {
    video: {
      image: props?.data?.video_popup?.thumbnail || videoThumb,
      title: props?.data?.video_popup?.title || `עדות על התקופה`,
    },
    content: {
      text1:
        props?.data?.content_1 ||
        `כאשר נדמה היה שישיבת סלבודקא תשב לבטח, קפצה עליה רעת גזירת הגיוס הליטאית. במהלך שנת תרפ"ד ריחפה עננת הגיוס מעל ראשי בחורי הישיבה, והאיום להילקח אל מחנות הצבא הליטאי היה ממשי ומטלטל. לנוכח זאת, גמלה בלב ראשי הישיבה ההכרעה לעלות אל ארץ הקודש, להתעלות באווירא דארץ ישראל המחכים ולייסד בה מחדש את משכן התורה.<br/>לשליחות רבת האחריות נבחר רבי יחזקאל סרנא, שיצא לחפש מקום הראוי להקים בו את המשך ישיבת סלבודקא ברוח קדושתה.<br/>בין ערי הארץ בלטה בעיניו חברון  עיר האבות, בעומקה ההיסטורי וברוחניותה הצלולה כמתאימה ביותר למשימה זו.`,
      text2:
        props?.data?.content_2 ||
        `ואכן, בחודש אלול תרפ"ד, עלה מניין מבחורי הישיבה מדליטא אל אדמת הקודש, ופתחו פרק חדש ומפואר בתולדות הישיבה הק' – תקופת חברון.<br/>במהלך שנת תרפ"ה הצטרפו אל הישיבה בחברון מרנן הסבא מסלבודקא ורבי משה מרדכי אפשטיין שהעפילו לפסגות חדשות של הרבצת תורה ומוסר בין כפירי אריות חברים מקשיבים לקולם המוסיפים חיל בלימודם תוך שאיפה מתמדת לעלות עוד ועוד במעלות התורה והיראה`,
    },
  };

  // Section animation
  useGSAP(
    () => {
      const animations: gsap.core.Animation[] = [];
      if (typeof window === "undefined" || !wrapper.current) {
        return;
      }
      // Selector
      const video = wrapper.current?.querySelector(".video");
      // Video Icon
      if (video) {
        gsap.set(video, {
          yPercent: 100,
          opacity: 0,
        });
        const videoAnimation = gsap.to(video, {
          duration: 1.5,
          yPercent: 0,
          opacity: 1,
          ease: "expo.inOut",
          scrollTrigger: {
            start: () => {
              return (
                getTimelineOffset() +
                GetRightPosition(video) -
                window.innerWidth / 2
              );
            },
            toggleActions: "restart pause play reverse",
          },
        });
        animations.push(videoAnimation);
      }
      // Text Aniamtions
      const textContents = wrapper.current?.querySelectorAll(".content-text");
      textContents?.forEach((item) => {
        // Text Content
        document.fonts.ready.then(() => {
          // Section Title 1
          gsap.set(item, { opacity: 1 });
          let splititle;
          SplitText.create(item, {
            type: "lines",
            linesClass: "line direction-rtl",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
              splititle = gsap.from(self.lines, {
                duration: 2,
                yPercent: 100,
                opacity: 0,
                stagger: 0.05,
                delay: -0.5,
                ease: "expo.inOut",
                scrollTrigger: {
                  start: () => {
                    return (
                      getTimelineOffset() +
                      GetRightPosition(item) -
                      window.innerWidth / 2
                    );
                  },
                  toggleActions: "restart pause play reverse",
                },
              });
              animations.push(splititle);
              return splititle;
            },
          });
        });
      });

      // Cleanup function
      return () => {
        animations.forEach((animation) => animation.kill());
      };
    },
    { scope: wrapper, dependencies: [pathname, props.data] },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
      data-scroll-section={props.animWidthText}
    >
      <div className="evidence-wrapper w-full h-full pr-[6vw] py-[7vh] flex">
        <div className="section-content flex gap-x-[2.4vw]">
          <div className="video relative flex flex-col gap-y-[3vh] w-66.5 h-66.5">
            <div
              className="video-popup-button thumb p-5 bg-[#d9d9d9d5] rounded-full cursor-pointer relative"
              onClick={() => props.videoControl(true)}
            >
              <div className="image rounded-full overflow-hidden select-none pointer-events-none border-12 border-[#c3a13f69]">
                <Image
                  className={`w-full object-cover h-full relative z-10`}
                  src={
                    sectionData?.video?.image?.sizes?.testimonial_thumb ||
                    sectionData?.video?.image?.src
                  }
                  width={`202`}
                  height={`202`}
                  blurDataURL={
                    CreateShimmerDataUrl(202, 202) ||
                    sectionData?.video?.image?.blurDataURL
                  }
                  placeholder={"blur"}
                  loading="lazy"
                  alt="Video Thumbnail"
                />
              </div>
              <div className="minus-icon absolute top-0 right-0 w-11.75 h-11.75 bg-[#D1C39C] flex items-center justify-center rounded-full ">
                <MinusIcon />
              </div>
              <div className="play-icon absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 ml-3">
                <PlayIcon />
              </div>
            </div>
            <h3 className="text-[36px] text-(--theme-color) leading-[0.7em] flex justify-center font-bold">
              <span className="max-w-30">
                {parse(sectionData?.video?.title)}
              </span>
            </h3>
          </div>
          <div className="content w-[66vw] flex items-center relative px-[4.35vw]">
            <div className="content-bg absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full select-none pointer-events-none">
              {/* <ImageRevealWithoutParallaxBG2
                bgImage={evidanceBG}
                overlayLeft={false}
                overlayLeftColor={""}
                animatePosition={props.animWidthText - 0.7}
                panel={props.panel}
              /> */}
              <BackgroundImageContain bgImage={evidanceBG} overlayClass={""} />
            </div>
            <div
              dir="ltr"
              className="flex gap-x-[6.66vw] relative z-30 text-[21px] leading-[1.4] text-[#000000] text-right"
            >
              <div className="content-text content-left w-[40%]">
                {parse(sectionData?.content?.text2)}
              </div>

              <div className="content-text content-right w-[60%]">
                {parse(sectionData?.content?.text1)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
