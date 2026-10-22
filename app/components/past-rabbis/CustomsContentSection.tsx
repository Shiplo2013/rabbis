import PastRabbiCard from "./PastRabbiCard";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: any;
  style?: React.CSSProperties;
}

export default function CustomsContentSection(props: ChildProps) {
  const rabbisPosts = props.data;

  return (
    <section
      dir="rtl"
      style={props.style}
      className={`${props.extraClass} rabbis-section bg-black flex items-center relative z-20`}
    >
      <div className="rabbis-wrapper w-full h-full flex gap-y-15 sm:gap-y-[10vh] gap-x-[10vw] flex-col lg:flex-row">
        {rabbisPosts.map((item: any) => (
          <PastRabbiCard key={item.id} data={item} layout="carousel" />
        ))}
      </div>
    </section>
  );
}
