import Image from "next/image";
import sectionBg from "../../assets/images/section-image.jpg";

export default function HomeSection1(props: { extraClass: string }) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} h-screen bg-no-repeat bg-center bg-cover flex items-center`}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10">
        <Image
          src={sectionBg.src}
          width="1920"
          height="1080"
          alt="Section Background"
        />
      </div>
      <div className="section-content relative z-30"></div>
    </section>
  );
}
