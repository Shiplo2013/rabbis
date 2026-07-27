import SingleRabbis from "./SingleRabbis";

interface ChildProps {
  className: string;
  rabbisContent: {
    sectionTitle: string;
    sectionContent: { title: string; image: any }[];
  }[];
}

export default function RabbisSection(props: ChildProps) {
  return (
    <div
      dir="rtl"
      className={`rabbis-section ${props.className} w-full lg:w-auto`}
    >
      <div className="rabbis-section-title mb-10.5">
        <h2 className="text-[40px] sm:text-[55px] leading-[0.7em] text-(--theme-color)">
          {props?.rabbisContent?.[0]?.sectionTitle}
        </h2>
      </div>
      <div className="rabbis-wrapper h-auto flex gap-10 sm:gap-[5vw] flex-col sm:flex-row flex-wrap lg:flex-nowrap">
        {props?.rabbisContent?.[0]?.sectionContent.map((item, index) => (
          <SingleRabbis key={index} title={item.title} image={item.image} />
        ))}
      </div>
    </div>
  );
}
