"use client";

import { useEffect, useRef, useState } from "react";

import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SimpleBar from "simplebar-react";
import ViewIcon2 from "../assets/icons/ViewIcon2";
import WishIcon from "../assets/icons/WishIcon";
import Wave from "../assets/images/wave.svg";
import CreateShimmerDataUrl from "../ui/CreateShimmerDataUrl";
import FixedPlayButton from "../ui/FixedPlayButton";
import GetHebrewYear from "../ui/GetHebrewYear";
import HistoryTimeline from "../ui/HistoryTimeline";
import RabbisHamburgerMenuHome from "../ui/past-rabbis/RabbisHamburgerMenuHome";
import { gsap, useGSAP } from "../ui/plugins";
import SlidingArrow from "../ui/SlidingArrow";
import ThemeButton2 from "../ui/ThemeButton2";
import { useAppState } from "./AppContext";
import CookieBanner from "./CookieBanner";
import CursorFollow from "./CursorFollow";
import NotificationPopup from "./history/NotificationPopup";
import VideoPopup from "./history/VideoPopup";
import Sidebar from "./knesset/Sidebar";
import LoadingEffect from "./LoadingEffect";
import MirrorAudioPlayer from "./music/MirrorAudioPlayer";
import SubscribeForm from "./sheets/SubscribeForm";
import TabMenu from "./visit-temple/TabMenu";
import ZatzelSidebar from "./zatzel/ZatzelSidebar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function PageFixedElements() {
  // Use Refs
  const pathname = usePathname();
  const audio = useRef<HTMLAudioElement>(null);
  const wishButton = useRef<HTMLDivElement>(null);
  const moveButton = useRef<HTMLDivElement>(null);
  const audioButton = useRef<HTMLDivElement>(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [activeCategory, setActiveCategory] = useState(0);

  // Animation State
  const {
    animationPlayed,
    setAnimationPlayed,
    currentCommunitiesPost,
    communitySheetsCategoryData,
    sheetsOnSelectCategoryId,
    setSheetsOnSelectCategoryId,
    knessetCategoryData,
    knessetActiveCategory,
    knessetSearchQuery,
    setKnessetActiveCategory,
    setKnessetSearchQuery,
    zatzelPosts,
    setZatzelPosts,
    setZatzelSearchedData,
    setZatzelSelectedDate,
  } = useAppState();
  const [knessetSearchQueryLocal, setKnessetSearchQueryLocal] = useState("");

  // Play Pause State
  const { isPlaying, setIsPlaying } = useAppState();
  const { isLoading, setIsLoading } = useAppState();
  const { audioFile, setAudioFile } = useAppState();
  const {
    templeTabData,
    setTempleTabData,
    templeActiveTab,
    setTempleActiveTab,
    musicPageData,
    setMusicPageData,
    audioPopup,
    setAudioPopup,
    activeMusicItem,
    setActiveMusicItem,
    activeMusicFolder,
    setActiveMusicFolder,
    activeMusicTab,
    setActiveMusicTab,
    currentRabbisPost,
    historyTimelineData,
    listOfRabbis,
  } = useAppState();
  const { zatzelPopupIndex, setZatzelPopupIndex } = useAppState();
  const [zatzelCurrentPost, setZatzelCurrentPost] = useState<any | null>(null);

  // Zatzel popup Post change
  useEffect(() => {
    if (zatzelPopupIndex?.postIndex === 0) return;
    console.log(zatzelPopupIndex);
    const currentPost = zatzelPosts?.sections[
      zatzelPopupIndex?.catIndex
    ]?.sectionContent.filter(
      (item: any) => item.id === zatzelPopupIndex?.postIndex,
    );
    setZatzelCurrentPost(currentPost[0]);
  }, [zatzelPopupIndex]);

  // Rabbis Data
  const TimelineData = [
    {
      id: 1,
      title:
        historyTimelineData?.acf?.timeline_1?.introduction?.subtitle ||
        `תרל"ז - תרע"ד`,
    },
    {
      id: 2,
      title:
        historyTimelineData?.acf?.timeline_2?.introduction?.subtitle ||
        `תרע"ד - תרפ"ד`,
    },
    {
      id: 3,
      title:
        historyTimelineData?.acf?.timeline_3?.introduction?.subtitle ||
        `תרפ"ד - תרפ"ט`,
    },
    {
      id: 4,
      title:
        historyTimelineData?.acf?.timeline_4?.introduction?.subtitle ||
        `תרפ"ט - תשל"ו`,
    },
    {
      id: 5,
      title:
        historyTimelineData?.acf?.timeline_5?.introduction?.subtitle ||
        `תשל״ו - תשנ״ז`,
    },
    {
      id: 6,
      title:
        historyTimelineData?.acf?.timeline_6?.introduction?.subtitle ||
        `תשנ"ז - הווה`,
    },
  ];

  // Video mute/unmute Effect
  useEffect(() => {
    const video = document.getElementById(
      "banner-video-element",
    ) as HTMLVideoElement | null;
    const isMuted = video?.muted;
    const volume = video?.volume;
    if (isPlaying) {
      if (video) {
        gsap.set(video, {
          volume: 0,
        });
        video.muted = false;
        gsap.to(video, {
          volume: 1,
          duration: 2,
          ease: "none",
        });
      }
    } else {
      if (video) {
        gsap.to(video, {
          volume: 0,
          duration: 2,
          ease: "none",
          onComplete: () => {
            video.muted = true;
          },
        });
      }
    }
  }, [isPlaying]);

  // On Video End
  useEffect(() => {
    const audioElement = document.getElementById(
      "audio-player",
    ) as HTMLAudioElement | null;
    if (audioElement) {
      audioElement.addEventListener(
        "ended",
        () => {
          audioElement.currentTime = 0;
          audioElement.play();
        },
        false,
      );
    }
  }, [audio.current]);

  // Handle Scroll Position
  const handleScrollPosition = () => {
    const currentPos = window.scrollY;
    const scrollPost = currentPos + window.innerHeight;
    window.scrollTo({ top: scrollPost, behavior: "smooth" });
  };

  // On Mouse Move
  useGSAP(() => {
    const movingButtonRef = moveButton.current;
    if (movingButtonRef !== null) {
      const xSetter = gsap.quickSetter(movingButtonRef, "x", "px");
      const ySetter = gsap.quickSetter(movingButtonRef, "y", "px");

      window.addEventListener("mousemove", (e) => {
        xSetter(e.clientX);
        ySetter(e.clientY);
      });
      // Show view on mouse hover
      const pageNav = document.querySelectorAll(
        ".rabbis-navigation a.nav-link",
      ) as NodeListOf<HTMLAnchorElement> | null;
      if (pageNav) {
        pageNav.forEach((nav) => {
          nav.addEventListener("mouseenter", () => {
            gsap.to(movingButtonRef, {
              opacity: 1,
              scaleY: 1,
              duration: 0.3,
            });
          });
          nav.addEventListener("mouseleave", () => {
            gsap.to(movingButtonRef, {
              opacity: 0,
              scaleY: 0,
              duration: 0.3,
            });
          });
        });
      }

      return () => {
        window.removeEventListener("mousemove", (e) => {
          xSetter(e.clientX);
          ySetter(e.clientY);
        });
        if (pageNav) {
          pageNav.forEach((nav) => {
            nav.removeEventListener("mouseenter", () => {
              gsap.to(movingButtonRef, {
                opacity: 1,
                scaleY: 2,
                duration: 0.3,
              });
            });
            nav.removeEventListener("mouseleave", () => {
              gsap.to(movingButtonRef, {
                opacity: 0,
                scaleY: 0,
                duration: 0.3,
              });
            });
          });
        }
      };
    }
  }, [moveButton]);

  // Page default
  useEffect(() => {
    window.scrollTo(0, 0);
    // Page Overflow Hidden
    document.body.classList.remove("!overflow-auto", "overflow-hidden");
    document.body.classList.add("!overflow-hidden");
    const mainWrapper = document.getElementById("main") as HTMLElement | null;
    // Set onbeforeunload to fade out page
    window.onbeforeunload = function () {
      setIsLoading(true);
      if (mainWrapper) {
        gsap.to(mainWrapper, {
          opacity: 0,
          duration: 0,
          onComplete: () => {
            window.scrollTo(0, 0);
          },
        });
      }
    };
  }, [pathname]);

  return (
    <>
      {/* Loading Effect */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-99 bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4" />
            <p>Loading...</p>
          </div>
        </div>
      )}
      {/* End of Loading Effect */}
      {/** Page Cookie Popup **/}
      <CookieBanner />
      {/* End of Page Cookie Popup */}
      {/* Loading Effect */}
      <LoadingEffect animated={setAnimationPlayed} />
      {/* End of Loading Effect */}

      {/* Sliding Arrow */}
      {(pathname === "/" || pathname === "/chronicles") && <SlidingArrow />}
      {/* End of Sliding Arrow */}

      {/* Cursor Follow */}
      {pathname === "/" && <CursorFollow isPlaying={isPlaying} />}
      {/* End of Cursor Follow */}

      {/* Audio Player */}
      {/* <Suspense fallback={<div className="hidden"></div>}>
        <AudioPlayer audioRef={audio} src={audioFile || ""} />
      </Suspense> */}
      {/* End of Audio Player */}

      {/* Wish Button */}
      {pathname === "/" && (
        <div
          id="wish-button"
          ref={wishButton}
          className="wish-button fixed bottom-5 right-28 sm:right-45 z-50 opacity-0 invisible cursor-pointer"
        >
          <ThemeButton2
            extraClass="w-13 h-13 flex item-center justify-center"
            bgColor="bg-[#ffffff]"
            textColor="text-[#000000]"
            hoverBgColor="bg-[#C3A13F]"
            svgIcon={<WishIcon className="group-hover:stroke-[#ffffff]" />}
            svgIconClass={""}
          />
        </div>
      )}
      {/* End of Wish Button */}
      {/* Audio Button */}
      {pathname === "/" && (
        <div
          id="audio-button"
          ref={audioButton}
          onClick={() => {
            setIsPlaying(!isPlaying);
          }}
          className="equalizer-button flex gap-2 items-center fixed py-1 px-3 bottom-5 right-5 sm:right-20 z-40 cursor-pointer bg-[#c3a23fb0] text-[#000000] opacity-0 hover:opacity-100 invisible translate-y-5 rounded-full"
        >
          <span>{isPlaying ? "ON" : "OFF"}</span>
          <div className="equalizer flex items-end justify-center gap-0.5 h-4">
            {[0.2, 0.4, 0.6, 0.8, 1.0].map((delay, index) => (
              <div
                key={index}
                className={`w-0.5 h-full bg-[#000000] rounded-full transition-all ${
                  isPlaying ? `equalizer-animation` : "scale-30"
                }`}
              />
            ))}
          </div>
        </div>
      )}
      {/* End of Audio Button */}

      {/* Visit Temple Navigation */}
      {(pathname === "/visit-temple" ||
        pathname.startsWith("/visit-temple/")) && (
        <TabMenu data={templeTabData} activeTab={templeActiveTab} />
      )}
      {/* Visit Temple Navigation */}

      {/* Wave Line */}
      {(pathname === "/zatzel-graduates" ||
        pathname === "/the-circle-of-the-year" ||
        pathname.startsWith("/the-circle-of-the-year/") ||
        pathname === "/testimonials" ||
        pathname === "/past-rabbis" ||
        pathname.startsWith("/past-rabbis/") ||
        pathname === "/news" ||
        pathname === "/donation" ||
        pathname === "/communities" ||
        pathname === "/communities/sheets" ||
        pathname === "/cycle-pictures" ||
        pathname.startsWith("/cycle-pictures/") ||
        pathname === "/visit-temple" ||
        pathname.startsWith("/visit-temple/") ||
        pathname === "/yeshiva-rabbis" ||
        pathname === "/yeshiva-graduates" ||
        pathname === "/the-knesset-of-customs") && (
        <div
          id={"wave-line"}
          className="wave-line fixed bottom-10 right-1/2 w-30 h-6 translate-x-1/2 overflow-hidden z-30 hidden"
        >
          <div
            id={"wave-mask"}
            style={{
              maskImage: `url(${Wave.src})`,
            }}
            className="mask w-full h-full absolute top-0 left-0 mask-no-repeat mask-center bg-(--theme-color) mask-contain translate-y-full"
          >
            <div
              id={"progress"}
              className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#0a0a0a] z-10"
            ></div>
          </div>
        </div>
      )}
      {/* End of Wave Line */}

      {/* Next Previous Pagination */}
      {/* {(pathname === "/cycle-pictures" ||
        pathname.startsWith("/cycle-pictures/")) && <CyclePicturesPagination />} */}
      {/* Next Previous Pagination */}

      {/* Arrow Button */}
      {/* {pathname === "/zatzel-graduates" && (
        <div
          id="arrow-button"
          className="rabbis-arrow-wrapper fixed top-0 left-0 z-50 h-screen w-[20vw] opacity-0 invisible"
        >
          <div className="rabbis-arrow w-full h-full flex items-center justify-center bg-linear-to-r from-black to-[rgba(0,0,0,0)] opacity-0">
            <button
              onClick={handleScrollPosition}
              className="next-button w-20 h-20 border-2 border-[#C3A13F] rounded-full bg-black p-5 cursor-pointer"
            >
              <ArrowLeftIcon2 />
            </button>
          </div>
        </div>
      )} */}
      {/* End of Arrow Button */}

      {/* Zatzel Graduates Popup */}
      {pathname === "/zatzel-graduates" && (
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
                          className={`w-full h-full object-cover object-center transition-all duration-300 ${loadingImage ? "opacity-0" : "opacity-100"}`}
                          onLoad={() => setLoadingImage(false)}
                          onChange={() => setLoadingImage(true)}
                          blurDataURL={CreateShimmerDataUrl(196, 205)}
                          placeholder="blur"
                          loading="lazy"
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
              <button className="close-btn absolute top-1/2 left-0 w-6 h-29.25 flex items-center justify-center rounded-md bg-[#D1A941] -translate-x-1/2 -translate-y-1/2 cursor-e-resize hover:w-8 duration-300 transition-all">
                <span className="line block w-1 h-[52%] rounded-2xl bg-white"></span>
              </button>
            </div>
            <div className="overlay fixed top-0 right-0 w-screen h-screen z-30 cursor-pointer bg-blend-color-burn bg-black/50 backdrop-blur-sm opacity-0 invisible"></div>
          </div>
          <div
            id="zatzel-sidebar"
            className="zatzel-sidebar fixed top-0 right-15 w-70 h-full bg-[#000000] flex flex-col justify-center z-50 border-l border-[#D1CECE]"
          >
            <div className="sheet-sidebar p-6 w-full lg:w-70 lg:min-w-70 h-full will-change-transform relative z-20 flex items-center">
              <div className="sheet-sidebar-wrapper">
                <ZatzelSidebar
                  setSelectedDate={setZatzelSelectedDate}
                  setSearchedData={setZatzelSearchedData}
                  setZatzelPosts={setZatzelPosts}
                  allPosts={zatzelPosts}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {/* Zatzel Graduates Popup */}
      {/* Music Page Player and fixed image */}
      {(pathname === "/the-circle-of-the-year" ||
        pathname.startsWith("/the-circle-of-the-year/")) && (
        <>
          <div
            id="hover-image"
            className="fixed top-0 left-0 z-999 w-29 h-43.25 -ml-14.5 -mt-21.5 overflow-hidden opacity-0 invisible cursor-none pointer-events-none"
          >
            {musicPageData?.holidayPosts?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  data-index={item?.id}
                  className={`image-wrapper hover-image-${index} w-29 h-43.25 absolute top-0 left-0`}
                >
                  <Image
                    className="bg-image w-full object-cover object-center h-full"
                    src={
                      item?.acf?.introduction?.album_image_1?.sizes
                        ?.thumbnail ||
                      item?.acf?.introduction?.album_image_1?.url ||
                      item?.acf?.introduction?.album_image_1?.src
                    }
                    width="116"
                    height="173"
                    blurDataURL={CreateShimmerDataUrl(116, 173)}
                    placeholder={"blur"}
                    loading="lazy"
                    alt={item?.acf?.introduction?.album_title || "Album Image"}
                  />
                </div>
              );
            })}
          </div>
          <MirrorAudioPlayer
            extraClass="w-screen"
            animWidthText={0}
            audioPopup={audioPopup}
            setAudioPopup={setAudioPopup}
            data={{
              introduction:
                musicPageData?.holidayPosts[activeMusicItem]?.acf?.introduction,
              album:
                musicPageData?.holidayPosts[activeMusicItem]?.acf?.music_albums
                  ?.albums[activeMusicFolder],
              allAlbums:
                musicPageData?.holidayPosts[activeMusicItem]?.acf?.music_albums
                  ?.albums,
            }}
            activeTab={activeMusicTab}
            setActiveTab={setActiveMusicTab}
            activeMusicFolder={activeMusicFolder}
            setActiveMusicFolder={setActiveMusicFolder}
          />
        </>
      )}
      {/* Music Page Player and fixed image */}
      {/* Past Rabbis Elements Start */}
      {pathname.startsWith("/past-rabbis/") && (
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
                <button className="close-btn absolute top-1/2 left-0 w-6 h-29.25 flex items-center justify-center rounded-md bg-[#D1A941] -translate-x-1/2 -translate-y-1/2 cursor-e-resize hover:w-8 duration-300 transition-all">
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
                            currentRabbisPost?.acf?.popup_2?.text_group_1
                              ?.text || "",
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
                            currentRabbisPost?.acf?.popup_2?.text_group_2
                              ?.text || "",
                          )}
                        </div>
                      </div>
                    )}
                  </SimpleBar>
                </div>
                <button className="close-btn absolute top-1/2 left-0 w-6 h-29.25 flex items-center justify-center rounded-md bg-[#D1A941] -translate-1/2 cursor-e-resize hover:w-8 duration-300 transition-all">
                  <span className="line block w-1 h-[52%] rounded-2xl bg-white"></span>
                </button>
              </div>
              <div className="overlay fixed top-0 right-0 w-screen h-screen z-30 cursor-pointer bg-blend-color-burn bg-black/50 backdrop-blur-sm opacity-0 invisible"></div>
            </div>
          )}
        </>
      )}
      {/* Past Rabbis Elements Start */}

      {/* News page component */}
      {pathname === "/news" && (
        <div
          id="view-button"
          className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 select-none pointer-events-none opacity-0 scale-0"
        >
          <button className="w-25 h-25 bg-[#D1A941CC] rounded-full flex items-center justify-center cursor-pointer">
            <span className="block w-12 h-auto">
              <ViewIcon2 />
            </span>
          </button>
        </div>
      )}
      {/* News page component */}

      {/* Single news moving button */}
      {pathname.startsWith("/news/") && (
        <div
          id="moving-button"
          className="moving-button fixed top-0 left-0 mt-2 ml-2 z-30 flex items-center justify-center pointer-events-none bg-[#BBA588] rounded-3xl py-1 px-3 opacity-0"
        >
          <span className="text block text-black text-[20px] leading-[1em] font-bold">
            מעבר לחדשה הבאה
          </span>
        </div>
      )}
      {/* Single news moving button */}

      {/* Donation Page Components */}
      {pathname === "/donation" && <FixedPlayButton />}
      {/* Donation Page Components */}

      {/* Community Page Loader */}
      {pathname.startsWith("/communities/") &&
        pathname !== "/communities/sheets" && (
          <div
            id="community-loader"
            className="community-loader fixed top-0 left-0 w-full h-full bg-[#C3A13F] flex items-center justify-center z-999 text-[#091B24]"
          >
            <div className="loader-content max-w-full w-full lg:w-195 h-auto">
              <h2 className="loader-heading text-[60px] sm:text-[90px] lg:text-[130px] leading-[80%] font-bold text-center">
                {parse(currentCommunitiesPost?.title || "")}
              </h2>
              {currentCommunitiesPost?.subtitle && (
                <h4 className="text-[22px] sm:text-[32px] lg:text-[44px] leading-[1em] mt-3 text-center">
                  {parse(currentCommunitiesPost?.subtitle || "")}
                </h4>
              )}
            </div>
          </div>
        )}
      {/* Community Page Loader */}

      {/* Timeline Page Components */}
      {pathname === "/chronicles" && (
        <>
          <HistoryTimeline
            wrapperId="history-timeline"
            progressId="history-timeline-progress"
            timelineData={TimelineData}
          />
          <VideoPopup />
          <NotificationPopup />
        </>
      )}
      {/* Timeline Page Components */}

      {/* Rabbis Hamburger Menu */}
      {pathname === "/past-rabbis" ||
        (pathname === "/chronicles" && (
          <RabbisHamburgerMenuHome extraClass="hidden" data={listOfRabbis} />
        ))}
      {/* Rabbis Hamburger Menu */}

      {/* Community Sidebar */}
      {pathname === "/communities/sheets" && (
        <div
          id="sheets-sidebar"
          className="sheets-sidebar fixed top-0 right-15 w-70 h-full bg-black flex flex-col z-50 border-l border-[#C3A13F]"
        >
          <div className="sheet-scrollbar-wrapper mt-auto mb-auto pl-5 pr-5">
            <SimpleBar
              style={{ maxHeight: "60vh" }}
              autoHide={false}
              data-simplebar-direction="rtl"
            >
              <div className="year-month-categories pl-7 pr-3">
                <div className="all-sheets year-month text-[24px] leading-[1.2em]">
                  <div
                    onClick={() => {
                      setActiveCategory(0);
                      setSheetsOnSelectCategoryId(0);
                    }}
                    className="year text-[#CD5E41] cursor-pointer font-medium border-b border-[#CD5E41] py-2.5"
                  >
                    כל הגיליונות
                  </div>
                </div>
                {communitySheetsCategoryData?.map(
                  (
                    item: { id: number; name: string; children: any[] },
                    index: number,
                  ) => {
                    return (
                      <GetHebrewYear
                        key={index}
                        index={index}
                        year={item}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        onSelectCategoryId={setSheetsOnSelectCategoryId}
                        //setIsPostLoaded={() => setIsLoading(true)}
                      />
                    );
                  },
                )}
              </div>
            </SimpleBar>
          </div>
          <SubscribeForm />
        </div>
      )}
      {/* Community Sidebar */}

      {/* Knesset Sidebar */}
      {pathname === "/the-knesset-of-customs" && (
        <div
          id="knesset-sidebar"
          className="knesset-sidebar fixed top-0 right-15 w-70 h-full bg-[#FBF4E6] flex flex-col z-50 border-l border-[#D1CECE]"
        >
          <div className="knesset-sidebar-wrapper mt-auto mb-auto pl-5 pr-5">
            <Sidebar
              activeCategory={knessetActiveCategory || null}
              categories={knessetCategoryData || []}
              onCategorySelect={(id) => {
                setKnessetActiveCategory(id);
              }}
              searchQuery={knessetSearchQueryLocal || ""}
              onSearchChange={setKnessetSearchQueryLocal}
              onSearchSubmit={setKnessetSearchQuery}
            />
          </div>
          <SubscribeForm mode="dark" />
        </div>
      )}
      {/* Knesset Sidebar */}
    </>
  );
}
