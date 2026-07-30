import CardFolder from "@/app/assets/icons/CardFolder";
import GetRightPosition from "@/app/ui/GetRightPosition";
import RabbisOptions from "@/app/ui/past-rabbis/RabbisOptions";
import parse from "html-react-parser";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, useGSAP } from "../../../ui/plugins";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: any;
  setActiveCardPopup?: (value: boolean) => void;
}

export default function ContentSection(props: ChildProps) {
  // Selector
  const contentData = props.data;
  const wrapper = useRef<HTMLDivElement>(null);
  const cardFolderRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Animation
  useGSAP(
    () => {
      // Card Folder
      if (cardFolderRef.current && window.innerWidth > 1024) {
        gsap.to(cardFolderRef.current, {
          y: "-100vh",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return (
                GetRightPosition(cardFolderRef.current) -
                window.innerWidth * 1.2
              );
            },
            end: () => {
              return "+=" + window.innerWidth * 2;
            },
            scrub: 2,
          },
        });
      } else if (cardFolderRef.current && window.innerWidth <= 1024) {
        const cardTitle = wrapper.current?.querySelector(".rabbis-title");
        gsap.to(cardFolderRef.current, {
          y: "-100vh",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return (
                (cardTitle?.getBoundingClientRect().top || 0) +
                window.scrollY -
                window.innerHeight * 1
              );
            },
            end: () => {
              return "+=" + window.innerWidth * 2;
            },
            scrub: 2,
          },
        });
      }
    },
    { scope: wrapper, dependencies: [pathname] },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} bg-[#F5F0EB] flex items-center justify-start relative z-20 `}
    >
      <div className="rabbis-content-wrapper w-full h-auto flex items-center flex-col lg:flex-row gap-y-15">
        <div className="rabbis-menu-wrapper w-full lg:w-[25vw] min-w-[25vw] overflow-hidden">
          <RabbisOptions extraClass="flex flex-col sm:flex-row lg:flex-col gap-x-[4vw] gap-y-5 lg:gap-y-[4vh]" />
        </div>

        {contentData?.blockquote && (
          <div className="rabbis-text1 text-[32px] sm:text-[40px] lg:text-[55px] leading-[0.9em] lg:leading-[75%] text-[#57717A] lg:w-[55vw] min-w-[55vw] lg:px-[5.4vw] sm:py-[5vh] text-right">
            <h3>{parse(contentData?.blockquote)}</h3>
          </div>
        )}

        {contentData?.title && (
          <div className="rabbis-title text-[50px] sm:text-[80px] lg:text-[115px] leading-[90%] text-[#121212] font-bold lg:w-[59vw] min-w-[59vw] lg:px-[2vw] py-[5vh] text-center relative">
            <h2>{parse(contentData?.title)}</h2>
            <div
              ref={cardFolderRef}
              onClick={() => props.setActiveCardPopup?.(true)}
              className="card-folder w-35 sm:w-50 lg:w-76 h-auto absolute left-1/2 -translate-x-1/2 top-full cursor-pointer"
            >
              <CardFolder />
              <div className="card-folder-text w-[70%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] sm:text-[25px] lg:text-[45px] leading-[1em] italic text-[#000000] text-right">
                {parse(contentData?.popup_1_title || "")}
              </div>
              <div className="absolute text-[14px] sm:text-[20px] lg:text-[32px] leading-[1em] left-0 right-0 bottom-0 py-2 italic text-[#000000] text-center font-bold">
                לקריאה
              </div>
            </div>
          </div>
        )}

        {contentData?.content_1 && (
          <div className="rabbis-text2 w-full lg:w-[70vw] min-w-[70vw] lg:px-[5.4vw] sm:py-[5vh] text-right">
            <div className="title mb-6 sm:mb-10 lg:mb-[8vh]">
              <h5 className="text-[32px] sm:text-[40px] lg:text-[55px] leading-[70%] sm:text-center text-[#D1A941]">
                {parse(contentData?.content_1?.title)}
              </h5>
            </div>
            <div className="content text-[16px] sm:text-[18px] lg:text-[21px] leading-[1.4em] font-medium text-[#000000] flex gap-x-[3vw] gap-y-10 flex-col lg:flex-row [&>div>p:not(:last-child)]:mb-4">
              <div className="text w-full lg:w-1/2">
                {parse(contentData?.content_1?.text_right)}
              </div>
              <div className="text w-full lg:w-1/2">
                {parse(contentData?.content_1?.text_left)}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
