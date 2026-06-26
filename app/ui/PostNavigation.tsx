import ArrowLeft2 from "@/app/assets/icons/ArrowLeft2";
import ArrowRight from "@/app/assets/icons/ArrowRight";
import parse from "html-react-parser";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useMemo } from "react";
import CreateShimmerDataUrl from "./CreateShimmerDataUrl";

type NewsPostData = {
  title: string;
  content: string;
  slug: string;
  id: number;
  acf?: {
    gallery_title?: string;
    gallery: {
      type?: string;
      image?: any;
      video?: any;
    }[];
  };
};
interface ChildProps {
  extraClass: string;
  data: string;
  currentPostId: number;
  posts: NewsPostData[];
}

export default function PostNavigation(props: ChildProps) {
  const mapPostToNavigationItem = (post: any) => {
    const imageFromAcf = post?.acf?.gallery?.find(
      (item: any) => item.type === "image",
    )?.image;
    const image =
      typeof imageFromAcf === "string"
        ? { src: imageFromAcf }
        : imageFromAcf?.sizes?.thumbnail
          ? {
              src: imageFromAcf.sizes?.thumbnail,
              width: 300,
              height: 300,
              blurDataURL:
                CreateShimmerDataUrl(300, 300) ||
                imageFromAcf?.sizes?.thumbnail,
            }
          : imageFromAcf?.src
            ? imageFromAcf
            : null;

    return {
      title: parse(post?.title || ""),
      link: `/news/${post?.slug}`,
      image,
    };
  };

  const navigationData = useMemo(() => {
    const parsedData = props.data ? JSON.parse(props.data) : null;

    if (
      typeof props.currentPostId === "number" &&
      Array.isArray(props.posts) &&
      props.posts.length
    ) {
      const currentIndex = props.posts.findIndex(
        (post) => post?.id === props.currentPostId,
      );
      //console.log(currentIndex, "Current Index");

      if (currentIndex !== -1) {
        const prevPost =
          currentIndex > 0
            ? mapPostToNavigationItem(props.posts[currentIndex - 1])
            : null;
        const nextPost =
          currentIndex < props.posts.length - 1
            ? mapPostToNavigationItem(props.posts[currentIndex + 1])
            : null;

        return { prevPost, nextPost };
      }
    }

    return parsedData;
  }, [props.currentPostId, props.data, props.posts]);

  const nextImageSrc =
    navigationData?.nextPost?.image?.src || navigationData?.nextPost?.image;
  const prevImageSrc =
    navigationData?.prevPost?.image?.src || navigationData?.prevPost?.image;

  return (
    <div
      className={`post-navigation bg-black py-10 px-12 flex items-center justify-between ${props.extraClass}`}
    >
      {navigationData?.nextPost && (
        <Link
          href={navigationData?.nextPost?.link}
          className="next-post relative group"
        >
          <div className="image w-[12vw] h-[12vw] overflow-hidden">
            <Image
              className="w-full h-full object-cover object-center"
              src={navigationData?.nextPost?.image?.src}
              width={navigationData?.nextPost?.image?.width}
              height={navigationData?.nextPost?.image?.height}
              alt="News Image"
              blurDataURL={navigationData?.nextPost?.image?.blurDataURL}
              placeholder="blur"
              loading="lazy"
            />
          </div>
          <h4 className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-[#D1A941] text-black p-3 text-center text-[15px] leading-[70%] min-w-32 max-w-full">
            {navigationData?.nextPost.title}
          </h4>
          <div className="absolute top-1/2 -translate-y-1/2 right-full -mr-8 w-25 h-25 rounded-full bg-[#121616] hover:bg-[#1a1a1a] flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-3">
            <div className="w-12 h-auto transition-all duration-300 group-hover:translate-x-1">
              <ArrowRight />
            </div>
          </div>
        </Link>
      )}
      {navigationData?.prevPost && (
        <Link
          href={navigationData?.prevPost?.link}
          className="prev-post relative group mr-auto"
        >
          <div className="image w-[12vw] h-[12vw] overflow-hidden">
            <Image
              className="w-full h-full object-cover object-center"
              src={navigationData?.prevPost?.image?.src}
              width={navigationData?.prevPost?.image?.width}
              height={navigationData?.prevPost?.image?.height}
              alt="News Image"
              blurDataURL={navigationData?.prevPost?.image?.blurDataURL}
              placeholder="blur"
              loading="lazy"
            />
          </div>
          <h4 className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-[#D1A941] text-black p-3 text-center text-[15px] leading-[70%] min-w-32 max-w-full">
            {navigationData?.prevPost.title}
          </h4>
          <div className="absolute top-1/2 -translate-y-1/2 left-full -ml-8 w-25 h-25 rounded-full bg-[#121616] hover:bg-[#1a1a1a] flex items-center justify-center text-white transition-all duration-300 group-hover:-translate-x-3">
            <div className="w-12 h-auto transition-all duration-300 group-hover:-translate-x-1">
              <ArrowLeft2 />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
