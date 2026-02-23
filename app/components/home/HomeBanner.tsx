import banner from "../../assets/images/home-banner.jpg";

export default function HomeBanner() {
  return (
    <section
      className={`w-screen h-screen bg-center bg-cover`}
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
