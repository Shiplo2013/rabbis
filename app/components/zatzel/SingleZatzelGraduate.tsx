import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import parse from "html-react-parser";
import { formatJewishDateInHebrew, toJewishDate } from "jewish-date";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppState } from "../AppContext";

interface PostData {
  title: string;
  image: any;
  yearOfDeath: string;
  id: number;
}
interface ChildProps {
  data: PostData;
  dataIndex: number;
  catIndex: number;
}

export default function SingleZatzelGraduate(props: ChildProps) {
  const ItemData = props.data;
  const { setZatzelActivePopup, setZatzelPopupIndex } = useAppState();

  const [hebrewDateStr, setHebrewDateStr] = useState<string>("");

  useEffect(() => {
    const deathDate = new Date(props.data?.yearOfDeath);

    // Convert native Gregorian date to Jewish calendar parts
    const jewishDateObj = toJewishDate(deathDate);

    // Format output directly into classic Hebrew Gematria patterns
    // Token 'D' outputs day Gematria, 'MMMM' outputs Hebrew month, 'YYYY' outputs year Gematria
    const formatted = formatJewishDateInHebrew(jewishDateObj, "D MMMM YYYY");

    setHebrewDateStr(formatted);
  }, [props.data?.yearOfDeath]);
  return (
    <div
      dir="ltr"
      data-index={props.dataIndex}
      data-date={props.data?.yearOfDeath}
      onClick={() => {
        setZatzelPopupIndex({
          catIndex: props.catIndex,
          postIndex: props.dataIndex,
        });
        setZatzelActivePopup(true);
      }}
      className="single-zatzel-post group w-full sm:w-[calc((100%-5vw)/2)] lg:w-[calc((100%-120px)/4)] backface-hidden will-change-transform cursor-pointer"
    >
      <div className="post-image w-full h-75 sm:h-60 lg:h-80 mb-5 sm:mb-8.5 relative overflow-hidden backface-hidden">
        <Image
          className="w-full object-cover object-center h-full relative z-10 group-hover:scale-105 transition-transform duration-500 ease-in-out backface-hidden"
          src={
            ItemData?.image?.sizes?.medium ||
            ItemData?.image?.url ||
            ItemData?.image?.src
          }
          width="336"
          height="320"
          blurDataURL={
            ItemData?.image?.sizes?.thumbnail ||
            ItemData?.image?.blurDataURL ||
            CreateShimmerDataUrl(336, 320)
          }
          placeholder={"blur"}
          loading="lazy"
          alt={ItemData?.title || ""}
          unoptimized
        />
      </div>
      <div className="post-text text-[18px] sm:text-[25px] text-(--theme-color) leading-[0.9em] text-right">
        <h2 className="post-title mb-2 font-bold">
          {parse(ItemData?.title || "כותרת פוסט")}
        </h2>
        <p className="post-excerpt">
          <span>שנת פטירה:</span> {hebrewDateStr || `כ"ו בסיוון ה'תשע"א `}
        </p>
      </div>
    </div>
  );
}
