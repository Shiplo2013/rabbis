"use client";
import BigSectionBackground from "@/app/ui/BigSectionBackground";
import DonationVideo from "@/app/ui/DonationVideo";
import ThemeButton from "@/app/ui/ThemeButton";
import parse from "html-react-parser";
import bgImage from "../../assets/images/donation-content-bg.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: {
    video1: {
      poster: any;
      source: any;
    };
    content1: string;
    content2: string;
    video2: {
      poster: any;
      source: any;
    };
    content3: {
      title: string;
      text: string;
    };
    button: {
      text: string;
      link: string;
    };
  };
}

export default function DonationContentSection(props: ChildProps) {
  // Section Data
  const SectionData = props.sectionData || {};
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
      <div className="donation-content-wrapper w-full h-auto flex items-center gap-x-[10vw] relative z-30 flex-col lg:flex-row gap-y-15">
        <div className="donation-content flex items-center gap-x-[10vw] will-change-transform flex-col lg:flex-row gap-y-15">
          <div className="donation-video1 will-change-transform w-full lg:w-[46.8vw] lg:h-[60vh]">
            <DonationVideo
              extraClass={"donation-video w-full h-full will-change-transform"}
              data={SectionData.video1}
            />
          </div>
          <div className="content-button lg:w-[15vw]">
            <ThemeButton
              buttonLink={SectionData.button.link}
              svgIconClass={""}
              extraClass="bg-[#D4AF37] py-1.25 px-7 rounded-none justify-center"
              fontSize="lg:text-[35px] sm:text-[25px] text-[18px]"
              text={SectionData.button.text}
              textColor="text-black"
              hoverBgColor="bg-black"
              hoverTextColor="group-hover:text-[#D4AF37]"
            />
          </div>
          <div
            dir="ltr"
            className="content-text1 lg:w-[29.7vw] lg:text-[40px] sm:text-[30px] text-[20px] leading-[100%] font-medium text-right"
          >
            {parse(SectionData.content1)}
          </div>
          <div
            dir="ltr"
            className="content-text2 lg:w-[27.6vw] lg:text-[25px] sm:text-[20px] text-[18px] leading-[130%] font-medium text-right"
          >
            {parse(SectionData.content2)}
          </div>
          <div className="donation-video2 will-change-transform w-full lg:w-[23.33vw] lg:h-[72.33vh]">
            <DonationVideo
              extraClass={"donation-video w-full h-full will-change-transform"}
              data={SectionData.video2}
            />
          </div>
          <div
            dir="ltr"
            className="content-text3 lg:w-[46.4vw] text-right flex flex-col items-end"
          >
            <h3 className="title lg:text-[42px] sm:text-[30px] text-[22px] leading-[90%] max-w-96 mb-[3vh] font-medium">
              {parse(SectionData.content3.title)}
            </h3>
            <div className="text lg:text-[25px] sm:text-[20px] text-[18px] leading-[150%] font-medium">
              {parse(SectionData.content3.text)}
            </div>
          </div>
        </div>
        <div className="donation-readmore min-w-[15vw] lg:w-[15vw] will-change-transform">
          <ThemeButton
            buttonLink={SectionData.button.link}
            svgIconClass={""}
            extraClass="bg-[#D4AF37] py-1.25 px-7 rounded-none justify-center"
            fontSize="lg:text-[35px] sm:text-[25px] text-[18px]"
            text={SectionData.button.text}
            textColor="text-black"
            hoverBgColor="bg-black"
            hoverTextColor="group-hover:text-[#D4AF37]"
          />
        </div>
      </div>
    </section>
  );
}
