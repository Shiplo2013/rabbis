import { useAppState } from "@/app/components/AppContext";
import SubscribeForm from "@/app/components/sheets/SubscribeForm";
import SimpleBar from "simplebar-react";
import GetHebrewYear from "../GetHebrewYear";

const CommunityFixedSidebar = () => {
  // Selectors
  const {
    setSheetsOnSelectCategoryChildId,
    sheetsOnSelectCategoryChildId,
    setSheetsOnSelectCategoryId,
    sheetsOnSelectCategoryId,
    communitySheetsCategoryData,
  } = useAppState();

  return (
    <div
      id="sheets-sidebar"
      className="sheets-sidebar fixed top-0 right-15 w-70 h-full bg-black flex flex-col z-50 border-l border-[#C3A13F]"
    >
      <div className="sheet-scrollbar-wrapper mt-auto mb-auto pl-5 pr-5">
        <SimpleBar
          style={{ maxHeight: "60vh" }}
          autoHide={false}
          data-simplebar-direction="rtl"
        >
          <div className="year-month-categories pl-7 pr-3">
            <div className="all-sheets year-month text-[24px] leading-[1.2em]">
              <button
                onClick={() => {
                  setSheetsOnSelectCategoryChildId(0);
                  setSheetsOnSelectCategoryId(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSheetsOnSelectCategoryChildId(0);
                    setSheetsOnSelectCategoryId(0);
                  }
                }}
                type="button"
                aria-label="View All Sheets"
                className="year text-[#CD5E41] cursor-pointer font-medium border-b border-[#CD5E41] py-2.5"
              >
                כל הגיליונות
              </button>
            </div>
            {communitySheetsCategoryData?.map(
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
                    setSheetsOnSelectCategoryId={setSheetsOnSelectCategoryId}
                    sheetsOnSelectCategoryId={sheetsOnSelectCategoryId}
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
  );
};

export default CommunityFixedSidebar;
