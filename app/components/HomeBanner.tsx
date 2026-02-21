import banner from "../assets/images/home-banner.jpg";

export default function HomeBanner() {
  return (
    <section
      className={`w-screen h-screen bg-center bg-cover`}
      style={{ backgroundImage: `url(${banner.src})` }}
    >
      <div className="flex items-center h-full">
        <div className="secton-wrapper">
          <h1 className="text-9xl">
            ישיבת<span className="block">חברון</span>כנסת ישראל
          </h1>
          <h4>מאה חמישים שנות תורה, מוסר וגדלות האדם</h4>
        </div>
      </div>
    </section>
  );
}
