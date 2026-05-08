import parse from "html-react-parser";
import Image from "next/image";

interface ChildProps {
  title: string;
  image: any;
}

export default function SingleRabbis(props: ChildProps) {
  return (
    <div dir="ltr" className="single-rabbis min-w-84 w-84 backface-hidden">
      <div className="rabbis-image w-full h-86 mb-8.5 relative overflow-hidden">
        <Image
          className="w-full object-cover object-center h-full relative z-10"
          src={props?.image?.src}
          width="336"
          height="334"
          blurDataURL={props?.image?.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Rabbis"
        />
        <div className="rabbis-image-overlay absolute top-0 left-0 w-[calc(100%+10px)] h-full bg-black z-20 -ml-2.5"></div>
      </div>
      <div className="rabbis-text text-[28px] text-(--theme-color) leading-[0.9em]">
        <p>{parse(props?.title)}</p>
      </div>
    </div>
  );
}
