import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";

import ArrowLeft2 from "@/app/assets/icons/ArrowLeft2";
import ArrowRight from "@/app/assets/icons/ArrowRight";
import CommunityGalleryImage from "@/app/ui/community/CommunityGalleryImage";
import { useRef } from "react";

interface ChildProps {
  index: number;
  data: any;
}

export default function GallerySlider(props: ChildProps) {
  const galleryRef = useRef<SwiperRef>(null);
  return (
    <div
      key={props.index}
      className="gallery not-first:mt-12 w-full max-w-xl h-auto group relative"
    >
      <Swiper
        className="w-full max-h-144 relative z-10"
        ref={galleryRef}
        slidesPerView={1}
        loop={true}
      >
        {props.data &&
          props.data?.map((galleryItem: any, galleryIndex: number) => (
            <SwiperSlide
              key={galleryIndex}
              className={`gallery-item w-xl max-w-full h-auto relative`}
            >
              <CommunityGalleryImage item={galleryItem} />
              {galleryItem?.caption && (
                <div className="caption w-full bg-black bg-opacity-50 text-white p-3 text-[18px] text-center font-bold">
                  <p>{galleryItem.caption}</p>
                </div>
              )}
            </SwiperSlide>
          ))}
      </Swiper>
      <button
        onClick={() => galleryRef.current?.swiper.slidePrev()}
        className="w-10 h-10 rounded-full p-3 bg-black opacity-40 hover:opacity-100 transition-opacity duration-300 absolute top-[50%] right-3 z-50 transform -translate-y-[50%] flex items-center justify-center cursor-pointer"
      >
        <ArrowRight />
      </button>
      <button
        onClick={() => galleryRef.current?.swiper.slideNext()}
        className="w-10 h-10 rounded-full p-3 bg-black opacity-40 hover:opacity-100 transition-opacity duration-300 absolute top-[50%] left-3 z-50 transform -translate-y-[50%] flex items-center justify-center cursor-pointer"
      >
        <ArrowLeft2 />
      </button>
    </div>
  );
}
