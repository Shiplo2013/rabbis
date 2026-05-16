import ArrowLeft2 from "@/app/assets/icons/ArrowLeft2";
import ArrowRight from "@/app/assets/icons/ArrowRight";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface ChildProps {
  extraClass?: string;
  data?: string;
  currentPostId?: number;
  posts?: any[];
}

export default function PostNavigation(props: ChildProps) {
  const mapPostToNavigationItem = (post: any) => {
    const imageFromAcf = post?.acf?.thumbnail;
    const image =
      typeof imageFromAcf === "string"
        ? { src: imageFromAcf }
        : imageFromAcf?.url
          ? {
              src: imageFromAcf.url,
              width: imageFromAcf.width,
              height: imageFromAcf.height,
              blurDataURL: imageFromAcf?.sizes?.thumbnail,
            }
          : imageFromAcf?.src
            ? imageFromAcf
            : null;

    return {
      title: post?.acf?.title || post?.title || "",
      link: `/past-rabbis/${post?.slug}`,
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
          className="next-post relative group ml-auto"
        >
          {nextImageSrc ? (
            <div className="image w-[12vw] h-[12vw] overflow-hidden">
              <Image
                className="w-full h-full object-cover object-center"
                src={nextImageSrc}
                width={navigationData?.nextPost?.image?.width || 400}
                height={navigationData?.nextPost?.image?.height || 400}
                alt="Next post image"
                blurDataURL={navigationData?.nextPost?.image?.blurDataURL}
                placeholder={
                  navigationData?.nextPost?.image?.blurDataURL
                    ? "blur"
                    : "empty"
                }
                loading="lazy"
              />
            </div>
          ) : (
            <div className="image w-[12vw] h-[12vw] overflow-hidden bg-[#1a1a1a]" />
          )}
          <h4 className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-[#D1A941] text-black p-2 text-center text-[13px] leading-[80%] min-w-32 max-w-full">
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
          {prevImageSrc ? (
            <div className="image w-[12vw] h-[12vw] overflow-hidden">
              <Image
                className="w-full h-full object-cover object-center"
                src={prevImageSrc}
                width={navigationData?.prevPost?.image?.width || 400}
                height={navigationData?.prevPost?.image?.height || 400}
                alt="Previous post image"
                blurDataURL={navigationData?.prevPost?.image?.blurDataURL}
                placeholder={
                  navigationData?.prevPost?.image?.blurDataURL
                    ? "blur"
                    : "empty"
                }
                loading="lazy"
              />
            </div>
          ) : (
            <div className="image w-[12vw] h-[12vw] overflow-hidden bg-[#1a1a1a]" />
          )}
          <h4 className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-[#D1A941] text-black p-2 text-center text-[13px] leading-[80%] min-w-32 max-w-full">
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
