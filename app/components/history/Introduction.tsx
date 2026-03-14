import IntroductionBackground from "@/app/ui/IntroductionBackground";
import Image from "next/image";

interface ChildProps {
  extraClass: string;
  animated: boolean;
  audioControl: () => void;
  panel: any;
  bgImage: any;
  bgOverlay: any;
  overlayClass: string;
  bgPosition: string;
  bgClass: string;
  data: { title: string; subtitle: string }[];
}

export default function Introduction(props: ChildProps) {
  // Cursor Follower Function
  // function moveCircle(e: { screenY: number; clientX: any; clientY: any }) {
  //   const yskale = -(e.screenY / 100) * 1;
  //   //console.log(e.clientX, e.clientY)
  //   gsap.to("#cursorFollower", { x: e.clientX, y: e.clientY, duration: 0.2 });
  // }
  return (
    <section
      // onClick={props.audioControl}
      // onMouseMove={(e) => {
      //   moveCircle(e);
      // }}
      // onMouseEnter={() => {
      //   gsap.to("#cursorFollower", { opacity: 1, scale: 1 });
      // }}
      // onMouseLeave={() => {
      //   gsap.to("#cursorFollower", { opacity: 0, scale: 0 });
      // }}
      className={`${props.extraClass} overflow-hidden relative h-screen bg-black`}
    >
      {props.bgImage !== "" && (
        <IntroductionBackground
          bgImage={props.bgImage}
          overlayClass={props.overlayClass}
          imagePosition={props.bgPosition}
          bgClass={props.bgClass}
        />
      )}
      {props.bgOverlay !== "" && (
        <div className="absolute top-0 left-0 w-full h-full z-20">
          <Image
            className={`w-full object-contain h-full relative`}
            src={props?.bgOverlay?.src}
            width={`${props?.bgOverlay?.width > 1920 ? props?.bgOverlay?.width : "1920"}`}
            height={`${props?.bgOverlay?.width > 1080 ? props?.bgOverlay?.width : "1080"}`}
            blurDataURL={props?.bgOverlay?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Introduction Background Overlay"
          />
        </div>
      )}
      <div dir="rtl" className="flex items-center w-full h-full relative z-30">
        <div className="section-wrapper text-center">
          <h1
            className="split-title text-[204px] text-[#AC832E] leading-[0.7em] overflow-hidden relative z-20"
            dangerouslySetInnerHTML={{ __html: props.data[0].title }}
          ></h1>
          <h4
            className="split-content overflow-hidden text-[55px] leading-[1em] text-[#FBF4E6] mt-[5vh] relative z-30"
            dangerouslySetInnerHTML={{ __html: props.data[0].subtitle }}
          ></h4>
        </div>
      </div>
    </section>
  );
}
