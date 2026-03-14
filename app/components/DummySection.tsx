interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function DummySection(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
    >
      <div className="section-wrapper w-full h-full"></div>
    </section>
  );
}
