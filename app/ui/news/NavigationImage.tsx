import Image from "next/image";
import { useState } from "react";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";

export default function NavigationImage({ image }: { image: any }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full h-full flex items-center justify-center">
      {loading && (
        <div className="animate-pulse w-full h-full bg-gray-100"></div>
      )}
      <Image
        className={`w-full h-full object-cover object-center transition-all duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
        onLoad={() => setLoading(false)}
        src={image?.sizes?.medium || image?.sizes?.thumbnail || image?.src}
        width={230}
        height={230}
        alt="News Image"
        blurDataURL={CreateShimmerDataUrl(230, 230) || image?.blurDataURL}
        placeholder="blur"
        loading="lazy"
      />
    </div>
  );
}
