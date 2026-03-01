import ArrowLeft from "@/app/assets/icons/ArrowLeft";
import WishIcon from "@/app/assets/icons/WishIcon";
import CardSlider from "@/app/ui/CardSlider";
import Image from "next/image";
import Link from "next/link";
import SimpleBar from "simplebar-react";
import "swiper/css";
import "swiper/css/effect-cards";
import sectionBg from "../../assets/images/section-image.jpg";
import { useGSAP } from "../../ui/plugins";
import PostItem from "../../ui/PostItem";

export default function HomeSection1(props: { extraClass: string }) {
  useGSAP(() => {}, []);
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
          className="cycle-preview absolute left-30 top-1/6"
        >
          <CardSlider />
        </div>
        <div
          id="home-post"
          className="post-wrapper fixed right-0 bottom-0 flex items-end gap-9"
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
