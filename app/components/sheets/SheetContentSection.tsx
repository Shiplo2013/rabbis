import GetHebrewYear from "@/app/ui/GetHebrewYear";
import SheetContentItem from "@/app/ui/SheetContentItem";
import { Fragment, useRef } from "react";
import SimpleBar from "simplebar-react";
import SubscribeForm from "./SubscribeForm";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  activeCategory: number;
  setActiveCategory: (index: number) => void;
  onSelectCategoryId?: (categoryId: number | null) => void;
  data: any;
  hasMorePosts?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  setIsPostLoaded?: (value: boolean) => void;
  currentPage?: number;
  totalPages?: number;
  style?: React.CSSProperties;
}

export default function SheetContentSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Section Data
  const sectionData = props.data || [];

  return (
    <section
      dir="rtl"
      style={props.style}
      className={`${props.extraClass} bg-black flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-y-[8vh] gap-x-[5.8vw] flex-col lg:flex-row">
        <div className="sheet-sidebar w-full lg:w-54.5 h-full will-change-transform overflow-hidden">
          <div className="sheet-sidebar-wrapper">
            {/* <div className="search-group relative mb-[3.6vh]">
              <input
                className="text-[24px] text-[#D1A941] placeholder:text-[#D1A941] leading-[1em] bg-white p-2.25 focus:outline-0 max-w-full pl-8"
                type="text"
                id="search-sheet"
                name="Search-Sheet"
                placeholder="חפש פרשיה"
              />
              <button className="cursor-pointer absolute top-1.5 left-1.75">
                <SearchIcon />
              </button>
            </div> */}
            <div ref={scrollbarRef} className="sheet-scrollbar-wrapper">
              <SimpleBar
                style={{ maxHeight: "60vh" }}
                autoHide={false}
                data-simplebar-direction="rtl"
              >
                <div className="year-month-categories pl-7 pr-3">
                  {sectionData?.categoriesTree?.map(
                    (
                      item: { id: number; name: string; children: any[] },
                      index: number,
                    ) => {
                      return (
                        <GetHebrewYear
                          key={index}
                          index={index}
                          year={item}
                          activeCategory={props.activeCategory}
                          setActiveCategory={props.setActiveCategory}
                          onSelectCategoryId={props.onSelectCategoryId}
                          setIsPostLoaded={props.setIsPostLoaded}
                        />
                      );
                    },
                  )}
                </div>
              </SimpleBar>
            </div>
          </div>
        </div>
        <div className="sheet-content flex items-center gap-y-[5vh] gap-x-[3.2vw] will-change-transform relative flex-col sm:flex-row flex-wrap lg:flex-nowrap">
          {sectionData?.noPostsFound ? (
            <div className="no-post-found w-full flex items-center justify-center py-20 gap-x-[3.2vw]">
              <div className="text-white text-[35px] leading-[1em] w-[26.35vw] text-center">
                לא נמצאו פרשיות זמינות.
              </div>

              <SubscribeForm />
            </div>
          ) : (
            Array.isArray(sectionData?.posts) &&
            sectionData.posts.map((item: any, index: number) => (
              <Fragment key={`sheet-entry-${index}`}>
                <SheetContentItem data={item} />
                {index === 1 && <SubscribeForm />}
              </Fragment>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
