import Image from "next/image";
import Juniper from "../../assets/images/juniper.jpg";
import sectionBg from "../../assets/images/section-bg.jpg";
import { gsap, useGSAP } from "../../ui/plugins";

export default function HomeSection3(props: { extraClass: string }) {
  function moveImage(e: { screenY: number; clientX: any; clientY: any }) {
    const { clientX, clientY } = e;
    const moveX = clientX - window.innerWidth / 2;
    const moveY = clientY - window.innerHeight / 2;

    gsap.to(".home-section3 .over-title", {
      x: moveX * 0.05, // Speed factor
      y: moveY * 0.05,
      ease: "power2.out",
      duration: 0.5,
    });
  }
  useGSAP(() => {
    gsap.set(".home-section3 .section-image", {
      scale: 0.6,
    });
  }, []);
  return (
    <section
      style={{ backgroundImage: `url(${sectionBg.src})` }}
      dir="rtl"
      onMouseMove={(e) => {
        moveImage(e);
      }}
      className={`${props.extraClass} home-section3 h-screen bg-no-repeat bg-center bg-cover flex items-center`}
    >
      <div
        className={`section-content w-full h-auto flex items-center justify-start pl-[5%] relative z-40`}
      >
        <div className="section-image w-[50%] h-screen">
          <Image
            className="relative z-10 w-full h-full object-center object-cover"
            src={Juniper?.src}
            width={Juniper?.width}
            height={Juniper?.height}
            blurDataURL={Juniper?.blurDataURL}
            placeholder={"blur"}
            alt="Juniper"
          />
        </div>
        <div className="section-content w-[50%] relative pt-12 pr-[10%]">
          <h2 className="over-title absolute top-[7%] right-[20%] text-[#D1A941] text-[290px] font-bold leading-[0.75] opacity-20 z-0">
            עוז
            <br />
            רוח
          </h2>
          <div className="text text-[55px] leading-[0.8] w-107.5 max-w-[70%] relative">
            <p className="mb-7.5">מרן רבי משה מרדכי אפשטיין זצוק"ל </p>
            <p className="font-bold">
              הנהיג את הישיבה במסירות נפש מופלאה בתקופות סוערות, והנחיל לתלמידיו
              מושגים נעלים של עיון התורה ועמלה.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
