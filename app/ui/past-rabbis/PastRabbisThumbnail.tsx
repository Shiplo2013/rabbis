import Image from "next/image";
import { useState } from "react";

type MenuPost = {
  id?: number;
  title?: { rendered?: string };
  slug?: string;
  acf?: {
    title?: string;
    thumbnail?: { url?: string; src?: string; sizes?: { thumbnail?: string } };
  };
};

export default function PastRabbisThumbnail({ item }: { item: MenuPost }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="image-inner w-full h-full group-hover:scale-110 transition-all duration-300 grayscale group-hover:grayscale-0">
      {loading && (
        <div className="animate-pulse w-full h-full bg-gray-600"></div>
      )}
      <Image
        className={`w-full h-full object-cover object-center transition-all duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
        src={
          item?.acf?.thumbnail?.sizes?.thumbnail ||
          item?.acf?.thumbnail?.url ||
          item?.acf?.thumbnail?.src ||
          ""
        }
        width={122}
        height={125}
        alt={item?.acf?.title || "Rabbi image"}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}
