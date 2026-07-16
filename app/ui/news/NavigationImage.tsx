import Image from "next/image";
import { useState } from "react";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";
import { getNewsImageSrc, isWordPressUploadImage } from "./newsImageUtils";

export default function NavigationImage({ image }: { image: any }) {
  const [loading, setLoading] = useState(true);
  const imageSrc = getNewsImageSrc(image);
  const isWpUploadImage = isWordPressUploadImage(imageSrc);

  if (!imageSrc) {
    return <div className="w-full h-full bg-gray-100" />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {loading && (
        <div className="animate-pulse w-full h-full bg-gray-100"></div>
      )}
      <Image
        className={`w-full h-full object-cover object-center transition-all duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setLoading(false)}
        src={imageSrc}
        width={230}
        height={230}
        alt="News Image"
        blurDataURL={CreateShimmerDataUrl(230, 230) || image?.blurDataURL}
        placeholder="blur"
        loading="lazy"
        unoptimized={isWpUploadImage}
      />
    </div>
  );
}
