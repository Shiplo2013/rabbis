import ArrowLeftBottom from "../assets/icons/ArrowLeftBottom";
import ThemeButton from "./ThemeButton";

export default function CustomContentItem() {
  const data = {
    quote: `״טל תן לרצות ארצך״`,
    title: `היכן אומרים ׳תפילת טל׳`,
    excerpt: `איתא בתענית (ג, א) שבימות הגשמים חייבים להזכיר גשמים ("משיב הרוח ומוריד הגשם"), ובימות הקיץ אין חיוב להזכיר טל ורוחות...`,
  };
  return (
    <div className="custom-content-item bg-[#FBF4E6] border border-[#D1CECE] relative will-change-transform w-[25.4vw] py-[8.8vh] pr-7 pl-[4.5vw] text-[#000000]">
      <div className="custom-content-wrapper">
        <h3 className="text-[#231F20] text-[38px] leading-[1em] font-bold mb-2">
          {data.quote}
        </h3>
        <h2 className="text-[38px] leading-[1em] mb-[5.5vh]">{data.title}</h2>
        <div className="excerpt text-[22px] leading-[0.9em]">
          {data.excerpt}
        </div>
      </div>
      <div className="post-button absolute left-7 bottom-7.5">
        <ThemeButton
          extraClass="w-15 h-12.5 flex items-center justify-center rounded-full"
          bgColor={"bg-[#C3A13F]"}
          svgIconClass={""}
          svgIcon={
            <ArrowLeftBottom
              extraClass={
                "group-hover:fill-white transition-all duration-300 ease-in-out"
              }
            />
          }
          hoverBgColor="bg-black"
        />
      </div>
    </div>
  );
}
