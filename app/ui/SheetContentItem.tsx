"use client";
import FsLightbox from "fslightbox-react";
import Image from "next/image";
import { useState } from "react";
import ArrowDownIcon from "../assets/icons/ArrowDownIcon";
import ViewIcon from "../assets/icons/ViewIcon";
import sheetImg from "../assets/images/sheet-image1.jpg";
import CreateShimmerDataUrl from "./CreateShimmerDataUrl";
import ThemeButton2 from "./ThemeButton2";

export default function SheetContentItem(props: { data?: any }) {
  const itemData = props.data || {};
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
  const [loading, setLoading] = useState(true);

  return (
    itemData && (
      <div className="sheet-item will-change-transform overflow-hidden min-w-[18vw]">
        {itemData?.acf?.thumbnail && (
          <FsLightbox
            toggler={lightboxController.toggler}
            sources={[
              itemData?.acf?.thumbnail?.sizes?.intro_background || sheetImg.src,
            ]}
            types={["image"]}
            slide={lightboxController.slide}
          />
        )}
        {itemData?.acf?.thumbnail && (
          <div className="sheet-image backface-hidden overflow-hidden relative">
            <Image
              className="w-full object-cover object-center h-full relative z-10 will-change-transform"
              src={
                itemData?.acf?.thumbnail?.sizes?.community_sheets_image ||
                itemData?.acf?.thumbnail?.sizes?.medium ||
                sheetImg.src
              }
              onLoadingComplete={() => setLoading(false)}
              width="337"
              height="476"
              blurDataURL={
                CreateShimmerDataUrl(337, 476) || sheetImg?.blurDataURL
              }
              placeholder={"blur"}
              loading="lazy"
              alt={itemData?.title || "Sheet Item Image"}
            />
          </div>
        )}
        {!loading && (
          <div className="sheet-icons flex justify-center mt-4.5 gap-x-4">
            <ThemeButton2
              extraClass="download w-11 h-11 flex item-center justify-center rounded-none cursor-pointer"
              bgColor="bg-[#C3A13F]"
              textColor="text-[#000000]"
              hoverBgColor="bg-[#ffffff]"
              svgIcon={<ArrowDownIcon />}
              svgIconClass={""}
              onClick={() => {
                if (itemData?.acf?.magazine) {
                  window.open(itemData?.acf?.magazine?.url, "_blank");
                }
              }}
            />
            <ThemeButton2
              extraClass="view-button w-11 h-11 flex item-center justify-center rounded-none cursor-pointer"
              bgColor="bg-[#C3A13F]"
              textColor="text-[#000000]"
              hoverBgColor="bg-[#ffffff]"
              svgIcon={<ViewIcon />}
              svgIconClass={""}
              onClick={() => {
                if (itemData?.acf?.thumbnail) {
                  openLightbox();
                }
              }}
            />
          </div>
        )}
        {loading && (
          <div className="flex h-full items-center justify-center absolute top-0 left-0 w-full z-40 bg-black">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4" />
            </div>
          </div>
        )}
      </div>
    )
  );
}
