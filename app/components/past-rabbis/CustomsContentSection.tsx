import ThemeButton from "@/app/ui/ThemeButton";
import Image from "next/image";
import { useState } from "react";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: string;
}

export default function CustomsContentSection(props: ChildProps) {
  const [sectionData, setSectionData] = useState<any>(JSON.parse(props.data));

  return (
    <section
      dir="rtl"
      className={`${props.extraClass} rabbis-section bg-black flex items-center relative z-20`}
    >
      <div className="rabbis-wrapper w-full h-full flex gap-x-[10vw]">
        {sectionData.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={`rabbis-item w-[58.4vw] min-w-[58.4vw] h-full flex items-center justify-center gap-x-[3.3vw] will-change-transform`}
            >
              <div className="rabbis-image w-[27.1vw] relative">
                <div className="image w-full h-[57.2vh] relative">
                  <Image
                    className="w-full h-full object-cover object-center"
                    src={item?.image?.src}
                    width={522}
                    height={532}
                    alt={`Rabbis Image ${index + 1}`}
                    blurDataURL={item?.image?.blurDataURL}
                    placeholder="blur"
                    loading="lazy"
                  />
                </div>
                <div className="read-more absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-30">
                  <ThemeButton
                    extraClass="rounded-none py-5 px-10 items-center leading-[80%]"
                    text="הרחב קריאה"
                    textColor="text-black"
                    hoverBgColor="bg-[#111111]"
                    hoverTextColor="group-hover:text-white"
                    bgColor="bg-[#C3A13F]"
                    fontSize="text-[28px]"
                    svgIconClass=""
                    buttonLink={item?.link}
                  />
                </div>
              </div>
              <div className="rabbis-content w-[28vw] text-[#D1A941]">
                <h2 className="text-[55px] leading-[0.7em] overflow-hidden relative">
                  {item.title}
                </h2>
                <div className="content text-[33px] leading-[1em] mt-5 relative">
                  {item.excerpt}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
