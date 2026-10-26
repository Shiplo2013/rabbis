import { useAppState } from "@/app/components/AppContext";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";
import { gsap, useGSAP } from "../plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const PastRabbisFixedElements = () => {
  // Selectors
  const pathname = usePathname();
  const moveButton = useRef<HTMLDivElement>(null);
  const { currentRabbisPost } = useAppState();

  // On Mouse Move
  useGSAP(
    () => {
      const movingButtonRef = moveButton.current;
      if (
        movingButtonRef &&
        pathname.startsWith("/past-rabbis/") &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
      ) {
        const xSetter = gsap.quickSetter(movingButtonRef, "x", "px");
        const ySetter = gsap.quickSetter(movingButtonRef, "y", "px");
        const handleMouseMove = (event: MouseEvent) => {
          xSetter(event.clientX);
          ySetter(event.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove, {
          passive: true,
        });
        // Show view on mouse hover
        const pageNav = document.querySelectorAll<HTMLAnchorElement>(
          ".rabbis-navigation a.nav-link",
        );
        const showMovingButton = () => {
          gsap.to(movingButtonRef, { opacity: 1, scaleY: 1, duration: 0.3 });
        };
        const hideMovingButton = () => {
          gsap.to(movingButtonRef, { opacity: 0, scaleY: 0, duration: 0.3 });
        };

        pageNav.forEach((nav) => {
          nav.addEventListener("mouseenter", showMovingButton);
          nav.addEventListener("mouseleave", hideMovingButton);
        });

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          pageNav.forEach((nav) => {
            nav.removeEventListener("mouseenter", showMovingButton);
            nav.removeEventListener("mouseleave", hideMovingButton);
          });
        };
      }
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <>
      <div
        ref={moveButton}
        id="moving-button"
        className="moving-button fixed top-0 left-0 mt-2 ml-2 z-30 flex items-center justify-center pointer-events-none bg-[#BBA588] rounded-3xl py-1 px-3 opacity-0"
      >
        <span className="text block text-black text-[20px] leading-[1em] font-bold">
          מעבר לדמות ההוד הבאה
        </span>
      </div>

      {currentRabbisPost?.acf?.popup_1?.title !== "" && (
        <div
          id="popup-card"
          className="popup fixed top-0 right-0 w-screen h-screen z-99 opacity-0 invisible"
        >
          <div className="card-popup-wrapper bg-[#FBF4E6] w-[90%] sm:w-130 lg:w-150 h-full relative z-50 py-15 sm:py-[9.3vh] px-6 sm:px-[3.8vw]">
            <div
              id="popup-card-content"
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
                {currentRabbisPost?.acf?.popup_1?.title && (
                  <div className="title mb-10 lg:mb-[5vh]">
                    <h3 className="text-[32px] sm:text-[40px] lg:text-[55px] leading-[0.8em] lg:leading-[70%] text-[#D1A941] font-bold">
                      {parse(currentRabbisPost?.acf?.popup_1?.title || "")}
                    </h3>
                  </div>
                )}
                {currentRabbisPost?.acf?.popup_1?.text && (
                  <div className="content text-[16px] sm:text-[18px] lg:text-[21px] leading-[1.4em] text-black">
                    {parse(currentRabbisPost?.acf?.popup_1?.text || "")}
                  </div>
                )}
              </SimpleBar>
            </div>
            <button
              type="button"
              aria-label="Close Popup"
              className="close-btn absolute top-1/2 left-0 w-6 h-29.25 flex items-center justify-center rounded-md bg-[#D1A941] -translate-x-1/2 -translate-y-1/2 cursor-e-resize hover:w-8 duration-300 transition-[width]"
            >
              <span className="line block w-1 h-[52%] rounded-2xl bg-white"></span>
            </button>
          </div>
          <div className="overlay fixed top-0 right-0 w-screen h-screen z-30 cursor-pointer bg-blend-color-burn bg-black/50 backdrop-blur-sm opacity-0 invisible"></div>
        </div>
      )}

      {currentRabbisPost?.acf?.popup_2?.title !== "" && (
        <div
          id="popup-book"
          className="popup fixed top-0 right-0 w-screen h-screen z-99 opacity-0 invisible"
        >
          <div className="popup-wrapper bg-[#FBF4E6] w-[90%] sm:w-130 lg:w-150 h-full relative z-50 py-15 sm:py-[9.3vh] px-6 sm:px-[3.8vw]">
            <div
              id="popup-book-content"
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
                <div className="title mb-8 sm:mb-[5vh]">
                  <h3 className="text-[32px] sm:text-[40px] lg:text-[55px] leading-[0.8em] lg:leading-[70%] text-[#D1A941] font-bold">
                    {parse(currentRabbisPost?.acf?.popup_2?.title || "")}
                  </h3>
                </div>
                {(() => {
                  const popupImage1Src =
                    currentRabbisPost?.acf?.popup_2?.image_1?.url ||
                    currentRabbisPost?.acf?.popup_2?.image_1?.src;

                  if (!popupImage1Src) {
                    return null;
                  }

                  return (
                    <div className="book-image mb-9.5">
                      <div className="w-[80%] sm:w-77 h-auto">
                        <Image
                          className="w-full h-full object-cover object-center"
                          src={popupImage1Src}
                          alt="Book Image"
                          width={400}
                          height={400}
                          blurDataURL={CreateShimmerDataUrl(400, 400)}
                          placeholder="blur"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                    </div>
                  );
                })()}
                {currentRabbisPost?.acf?.popup_2?.text_group_1 && (
                  <div className="content text-[16px] sm:text-[18px] lg:text-[21px] leading-[1.4em] text-black mb-10">
                    <div className="title mb-7">
                      <h4 className="text-[24px] sm:text-[28px] lg:text-[34px] leading-[70%] font-medium">
                        {parse(
                          currentRabbisPost?.acf?.popup_2?.text_group_1
                            ?.title || "",
                        )}
                      </h4>
                    </div>
                    <div className="text flex flex-col gap-y-4">
                      {parse(
                        currentRabbisPost?.acf?.popup_2?.text_group_1?.text ||
                          "",
                      )}
                    </div>
                  </div>
                )}
                {(() => {
                  const popupImage2Src =
                    currentRabbisPost?.acf?.popup_2?.image_2?.url ||
                    currentRabbisPost?.acf?.popup_2?.image_2?.src;

                  if (!popupImage2Src) {
                    return null;
                  }

                  return (
                    <div className="book-image mb-9.5">
                      <div className="w-[80%] sm:w-77 h-auto">
                        <Image
                          className="w-full h-full object-cover object-center"
                          src={popupImage2Src}
                          alt="Book Image"
                          width={400}
                          height={400}
                          blurDataURL={CreateShimmerDataUrl(400, 400)}
                          placeholder="blur"
                          loading="lazy"
                          unoptimized
                        />
                      </div>
                    </div>
                  );
                })()}
                {currentRabbisPost?.acf?.popup_2?.text_group_2 && (
                  <div className="content text-[16px] sm:text-[18px] lg:text-[21px] leading-[1.4em] text-black">
                    <div className="title mb-7">
                      <h4 className="text-[34px] leading-[70%] font-medium">
                        {parse(
                          currentRabbisPost?.acf?.popup_2?.text_group_2
                            ?.title || "",
                        )}
                      </h4>
                    </div>
                    <div className="text flex flex-col gap-y-4">
                      {parse(
                        currentRabbisPost?.acf?.popup_2?.text_group_2?.text ||
                          "",
                      )}
                    </div>
                  </div>
                )}
              </SimpleBar>
            </div>
            <button
              type="button"
              aria-label="Close Popup"
              className="close-btn absolute top-1/2 left-0 w-6 h-29.25 flex items-center justify-center rounded-md bg-[#D1A941] -translate-1/2 cursor-e-resize hover:w-8 duration-300 transition-[width]"
            >
              <span className="line block w-1 h-[52%] rounded-2xl bg-white"></span>
            </button>
          </div>
          <div className="overlay fixed top-0 right-0 w-screen h-screen z-30 cursor-pointer bg-blend-color-burn bg-black/50 backdrop-blur-sm opacity-0 invisible"></div>
        </div>
      )}
    </>
  );
};

export default PastRabbisFixedElements;
