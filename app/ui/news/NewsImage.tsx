import Image from "next/image";
import { useState } from "react";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";

export default function NewsImage({
  item,
  index,
}: {
  item: any;
  index: number;
}) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full h-full flex items-center justify-center">
      {loading && (
        <div className="animate-pulse w-full h-full bg-gray-600"></div>
      )}
      <Image
        className={`w-full h-full object-cover object-center transition-all duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setLoading(false)}
        src={
          item.image?.sizes?.medium_large ||
          item.image?.sizes?.large ||
          item?.src ||
          ""
        }
        width={item.image?.width}
        height={item.image?.height}
        alt={`News Image ${index + 1}`}
        blurDataURL={
          CreateShimmerDataUrl(item.image?.width, item.image?.height) ||
          item.image?.blurDataURL
        }
        placeholder="blur"
        loading="lazy"
      />
    </div>
  );
}
