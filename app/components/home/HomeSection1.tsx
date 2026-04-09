"use client";
import BackgroundImage2 from "@/app/ui/BackgroundImage2";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import SimpleBar from "simplebar-react";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import WishIcon from "../../assets/icons/WishIcon";
import sectionBg from "../../assets/images/section-image.jpg";
import CardSlider from "../../ui/CardSlider";
import PostItem from "../../ui/PostItem";
import ThemeButton from "../../ui/ThemeButton";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthPost: number;
  animWidthSlider: number;
  panel: any;
}

export default function HomeSection1(props: ChildProps) {
  // Selectors
  const wrapper = useRef<HTMLElement>(null);
  // Route
  const pathname = usePathname();
  // Slider Data
  const SliderData = [
    {
      text1: `כאשר שאל מרן הסבא מסלבודקא את רבי ישראל סלנטר: מהי המטרה העיקרית שאתה רואה בייסוד מוסד קדוש זה?ענה לו רבי ישראל: <strong>"להחיות רוח שפלים ולהחיות לב נדכאים"</strong>`,
      text2: `להרים רוחם של המבקשים לגדול, לטעת בעמקי הלב כוחות חיים חדשים. וכך הניח רבי ישראל את היסוד: ישיבה איננה רק מקום לימוד, אלא בית היוצר לנשמות; מקום שבו מעוררים את השפל לרוממות, ואת הנדכא, לחיים של גדלות האדם.`,
    },
  ];
  useGSAP(() => {
    // Selectors
    const homePost = wrapper.current?.querySelector("#home-post");
    const cyclePreview = wrapper.current?.querySelector("#cycle-preview");
    // HomeSection1
    if (!homePost || !cyclePreview) return;
    gsap.set(homePost, { yPercent: 100, opacity: 0 });
    gsap.to(homePost, {
      scrollTrigger: {
        start: () => {
          return window.innerWidth * props.animWidthPost;
        },
        toggleActions: "restart pause play reverse",
      },
      duration: 1.5,
      yPercent: 0,
      opacity: 1,
      delay: 0,
      stagger: 0.02,
      ease: "expo.inOut",
    });
    gsap.set(cyclePreview, { yPercent: 100, opacity: 0 });
    gsap.to(cyclePreview, {
      scrollTrigger: {
        start: () => {
          return window.innerWidth * props.animWidthSlider;
        },
        toggleActions: "restart pause play reverse",
      },
      duration: 1.5,
      yPercent: 0,
      opacity: 1,
      delay: 0,
      stagger: 0.02,
      ease: "expo.inOut",
    });
  }, [pathname]);
  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} h-screen bg-no-repeat bg-center bg-cover flex items-center overflow-hidden relative`}
      data-scroll-section={props.animWidthPost}
    >
      <BackgroundImage2
        bgImage={sectionBg}
        panel={props.panel}
        start={props.animWidthPost}
        end={0}
      />
      <div className="section-content relative z-30 w-full h-full">
        <div
          id="cycle-preview"
          className="cycle-preview absolute left-[15%] top-1/6 transition-none"
        >
          <CardSlider SlideData={SliderData} />
        </div>
        <div
          id="home-post"
          className="post-wrapper absolute right-0 bottom-0 flex items-end gap-9 transition-none"
        >
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
            <ThemeButton
              extraClass="w-13 h-13 flex item-center justify-center"
              bgColor="bg-[#ffffff]"
              textColor="text-[#000000]"
              hoverBgColor="bg-[#C3A13F]"
              svgIcon={<WishIcon className="group-hover:stroke-[#ffffff]" />}
              svgIconClass={""}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
