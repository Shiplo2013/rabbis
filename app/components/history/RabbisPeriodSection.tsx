import ParallaxBackground from "@/app/ui/ParallaxBackground";
import RabbisSlider from "@/app/ui/RabbisSlider";
import ThemeButton from "@/app/ui/ThemeButton";
import contentBG from "../../assets/images/history-section-bg.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function RabbisPeriodSection(props: ChildProps) {
  const SlideData = [
    {
      buttonText: "",
      title: "",
      subtitle: "",
      text: "",
    },
    {
      buttonText: "",
      title: "",
      subtitle: "",
      text: "",
    },
    {
      buttonText: "",
      title: "",
      subtitle: "",
      text: "",
    },
    {
      buttonText: "",
      title: "",
      subtitle: "",
      text: "",
    },
    {
      buttonText: "",
      title: "",
      subtitle: "",
      text: "",
    },
    {
      buttonText: "",
      title: "",
      subtitle: "",
      text: "",
    },
  ];
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-10 overflow-hidden`}
    >
      <ParallaxBackground
        bgImage={contentBG}
        overlayLeft={true}
        overlayLeftColor={"#0a0a0a"}
      />
      <div className="period-content-wrapper flex items-center justify-center w-full h-full relative z-20 pr-[10vw] pl-[10vw] pt-[10vh]">
        <div className="period-button absolute top-[7.8vh] left-[12.7vw]">
          <ThemeButton
            extraClass="w-38.25 h-38.25 flex item-center justify-center border-[4px] border-[#D1A941] text-[37px] leading-[0.8em] p-6 text-center font-bold"
            bgColor="bg-[#ffffff]"
            textColor="text-[#000000]"
            hoverBgColor="bg-[#C3A13F]"
            text={`כל הרבנים`}
            svgIconClass={""}
          />
        </div>
        <div className="period-title absolute top-[9.5vh] right-[9vw]">
          <h2 className="text-[55px] leading-[0.7em] text-[#FBF4E6]">
            הרבנים בתקופת תרל"ז - תרע"ד
          </h2>
        </div>
        <div className="period-slider max-w-155">
          <RabbisSlider data={SlideData} />
        </div>
      </div>
    </section>
  );
}
