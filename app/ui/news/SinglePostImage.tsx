"use client";
import Image from "next/image";
import { useState } from "react";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";

export default function SinglePostImage(item: any) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="animate-pulse w-full h-full bg-black/20 blur-md"></div>
      )}

      <Image
        className={`w-full h-full object-cover object-center transition-all duration-300`}
        onLoadingComplete={() => setLoading(false)}
        src={
          item?.image?.sizes?.news_slider_image ||
          item?.image?.sizes?.large ||
          item?.image?.sizes?.medium ||
          item?.image?.src ||
          ""
        }
        width={window.innerWidth * 0.4}
        height={window.innerHeight}
        alt="News Slide"
        blurDataURL={
          item?.image?.sizes?.thumbnail ||
          CreateShimmerDataUrl(window.innerWidth * 0.4, window.innerHeight) ||
          item.image?.blurDataURL
        }
        placeholder="blur"
        loading="lazy"
      />
    </div>
  );
}
