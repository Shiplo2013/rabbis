import banner from "../../assets/images/home-banner.jpg";
import BackgroundImage from "../../ui/BackgroundImage";
import { gsap } from "../../ui/plugins";
import ScrollButton from "../../ui/ScrollButton";

interface ChildProps {
  extraClass: string;
  animated: boolean;
  audioControl: () => void;
  panel: any;
}

export default function HomeBanner(props: ChildProps) {
  // Cursor Follower Function
  function moveCircle(e: { screenY: number; clientX: any; clientY: any }) {
    const yskale = -(e.screenY / 100) * 1;
    //console.log(e.clientX, e.clientY)
    gsap.to("#cursorFollower", { x: e.clientX, y: e.clientY, duration: 0.2 });
  }
  return (
    <section
      onClick={props.audioControl}
      onMouseMove={(e) => {
        moveCircle(e);
      }}
      onMouseEnter={() => {
        gsap.to("#cursorFollower", { opacity: 1, scale: 1 });
      }}
      onMouseLeave={() => {
        gsap.to("#cursorFollower", { opacity: 0, scale: 0 });
      }}
      className={`${props.extraClass} overflow-hidden relative`}
    >
      <BackgroundImage
        bgImage={banner}
        animated={props.animated}
        panel={props.panel}
      />
      <div dir="rtl" className="flex items-center h-full relative z-30">
        <div className="section-wrapper">
          <h1 className="split-title text-[135px] text-[#AC832E] leading-none">
            <span className="block overflow-hidden">ישיבת</span>
            <span className="block overflow-hidden text-[250px] text-[#D1A941] relative z-10 leading-none -mt-15 -mb-15 font-bold italic">
              חברון
            </span>
            <span className="block overflow-hidden">כנסת ישראל</span>
          </h1>
          <h4 className="split-content overflow-hidden text-[55px] text-[#D1A941] mt-19">
            מאה חמישים שנות תורה, מוסר וגדלות האדם
          </h4>
          <div className="banner-button absolute left-13 bottom-19.5">
            <ScrollButton />
          </div>
        </div>
      </div>
    </section>
  );
}
