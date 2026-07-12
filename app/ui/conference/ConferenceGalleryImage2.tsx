import Image from "next/image";
import { useMemo, useState } from "react";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";

export default function ConferenceGalleryImage2({
  item,
  index,
}: {
  item: any;
  index: number;
}) {
  const imageBlurPlaceholder = useMemo(
    () => CreateShimmerDataUrl(1920, 1080),
    [],
  );
  const [loading, setLoading] = useState(true);
  return (
    <div
      key={index}
      className="single-gallery will-change-transform w-[26.56vw] h-[81.48vh] overflow-hidden"
    >
      {loading && (
        <div className="animate-pulse w-full h-full bg-gray-600"></div>
      )}
      <div
        className={`single-gallery-image w-[60vw] h-[85vh] absolute top-1/2 left-1/2 -translate-[50%] ${loading ? "opacity-0" : "opacity-100"}`}
      >
        <Image
          className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
          src={item?.sizes?.large || item?.image?.src}
          width={item?.sizes?.large?.width || item?.image?.width || 1920}
          height={item?.sizes?.large?.height || item?.image?.height || 1080}
          blurDataURL={item?.image?.blurDataURL || imageBlurPlaceholder}
          placeholder={"blur"}
          loading="lazy"
          alt="Gallery Image"
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
    </div>
  );
}
