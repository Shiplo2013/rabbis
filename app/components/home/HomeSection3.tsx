import Image from "next/image";
import Juniper from "../../assets/images/juniper.jpg";
import sectionBg from "../../assets/images/section-bg.jpg";

export default function HomeSection3(props: { extraClass: string }) {
  return (
    <section
      style={{ backgroundImage: `url(${sectionBg.src})` }}
      dir="rtl"
      className={`${props.extraClass} h-screen bg-no-repeat bg-center bg-cover flex items-center`}
    >
      <h2 className="absolute top-1/2 right-[32%] text-[#D1A941] text-[290px] font-bold leading-[0.75] -translate-y-[55%] opacity-20 z-0">
        עוז
        <br />
        רוח
      </h2>
      <div
        className={`section-content w-full h-auto flex items-start justify-start pr-[8%] pl-[5%] pt-[2%] relative z-40 gap-16.75`}
      >
        <div className="image">
          <Image
            className="relative z-10"
            src={Juniper?.src}
            width={Juniper?.width}
            height={Juniper?.height}
            blurDataURL={Juniper?.blurDataURL}
            placeholder={"blur"}
            alt="Juniper"
          />
        </div>
        <div className="text text-[55px] leading-[0.8] w-107.25 pt-12">
          <p className="mb-7.5">מרן רבי משה מרדכי אפשטיין זצוק"ל </p>
          <p className="font-bold">
            הנהיג את הישיבה במסירות נפש מופלאה בתקופות סוערות, והנחיל לתלמידיו
            מושגים נעלים של עיון התורה ועמלה.
          </p>
        </div>
      </div>
    </section>
  );
}
