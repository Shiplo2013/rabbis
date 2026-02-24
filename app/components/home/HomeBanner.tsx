import banner from "../../assets/images/home-banner.jpg";
import { gsap } from "../../ui/plugins";

export default function HomeBanner(props: { extraClass: string }) {
  // Cursor Follower Function
  function moveCircle(e: { screenY: number; clientX: any; clientY: any }) {
    const yskale = -(e.screenY / 100) * 1;
    //console.log(e.clientX, e.clientY)
    gsap.to("#cursorFollower", { x: e.clientX, y: e.clientY });
  }
  return (
    <section
      dir="rtl"
      onMouseMove={(e) => {
        moveCircle(e);
      }}
      onMouseEnter={() => {
        gsap.to("#cursorFollower", { opacity: 1 });
      }}
      onMouseLeave={() => {
        gsap.to("#cursorFollower", { opacity: 0 });
      }}
      className={`${props.extraClass} overflow-hidden bg-center bg-cover`}
      style={{ backgroundImage: `url(${banner.src})` }}
    >
      <div className="flex items-center h-full relative">
        <div className="section-wrapper">
          <h1 className="text-[135px] text-[#AC832E] leading-none">
            ישיבת
            <span className="block text-[250px] text-[#D1A941] relative z-10 leading-none -mt-15 -mb-15 font-bold italic">
              חברון
            </span>
            כנסת ישראל
          </h1>
          <h4 className="text-[55px] text-[#D1A941] mt-19">
            מאה חמישים שנות תורה, מוסר וגדלות האדם
          </h4>
          <button className="absolute left-13 bottom-19.5 flex text-[17px] text-[#E2D7C3] hover:opacity-60 transition-opacity cursor-pointer gap-2 items-center">
            <span>התחילו לגלול</span>
            <div className="w-34 h-0.5 bg-[#D4AF37]"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
