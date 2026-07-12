"use client";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "../AppContext";

interface ChildProps {
  data: any;
}

export default function SingleCommunityPost(props: ChildProps) {
  const postData = props.data;
  const pathname = usePathname();
  const router = useRouter();
  const { setIsLoading } = useAppState();

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
          <Image
            className="w-full object-cover object-center h-full relative z-10 group-hover:scale-105 transition-transform duration-500 ease-in-out"
            src={
              postData?.acf?.post_thumbnail?.sizes?.medium_large ||
              postData?.acf?.post_thumbnail?.src
            }
            width="467"
            height="267"
            blurDataURL={CreateShimmerDataUrl(467, 267)}
            placeholder={"blur"}
            loading="lazy"
            alt="Rabbis"
          />
          {/* <div className="post-image-overlay absolute top-0 left-0 w-[calc(100%+10px)] h-full bg-black z-20 -ml-2.5"></div> */}
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
