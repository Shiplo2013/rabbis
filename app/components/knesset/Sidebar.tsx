"use client";
import CaretIcon from "@/app/assets/icons/CaretIcon";
import SearchIcon from "@/app/assets/icons/SearchIcon";
import { useState } from "react";
import SidebarForm from "./SidebarForm";

interface SidebarProps {
  activeCategory: string | null;
  onCategorySelect: (id: string) => void;
  categories?: Array<{ id: number; name: string }>;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  setPostLoading?: (value: boolean) => void;
  setCurrentScrollPos?: (value: number) => void;
}

export default function Sidebar({
  activeCategory,
  onCategorySelect,
  categories,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  setPostLoading,
  setCurrentScrollPos,
}: SidebarProps) {
  // Menu State
  const [menuOpen, setMenuOpen] = useState(true);

  const catData = categories || [];

  const handleSearchSubmit = () => {
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
    if (setPostLoading) {
      setPostLoading(true);
    }
  };

  return (
    <div className="sheet-sidebar-wrapper text-[#1A1A1A]">
      <div className="search-group relative mb-[3.6vh]">
        <input
          className="text-[24px] text-[#D1A941] placeholder:text-[#D1A941] leading-[1em] bg-white p-2.25 focus:outline-0 max-w-full w-full pl-8"
          type="text"
          id="search-sheet"
          name="Search-Sheet"
          placeholder="חיפוש חופשי"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearchSubmit();
            }
          }}
        />
        <button
          type="button"
          onClick={handleSearchSubmit}
          className="cursor-pointer absolute top-1.5 left-1.75"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="sidebar-menu mb-[6.35vh]">
        <div
          className="head text-[#D1A941] text-[26px] leading-[1.4em] flex items-center gap-x-2 mb-1 cursor-pointer select-none"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <p>בחר נושא</p>
          <span
            className={`transition-transform duration-300 ${menuOpen ? "rotate-0" : "rotate-180"}`}
          >
            <CaretIcon />
          </span>
        </div>
        <div
          className="menu overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: menuOpen ? "500px" : "0px",
            opacity: menuOpen ? 1 : 0,
          }}
        >
          <ul className="category-list list-none flex flex-col text-[24px] leading-[1em] gap-y-2 font-medium">
            <li>
              <button
                onClick={() => {
                  onSearchChange("");
                  if (onCategorySelect) {
                    onCategorySelect("0");
                  }
                  if (onSearchSubmit) {
                    onSearchSubmit("");
                  }
                  if (setPostLoading) {
                    setPostLoading(true);
                  }
                  if (setCurrentScrollPos) {
                    setCurrentScrollPos(window.scrollY);
                  }
                }}
                className={`text-[24px] leading-[1em] transition-all duration-300 cursor-pointer ${
                  activeCategory === "0"
                    ? "text-[#D1A941]"
                    : "hover:text-[#999999]"
                }`}
              >
                כל המאמרים
              </button>
            </li>
            {catData?.map((item, index) => (
              <li key={index}>
                <button
                  data-category={item.id}
                  onClick={() => {
                    if (activeCategory === String(item.id)) {
                      return;
                    }
                    onCategorySelect(String(item.id));
                    if (setPostLoading) {
                      setPostLoading(true);
                    }
                    if (setCurrentScrollPos) {
                      setCurrentScrollPos(window.scrollY);
                    }
                  }}
                  className={`transition-all duration-300 cursor-pointer ${
                    activeCategory === String(item.id)
                      ? "text-[#D1A941]"
                      : "hover:text-[#999999]"
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sidebar-subscription">
        <h4 className="text-[24px] leading-[1.2em] font-medium mb-2.5">
          לקבלת עדכונים
          <br /> חדשים למייל:
        </h4>
        <SidebarForm />
      </div>
    </div>
  );
}
