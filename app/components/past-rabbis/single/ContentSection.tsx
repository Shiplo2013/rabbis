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
      if (cardFolderRef.current) {
        gsap.to(cardFolderRef.current, {
          y: "-100vh",
          ease: "none",
          scrollTrigger: {
            start: () => {
              return (
                GetRightPosition(cardFolderRef.current) -
                window.innerWidth * 1.5
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
      className={`${props.extraClass} bg-[#F5F0EB] flex items-center justify-start relative z-20`}
    >
      <div className="rabbis-content-wrapper w-full h-auto flex items-center">
        <div className="rabbis-menu-wrapper w-[25vw] min-w-[25vw] overflow-hidden">
          <RabbisOptions extraClass="flex flex-col gap-y-[4vh]" />
        </div>

        {contentData?.blockquote && (
          <div className="rabbis-text1 text-[70px] leading-[75%] text-[#57717A] w-[55vw] min-w-[55vw] px-[5.4vw] py-[5vh] text-right">
            <h3>{parse(contentData?.blockquote)}</h3>
          </div>
        )}

        {contentData?.title && (
          <div className="rabbis-title text-[115px] leading-[90%] text-[#121212] font-bold w-[59vw] min-w-[59vw] px-[2vw] py-[5vh] text-center">
            <h2>{parse(contentData?.title)}</h2>
            <div
              ref={cardFolderRef}
              onClick={() => props.setActiveCardPopup?.(true)}
              className="card-folder w-76 h-auto absolute left-1/2 -translate-x-1/2 top-full cursor-pointer"
            >
              <CardFolder />
              <div className="card-folder-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45px] leading-[1em] italic text-[#000000] text-right">
                {parse(contentData?.popup_1_title || "")}
              </div>
              <div className="absolute text-[32px] leading-[1em] left-0 right-0 bottom-0 py-2 italic text-[#000000] text-center font-bold">
                לקריאה
              </div>
            </div>
          </div>
        )}

        {contentData?.content_1 && (
          <div className="rabbis-text2 w-[70vw] min-w-[70vw] px-[5.4vw] py-[5vh] text-right">
            <div className="title mb-[8vh]">
              <h5 className="text-[55px] leading-[70%] text-center text-[#D1A941]">
                {parse(contentData?.content_1?.title)}
              </h5>
            </div>
            <div className="content text-[21px] leading-[1.4em] font-medium text-[#000000] flex gap-x-[3vw]">
              <div className="text w-1/2">
                {parse(contentData?.content_1?.text_right)}
              </div>
              <div className="text w-1/2 [&>p:not(:last-child)]:mb-6">
                {parse(contentData?.content_1?.text_left)}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
