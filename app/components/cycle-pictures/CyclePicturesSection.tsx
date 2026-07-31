import SingleCyclePicture from "@/app/ui/SingleCyclePicture";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAppState } from "../AppContext";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: any;
  parentCategories?: any;
  activeCategory: number;
  setActiveCategory: (index: number) => void;
  postPagination: number;
  totalPostPages: number;
  setPostPagination: (page: number) => void;
  style?: React.CSSProperties; // Optional style prop
}

export default function CyclePicturesSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Section Data
  const SectionData = props.sectionData || [];
  const years = props.parentCategories || [];
  const { isLoading, setIsLoading } = useAppState();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentID = params.slug; // Extracts the ID from the URL

  // Section Animation
  useEffect(() => {
    const selectYears = scrollbarRef.current?.querySelectorAll(".year-month");
    if (selectYears && selectYears.length > 0) {
      selectYears[0].querySelector(".months")?.classList.remove("hidden");
      selectYears[0].querySelector(".months")?.classList.add("flex");
    }
  }, [years.length]);
  return (
    <section
      dir="rtl"
      style={props.style} // Apply the optional style prop
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full min-w-[80vw] h-auto flex items-center gap-x-[10vw] flex-col lg:flex-row">
        {/* <div className="sheet-sidebar min-w-50 w-50 h-full will-change-transform overflow-hidden">
          <div className="sheet-sidebar-wrapper">
            <div ref={scrollbarRef} className="sheet-scrollbar-wrapper">
              <SimpleBar
                style={{ maxHeight: "60vh" }}
                autoHide={false}
                data-simplebar-direction="rtl"
              >
                <div className="year-month-categories pl-10 pr-2.5">
                  <button
                    disabled={currentID === undefined || isLoading}
                    onClick={(e) => {
                      e.preventDefault();
                      props.setActiveCategory(-1);
                      setIsLoading(true);
                      window.scrollTo(0, 0);
                      router.push(`/cycle-pictures/`);
                    }}
                    className={`all-post block w-full text-right cursor-pointer font-medium border-b border-[#CD5E41] py-2.5 text-[24px] leading-[1.2em] border-t hover:bg-[#00000058] hover:text-[#ffffff] ${currentID === undefined ? "bg-[#00000058] text-[#ffffff] " : "bg-transparent text-[#CD5E41]"}`}
                  >
                    הכל
                  </button>
                  {years.map((item: any, index: number) => {
                    return (
                      <button
                        key={index}
                        disabled={Number(currentID) === item.id || isLoading}
                        onClick={(e) => {
                          e.preventDefault();
                          props.setActiveCategory(item.id);
                          setIsLoading(true);
                          window.scrollTo(0, 0);
                          router.push(`/cycle-pictures/cat/${item.id}`);
                        }}
                        className={`category block w-full text-right cursor-pointer font-medium border-b border-[#CD5E41] py-2.5 text-[24px] leading-[1.2em] hover:bg-[#00000058] hover:text-[#ffffff] transition-all duration-300 ${Number(currentID) === item.id ? "bg-[#00000058] text-[#ffffff]" : "bg-transparent text-[#CD5E41]"}`}
                      >
                        {parse(item.name || "")}
                      </button>
                    );
                  })}
                </div>
              </SimpleBar>
            </div>
          </div>
        </div> */}
        <div className="sheet-content flex items-center gap-x-[10vw] w-full will-change-transform flex-col lg:flex-row gap-y-10 sm:gap-y-15">
          {SectionData?.length > 0 ? (
            SectionData?.map((item: any, index: number) => (
              <SingleCyclePicture key={index} data={item} />
            ))
          ) : (
            <div className="error">
              <p className="text-[18px] sm:text-[3vw] leading-[1.2em] text-[#656158]">
                לא נמצאו תמונות מחזור עבור קטגוריה זו.
              </p>
            </div>
          )}
        </div>
        {props.postPagination < props.totalPostPages && (
          <div
            onClick={() => props.setPostPagination(props.postPagination + 1)}
            className="sheet-readmore min-w-50"
          >
            <button className="text-[25px] sm:text-[35px] lg:text-[45px] leading-[1em] text-[#656158] border-b border-[#AAA497] cursor-pointer hover:text-[#C3A13F] hover:border-[#C3A13F] transition-all duration-500">
              טען עוד
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
