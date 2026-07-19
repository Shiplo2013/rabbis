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
}

export default function SheetContentSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Section Data
  const sectionData = props.data || [];

  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-x-[5.8vw]">
        <div className="sheet-sidebar w-54.5 h-full will-change-transform overflow-hidden">
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
        <div className="sheet-content flex items-center gap-x-[3.2vw] will-change-transform relative">
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
        {props.hasMorePosts && (
          <div className="sheet-readmore min-w-50">
            <button
              className="text-[45px] leading-[1em] text-[#656158] border-b border-[#AAA497] cursor-pointer hover:text-white hover:border-[#C3A13F] transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => {
                if (props.onLoadMore) {
                  props.onLoadMore();
                }
              }}
              disabled={props.isLoadingMore}
            >
              {props.isLoadingMore ? "..." : "טען עוד"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
