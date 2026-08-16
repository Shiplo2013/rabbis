"use client";
import ZatzelPostCat from "./ZatzelPostCat";
import ZatzelSidebar from "./ZatzelSidebar";

interface ZatzelPost {
  title: string;
  image: any;
  yearOfDeath: string;
  id: number;
}

interface ZatzelContentSectionData {
  sectionTitle: string;
  sectionContent: ZatzelPost[];
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: ZatzelContentSectionData;
  setSelectedDate?: (date: Date | null) => void;
  setSearchedData?: (data: string | null) => void;
  setZatzelPosts?: (posts: any) => void;
  allPosts?: any;
  style?: React.CSSProperties;
}

export default function ZatzelContentSection(props: ChildProps) {
  const SectionData = props.sectionData;

  return (
    <section
      style={props.style}
      dir="rtl"
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full min-w-full h-auto flex items-center gap-[10vw] flex-col lg:flex-row will-change-transform lg:pr-85 max-w-full lg:w-7xl">
        <div className="sheet-sidebar block lg:hidden w-full lg:w-70 lg:min-w-70 h-full will-change-transform relative z-20">
          <div className="sheet-sidebar-wrapper">
            <ZatzelSidebar
              setSelectedDate={props.setSelectedDate}
              setSearchedData={props.setSearchedData}
              setZatzelPosts={props.setZatzelPosts}
              allPosts={props.allPosts}
            />
          </div>
        </div>
        <div className="sheet-content w-full flex items-center gap-x-[10vw] will-change-transform flex-col lg:flex-row">
          {SectionData?.sectionContent?.length > 0 ? (
            <ZatzelPostCat
              key={0}
              dataIndex={0}
              className={""}
              postsContent={
                SectionData || { sectionTitle: "", sectionContent: [] }
              }
            />
          ) : (
            <div className="no-post-found w-full flex justify-center">
              <h3 className="text-[32px] sm:text-[55px] leading-[0.7em] text-(--theme-color)">
                לא נמצאו פוסטים זמינים.
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
