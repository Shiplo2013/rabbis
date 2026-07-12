import Image from "next/image";
import { useState } from "react";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";

export default function CommunityImage({ item }: { item: any }) {
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Append a cache-busting query string if a retry is triggered
  const imageSrc =
    retryCount > 0
      ? `${item?.content?.image?.sizes?.medium}`
      : item?.content?.image?.sizes?.medium;

  const handleError = () => {
    if (retryCount < maxRetries) {
      // Delay slightly before retrying to give a flapping network time to recover
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
      }, 1000);
    } else {
      console.error(`Image failed to load after ${maxRetries} attempts.`);
    }
  };
  return (
    <div className="image w-xl max-w-full h-auto relative">
      {loading && (
        <div className="animate-pulse w-full h-full bg-gray-200 absolute top-0 left-0"></div>
      )}
      <Image
        className={`w-full h-full object-cover object-center transition-all duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
        onLoadingComplete={() => setLoading(false)}
        onError={handleError}
        src={imageSrc}
        width={576}
        height={576}
        alt={item?.content?.caption || "Community Image"}
        blurDataURL={CreateShimmerDataUrl(576, 576)}
        placeholder="blur"
        loading="lazy"
      />
    </div>
  );
}
