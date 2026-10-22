"use client";

import UserIcon from "@/app/assets/icons/UserIcon";
import HebrewDatePicker from "@/app/ui/HebrewDatePicker";
import { useRef } from "react";
import { useAppState } from "../AppContext";

interface SidebarProps {
  setSearchedData?: (data: string | null) => void;
  setZatzelPosts?: (posts: any) => void;
  allPosts?: any;
}

export default function ZatzelSidebar({
  setSearchedData,
  setZatzelPosts,
  allPosts,
}: SidebarProps) {
  const { zatzelSelectedDate, setZatzelSelectedDate } = useAppState();
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <HebrewDatePicker
        selectedDate={zatzelSelectedDate}
        onDateChange={setZatzelSelectedDate}
        className="date-picker search-group relative mb-[3vh] w-full"
        inputClassName="text-[16px] sm:text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full w-full pl-8"
        yearRangeBefore={100}
        inputAriaLabel="Search By Date Input"
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const searchValue = formData.get("search-by-user") as string;
          setSearchedData?.(searchValue || null);
        }}
        className="search-group relative"
      >
        <input
          ref={nameRef}
          className="text-[16px] sm:text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full w-full pl-8"
          type="text"
          id="search-by-user"
          name="search-by-user"
          placeholder="חיפוש לפי שם"
          aria-label="Search Zatzel Graduates by Name"
        />
        <button
          type="button"
          aria-label="Search Submit"
          className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2"
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
            setZatzelSelectedDate(null);
            setSearchedData?.(null);
            nameRef.current && (nameRef.current.value = "");
            setZatzelPosts?.(allPosts);
          }}
        >
          איפוס סינון
        </button>
      </div>
    </>
  );
}
