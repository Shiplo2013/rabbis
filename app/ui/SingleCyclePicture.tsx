"use client";
import parse from "html-react-parser";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ViewIcon2 from "../assets/icons/ViewIcon2";
import Frame from "../assets/images/pictures-frame.png";
import CreateShimmerDataUrl from "./CreateShimmerDataUrl";

interface ChildProps {
  key: number;
  data: any;
}

const FsLightbox = dynamic(() => import("fslightbox-react"), {
  ssr: false,
}) as any;

function getImageSrc(image: any) {
  if (!image) {
    return "";
  }

  if (typeof image === "string") {
    return image;
  }

  return (
    image?.sizes?.large || image?.sizes?.url || image?.url || image?.src || ""
  );
}

export default function SingleCyclePicture(props: ChildProps) {
  // Section Data
  const SingleData = props.data || {};
  const imageSrc = getImageSrc(SingleData?.acf?.image);
  const lightboxImageSrc =
    SingleData?.acf?.image?.sizes?.large ||
    SingleData?.acf?.image?.url ||
    SingleData?.acf?.image?.src ||
    "";

  // Lightbox State
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });
  const [isLightboxMounted, setIsLightboxMounted] = useState(false);

  const warmupLightbox = () => {
    if (typeof window !== "undefined") {
      import("fslightbox-react");
    }

    if (lightboxImageSrc && typeof window !== "undefined") {
      const preloadImage = new window.Image();
      preloadImage.src = lightboxImageSrc;
    }

    setIsLightboxMounted(true);
  };

  const openLightbox = () => {
    warmupLightbox();
    setLightboxController((prev) => ({
      toggler: !prev.toggler,
      slide: 1,
    }));
  };

  useEffect(() => {
    if (!imageSrc) {
      return;
    }

    const runWarmup = () => {
      warmupLightbox();
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const idleId = (
        window as Window & {
          requestIdleCallback: (
            callback: IdleRequestCallback,
            options?: IdleRequestOptions,
          ) => number;
          cancelIdleCallback: (id: number) => void;
        }
      ).requestIdleCallback(runWarmup, { timeout: 3000 });

      return () => {
        (
          window as Window & {
            cancelIdleCallback: (id: number) => void;
          }
        ).cancelIdleCallback(idleId);
      };
    }

    const timeoutId = setTimeout(runWarmup, 1200);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [imageSrc, lightboxImageSrc]);

  return (
    <div className="single-cycle-picture w-full lg:w-[44.27vw] min-w-[44.27vw] will-change-transform">
      {imageSrc && isLightboxMounted && (
        <FsLightbox
          toggler={lightboxController.toggler}
          sources={[lightboxImageSrc]}
          types={["image"]}
          slide={lightboxController.slide}
        />
      )}

      <div className="cycle-frame relative">
        <div className="group relative z-40 w-full h-full max-w-full">
          <Image
            className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
            src={Frame?.src}
            width="855"
            height="547"
            blurDataURL={Frame?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Graduates"
          />
          <div className="cycle-content-wrapper absolute top-0 left-0 z-10 w-full h-full overflow-hidden flex items-center justify-center">
            {imageSrc ? (
              <div className="picture-image absolute top-2.5 left-2.5 right-2.5 bottom-2.5 sm:top-5 sm:left-5 sm:right-5 sm:bottom-5 z-10 w-auto h-auto">
                <Image
                  className="w-full object-cover object-center h-full relative z-10 will-change-transform"
                  src={
                    SingleData?.acf?.image?.sizes?.large ||
                    SingleData?.acf?.image?.url
                  }
                  width="855"
                  height="547"
                  blurDataURL={
                    CreateShimmerDataUrl(855, 547) ||
                    SingleData?.acf?.image?.blurDataURL
                  }
                  placeholder={"blur"}
                  loading="lazy"
                  alt="Graduates"
                />
              </div>
            ) : (
              <div
                className={`picture-content relative bg-[#1A1A1A] w-full lg:w-[28vw] h-auto z-30 lg:text-[45px] sm:text-[35px] text-[25px] leading-[1.2em] text-[#656158] m-auto`}
              >
                <p>
                  יש לך את תמונת המחזור של ועד ק״ל?
                  <br />
                  נשמח שתיצור איתנו קשר
                </p>
                <Link
                  href={"/contact"}
                  className="border-b border-[#D1A941] hover:border-[#ffffff] hover:text-white transition-all duration-300"
                >
                  לחץ כאן
                </Link>
              </div>
            )}
          </div>

          {imageSrc && (
            <div
              className={`picture-view absolute top-0 left-0 w-full h-full flex items-center justify-center z-40 bg-[#00000080] transition-all duration-500 lg:opacity-0 lg:invisible group-hover:opacity-100 group-hover:visible`}
              onMouseEnter={warmupLightbox}
              onClick={() => {
                if (imageSrc) {
                  openLightbox();
                }
              }}
            >
              <button
                type="button"
                className="w-15 h-15 sm:w-20 sm:h-20 lg:w-30 lg:h-30 p-3 sm:p-4 bg-[#D1A941CC] rounded-full flex items-center justify-center cursor-pointer"
              >
                <ViewIcon2 />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="cycle-title mt-8 sm:mt-10 lg:mt-[5.8vh]">
        <h2 className="text-[25px] sm:text-[35px] lg:text-[55px] text-[#D1A941] leading-[70%] text-center">
          {parse(SingleData?.title?.rendered || "")}
        </h2>
      </div>
    </div>
  );
}
