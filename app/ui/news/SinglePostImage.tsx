"use client";
import Image from "next/image";
import { useState } from "react";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";
import { getNewsImageSrc, isWordPressUploadImage } from "./newsImageUtils";

export default function SinglePostImage(item: any) {
  const [loading, setLoading] = useState(true);
  const imageSrc = getNewsImageSrc(item?.image);
  const isWpUploadImage = isWordPressUploadImage(imageSrc);
  const imageWidth = item?.image?.width || 1000;
  const imageHeight = item?.image?.height || 1000;

  if (!imageSrc) {
    return <div className="w-full h-full bg-black/20 blur-md" />;
  }

  return (
    <div className="w-full h-full relative">
      {loading && (
        <div className="animate-pulse w-full h-full bg-black/20 blur-md"></div>
      )}

      <Image
        className={`w-full h-full object-cover object-center`}
        onLoad={() => setLoading(false)}
        src={imageSrc}
        width={imageWidth}
        height={imageHeight}
        alt="News Slide"
        blurDataURL={
          item?.image?.sizes?.thumbnail ||
          CreateShimmerDataUrl(imageWidth, imageHeight) ||
          item.image?.blurDataURL
        }
        placeholder="blur"
        loading="lazy"
        unoptimized={isWpUploadImage}
      />
    </div>
  );
}
