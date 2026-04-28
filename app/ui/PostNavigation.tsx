import ArrowLeft2 from "@/app/assets/icons/ArrowLeft2";
import ArrowRight from "@/app/assets/icons/ArrowRight";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useState } from "react";

interface ChildProps {
  extraClass: string;
  data: string;
}

export default function PostNavigation(props: ChildProps) {
  const [navigationData, setNavigationData] = useState(
    props.data ? JSON.parse(props.data) : null,
  );
  return (
    <div
      className={`post-navigation bg-black py-10 px-12 flex items-center justify-between ${props.extraClass}`}
    >
      {navigationData?.nextPost && (
        <Link
          href={navigationData?.nextPost?.link}
          className="next-post relative group"
        >
          <div className="image w-[6.4vw] h-[6.4vw] overflow-hidden">
            <Image
              className="w-full h-full object-cover object-center"
              src={navigationData?.nextPost?.image?.src}
              width={navigationData?.nextPost?.image?.width}
              height={navigationData?.nextPost?.image?.height}
              alt="News Image"
              blurDataURL={navigationData?.nextPost?.image?.blurDataURL}
              placeholder="blur"
              loading="lazy"
            />
          </div>
          <h4 className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-[#D1A941] text-black p-1.5 text-center text-[10px] leading-[70%] min-w-22 max-w-full">
            {navigationData?.nextPost.title}
          </h4>
          <div className="absolute top-1/2 -translate-y-1/2 right-full -mr-5 w-14 h-14 rounded-full bg-[#121616] hover:bg-[#1a1a1a] flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-3">
            <div className="w-8 h-auto transition-all duration-300 group-hover:translate-x-1">
              <ArrowRight />
            </div>
          </div>
        </Link>
      )}
      {navigationData?.prevPost && (
        <Link
          href={navigationData?.prevPost?.link}
          className="prev-post relative group"
        >
          <div className="image w-[6.4vw] h-[6.4vw] overflow-hidden">
            <Image
              className="w-full h-full object-cover object-center"
              src={navigationData?.prevPost?.image?.src}
              width={navigationData?.prevPost?.image?.width}
              height={navigationData?.prevPost?.image?.height}
              alt="News Image"
              blurDataURL={navigationData?.prevPost?.image?.blurDataURL}
              placeholder="blur"
              loading="lazy"
            />
          </div>
          <h4 className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-[#D1A941] text-black p-1.5 text-center text-[10px] leading-[70%] min-w-22 max-w-full">
            {navigationData?.prevPost.title}
          </h4>
          <div className="absolute top-1/2 -translate-y-1/2 left-full -ml-5 w-14 h-14 rounded-full bg-[#121616] hover:bg-[#1a1a1a] flex items-center justify-center text-white transition-all duration-300 group-hover:-translate-x-3">
            <div className="w-8 h-auto transition-all duration-300 group-hover:-translate-x-1">
              <ArrowLeft2 />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
