import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";

interface ChildProps {
  title: string;
  content: string;
  image: any;
}

export default function SingleCommunittyPost(props: ChildProps) {
  return (
    <div
      dir="ltr"
      className="single-community-post group min-w-116 w-116.75 backface-hidden"
    >
      <Link href="/">
        <div className="post-image w-full h-66.75 mb-8.5 relative overflow-hidden backface-hidden">
          <Image
            className="w-full object-cover object-center h-full relative z-10 group-hover:scale-105 transition-transform duration-500 ease-in-out"
            src={props?.image?.src}
            width="467"
            height="267"
            blurDataURL={props?.image?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Rabbis"
          />
          <div className="post-image-overlay absolute top-0 left-0 w-[calc(100%+10px)] h-full bg-black z-20 -ml-2.5"></div>
        </div>
        <div className="post-text text-[28px] text-(--theme-color) leading-[0.9em] text-right">
          <h5 className="post-excerpt font-extralight mb-4">
            {parse(props?.content)}
          </h5>
          <h2 className="post-title font-bold">{parse(props?.title)}</h2>
        </div>
      </Link>
    </div>
  );
}
