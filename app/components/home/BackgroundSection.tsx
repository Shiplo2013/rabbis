import sectionBg from "../../assets/images/section-image2.jpg";

export default function BackgroundSection(props: { extraClass: string }) {
  return (
    <section
      style={{ backgroundImage: `url(${sectionBg.src})` }}
      dir="rtl"
      className={`${props.extraClass} h-screen bg-no-repeat bg-center bg-cover`}
    ></section>
  );
}
