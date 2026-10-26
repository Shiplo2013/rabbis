import UserIcon from "@/app/assets/icons/UserIcon";
import { useAppState } from "@/app/components/AppContext";
import { useRef } from "react";
export default function PastRabbisSidebar() {
  // Selectors
  const { pastRabbisSearchQuery, setPastRabbisSearchQuery } = useAppState();
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <div
      id="pastrabbis-sidebar"
      className="pastrabbis-sidebar fixed top-0 right-15 w-70 h-full bg-[#000000] flex flex-col justify-center z-50 border-l border-[#D1CECE]"
    >
      <div className="sheet-sidebar p-6 w-full lg:w-70 lg:min-w-70 h-full relative z-20 flex items-center">
        <div className="sheet-sidebar-wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const searchValue = formData.get("search-by-user") as string;
              setPastRabbisSearchQuery?.(searchValue || null);
            }}
            className="search-group relative"
            action={"/"}
          >
            <input
              ref={nameRef}
              className="text-[16px] sm:text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full w-full pl-8"
              type="text"
              id="search-by-user"
              name="search-by-user"
              placeholder={`חיפוש לפי שם`}
              aria-label="Search"
            />
            <button
              type="submit"
              className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2"
              aria-label="Submit Search"
            >
              <UserIcon />
            </button>
          </form>
          <div className="reset-filter mt-5 flex items-center justify-start gap-x-3">
            <button
              type="button"
              aria-label="Reset Filter"
              className="cursor-pointer text-[16px] sm:text-[24px] leading-[1em] text-[#D1A941] hover:text-[#ffffff] transition-colors duration-300"
              onClick={() => {
                nameRef.current && (nameRef.current.value = "");
                setPastRabbisSearchQuery("");
              }}
            >
              איפוס סינון
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
