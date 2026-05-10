import BackgroundImage from "../../ui/BackgroundImage";
import { gsap, useGSAP } from "../../ui/plugins";
import ScrollButton from "../../ui/ScrollButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface BannerData {
  title_1?: string;
  title_2?: string;
  title_3?: string;
  subtitle?: string;
  banner_background?: any;
}

interface ChildProps {
  extraClass: string;
  animated: boolean;
  audioControl: () => void;
  panel: any;
  bannerData?: BannerData | string | null;
}

export default function HomeBanner(props: ChildProps) {
  const { contextSafe } = useGSAP();
  const bannerData = props.bannerData as BannerData;
  // Cursor Follower Function
  const moveCircle = contextSafe(
    (e: { screenY: number; clientX: any; clientY: any }) => {
      const yskale = -(e.screenY / 100) * 1;
      //console.log(e.clientX, e.clientY)
      gsap.to("#cursorFollower", { x: e.clientX, y: e.clientY, duration: 0.2 });
    },
  );
  // On Mouse Enter
  const handleMouseEnter = contextSafe(() => {
    gsap.to("#cursorFollower", { opacity: 1, scale: 1 });
  });
  // On Mouse Leave
  const handleMouseLeave = contextSafe(() => {
    gsap.to("#cursorFollower", { opacity: 0, scale: 0 });
  });

  return (
    <section
      onClick={props.audioControl}
      onMouseMove={moveCircle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${props.extraClass} home-banner overflow-hidden relative`}
    >
      <div className="banner-background-wrapper absolute top-0 left-0 w-full h-full z-10">
        <BackgroundImage
          bgImage={bannerData?.banner_background}
          animated={props.animated}
          panel={props.panel}
          overlayClass="opacity-40"
        />
        <div className="banner-bg-mask absolute top-0 left-0 w-full h-full bg-black z-30"></div>
      </div>
      <div dir="rtl" className="flex items-center h-full relative z-30">
        <div className="section-wrapper">
          <h1 className="split-title text-[135px] text-[#AC832E] leading-none overflow-hidden">
            <span className="banner-title1 block overflow-hidden">
              {bannerData?.title_1}
            </span>
            <span className="banner-title2 block overflow-hidden text-[250px] text-[#D1A941] relative z-10 leading-none -mt-15 -mb-15 font-bold italic">
              {bannerData?.title_2}
            </span>
            <span className="banner-title3 block overflow-hidden">
              {bannerData?.title_3}
            </span>
          </h1>
          <h4 className="banner-content overflow-hidden text-[55px] text-[#D1A941] mt-19">
            {bannerData?.subtitle}
          </h4>
          <div className="banner-button absolute left-13 bottom-19.5">
            <ScrollButton />
          </div>
        </div>
      </div>
    </section>
  );
}
