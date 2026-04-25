"use client";
import ArrowLeftIcon2 from "@/app/assets/icons/ArrowLeftIcon2";
import parse from "html-react-parser";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useState } from "react";

interface ChildProps {
  key: number;
  data: string;
}

export default function SingleNews(props: ChildProps) {
  const [newsData, setNewsData] = useState<any>(
    props.data ? JSON.parse(props.data) : null,
  );

  return (
    <div className="single-news w-[53vw] h-full flex items-center gap-x-[5.9vw] will-change-transform">
      <div className="single-news-image w-[32vw] min-w-[32vw] h-[80vh] relative z-40">
        {newsData?.images?.map((item: any, index: number) => (
          <div
            key={index}
            className={`news-image news-image-${index} ${index === 0 ? "w-[22vw] h-[63vh] z-50" : "w-[30vw] h-[40vh]"} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-none`}
          >
            <Link className="cursor-none" href={newsData?.link || "#"}>
              <Image
                className="w-full h-full object-cover object-center"
                src={item.src}
                width={item.width}
                height={item.height}
                alt={`News Image ${index + 1}`}
                blurDataURL={item.blurDataURL}
                placeholder="blur"
                loading="lazy"
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="single-news-content flex flex-col gap-y-8.5 text-[#D1A941] w-[15vw] relative z-20">
        <h2 className="text-[55px] leading-[70%]">
          {parse(newsData?.title || "")}
        </h2>
        <p className="text-[28px] leading-[90%] font-light">
          {parse(newsData?.summary || "")}
        </p>
        <Link
          href={newsData?.link || "#"}
          className="read-more group text-[#D1A941] text-[24px] leading-[90%] font-light mt-2.5 flex items-center gap-x-2"
        >
          <span className="text">קרא עוד</span>
          <span className="icon block w-5 h-auto transition-transform duration-300 group-hover:-translate-x-1">
            <ArrowLeftIcon2 />
          </span>
        </Link>
      </div>
    </div>
  );
}
