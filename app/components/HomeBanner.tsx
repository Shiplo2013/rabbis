import banner from "../assets/images/home-banner.jpg";

export default function HomeBanner() {
  return (
    <section
      className={`w-screen h-screen bg-center bg-cover`}
      style={{ backgroundImage: `url(${banner.src})` }}
    >
      <div className="flex items-center h-full">
        <div className="section-wrapper">
          <h1 className="text-[135px] text-[#AC832E] leading-none">
            ישיבת
            <span className="block text-[250px] text-[#D1A941] relative z-10 leading-none -mt-15 -mb-15 font-bold italic">
              חברון
            </span>
            כנסת ישראל
          </h1>
          <h4 className="text-[55px] md:text-5xl text-[#D1A941]">
            מאה חמישים שנות תורה, מוסר וגדלות האדם
          </h4>
        </div>
      </div>
    </section>
  );
}
