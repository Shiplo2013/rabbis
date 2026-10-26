import { useAppState } from "@/app/components/AppContext";
import ZatzelSidebar from "@/app/components/zatzel/ZatzelSidebar";
import CreateShimmerDataUrl from "@/app/ui/CreateShimmerDataUrl";
import parse from "html-react-parser";
import Image from "next/image";
import { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";

export default function ZatzelGraduatesPopup() {
  // Selectors
  const [zatzelCurrentPost, setZatzelCurrentPost] = useState<any | null>(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const {
    setZatzelSearchedData,
    setZatzelActivePopup,
    zatzelPosts,
    setZatzelPosts,
    zatzelPopupIndex,
    setZatzelPopupIndex,
  } = useAppState();

  // Zatzel popup Post change
  useEffect(() => {
    if (zatzelPopupIndex?.postIndex === 0) return;
    const currentPost = zatzelPosts?.sections[
      zatzelPopupIndex?.catIndex
    ]?.sectionContent.filter(
      (item: any) => item.id === zatzelPopupIndex?.postIndex,
    );
    setZatzelCurrentPost(currentPost[0]);
  }, [zatzelPopupIndex, zatzelPosts]);

  return (
    <>
      <div
        id="zatzel-popup"
        className="popup fixed top-0 right-0 w-screen h-screen z-99 opacity-0 invisible"
      >
        <div className="popup-wrapper bg-[#FBF4E6] w-[90vw] sm:w-150 h-full relative z-50 py-[5vh] sm:py-[9.3vh] px-[3.8vw]">
          <div
            //ref={popupContent}
            className="popup-content w-full h-full relative z-30"
          >
            <SimpleBar
              style={{
                maxHeight: "100%",
                paddingRight: 30,
                marginRight: -30,
              }}
              autoHide={false}
            >
              {zatzelCurrentPost && (
                <div className="title mb-[5vh] flex items-center gap-x-5 justify-between">
                  <h3 className="text-[32px] sm:text-[40px] lg:text-[55px] leading-[70%] text-[#D1A941] font-bold max-w-[60%]">
                    {parse(zatzelCurrentPost?.popup?.title || "")}
                  </h3>
                  <div className="thumbnail w-32 h-25 sm:min-w-49 sm:w-49 sm:h-41">
                    {loadingImage && (
                      <div className="animate-pulse w-full h-full bg-gray-200 absolute top-0 left-0"></div>
                    )}
                    <Image
                      src={zatzelCurrentPost?.image?.sizes?.thumbnail || ""}
                      alt="Popup Thumbnail"
                      width={196}
                      height={205}
                      className={`w-full h-full object-cover object-center transition-opacity duration-300 ${loadingImage ? "opacity-0" : "opacity-100"}`}
                      onLoad={() => setLoadingImage(false)}
                      onChange={() => setLoadingImage(true)}
                      blurDataURL={CreateShimmerDataUrl(196, 205)}
                      placeholder="blur"
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                </div>
              )}
              {zatzelCurrentPost?.popup?.content && (
                <div className="content text-[16px] sm:text-[18px] lg:text-[21px] leading-[1.4em] text-black [&>p:not(:last-child)]:mb-6">
                  {parse(zatzelCurrentPost?.popup?.content || "")}
                </div>
              )}
            </SimpleBar>
          </div>
          <button
            type="button"
            onClick={() => {
              setZatzelActivePopup(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && setZatzelActivePopup(false)}
            aria-label="Close Zatzel Popup"
            className="close-btn absolute top-1/2 left-0 w-6 h-29.25 flex items-center justify-center rounded-md bg-[#D1A941] -translate-x-1/2 -translate-y-1/2 cursor-e-resize hover:w-8 duration-300 transition-[width]"
          >
            <span className="line block w-1 h-[52%] rounded-2xl bg-white"></span>
          </button>
        </div>
        <button
          onClick={() => {
            setZatzelActivePopup(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && setZatzelActivePopup(false)}
          type="button"
          aria-label="Close Overlay"
          className="overlay fixed top-0 right-0 w-screen h-screen z-30 cursor-pointer bg-blend-color-burn bg-black/50 backdrop-blur-sm opacity-0 invisible"
        ></button>
      </div>
      <div
        id="zatzel-sidebar"
        className="zatzel-sidebar fixed top-0 right-15 w-70 h-full bg-[#000000] flex flex-col justify-center z-50 border-l border-[#D1CECE]"
      >
        <div className="sheet-sidebar p-6 w-full lg:w-70 lg:min-w-70 h-full relative z-20 flex items-center">
          <div className="sheet-sidebar-wrapper">
            <ZatzelSidebar
              setSearchedData={setZatzelSearchedData}
              setZatzelPosts={setZatzelPosts}
              allPosts={zatzelPosts}
            />
          </div>
        </div>
      </div>
    </>
  );
}
