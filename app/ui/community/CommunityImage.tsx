import Image from "next/image";
import { useState } from "react";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";

export default function CommunityImage({ item }: { item: any }) {
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const baseImageSrc =
    item?.content?.image?.sizes?.medium ||
    item?.content?.image?.sizes?.medium_large ||
    item?.content?.image?.sizes?.large ||
    item?.content?.image?.url ||
    item?.content?.image?.src;

  const [imageSrc, setImageSrc] = useState(baseImageSrc);
  const isWpUploadImage =
    typeof imageSrc === "string" &&
    imageSrc.includes("dovp7.sg-host.com/wp-content/uploads/");

  const removeWpSizeSuffix = (url: string) =>
    url.replace(/-\d+x\d+(?=\.[a-zA-Z]+(?:\?|$))/, "");

  const addRetryQuery = (url: string) =>
    `${url}${url.includes("?") ? "&" : "?"}retry=${Date.now()}`;

  const handleError = () => {
    if (
      typeof imageSrc === "string" &&
      /-\d+x\d+(?=\.[a-zA-Z]+(?:\?|$))/.test(imageSrc)
    ) {
      const fallbackSrc = removeWpSizeSuffix(imageSrc);
      if (fallbackSrc !== imageSrc) {
        setImageSrc(fallbackSrc);
        return;
      }
    }

    if (retryCount < maxRetries) {
      // Delay slightly before retrying to give a flapping network time to recover
      setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        if (typeof imageSrc === "string") {
          setImageSrc(addRetryQuery(imageSrc));
        }
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
        unoptimized={isWpUploadImage}
      />
    </div>
  );
}
