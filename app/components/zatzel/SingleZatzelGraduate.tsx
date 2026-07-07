import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import parse from "html-react-parser";
import Image from "next/image";

interface PostData {
  title: string;
  image: any;
  yearOfDeath: string;
}
interface ChildProps {
  data: PostData;
  dataIndex: number;
}

export default function SingleZatzelGraduate(props: ChildProps) {
  const ItemData = props.data;

  return (
    <div
      dir="ltr"
      data-index={props.dataIndex}
      className="single-zatzel-post group min-w-97.25 w-97.25 backface-hidden will-change-transform cursor-pointer"
    >
      <div className="post-image w-full h-101.5 mb-8.5 relative overflow-hidden backface-hidden">
        <Image
          className="w-full object-cover object-center h-full relative z-10 group-hover:scale-105 transition-transform duration-500 ease-in-out backface-hidden"
          src={
            ItemData?.image?.sizes?.medium ||
            ItemData?.image?.url ||
            ItemData?.image?.src
          }
          width="389"
          height="406"
          blurDataURL={
            ItemData?.image?.blurDataURL || CreateShimmerDataUrl(389, 406)
          }
          placeholder={"blur"}
          loading="lazy"
          alt="Rabbis"
        />
      </div>
      <div className="post-text text-[28px] text-(--theme-color) leading-[0.9em] text-right">
        <h2 className="post-title font-extralight mb-2">
          {parse(ItemData?.title || "כותרת פוסט")}
        </h2>
        <p className="post-excerpt">
          <span>שנת פטירה:</span>{" "}
          {parse(ItemData?.yearOfDeath) || `כ"ו בסיוון ה'תשע"א `}
        </p>
      </div>
    </div>
  );
}
