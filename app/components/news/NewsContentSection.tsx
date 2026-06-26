import SidebarSearch from "./SidebarSearch";
import SingleNews from "./SingleNews";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: any;
}

export default function NewsContentSection(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-full flex items-center gap-x-[10vw]">
        <div className="sheet-sidebar w-70 min-w-70 h-full will-change-transform py-[10vh]">
          <div className="sheet-sidebar-wrapper">
            <SidebarSearch />
          </div>
        </div>
        <div className="news-content flex items-center gap-x-[12.5vw] will-change-transform">
          {props.data?.map((item: any, index: number) => (
            <SingleNews key={index} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
