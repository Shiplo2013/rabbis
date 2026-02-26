import sectionBg from "../../assets/images/section-bg2.jpg";

export default function HomeSection4(props: { extraClass: string }) {
  return (
    <section
      style={{ backgroundImage: `url(${sectionBg.src})` }}
      dir="rtl"
      className={`${props.extraClass} h-screen bg-no-repeat bg-center bg-cover flex items-center`}
    ></section>
  );
}
