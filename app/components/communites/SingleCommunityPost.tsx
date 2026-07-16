"use client";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAppState } from "../AppContext";

interface ChildProps {
  data: any;
}

export default function SingleCommunityPost(props: ChildProps) {
  const postData = props.data;
  const pathname = usePathname();
  const router = useRouter();
  const { setIsLoading } = useAppState();
  const [loading, setLoading] = useState(false);

  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };

  return (
    <div
      dir="ltr"
      className="single-community-post group min-w-116 w-116.75 backface-hidden"
    >
      <Link
        href={postData?.slug ? `/communities/${postData.slug}` : "#"}
        className="block w-full h-full"
        onClick={handleLinkClick}
      >
        <div className="post-image w-full h-66.75 mb-8.5 relative overflow-hidden backface-hidden">
          {loading && (
            <div className="animate-pulse w-full h-full bg-gray-200 absolute top-0 left-0"></div>
          )}
          <Image
            className={`w-full h-full object-cover object-center transition-transform group-hover:scale-105 duration-500 ease-in-out ${loading ? "opacity-0" : "opacity-100"}`}
            onLoad={() => setLoading(false)}
            src={
              postData?.acf?.post_thumbnail?.sizes?.community_post_image ||
              postData?.acf?.post_thumbnail?.sizes?.medium ||
              postData?.acf?.post_thumbnail?.src
            }
            width="467"
            height="267"
            blurDataURL={CreateShimmerDataUrl(467, 267)}
            placeholder={"blur"}
            loading="lazy"
            alt="Rabbis"
          />
        </div>
        <div className="post-text text-[28px] text-(--theme-color) leading-[0.9em] text-right">
          <h2 className="post-title font-extralight mb-4">
            {parse(postData?.title?.rendered || "")}
          </h2>
          <h5 className="post-location font-bold">
            {parse(postData?.acf?.subtitle)}
          </h5>
        </div>
      </Link>
    </div>
  );
}
