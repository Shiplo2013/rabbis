"use client";
import CustomContentItem from "@/app/ui/CustomContentItem";
import { useRef, useState } from "react";
import Sidebar from "./Sidebar";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function CustomsContentSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Active category filter (null = show all)
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  // Search query
  const [searchQuery, setSearchQuery] = useState("");
  // Section Data
  const Years = ["תשפ״ו", "תשפ״ה", "תשפ״ד", "תשפ״ג"];
  // Contect Data
  const contentData = [
    {
      quote: `״טל תן לרצות ארצך״`,
      title: `היכן אומרים ׳תפילת טל׳`,
      excerpt: `איתא בתענית (ג, א) שבימות הגשמים חייבים להזכיר גשמים ("משיב הרוח ומוריד הגשם"), ובימות הקיץ אין חיוב להזכיר טל ורוחות...`,
      category: "category1",
    },
    {
      quote: `״טל תן לרצות ארצך״`,
      title: `היכן אומרים ׳תפילת טל׳`,
      excerpt: `איתא בתענית (ג, א) שבימות הגשמים חייבים להזכיר גשמים ("משיב הרוח ומוריד הגשם"), ובימות הקיץ אין חיוב להזכיר טל ורוחות...`,
      category: "category2",
    },
    {
      quote: `״טל תן לרצות ארצך״`,
      title: `היכן אומרים ׳תפילת טל׳`,
      excerpt: `איתא בתענית (ג, א) שבימות הגשמים חייבים להזכיר גשמים ("משיב הרוח ומוריד הגשם"), ובימות הקיץ אין חיוב להזכיר טל ורוחות...`,
      category: "category3",
    },
    {
      quote: `״טל תן לרצות ארצך״`,
      title: `היכן אומרים ׳תפילת טל׳`,
      excerpt: `איתא בתענית (ג, א) שבימות הגשמים חייבים להזכיר גשמים ("משיב הרוח ומוריד הגשם"), ובימות הקיץ אין חיוב להזכיר טל ורוחות...`,
      category: "category4",
    },
  ];

  const filteredData = contentData.filter((item) => {
    const matchesCategory = activeCategory
      ? item.category === activeCategory
      : true;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = q
      ? item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.quote.toLowerCase().includes(q)
      : true;
    return matchesCategory && matchesSearch;
  });
  //
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#F5F0EB] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-x-[5.8vw]">
        <div className="sheet-sidebar w-54.5 h-full will-change-transform overflow-hidden">
          <Sidebar
            activeCategory={activeCategory}
            onCategorySelect={(id) =>
              setActiveCategory((prev) => (prev === id ? null : id))
            }
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="sheet-content flex items-stretch gap-x-[3.2vw] will-change-transform">
          {filteredData.map((item, index) => (
            <CustomContentItem key={index} data={JSON.stringify(item)} />
          ))}
          <div className="subscribe-form bg-[#000000] text-white px-[2.5vw] py-[3.7vh] w-[26.35vw] flex items-center flex-col justify-center will-change-transform">
            <div className="subscribe-form-wrapper">
              <h2 className="2xl:text-[38px] xl:text-[30px] sm:text-[24px] leading-[0.8em]">
                קבלו ישירות למייל מאמרים חדשים, גיליונות תורניים ועדכוני תוכן מן
                הישיבה.
              </h2>
              <div className="form group 2xl:text-[22px] xl:text-[18px] sm:text-[16px] leading-[0.8em] mt-[4vh] flex justify-between items-end gap-x-2">
                <div className="flex items-center gap-x-1">
                  <label>שם</label>
                  <input
                    className="w-full border-b border-white p-0 leading-[0.7em] focus:outline-0"
                    name="name"
                    type="text"
                  />
                </div>
                <div className="flex items-center gap-x-1">
                  <label>דוא״ל</label>
                  <input
                    className="w-full border-b border-white p-0 leading-[0.7em] focus:outline-0"
                    name="email"
                    type="email"
                  />
                </div>
                <button className="2xl:text-[28px] xl:text-[24px] sm:text-[20px] leading-[0.8em] text-[#000000] bg-[#E7D45E] px-2.5 pb-2 pt-2.5 hover:bg-gray-800 hover:text-[#E7D45E] transition-all duration-300 cursor-pointer">
                  שלח
                </button>
              </div>
              <div className="text 2xl:text-[16px] xl:text-[14px] sm:text-[12px] leading-[1em] mt-[3vh] text-center">
                <p>אני מאשר/ת קבלת עדכונים מן הישיבה</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sheet-readmore">
          <button className="text-[45px] leading-[1em] text-[#656158] border-b border-[#AAA497] cursor-pointer hover:text-[#C3A13F] hover:border-[#C3A13F] transition-all duration-500">
            טען עוד
          </button>
        </div>
      </div>
    </section>
  );
}
