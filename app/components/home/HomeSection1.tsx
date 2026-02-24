import sectionBg from "../../assets/images/section-image.jpg";

export default function HomeSection1(props: { extraClass: string }) {
  return (
    <section
      style={{ backgroundImage: `url(${sectionBg.src})` }}
      dir="rtl"
      className={`${props.extraClass} h-screen`}
    ></section>
  );
}
