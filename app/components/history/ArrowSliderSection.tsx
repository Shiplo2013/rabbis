import CardSlider from "@/app/ui/CardSlider";
import IntroductionBackground from "@/app/ui/IntroductionBackground";
import Image from "next/image";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  bgImage: any;
  bgPosition: string;
  bgClass: string;
  overlayClass: string;
  sectionImage: any;
  SlideData: { text1: string; text2: string }[];
}

export default function ArrowSliderSection(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`bg-black flex items-center relative z-30 ${props.extraClass}`}
    >
      <IntroductionBackground
        bgImage={props.bgImage}
        overlayClass={props.overlayClass}
        imagePosition={props.bgPosition}
        bgClass={props.bgClass}
      />
      <div className="section-wrapper w-full h-full relative">
        <div className="absolute left-[8vw] top-[10vh]">
          <CardSlider SlideData={props.SlideData} />
        </div>
        <div className="section-image w-121 h-80.5 absolute bottom-[6vh] left-0 -ml-49">
          <Image
            className={`w-full object-cover h-full relative z-10`}
            src={props?.sectionImage?.src}
            width={`484`}
            height={`322`}
            blurDataURL={props?.sectionImage?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Section Image"
          />
        </div>
      </div>
    </section>
  );
}
