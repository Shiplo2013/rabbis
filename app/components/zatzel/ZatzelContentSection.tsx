import CalenderIcon from "@/app/assets/icons/CalenderIcon";
import UserIcon from "@/app/assets/icons/UserIcon";
import { StaticImageData } from "next/image";
import ZatzelPostCat from "./ZatzelPostCat";

interface ZatzelCatData {
  catTitle: string;
  catPosts: { title: string; content: string; image: StaticImageData }[];
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  sectionData: ZatzelCatData[];
}

export default function ZatzelContentSection(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="sheet-wrapper w-full h-auto flex items-center gap-x-[10vw]">
        <div className="sheet-sidebar w-70 min-w-70 h-full will-change-transform overflow-hidden">
          <div className="sheet-sidebar-wrapper">
            <div className="search-group relative mb-[3vh]">
              <input
                className="text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full pl-8"
                type="text"
                id="search-by-date"
                name="Search-By-Date"
                placeholder="חיפוש לפי תאריך"
              />
              <button className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2">
                <CalenderIcon />
              </button>
            </div>
            <div className="search-group relative">
              <input
                className="text-[24px] text-[#D1A941] placeholder:text-black leading-[1em] bg-white py-3 pr-4 focus:outline-0 max-w-full pl-8"
                type="text"
                id="search-by-user"
                name="Search-By-User"
                placeholder={`חיפוש לפי שם`}
              />
              <button className="cursor-pointer absolute top-1/2 left-3 -translate-y-1/2">
                <UserIcon />
              </button>
            </div>
          </div>
        </div>
        <div className="sheet-content flex items-center gap-x-[10vw] will-change-transform">
          {/* {props.sectionData?.map((item, index) => (
            <SingleCyclePicture key={index} data={item} />
          ))} */}
          {props.sectionData.map((item, index) => (
            <ZatzelPostCat key={index} className={""} postsContent={item} />
          ))}
        </div>
        <div className="sheet-readmore min-w-[10vw] w-[10vw]">
          <button className="text-[45px] leading-[1em] text-[#656158] border-b border-[#AAA497] cursor-pointer hover:text-white hover:border-[#C3A13F] transition-all duration-500">
            טען עוד
          </button>
        </div>
      </div>
    </section>
  );
}
