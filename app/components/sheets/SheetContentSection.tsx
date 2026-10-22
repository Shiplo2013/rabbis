import GetHebrewYear from "@/app/ui/GetHebrewYear";
import SheetContentItem from "@/app/ui/SheetContentItem";
import { Fragment, useRef } from "react";
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
  filteredPostsLoading: boolean;
}

export default function SheetContentSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Section Data
  const sectionData = props.data || [];
  //const [activeCategory, setActiveCategory] = useState(0);

  // Animation State
  const {
    sheetsOnSelectCategoryId,
    setSheetsOnSelectCategoryId,
    sheetsOnSelectCategoryChildId,
    setSheetsOnSelectCategoryChildId,
  } = useAppState();

  return (
    <section
      dir="rtl"
      style={props.style}
      className={`${props.extraClass} bg-black flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-y-[8vh] gap-x-[5.8vw] flex-col lg:flex-row relative justify-center lg:pr-85">
        <div className="sheets-sidebar lg:hidden w-full h-auto bg-black flex flex-col z-50 gap-y-10">
          <div className="sheet-scrollbar-wrapper mt-auto mb-auto">
            <SimpleBar
              style={{ maxHeight: "60vh" }}
              autoHide={false}
              data-simplebar-direction="rtl"
            >
              <div className="year-month-categories pl-7 pr-3">
                <div className="all-sheets year-month text-[24px] leading-[1.2em]">
                  <button
                    onClick={() => {
                      //setActiveCategory(0);
                      setSheetsOnSelectCategoryId(0);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        //setActiveCategory(0);
                        setSheetsOnSelectCategoryId(0);
                      }
                    }}
                    type="button"
                    aria-label="View All Sheets"
                    tabIndex={0}
                    className="year text-[#CD5E41] cursor-pointer font-medium border-b border-[#CD5E41] py-2.5"
                  >
                    כל הגיליונות
                  </button>
                </div>
                {sectionData?.categoriesTree?.map(
                  (
                    item: { id: number; name: string; children: any[] },
                    index: number,
                  ) => {
                    return (
                      <GetHebrewYear
                        key={item?.id}
                        index={index}
                        year={item}
                        activeCategory={sheetsOnSelectCategoryChildId}
                        setActiveCategory={setSheetsOnSelectCategoryChildId}
                        sheetsOnSelectCategoryId={sheetsOnSelectCategoryId}
                        setSheetsOnSelectCategoryId={
                          setSheetsOnSelectCategoryId
                        }
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
        <div className="sheet-content max-w-300 w-full flex items-center gap-y-[5vh] gap-x-10 relative flex-col sm:flex-row flex-wrap lg:flex-nowrap">
          {sectionData?.noPostsFound ? (
            <div className="no-post-found w-full flex items-center justify-center py-20 gap-x-[3.2vw]">
              <div className="text-white text-[35px] leading-[1em] w-[26.35vw] text-center">
                לא נמצאו פרשיות זמינות.
              </div>
            </div>
          ) : (
            Array.isArray(sectionData?.posts) &&
            sectionData.posts.map((item: any, index: number) => {
              return (
                <Fragment key={item?.id}>
                  <SheetContentItem data={item} />
                </Fragment>
              );
            })
          )}

          <div
            className={`absolute top-0 left-0 w-full h-full bg-black z-30 flex items-center justify-center transition-[opacity,visibility] ${props.filteredPostsLoading ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <div role="status">
              <div className="flex items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#D1A941] border-t-transparent"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
