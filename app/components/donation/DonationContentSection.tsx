"use client";
import BigSectionBackground from "@/app/ui/BigSectionBackground";
import DonationVideo from "@/app/ui/DonationVideo";
import ThemeButton from "@/app/ui/ThemeButton";
import parse from "html-react-parser";
import { StaticImageData } from "next/image";
import bgImage from "../../assets/images/donation-content-bg.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: {
    video1: {
      poster: StaticImageData;
      link: string;
    };
    content1: string;
    content2: string;
    video2: {
      poster: StaticImageData;
      link: string;
    };
    content3: {
      title: string;
      text: string;
    };
  };
}

export default function DonationContentSection(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="content-bg absolute top-0 left-0 w-full h-full overflow-hidden z-10">
        <BigSectionBackground
          bgImage={bgImage}
          overlayClass="bg-[#000000] opacity-0"
          imagePosition={""}
          bgClass={""}
          animatePosition={0.6}
        />
      </div>
      <div className="donation-content-wrapper w-full h-auto flex items-center gap-x-[10vw] relative z-30">
        <div className="donation-content flex items-center gap-x-[10vw] will-change-transform">
          <div className="donation-video1 will-change-transform w-[46.8vw] h-[60vh]">
            <DonationVideo
              extraClass={"donation-video w-full h-full will-change-transform"}
              data={[props.sectionData?.video1]}
            />
          </div>
          <div className="content-button w-[15vw]">
            <ThemeButton
              buttonLink={"/"}
              svgIconClass={""}
              extraClass="bg-[#D4AF37] py-1.25 px-7 rounded-none justify-center"
              fontSize="2xl:text-[35px] xl:text-[30px] lg:text-[25px] md:text-[20px] sm:text-[15px]"
              text={"התחל בתרומה"}
              textColor="text-black"
              hoverBgColor="bg-black"
              hoverTextColor="group-hover:text-[#D4AF37]"
            />
          </div>
          <div
            dir="ltr"
            className="content-text1 w-[29.7vw] 2xl:text-[40px] xl:text-[35px] lg:text-[30px] md:text-[25px] sm:text-[20px] leading-[100%] font-medium text-right"
          >
            {parse(props.sectionData.content1)}
          </div>
          <div
            dir="ltr"
            className="content-text2 w-[27.6vw] 2xl:text-[25px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] leading-[130%] font-medium text-right"
          >
            {parse(props.sectionData.content2)}
          </div>
          <div className="donation-video2 will-change-transform w-[23.33vw] h-[72.33vh]">
            <DonationVideo
              extraClass={"donation-video w-full h-full will-change-transform"}
              data={[props.sectionData?.video1]}
            />
          </div>
          <div
            dir="ltr"
            className="content-text3 w-[46.4vw] text-right flex flex-col items-end"
          >
            <h3 className="title 2xl:text-[42px] xl:text-[38px] lg:text-[34px] md:text-[30px] sm:text-[26px] leading-[90%] max-w-96 mb-[3vh] font-medium">
              {parse(props.sectionData.content3.title)}
            </h3>
            <div className="text 2xl:text-[25px] xl:text-[22px] lg:text-[20px] md:text-[18px] sm:text-[16px] leading-[150%] font-medium">
              {parse(props.sectionData.content3.text)}
            </div>
          </div>
        </div>
        <div className="donation-readmore min-w-[15vw] w-[15vw] will-change-transform">
          <ThemeButton
            buttonLink={"/"}
            svgIconClass={""}
            extraClass="bg-[#D4AF37] py-1.25 px-7 rounded-none justify-center"
            fontSize="2xl:text-[35px] xl:text-[30px] lg:text-[25px] md:text-[20px] sm:text-[15px]"
            text={"התחל בתרומה"}
            textColor="text-black"
            hoverBgColor="bg-black"
            hoverTextColor="group-hover:text-[#D4AF37]"
          />
        </div>
      </div>
    </section>
  );
}
