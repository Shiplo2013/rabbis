import { useRef } from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { gsap } from "../ui/plugins";

export default function ArrowSlider() {
  const sliderRef = useRef<SwiperRef>(null);
  const handleNextSlide = () => {
    if (sliderRef.current?.swiper && !sliderRef.current.swiper.isEnd) {
      sliderRef.current.swiper.slideNext();
    } else {
      sliderRef.current?.swiper.slideTo(0);
    }
  };
  // Cursor Follower Function
  function moveCircle(e: { screenY: number; clientX: any; clientY: any }) {
    const yskale = -(e.screenY / 100) * 1;
    //console.log(e.clientX, e.clientY)
    gsap.to(".arrow-button", {
      x: e.clientX,
      y: e.clientY,
      delay: 0,
      duration: 0.1,
    });
  }
  return (
    <>
      <div
        onClick={handleNextSlide}
        onMouseMove={(e) => {
          moveCircle(e);
        }}
        onMouseEnter={() => {
          gsap.to(".arrow-button", {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            delay: 0,
          });
        }}
        onMouseLeave={() => {
          gsap.to(".arrow-button", {
            opacity: 0,
            scale: 0.8,
            duration: 0.2,
            delay: 0,
          });
        }}
        className="arrow-slider w-117 relative z-10 cursor-none"
      >
        <Swiper
          ref={sliderRef}
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="card-slider text-[#000000] text-[20px] cursor-none"
        >
          <SwiperSlide className="py-12 px-7 bg-[#F1EADA] active:bg-[#E2D7C3]">
            <div className="slide-content">
              <span className="absolute left-5 top-3">1/2</span>
              <p className="font-bold">
                כאשר שאל מרן הסבא מסלבודקא את רבי ישראל סלנטר: מהי המטרה העיקרית
                שאתה רואה בייסוד מוסד קדוש זה?ענה לו רבי ישראל:
                <strong>"להחיות רוח שפלים ולהחיות לב נדכאים"</strong>
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-content py-12 px-7 bg-[#F1EADA] active:bg-[#E2D7C3]">
              <span className="absolute left-5 top-3">2/2</span>
              <p className="font-bold">
                להרים רוחם של המבקשים לגדול, לטעת בעמקי הלב כוחות חיים חדשים.
                וכך הניח רבי ישראל את היסוד: ישיבה איננה רק מקום לימוד, אלא בית
                היוצר לנשמות; מקום שבו מעוררים את השפל לרוממות, ואת הנדכא, לחיים
                של גדלות האדם.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
