import ArrowLeft from "@/app/assets/icons/ArrowLeft";
import CycleArrow from "@/app/assets/icons/CycleArrow";
import WishIcon from "@/app/assets/icons/WishIcon";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import SimpleBar from "simplebar-react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import sectionBg from "../../assets/images/section-image.jpg";
import PostItem from "../../ui/PostItem";

export default function HomeSection1(props: { extraClass: string }) {
  const sliderRef = useRef<SwiperRef>(null);
  const handleNextSlide = () => {
    if (sliderRef.current?.swiper && !sliderRef.current.swiper.isEnd) {
      sliderRef.current.swiper.slideNext();
    } else {
      sliderRef.current?.swiper.slideTo(0);
    }
  };
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} h-screen bg-no-repeat bg-center bg-cover flex items-center overflow-hidden relative`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10">
        <Image
          src={sectionBg.src}
          width="1920"
          height="1080"
          blurDataURL={sectionBg?.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Section Background"
        />
      </div>
      <div className="section-content relative z-30 w-full h-full">
        <div className="cycle-preview absolute left-30 top-1/6">
          <div className="arrow-slider w-117 relative z-10">
            <Swiper
              ref={sliderRef}
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="card-slider text-[#000000] text-[20px]"
            >
              <SwiperSlide>
                <div className="slide-content py-12 px-7 bg-white">
                  <span className="absolute left-5 top-3">1/2</span>
                  <p className="font-bold">
                    כאשר שאל מרן הסבא מסלבודקא את רבי ישראל סלנטר: מהי המטרה
                    העיקרית שאתה רואה בייסוד מוסד קדוש זה?ענה לו רבי ישראל:
                    "להחיות רוח שפלים ולהחיות לב נדכאים"
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="slide-content py-12 px-7 bg-white text-[#000000]">
                  <span className="absolute left-5 top-3">2/2</span>
                  <p className="font-bold">
                    להרים רוחם של המבקשים לגדול, לטעת בעמקי הלב כוחות חיים
                    חדשים. וכך הניח רבי ישראל את היסוד: ישיבה איננה רק מקום
                    לימוד, אלא בית היוצר לנשמות; מקום שבו מעוררים את השפל
                    לרוממות, ואת הנדכא, לחיים של גדלות האדם.
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="arrow-button absolute left-1/5 bottom-0 z-30">
            <button
              onClick={handleNextSlide}
              className="w-27 h-27 rounded-full bg-[#C3A13F] flex items-center justify-center hover:bg-[#c59811] transition-colors cursor-pointer translate-y-1/2"
            >
              <CycleArrow />
            </button>
          </div>
        </div>
        <div className="post-wrapper fixed right-0 bottom-0 flex items-end gap-9">
          <div className="post-grid bg-[#F1EADA] text-[#C3A13F] p-11 max-h-100 relative">
            <button className="absolute top-5 left-5 w-4 cursor-pointer">
              <ArrowLeft extraClass="fill-[#C3A13F]" />
            </button>
            <div className="grid-items w-67 h-full">
              <SimpleBar
                style={{ maxHeight: 310, paddingRight: 30, marginRight: -30 }}
                autoHide={false}
              >
                <PostItem
                  title={"מזל טוב לרב אשר שוורץ להולדת הנכדה"}
                  content={"בוגר מחזור כ״ה "}
                  subtitle={"י״ג בחשוון תשפ״ו"}
                  buttonLabel={"קהילת בני ברק"}
                  buttonColor={"bg-[#C3A13F] hover:bg-[#c59811]"}
                />
                <PostItem
                  title={"מזל טוב לרב אשר שוורץ להולדת הנכדה"}
                  content={"בוגר מחזור כ״ה "}
                  subtitle={"י״ג בחשוון תשפ״ו"}
                  buttonLabel={"קהילת בני ברק"}
                  buttonColor={"bg-[#5A7C4E] hover:bg-[#2b6018]"}
                />
                <PostItem
                  title={"מזל טוב לרב אשר שוורץ להולדת הנכדה"}
                  content={"בוגר מחזור כ״ה "}
                  subtitle={"י״ג בחשוון תשפ״ו"}
                  buttonLabel={"קהילת בני ברק"}
                  buttonColor={"bg-[#C3A13F] hover:bg-[#c59811]"}
                />
                <PostItem
                  title={"מזל טוב לרב אשר שוורץ להולדת הנכדה"}
                  content={"בוגר מחזור כ״ה "}
                  subtitle={"י״ג בחשוון תשפ״ו"}
                  buttonLabel={"קהילת בני ברק"}
                  buttonColor={"bg-[#5A7C4E] hover:bg-[#2b6018]"}
                />
              </SimpleBar>
            </div>
          </div>
          <div className="wish-icon py-5">
            <Link
              className="group bg-white w-13 h-13 rounded-full flex justify-center items-center hover:bg-[#C3A13F] transition-colors"
              href="/"
            >
              <WishIcon className="group-hover:stroke-[#ffffff]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
