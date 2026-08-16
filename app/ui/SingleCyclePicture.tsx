"use client";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import ViewIcon2 from "../assets/icons/ViewIcon2";
import Frame from "../assets/images/pictures-frame.png";
import { useAppState } from "../components/AppContext";
import CreateShimmerDataUrl from "./CreateShimmerDataUrl";

interface ChildProps {
  key: number;
  index: number;
  data: any;
}

export default function SingleCyclePicture(props: ChildProps) {
  // Section Data
  const SingleData = props.data || {};

  const { setActiveCyclePopup, setCyclePopupIndex } = useAppState();

  return (
    <div
      data-index={props.index}
      className="single-cycle-picture w-full lg:w-[calc((100%-60px)/2)] will-change-transform"
    >
      <div className="cycle-frame relative">
        <div className="group relative z-40 w-full h-full max-w-full">
          <Image
            className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
            src={Frame?.src}
            width="702"
            height="450"
            blurDataURL={Frame?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Graduates"
          />
          <div className="cycle-content-wrapper absolute top-0 left-0 z-10 w-full h-full overflow-hidden flex items-center justify-center">
            {SingleData?.acf?.image ? (
              <div className="picture-image absolute top-2.5 left-2.5 right-2.5 bottom-2.5 sm:top-5 sm:left-5 sm:right-5 sm:bottom-5 z-10 w-auto h-auto">
                <Image
                  className="w-full object-cover object-center h-full relative z-10 will-change-transform"
                  src={
                    window.innerWidth > 767
                      ? SingleData?.acf?.image?.sizes?.medium_large
                      : SingleData?.acf?.image?.sizes?.medium ||
                        SingleData?.acf?.image?.url
                  }
                  width={window.innerWidth > 767 ? "660" : "308"}
                  height={window.innerWidth > 767 ? "408" : "190"}
                  blurDataURL={
                    CreateShimmerDataUrl(660, 408) ||
                    SingleData?.acf?.image?.blurDataURL
                  }
                  placeholder={"blur"}
                  loading="lazy"
                  alt={SingleData?.title?.rendered || ""}
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

          {SingleData?.acf?.image && (
            <div
              className={`picture-view absolute top-0 left-0 w-full h-full flex items-center justify-center z-40 bg-[#00000080] transition-all duration-500 lg:opacity-0 lg:invisible group-hover:opacity-100 group-hover:visible`}
              onClick={() => {
                if (SingleData?.acf?.image) {
                  setActiveCyclePopup(true);
                  setCyclePopupIndex(SingleData?.id);
                }
              }}
            >
              <button
                type="button"
                className="w-12 h-12 sm:w-15 sm:h-15 lg:w-20 lg:h-20 p-3 sm:p-4 bg-[#D1A941CC] rounded-full flex items-center justify-center cursor-pointer"
              >
                <ViewIcon2 />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="cycle-title mt-8 sm:mt-10 lg:mt-[5.8vh]">
        <h2 className="text-[25px] sm:text-[35px] lg:text-[45px] text-[#D1A941] leading-[70%] text-center">
          {parse(SingleData?.title?.rendered || "")}
        </h2>
      </div>
    </div>
  );
}
