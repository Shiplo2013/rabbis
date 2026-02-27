import Image from "next/image";
import Koddisha from "../../assets/images/kaddisha.jpg";

export default function HomeSection2(props: { extraClass: string }) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} h-screen flex items-center`}
    >
      <h2 className="absolute top-1/2 right-[14%] text-[#D1A941] text-[290px] font-bold leading-[0.75] -translate-y-[55%] opacity-20 z-0">
        סבא
        <br />
        קדישא
      </h2>
      <div className="section-image absolute top-[17%] right-[14.5%]">
        <Image
          className="relative z-10"
          src={Koddisha?.src}
          width={Koddisha?.width}
          height={Koddisha?.height}
          blurDataURL={Koddisha?.blurDataURL}
          placeholder={"blur"}
          alt="Koddisha"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-30"></div>
      </div>
      <div
        className={`section-content w-full h-full flex items-center justify-center pr-[15%] pl-[5%] pt-[8%] relative z-40`}
      >
        <div className="text text-[#EEECDD] text-[70px] leading-[0.8] w-2/3">
          <p>
            הסבא מסלבודקא מחולל ומייסד הישיבה שהצמיח ברוממותו דורות של תלמידים
            נעלים, עיצב נפשות ברוח גדלות האדם ומאז ועד היום ניכרת השפעתו בכל בית
            מדרש הנושא את רוחו ומורשתו
          </p>
        </div>
      </div>
    </section>
  );
}
