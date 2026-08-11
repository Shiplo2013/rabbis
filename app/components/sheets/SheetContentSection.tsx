import GetHebrewYear from "@/app/ui/GetHebrewYear";
import SheetContentItem from "@/app/ui/SheetContentItem";
import { Fragment, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import { useAppState } from "../AppContext";
import SubscribeForm from "./SubscribeForm";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  activeCategory: number;
  setActiveCategory: (index: number) => void;
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
  const [activeCategory, setActiveCategory] = useState(0);

  // Animation State
  const { sheetsOnSelectCategoryId, setSheetsOnSelectCategoryId } =
    useAppState();

  return (
    <section
      dir="rtl"
      style={props.style}
      className={`${props.extraClass} bg-black flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-y-[8vh] gap-x-[5.8vw] flex-col lg:flex-row relative justify-center lg:pr-70">
        <div className="sheets-sidebar lg:hidden w-full h-auto bg-black flex flex-col z-50 gap-y-10">
          <div className="sheet-scrollbar-wrapper mt-auto mb-auto">
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
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        onSelectCategoryId={setSheetsOnSelectCategoryId}
                        //setIsPostLoaded={() => setIsLoading(true)}
                      />
                    );
                  },
                )}
              </div>
            </SimpleBar>
          </div>
          <SubscribeForm />
        </div>
        <div className="sheet-content max-w-300 w-full flex items-center gap-y-[5vh] gap-x-10 will-change-transform relative flex-col sm:flex-row flex-wrap lg:flex-nowrap">
          {sectionData?.noPostsFound ? (
            <div className="no-post-found w-full flex items-center justify-center py-20 gap-x-[3.2vw]">
              <div className="text-white text-[35px] leading-[1em] w-[26.35vw] text-center">
                לא נמצאו פרשיות זמינות.
              </div>
            </div>
          ) : (
            Array.isArray(sectionData?.posts) &&
            sectionData.posts.map((item: any, index: number) => (
              <Fragment key={`sheet-entry-${index}`}>
                <SheetContentItem data={item} />
              </Fragment>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
