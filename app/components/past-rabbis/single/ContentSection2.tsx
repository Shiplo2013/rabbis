import CardFolder from "@/app/assets/icons/CardFolder";
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
      gsap.set(cardFolderRef.current, {
        x: "100vw",
      });
      if (cardFolderRef.current && window.innerWidth > 1024) {
        gsap.to(cardFolderRef.current, {
          x: "-100vw",
          ease: "none",
          scrollTrigger: {
            start: "top top",
            end: () => {
              return "+=" + window.innerHeight * 2.5;
            },
            scrub: 2,
          },
        });
      } else if (cardFolderRef.current && window.innerWidth <= 1024) {
        gsap.to(cardFolderRef.current, {
          x: "-100vw",
          ease: "none",
          scrollTrigger: {
            start: "top top",
            end: () => {
              return "+=" + window.innerHeight * 2.5;
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
      className={`${props.extraClass} bg-[#F5F0EB] relative z-20 `}
    >
      <div className="rabbis-content-wrapper w-full h-auto">
        <div className="section w-full flex justify-center">
          <div className="wrapper w-full lg:w-[80%] max-w-282.5 lg:flex justify-between">
            <div className="rabbis-menu-wrapper w-full lg:w-[35%] min-w-[35%] overflow-hidden mb-[5vh] lg:mb-0">
              <RabbisOptions
                extraClass="flex flex-col sm:flex-row lg:flex-col gap-x-[4vw] gap-y-5 lg:gap-y-[4vh]"
                postId={contentData?.post_id}
              />
            </div>

            {contentData?.blockquote && (
              <div className="rabbis-text1 text-[32px] sm:text-[40px] lg:text-[55px] leading-[1em] lg:leading-[75%] text-[#57717A] lg:w-[60%] min-w-[60%] text-right">
                <h3 className="leading-[0.8em]">
                  {parse(contentData?.blockquote)}
                </h3>
              </div>
            )}
          </div>
        </div>
        <div className="section w-full flex justify-center">
          <div className="wrapper w-full lg:w-[80%] max-w-282.5 lg:flex justify-between">
            {contentData?.title && (
              <div className="rabbis-title text-[50px] sm:text-[80px] lg:text-[115px] leading-[90%] text-[#121212] font-bold lg:w-full min-w-full lg:px-[2vw] py-[10vh] text-center relative min-h-[50vh]">
                <h2 className="opacity-0 invisible hidden">
                  {parse(contentData?.title)}
                </h2>
                <div
                  ref={cardFolderRef}
                  onClick={() => props.setActiveCardPopup?.(true)}
                  className="card-folder w-35 sm:w-50 lg:w-76 h-auto cursor-pointer"
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
          </div>
        </div>
        <div className="section w-full flex justify-center">
          <div className="wrapper w-full lg:w-[80%] max-w-282.5 lg:flex justify-between">
            {contentData?.content_1 && (
              <div className="rabbis-text2 w-full text-right">
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
        </div>
      </div>
    </section>
  );
}
