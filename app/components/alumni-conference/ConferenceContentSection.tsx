import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import parse from "html-react-parser";
import Image from "next/image";
import { useRef } from "react";
import contentBg from "../../assets/images/text-frame.png";

interface SingleCyclePictureData {
  gallery: any;
  sectionText: string;
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: SingleCyclePictureData;
}

export default function ConferenceContentSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Section Data
  const SectionData = props?.sectionData;
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-x-[9.89vw]">
        <div className="conference-content min-w-[42.5vw] w-[42.5vw] h-full will-change-transform overflow-hidden relative">
          <div className="content-bg relative z-10">
            <Image
              className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
              src={contentBg?.src}
              width="816"
              height="598"
              blurDataURL={contentBg?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt="Graduates"
            />
          </div>
          <div
            dir="ltr"
            className="conference-content-wrapper absolute top-0 left-0 w-full h-full z-30 2xl:text-[21px] xl:text-[18px] sm:text-[16px] text-black leading-[1.3em] px-[6.25vw] py-[12.9vh] flex flex-col gap-y-[3vh] text-right"
          >
            {parse(SectionData?.sectionText || "")}
          </div>
        </div>
        <div className="conference-gallery flex items-center will-change-transform">
          {SectionData?.gallery?.map((item: any, index: number) => {
            if (item.size === "landscape") {
              return (
                <div
                  key={index}
                  className="single-gallery will-change-transform w-[39.4vw] h-[47.25vh] overflow-hidden"
                >
                  <div
                    className={`single-gallery-image w-[50vw] h-[70vh] absolute top-1/2 left-1/2 -translate-[50%]`}
                  >
                    <Image
                      className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
                      src={item?.image?.sizes?.large || item?.image?.src}
                      width={
                        window.innerWidth > 1920
                          ? item?.image?.sizes?.large?.width ||
                            item?.image?.width
                          : "1920"
                      }
                      height={
                        window.innerHeight > 1080
                          ? item?.image?.sizes?.large?.height ||
                            item?.image?.height
                          : "1080"
                      }
                      blurDataURL={
                        CreateShimmerDataUrl(1920, 1080) ||
                        item?.image?.blurDataURL
                      }
                      placeholder={"blur"}
                      loading="lazy"
                      alt="Gallery Image"
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  className="single-gallery will-change-transform w-[26.56vw] h-[81.48vh] overflow-hidden"
                >
                  <div
                    className={`single-gallery-image w-[60vw] h-[85vh] absolute top-1/2 left-1/2 -translate-[50%]`}
                  >
                    <Image
                      className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
                      src={item?.image?.sizes?.large || item?.image?.src}
                      width={
                        window.innerWidth > 1920
                          ? item?.image?.sizes?.large?.width ||
                            item?.image?.width
                          : "1920"
                      }
                      height={
                        window.innerHeight > 1080
                          ? item?.image?.sizes?.large?.height ||
                            item?.image?.height
                          : "1080"
                      }
                      blurDataURL={
                        CreateShimmerDataUrl(1920, 1080) ||
                        item?.image?.blurDataURL
                      }
                      placeholder={"blur"}
                      loading="lazy"
                      alt="Gallery Image"
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
