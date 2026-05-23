"use client";
import FsLightbox from "fslightbox-react";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ViewIcon2 from "../assets/icons/ViewIcon2";
import Frame from "../assets/images/pictures-frame.png";
import CreateShimmerDataUrl from "./CreateShimmerDataUrl";

interface ChildProps {
  key: number;
  data: any;
}

function getImageSrc(image: any) {
  if (!image) {
    return "";
  }

  if (typeof image === "string") {
    return image;
  }

  return (
    image?.sizes?.large?.url ||
    image?.sizes?.full?.url ||
    image?.url ||
    image?.src ||
    ""
  );
}

export default function SingleCyclePicture(props: ChildProps) {
  // Section Data
  const SingleData = props.data || {};
  const imageSrc = getImageSrc(SingleData?.acf?.image);

  // Lightbox State
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  const openLightbox = () => {
    setLightboxController((prev) => ({
      toggler: !prev.toggler,
      slide: 1,
    }));
  };

  return (
    <div className="single-cycle-picture w-[44.27vw] will-change-transform">
      {imageSrc && (
        <FsLightbox
          toggler={lightboxController.toggler}
          sources={[imageSrc]}
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
              <div className="picture-image absolute top-5 left-5 right-5 bottom-5 z-10 w-auto h-auto">
                <Image
                  className="w-full object-cover object-center h-full relative z-10 will-change-transform"
                  src={imageSrc}
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
                className={`picture-content relative bg-[#1A1A1A] w-[28vw] h-auto z-30 2xl:text-[45px] xl:text-[35px] sm:text-[25px] leading-[1.2em] text-[#656158] m-auto`}
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
              className={`picture-view absolute top-0 left-0 w-full h-full flex items-center justify-center z-40 bg-[#00000080] transition-all duration-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible`}
              onClick={() => {
                if (imageSrc) {
                  openLightbox();
                }
              }}
            >
              <button
                type="button"
                className="w-30 h-30 p-4 bg-[#D1A941CC] rounded-full flex items-center justify-center cursor-pointer"
              >
                <ViewIcon2 />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="cycle-title mt-[5.8vh]">
        <h2 className="text-[55px] text-[#D1A941] leading-[70%] text-center">
          {parse(SingleData?.title)}
        </h2>
      </div>
    </div>
  );
}
