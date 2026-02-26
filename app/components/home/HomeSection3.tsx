import sectionBg from "../../assets/images/section-bg.jpg";

export default function HomeSection3(props: { extraClass: string }) {
  return (
    <section
      style={{ backgroundImage: `url(${sectionBg.src})` }}
      dir="rtl"
      className={`${props.extraClass} h-screen bg-no-repeat bg-center bg-cover flex items-center`}
    ></section>
  );
}
