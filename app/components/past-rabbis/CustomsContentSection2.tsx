import UserIcon from "@/app/assets/icons/UserIcon";
import { useRef } from "react";
import { useAppState } from "../AppContext";
import PastRabbiCard from "./PastRabbiCard";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  data: any;
  style?: React.CSSProperties;
}

export default function CustomsContentSection2(props: ChildProps) {
  const rabbisPosts = props.data;
  const { setPastRabbisSearchQuery } = useAppState();
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <section
      dir="rtl"
      style={props.style}
      className={`${props.extraClass} rabbis-section bg-black flex items-start relative z-20 flex-col lg:flex-row`}
    >
      <div className="sheet-sidebar w-full lg:w-70 lg:min-w-70 h-auto z-20 mb-10 lg:mb-0 lg:py-[10vh] opacity-100 visible lg:opacity-0 lg:invisible">
        <div className="sheet-sidebar-wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const searchValue = formData.get("search-by-user") as string;
              setPastRabbisSearchQuery?.(searchValue || null);
            }}
            className="search-group relative"
          >
            <input
              ref={nameRef}
              className="text-[16px] sm:text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full w-full pl-8"
              type="text"
              id="search-by-user"
              name="search-by-user"
              placeholder={`חיפוש לפי שם`}
              aria-label="Search Past Rabbis by Name"
            />
            <button
              type="submit"
              aria-label="Submit Search"
              className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2"
            >
              <UserIcon />
            </button>
          </form>
          <div className="reset-filter mt-5 flex items-center justify-start gap-x-3">
            <button
              type="button"
              aria-label="Reset Search"
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
      <div className="rabbis-wrapper w-full h-full flex items-center justify-center gap-y-15 sm:gap-y-[10vh] gap-x-[10vw] flex-col">
        {rabbisPosts.map((item: any) => (
          <PastRabbiCard key={item.id} data={item} layout="list" />
        ))}
      </div>
    </section>
  );
}
