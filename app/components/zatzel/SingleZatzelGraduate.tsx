import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

interface ChildProps {
  title: string;
  content: string;
  image: any;
}

export default function SingleZatzelGraduate(props: ChildProps) {
  return (
    <div
      dir="ltr"
      className="single-zatzel-post group min-w-97.25 w-97.25 backface-hidden will-change-transform"
    >
      <Link href="/">
        <div className="post-image w-full h-101.5 mb-8.5 relative overflow-hidden backface-hidden">
          <Image
            className="w-full object-cover object-center h-full relative z-10 group-hover:scale-105 transition-transform duration-500 ease-in-out backface-hidden"
            src={props?.image?.src}
            width="389"
            height="406"
            blurDataURL={props?.image?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Rabbis"
          />
          <div className="post-image-overlay absolute top-0 left-0 w-[calc(100%+10px)] h-full bg-[#1a1a1a] z-20 -ml-2.5 backface-hidden"></div>
        </div>
        <div className="post-text text-[28px] text-(--theme-color) leading-[0.9em] text-right">
          <h5 className="post-excerpt font-extralight mb-2">
            {parse(props?.content)}
          </h5>
          <h2 className="post-title">{parse(props?.title)}</h2>
        </div>
      </Link>
    </div>
  );
}
