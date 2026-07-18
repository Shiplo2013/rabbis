import Image from "next/image";
import { useState } from "react";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";
export default function ZatzelImage({ data }: { data: any }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full h-full">
      {loading && (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <div className="loader"></div>
        </div>
      )}
      <Image
        src={data || ""}
        alt="Popup Thumbnail"
        width={196}
        height={205}
        className="w-full h-full object-cover object-center"
        onLoad={() => setLoading(false)}
        onChange={() => setLoading(true)}
        blurDataURL={CreateShimmerDataUrl(196, 205)}
        placeholder="blur"
        loading="lazy"
      />
    </div>
  );
}
