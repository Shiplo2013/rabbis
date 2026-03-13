import Image from "next/image";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipeLeft from "../assets/icons/SwipeLeft";
import SwipeRight from "../assets/icons/SwipeRight";
import RabbisThumb from "../assets/images/rabbis-thumb.jpg";
import ThemeButton from "./ThemeButton";

interface ChildProps {
  data: { buttonText: string; title: string; subtitle: string; text: string }[];
}

export default function RabbisSlider(props: ChildProps) {
  const swiperRef = useRef<SwiperRef>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  // Update button states on every slide change
  const handleSlideChange = (s: any) => {
    setIsBeginning(s.isBeginning);
    setIsEnd(s.isEnd);
  };
  return (
    <div className="relative flex flex-col gap-5">
      <Swiper
        className="w-full"
        ref={swiperRef}
        slidesPerView={1}
        onSlideChange={handleSlideChange}
        modules={[Pagination]}
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          // You can also use renderBullet for complete control over the bullet's HTML
          renderBullet: function (index, className) {
            return `<span class="${className}"><span class="pointer"></span></span>`;
          },
        }}
      >
        {props?.data?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="rabbis-wrapper relative min-w-140 flex flex-col items-center justify-center">
                <div className="rabbis-thumb w-91.75 h-93.5 relative z-10">
                  <Image
                    className="w-full object-cover object-center h-full"
                    src={RabbisThumb.src}
                    width={"367"}
                    height={"374"}
                    alt="Rabbis Thumb"
                    blurDataURL={RabbisThumb?.blurDataURL}
                    placeholder={"blur"}
                    loading="lazy"
                  />
                </div>
                <div className="rabbis-content w-full flex flex-col items-center justify-center gap-y-5 relative z-20 -mt-8">
                  <ThemeButton
                    extraClass="rounded-none px-5.5 py-3 max-w-35"
                    text="הרחב קריאה"
                    bgColor="bg-[#D1A941]"
                    textColor="text-[#000000]"
                    hoverBgColor="bg-[#ffffff]"
                    fontSize="text-[19px]"
                  />
                  <div className="content leading-[1em] text-[#D1A941] flex justify-center flex-col items-center gap-y-3">
                    <h3 className="text-[33px] ">רבי נתן צבי פינקל</h3>
                    <h5 className="text-[20px]">
                      שימש בישיבה: תר"מ - כ"ט שבט תרפ"ז
                    </h5>
                  </div>
                </div>
                <div className="text-[20px] text-[#D1A941] text-center absolute top-[27%] z-30">
                  <p>
                    מייסד וראש הישיבה. מראשי תנועת המוסר ידוע בכינויו הסבא
                    מסלבודקה.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="swiper-navigation relative h-27 w-full flex items-center justify-center">
        <div className="custom-pagination flex items-center justify-center gap-5"></div>
        <button
          style={{
            backgroundImage: `linear-gradient(to top, #C3A13F, #5D4D1E)`,
          }}
          className="group absolute left-0 bottom-0 z-40 rounded-full cursor-pointer overflow-hidden disabled:opacity-50 transition-opacity duration-300 p-px w-27 h-27"
          disabled={isBeginning}
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          <div className="w-full h-full flex items-center justify-center bg-[#202325] rounded-full overflow-hidden relative">
            <span className="btn-bg absolute z-10 left-0 top-0 w-full h-full bg-[#000000] translate-y-full transition-transform duration-300 group-hover:translate-y-0 ease-[cubic-bezier(0.625,0.05,0,1)]"></span>
            <div className="group-hover:rotate-x-180 transition-transform duration-300 relative z-30">
              <SwipeLeft />
            </div>
          </div>
        </button>
        <button
          style={{
            backgroundImage: `linear-gradient(to top, #C3A13F, #5D4D1E)`,
          }}
          className="group absolute right-0 bottom-0 z-40 rounded-full cursor-pointer overflow-hidden disabled:opacity-50 transition-opacity duration-300 p-px w-27 h-27"
          disabled={isEnd}
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <div className="w-full h-full flex items-center justify-center bg-[#202325] rounded-full overflow-hidden relative">
            <span className="btn-bg absolute z-10 left-0 top-0 w-full h-full bg-[#000000] translate-y-full transition-transform duration-300 group-hover:translate-y-0 ease-[cubic-bezier(0.625,0.05,0,1)]"></span>
            <div className="group-hover:rotate-x-180 transition-transform duration-300 relative z-30">
              <SwipeRight />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
