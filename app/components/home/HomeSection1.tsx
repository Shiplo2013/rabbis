"use client";
import Image from "next/image";
import SimpleBar from "simplebar-react";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import WishIcon from "../../assets/icons/WishIcon";
import sectionBg from "../../assets/images/section-image.jpg";
import CardSlider from "../../ui/CardSlider";
import PostItem from "../../ui/PostItem";
import ThemeButton from "../../ui/ThemeButton";
import { gsap, useGSAP } from "../../ui/plugins";

interface ChildProps {
  extraClass: string;
  animWidthPost: number;
  animWidthSlider: number;
}

export default function HomeSection1(props: ChildProps) {
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
        <div
          id="cycle-preview"
          className="cycle-preview absolute left-[15%] top-1/6"
        >
          <CardSlider />
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
