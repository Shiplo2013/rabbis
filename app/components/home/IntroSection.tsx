export default function IntroSection(props: { extraClass: string }) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center`}
    >
      <div className="max-w-full pr-[35%] pt-[10%] pb-[10%] pl-[20%]">
        <h2 className="intro-title text-[135px] text-[#CD5E41] leading-24">
          להחיות רוח שפלים ולהחיות לב נדכאים
        </h2>
      </div>
    </section>
  );
}
