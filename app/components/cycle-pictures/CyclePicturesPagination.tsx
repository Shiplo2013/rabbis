import { useRouter } from "next/navigation";
import { useAppState } from "../AppContext";

export default function CyclePicturesPagination() {
  const {
    cyclePostNavigation,
    setCyclePostNavigation,
    isLoading,
    setIsLoading,
  } = useAppState();
  const router = useRouter();
  return (
    <div
      id="posts-pagination"
      className="cycle-pictures-pagination fixed bottom-5 right-20 flex justify-center items-center gap-x-[1vw] z-500 opacity-0 invisible text-[18px]"
    >
      <button
        onClick={() => {
          if (
            cyclePostNavigation?.currentPage &&
            cyclePostNavigation.currentPage > 1
          ) {
            setCyclePostNavigation({
              ...cyclePostNavigation,
              currentPage: cyclePostNavigation.currentPage - 1,
            });
          }
          setIsLoading(true);
          window.scrollTo(0, 0);
          router.push(
            `/cycle-pictures/${
              cyclePostNavigation?.currentPage &&
              cyclePostNavigation?.currentPage > 1
                ? cyclePostNavigation?.currentPage - 1
                : 1
            }`,
          );
        }}
        className={`prev-button cursor-pointer border border-[#c3a13f] bg-black text-[#c3a13f] px-4 py-2 rounded-full hover:bg-[#c3a13f] hover:text-black transition-all duration-300 user-select-none ${
          cyclePostNavigation?.currentPage === 1 && "hidden"
        }`}
      >
        עמוד קודם
      </button>
      <button
        onClick={() => {
          if (
            cyclePostNavigation?.nextPage &&
            cyclePostNavigation?.maxPages &&
            cyclePostNavigation?.nextPage <= cyclePostNavigation?.maxPages
          ) {
            setCyclePostNavigation({
              ...cyclePostNavigation,
              nextPage: cyclePostNavigation.nextPage + 1,
            });
          }
          setIsLoading(true);
          window.scrollTo(0, 0);
          router.push(`/cycle-pictures/${cyclePostNavigation?.nextPage}`);
        }}
        className={`next-button cursor-pointer border border-[#c3a13f] bg-black text-[#c3a13f] px-4 py-2 rounded-full hover:bg-[#c3a13f] hover:text-black transition-all duration-300 user-select-none ${
          cyclePostNavigation?.currentPage === cyclePostNavigation?.nextPage &&
          "hidden"
        }`}
        disabled={!cyclePostNavigation?.nextPage}
      >
        עמוד הבא
      </button>
    </div>
  );
}
