"use client";
import SimpleBar from "simplebar-react";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import WishIcon from "../../assets/icons/WishIcon";
import sectionBg from "../../assets/images/section-image.jpg";
import BackgroundImage2 from "../../ui/BackgroundImage2";
import CardSlider from "../../ui/CardSlider";
import PostItem from "../../ui/PostItem";
import ThemeButton from "../../ui/ThemeButton";
import { gsap, useGSAP } from "../../ui/plugins";

interface ChildProps {
  extraClass: string;
  animWidthPost: number;
  animWidthSlider: number;
  panel: any;
}

export default function HomeSection1(props: ChildProps) {
  // Slider Data
  const SliderData = [
    {
      text1: `כאשר שאל מרן הסבא מסלבודקא את רבי ישראל סלנטר: מהי המטרה העיקרית שאתה רואה בייסוד מוסד קדוש זה?ענה לו רבי ישראל: <strong>"להחיות רוח שפלים ולהחיות לב נדכאים"</strong>`,
      text2: `להרים רוחם של המבקשים לגדול, לטעת בעמקי הלב כוחות חיים חדשים. וכך הניח רבי ישראל את היסוד: ישיבה איננה רק מקום לימוד, אלא בית היוצר לנשמות; מקום שבו מעוררים את השפל לרוממות, ואת הנדכא, לחיים של גדלות האדם.`,
    },
  ];
  useGSAP(() => {
    // HomeSection1
    gsap.set("#home-post", { yPercent: 100, opacity: 0 });
    gsap.set("#cycle-preview", { yPercent: 100, opacity: 0 });
    gsap.to("#home-post", {
      scrollTrigger: {
        start: () => {
          return window.innerWidth * props.animWidthPost;
        },
      },
      duration: 0.5,
      yPercent: 0,
      opacity: 1,
      //rotationX: 180,
      transformOrigin: "0% 50%",
      ease: "slow.inOut",
    });
    gsap.to("#cycle-preview", {
      scrollTrigger: {
        start: () => {
          return window.innerWidth * props.animWidthSlider;
        },
      },
      duration: 0.6,
      yPercent: 0,
      opacity: 1,
      //rotationX: 180,
      transformOrigin: "0% 50%",
      ease: "slow.inOut",
    });
  }, []);
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} h-screen bg-no-repeat bg-center bg-cover flex items-center overflow-hidden relative`}
    >
      <BackgroundImage2
        bgImage={sectionBg}
        start={0}
        end={1.5}
        panel={props.panel}
      />
      <div className="section-content relative z-30 w-full h-full">
        <div
          id="cycle-preview"
          className="cycle-preview absolute left-[15%] top-1/6"
        >
          <CardSlider SliderData={SliderData} />
        </div>
        <div
          id="home-post"
          className="post-wrapper absolute right-0 bottom-0 flex items-end gap-9"
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
            />
          </div>
        </div>
      </div>
    </section>
  );
}
