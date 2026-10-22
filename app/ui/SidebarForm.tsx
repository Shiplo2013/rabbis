"use client";

import UserIcon from "@/app/assets/icons/UserIcon";
import HebrewDatePicker from "@/app/ui/HebrewDatePicker";
import { useState } from "react";

export default function SidebarForm() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <>
      <HebrewDatePicker
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        inputClassName="text-[16px] sm:text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full w-full pl-8"
      />
      <div className="search-group relative">
        <input
          className="text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full pl-8"
          type="text"
          id="search-by-user"
          name="Search-By-User"
          placeholder="חיפוש לפי שם"
          aria-label="Search By User Input"
        />
        <button
          type="button"
          aria-label="Search By User Submit"
          className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2"
        >
          <UserIcon />
        </button>
      </div>
    </>
  );
}
