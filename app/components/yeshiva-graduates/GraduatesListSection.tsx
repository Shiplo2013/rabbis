import SingleGraduates from "@/app/ui/SingleGraduates";
import Link from "next/link";
import { useRef } from "react";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  GraduateData: { title: string; content: string }[];
}

export default function GraduateListSection(props: ChildProps) {
  // Selector
  const scrollbarRef = useRef<HTMLDivElement>(null);
  // Section Data
  const Years = ["תשפ״ו", "תשפ״ה", "תשפ״ד", "תשפ״ג"];
  // Section Animation
  //   useEffect(() => {
  //     const selectYears = scrollbarRef.current?.querySelectorAll(".year-month");
  //     if (selectYears) {
  //       selectYears[0].querySelector(".months")?.classList.remove("hidden");
  //       selectYears[0].querySelector(".months")?.classList.add("flex");
  //     }
  //   }, []);
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-[#1A1A1A] flex items-center justify-start relative z-20`}
    >
      <div className="graduates-wrapper w-full h-auto flex items-center gap-x-[9.16vw]">
        <div className="sheet-content flex items-stretch gap-x-[3.3vw] will-change-transform">
          {props.GraduateData?.map((item, index) => (
            <SingleGraduates key={index} data={item} />
          ))}
        </div>
        <div className="graduate-readmore w-[38vw] flex flex-col gap-y-[9.36vh]">
          <div className="readmore-link border-t border-b border-[#D1A941]">
            <Link
              href={"/"}
              className="text-[55px] leading-[70%] text-[#D1A941] py-[5.38vh] block"
            >
              כנסת המנהגים
            </Link>
          </div>
          <div className="readmore-link border-t border-b border-[#D1A941]">
            <Link
              href={"/"}
              className="text-[55px] leading-[70%] text-[#D1A941] py-[5.38vh] block"
            >
              עד שבחברון - חדשות
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
