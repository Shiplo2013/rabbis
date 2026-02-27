import sectionBg from "../../assets/images/section-bg2.jpg";
import AnimatedBackground from "../../ui/AnimatedBackground";

export default function HomeSection4(props: { extraClass: string }) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} h-screen bg-no-repeat bg-center bg-cover flex items-center`}
    >
      <AnimatedBackground bgImage={sectionBg} />
      <div
        className={`section-content w-full h-auto flex items-center justify-center p-[5%] relative z-40`}
      >
        <div className="text text-[44px] leading-[0.9] text-[#EEECDD] font-medium w-[80%]">
          <p>
            מיום היווסדה נושאת הישיבה הקדושה את רוח הרוממות והגדלות שנטעו
            מייסדיה.
          </p>
          <p>
            היא ממשיכה עד היום להבעיר את שלהבת התורה והמוסר בלב אלפי תלמידיה
            ובוגריה.
          </p>
          <p>
            דרכה המיוחדת - המשלבת גדלות, עומק, בהירות ושאר רוח - מלווה את
            הצועדים בדרכה ומעמידה שדרת תלמידי חכמים נאמנים למורשתה.
          </p>
        </div>
      </div>
    </section>
  );
}
