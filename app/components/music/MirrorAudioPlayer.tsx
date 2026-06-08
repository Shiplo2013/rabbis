import ArrowLeft from "@/app/assets/icons/ArrowLeft";
import BackwardIcon from "@/app/assets/icons/BackwardIcon";
import CloseIcon2 from "@/app/assets/icons/CloseIcon2";
import ForwardIcon from "@/app/assets/icons/ForwardIcon";
import PauseIcon from "@/app/assets/icons/PauseIcon";
import PlayIcon2 from "@/app/assets/icons/PlayIcon2";
import PlayIcon3 from "@/app/assets/icons/PlayIcon3";
import PlayingIcon from "@/app/assets/icons/PlayingIcon";
import ReplayIcon from "@/app/assets/icons/ReplayIcon";
import SearchIcon2 from "@/app/assets/icons/SearchIcon2";
import AudioPlayer2 from "@/app/ui/AudioPlayer2";
import parse from "html-react-parser";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import "swiper/css";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AlbumImage from "../../assets/images/album-image.jpg";
import PlayerBG from "../../assets/images/mirros-bg.jpg";
import { gsap, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthText: number;
  audioPopup: boolean;
  setAudioPopup: (value: boolean) => void;
  data: MusicItem;
  activeTab: number;
  setActiveTab: (value: number) => void;
  activeMusicFolder: number;
  setActiveMusicFolder: (value: number) => void;
}

type MusicItem = {
  introduction: any;
  album: any;
  allAlbums: any;
};

// Format seconds → "m:ss"
function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function loadAudioDuration(src: string): Promise<string> {
  return new Promise((resolve) => {
    if (!src) {
      resolve("0:00");
      return;
    }

    const preloader = new Audio();
    preloader.preload = "metadata";
    preloader.src = src;

    const cleanup = () => {
      preloader.removeEventListener("loadedmetadata", onLoadedMetadata);
      preloader.removeEventListener("error", onError);
      preloader.src = "";
    };

    const onLoadedMetadata = () => {
      resolve(formatTime(preloader.duration));
      cleanup();
    };

    const onError = () => {
      resolve("0:00");
      cleanup();
    };

    preloader.addEventListener("loadedmetadata", onLoadedMetadata);
    preloader.addEventListener("error", onError);
  });
}

export default function MirrorAudioPlayer(props: ChildProps) {
  // Refs
  const wrapper = useRef<HTMLDivElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const animationCleanupRef = useRef<(() => void) | null>(null);
  const isDraggingRef = useRef(false);
  const isInfinityActiveRef = useRef(false);
  const shouldAutoPlayRef = useRef(false);
  const pathname = usePathname();

  // State
  const musicPageData = (props.data as MusicItem) || {};

  const [activeMusic, setActiveMusic] = useState({
    tabIndex: 0,
    musicIndex: 0,
    title: `${musicPageData?.album?.music_category[0].musics[0].title}`,
    link: `${musicPageData?.album?.music_category[0].musics[0].music?.url}`,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInfinityActive, setIsInfinityActive] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [musicDurations, setMusicDurations] = useState<Record<string, string>>(
    {},
  );
  const [isAlbumTextExpanded, setIsAlbumTextExpanded] = useState(false);

  // Calculate line count and truncate album text to 4 lines
  const albumText =
    musicPageData?.album?.music_category?.[props.activeTab]?.album_text || "";
  const { lineCount: albumTextLineCount, truncatedAlbumText } = useMemo(() => {
    // Strip HTML tags to count actual content lines
    const plainText = albumText
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .trim();
    const lines = plainText
      .split("\n")
      .filter((line: string) => line.trim() !== "");
    const count = lines.length;

    if (count > 4) {
      // Rejoin first 4 lines
      const first4Lines = lines.slice(0, 4).join("\n");
      return { lineCount: count, truncatedAlbumText: first4Lines };
    }
    return { lineCount: count, truncatedAlbumText: plainText };
  }, [albumText]);

  const shouldShowAlbumReadMore = albumTextLineCount > 4;

  // Handle album text read more click
  const handleAlbumTextReadMore = () => {
    setIsAlbumTextExpanded(!isAlbumTextExpanded);
  };

  const currentMusicList =
    musicPageData?.allAlbums?.[props.activeMusicFolder]?.album
      ?.music_category?.[props.activeTab]?.musics ||
    musicPageData?.album?.music_category?.[props.activeTab]?.musics ||
    [];

  useEffect(() => {
    if (!currentMusicList.length) return;

    let isMounted = true;

    setMusicDurations({});

    const preloadDurations = async () => {
      const entries = await Promise.all(
        currentMusicList.map(async (item: any) => {
          const src = item?.music?.url;
          const durationLabel = await loadAudioDuration(src);
          return [src, durationLabel] as const;
        }),
      );

      if (!isMounted) return;

      setMusicDurations((prev) => ({
        ...prev,
        ...Object.fromEntries(entries.filter(([src]) => Boolean(src))),
      }));
    };

    preloadDurations();

    return () => {
      isMounted = false;
    };
  }, [currentMusicList, props.activeTab, props.activeMusicFolder]);

  // ─── Animation helpers ────────────────────────────────────────────
  function scaleYPathRandomly(
    path: SVGPathElement,
    minScale = 0.05,
    maxScale = 1,
    minDuration = 0.2,
    maxDuration = 0.4,
  ) {
    const run = () => {
      gsap.to(path, {
        scaleY: gsap.utils.random(minScale, maxScale),
        duration: gsap.utils.random(minDuration, maxDuration),
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
        onComplete: run,
      });
    };
    run();
    return () => gsap.killTweensOf(path);
  }

  const startAnimation = (currentMusic: Element | null) => {
    const paths = Array.from(
      currentMusic?.querySelectorAll(".music-play>svg>g>path") || [],
    ) as SVGPathElement[];
    const cleanups = paths.map((p) => scaleYPathRandomly(p));
    return () => cleanups.forEach((fn) => fn());
  };

  const stopAnimation = () => {
    if (animationCleanupRef.current) {
      animationCleanupRef.current();
      animationCleanupRef.current = null;
    }
    const paths = Array.from(
      wrapper?.current?.querySelectorAll(".music-play>svg>g>path") || [],
    ) as SVGPathElement[];
    paths.forEach((p) =>
      gsap.to(p, {
        scaleY: 0,
        duration: 0.3,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      }),
    );
  };

  // ─── Progress bar ─────────────────────────────────────────────────
  const updateProgressBar = (percent: number) => {
    if (progressRef.current) {
      progressRef.current.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    }
  };

  // ─── Seek helpers ─────────────────────────────────────────────────
  const seekTo = (clientX: number) => {
    if (!timelineRef.current || !audio.current || !audio.current.duration)
      return;
    const rect = timelineRef.current.getBoundingClientRect();
    // RTL layout: progress grows right → left
    const ratio = 1 - (clientX - rect.left) / rect.width;
    const clamped = Math.min(1, Math.max(0, ratio));
    const newTime = clamped * audio.current.duration;
    audio.current.currentTime = newTime;
    setCurrentTime(newTime);
    updateProgressBar(clamped * 100);
  };

  const handleTimelineMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    seekTo(e.clientX);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isDraggingRef.current) seekTo(e.clientX);
    };
    const onUp = () => {
      isDraggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  useEffect(() => {
    isInfinityActiveRef.current = isInfinityActive;
  }, [isInfinityActive]);

  // ─── Play / Pause ─────────────────────────────────────────────────
  const handlePlayPause = () => {
    if (isPlaying) {
      shouldAutoPlayRef.current = false;
      audio.current?.pause();
      stopAnimation();
    } else {
      shouldAutoPlayRef.current = true;
      audio.current?.play();
      const activeEl = wrapper?.current?.querySelector(
        ".single-music.active-music",
      );
      if (activeEl) {
        animationCleanupRef.current = startAnimation(activeEl);
      }
    }
    setIsPlaying((prev) => !prev);
  };

  // ─── Close popup ─────────────────────────────────────────────────
  const handleClosePopup = () => {
    if (audio.current) {
      shouldAutoPlayRef.current = false;
      audio.current.pause();
      stopAnimation();
      setIsPlaying(false);
    }
  };

  // ─── Skip ±10s ────────────────────────────────────────────────────
  const handleBackward = () => {
    if (audio.current) {
      audio.current.currentTime = Math.max(0, audio.current.currentTime - 10);
    }
  };

  const handleForward = () => {
    if (audio.current) {
      audio.current.currentTime = Math.min(
        audio.current.duration || 0,
        audio.current.currentTime + 10,
      );
    }
  };
  // Play Group music
  const playNextMusicInActiveGroup = () => {
    const currentTabIndex = activeMusic.tabIndex;
    const currentTabMusics =
      currentMusicList.length && currentTabIndex === props.activeTab
        ? currentMusicList
        : musicPageData?.album?.music_category[currentTabIndex]?.musics || [];

    if (!currentTabMusics.length) return;

    const nextIndex = (activeMusic.musicIndex + 1) % currentTabMusics.length;
    const nextMusic = currentTabMusics[nextIndex];

    props.setActiveTab(currentTabIndex);
    setActiveMusic({
      tabIndex: currentTabIndex,
      musicIndex: nextIndex,
      title: nextMusic.title,
      link: nextMusic.link,
    });
  };
  // Infinity toggle
  const handleInfinityToggle = () => {
    setIsInfinityActive((prev) => !prev);
  };
  // ─── Audio events ─────────────────────────────────────────────────
  useEffect(() => {
    const el = audio.current;
    if (!el) return;

    el.load();
    setCurrentTime(0);
    setDuration(0);
    updateProgressBar(0);

    const onLoadedMetadata = () => {
      setDuration(el.duration);
      // Cache individual music duration for the list
      setMusicDurations((prev) => ({
        ...prev,
        [activeMusic.link]: formatTime(el.duration),
      }));
    };

    const onTimeUpdate = () => {
      if (isDraggingRef.current) return;
      const ct = el.currentTime;
      const dur = el.duration || 1;
      setCurrentTime(ct);
      updateProgressBar((ct / dur) * 100);
    };

    const onEnded = () => {
      setIsPlaying(false);
      stopAnimation();
      setCurrentTime(0);
      updateProgressBar(0);
      if (isInfinityActiveRef.current) {
        shouldAutoPlayRef.current = true;
        playNextMusicInActiveGroup();
        return;
      }
      shouldAutoPlayRef.current = false;
    };

    const onPlay = () => {
      setIsPlaying(true);
      const activeEl = wrapper?.current?.querySelector(
        ".single-music.active-music",
      );
      if (activeEl && !animationCleanupRef.current) {
        animationCleanupRef.current = startAnimation(activeEl);
      }
    };

    el.addEventListener("loadedmetadata", onLoadedMetadata);
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);

    return () => {
      el.removeEventListener("loadedmetadata", onLoadedMetadata);
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
    };
  }, [activeMusic]);

  // Reset when song changes
  useEffect(() => {
    stopAnimation();
    setCurrentTime(0);
    setDuration(0);
    updateProgressBar(0);
    audio.current?.load();
    if (shouldAutoPlayRef.current) {
      audio.current?.play();
    }
  }, [activeMusic]);

  // ─── GSAP popup ───────────────────────────────────────────────────
  useGSAP(
    () => {
      const playerPopup = wrapper?.current;
      const playerBG = playerPopup?.querySelector(".player-bg");
      if (props.audioPopup) {
        document.body.classList.add("overflow-hidden");
        const popupOpen = gsap.timeline();
        if (playerPopup) {
          popupOpen.to(playerPopup, {
            opacity: 1,
            visibility: "visible",
            ease: "expo.inOut",
            duration: 1,
            delay: 0,
          });
        }
        if (playerBG) {
          popupOpen.to(playerBG, {
            duration: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "expo.inOut",
          });
        }
      } else {
        document.body.classList.remove("overflow-hidden");
        const popupClose = gsap.timeline();
        if (playerBG) {
          popupClose.to(playerBG, {
            duration: 1,
            clipPath: "inset(100% 0% 0% 0%)",
            ease: "expo.inOut",
          });
        }
        if (playerPopup) {
          popupClose.to(playerPopup, {
            opacity: 0,
            duration: 1,
            ease: "expo.inOut",
            delay: 0,
          });
          popupClose.to(playerPopup, {
            visibility: "hidden",
            duration: 0,
            ease: "none",
            delay: 0,
          });
        }
      }
      // Cleanup on unmount
      return () => {
        document.body.classList.remove("overflow-hidden");
        if (playerBG) {
          gsap.set(playerBG, { clearProps: "all" });
        }
        if (playerPopup) {
          gsap.set(playerPopup, { clearProps: "all" });
        }
      };
    },
    { scope: wrapper, dependencies: [pathname, props.audioPopup] },
  );

  return (
    <section
      ref={wrapper}
      dir="rtl"
      id="audio-player"
      className={`${props.extraClass} h-screen fixed top-0 left-0 bg-black flex items-center z-999 overflow-hidden opacity-0 invisible`}
    >
      {/* ── Background ── */}
      <div
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        className="player-bg absolute top-0 left-0 w-full h-full z-10 overflow-hidden bg-[#22291B]"
      >
        <Image
          className="bg-image w-full object-cover object-center h-full"
          src={PlayerBG?.src}
          width="1920"
          height="1080"
          blurDataURL={PlayerBG?.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Section Background"
        />
      </div>

      <div className="player-wrapper w-full h-full relative z-40 py-[10vh] px-[5vw]">
        {/* ── Close button ── */}
        <button
          onClick={() => {
            props.setAudioPopup(false);
            handleClosePopup();
          }}
          className="absolute top-4 left-4 cursor-pointer"
        >
          <CloseIcon2 className="w-5 h-auto" />
        </button>

        <div className="player-content flex items-start w-full h-full gap-x-[4.4vw]">
          <div className="player-widgets w-[20%]">
            <div className="album-widget w-full h-full px-3.5 py-4.5 pb-8 bg-linear-to-b from-[#ffffff15] to-[#ffffff08] backdrop-blur-lg rounded-3xl drop-shadow-[0_21px_70px_0_rgba(0,0,0,0.55)]">
              {/* Album thumb */}
              <div className="album-thumb w-full h-83.5 rounded-[20] overflow-hidden relative">
                <div className="thumb w-full h-full relative">
                  <Image
                    className="bg-image w-full object-cover object-center h-full"
                    src={AlbumImage?.src}
                    width="344"
                    height="334"
                    blurDataURL={AlbumImage?.blurDataURL}
                    placeholder={"blur"}
                    loading="lazy"
                    alt="Turntable"
                  />
                  <div className="overlay absolute top-0 left-0 w-full h-full bg-linear-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.72)]"></div>
                </div>
                <div className="album-info absolute right-0 bottom-0 px-3.5 py-3 flex flex-col gap-y-2">
                  <h4 className="text-[#F4EDDD] text-[18px] leading-[120%]">
                    {
                      musicPageData?.allAlbums?.[props.activeMusicFolder]
                        ?.album_title
                    }
                  </h4>
                  <p className="tags text-[#ffffff] text-[10px] leading-[100%] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] py-2 px-3 rounded-full">
                    אוסף • תיקיות לפי נושא
                  </p>
                </div>
              </div>

              {/* Folder count */}
              <div className="album-result-count mt-7">
                <p className="flex items-center justify-between text-[#ffffff] text-[11px] leading-[100%]">
                  תיקיות ראשיות
                  <span className="w-6.5 h-6.5 text-[#ffffff] text-[10px] leading-[100%] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] p-1 flex items-center justify-center rounded-full">
                    {musicPageData?.allAlbums?.length || 0}
                  </span>
                </p>
              </div>

              {/* Folder buttons */}
              <div className="album-result mt-3 flex flex-col gap-y-2 max-h-37 overflow-y-auto">
                {musicPageData?.allAlbums?.map((item: any, index: number) => (
                  <div
                    onClick={() => {
                      props.setActiveMusicFolder(index);
                      props.setActiveTab(0);
                    }}
                    key={index}
                    className={`text-[#F4EDDD] text-[18px] leading-[100%] ${props.activeMusicFolder === index ? "bg-[rgba(0,0,0,0.60)]" : "bg-[rgba(255,255,255,0.04)]"} border border-[rgba(255,255,255,0.10)] rounded-2xl text-right py-3 px-4 hover:bg-[rgba(0,0,0,0.60)] cursor-pointer transition-all duration-300`}
                  >
                    {item.album_title}
                  </div>
                ))}
              </div>

              {/* Search */}
              <div className="album-search mt-7.5 flex items-center gap-x-2">
                <input
                  className="w-full text-[#F4EDDD] text-[18px] leading-[100%] bg-[rgba(255,255,255,0.40)] border border-[rgba(255,255,255,0.10)] rounded-full text-right py-3 px-4 hover:bg-[rgba(0,0,0,0.60)] focus:outline-0 transition-all duration-300"
                  type="text"
                  id="search"
                  name="search"
                />
                <button className="fill-[#F4EDDD] min-w-11 w-11 h-11 text-[#ffffff] text-[10px] leading-[100%] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] p-3 flex items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.60)] cursor-pointer focus:outline-0 transition-all duration-300">
                  <SearchIcon2 />
                </button>
              </div>
            </div>
          </div>
          <div className="player-left w-[calc(80%-4.4vw)] flex flex-col gap-y-[7vh]">
            <div className="player-content flex flex-col gap-y-[2vh]">
              <h2 className="text-[#C3A13F] text-[55px] leading-[75%]">
                {parse(musicPageData?.introduction?.album_title || "")}
              </h2>
              <div className="text max-w-177 text-[23px] leading-[120%]">
                {parse(musicPageData?.introduction?.album_subtitle || "")}
              </div>
            </div>

            <div className="player-content-tabs flex flex-col gap-y-5">
              {/* Tab headers */}
              <div className="tab-head max-w-full">
                <Swiper
                  modules={[Mousewheel]}
                  slidesPerView="auto"
                  spaceBetween={24}
                  mousewheel={{ forceToAxis: true, releaseOnEdges: false }}
                  className="tab-head-swiper"
                >
                  {musicPageData?.album?.music_category?.map(
                    (item: any, index: number) => (
                      <SwiperSlide key={index} className="w-auto!">
                        <div
                          data-key={index}
                          onClick={() => props.setActiveTab(index)}
                          className={`single-tab-head min-w-60 w-auto text-[#ffffff] text-[24px] leading-[100%] ${props.activeTab === index ? "bg-[rgba(0,0,0,0.60)]" : "bg-[rgba(255,255,255,0.04)]"} border border-[rgba(255,255,255,0.12)] py-3 px-5 flex items-center justify-between rounded-full hover:bg-[rgba(0,0,0,0.60)] cursor-pointer transition-all duration-300 ${props.activeTab === index && "active-tab"}`}
                        >
                          <p>{parse(item.album_title || "")}</p>
                          <span className="icon w-3">
                            <ArrowLeft extraClass="fill-white" />
                          </span>
                        </div>
                      </SwiperSlide>
                    ),
                  )}
                </Swiper>
              </div>

              {/* Tab content */}
              <div className="tab-content-wrapper">
                {musicPageData?.album?.music_category[props.activeTab] && (
                  <div data-index={props.activeTab} className="tab-content">
                    <div className="text text-[18px] leading-[120%] max-w-191.25">
                      {parse(
                        isAlbumTextExpanded ? albumText : truncatedAlbumText,
                      )}
                      {shouldShowAlbumReadMore && (
                        <button
                          onClick={handleAlbumTextReadMore}
                          className="read-more text-[14px] leading-[100%] text-[#E5C15A] mr-2 cursor-pointer hover:opacity-70 transition-opacity"
                        >
                          {isAlbumTextExpanded ? "הסתר..." : "קרא עוד..."}
                        </button>
                      )}
                    </div>

                    {/* Music list */}
                    <div className="tab-music-list mt-7.5">
                      <SimpleBar
                        style={{
                          maxHeight: "34vh",
                          paddingLeft: 20,
                          paddingRight: 0,
                          marginLeft: -20,
                        }}
                        autoHide={false}
                      >
                        <div className="music-list-wrapper flex flex-col gap-y-4">
                          {musicPageData?.album?.music_category[
                            props.activeTab
                          ]?.musics?.map((item: any, index: number) => {
                            const isActive =
                              activeMusic.musicIndex === index &&
                              activeMusic.tabIndex === props.activeTab;
                            return (
                              <div
                                key={index}
                                onClick={() => {
                                  if (isActive) return;
                                  shouldAutoPlayRef.current = true;
                                  setActiveMusic({
                                    ...activeMusic,
                                    tabIndex: props.activeTab,
                                    musicIndex: index,
                                    title: item?.title,
                                    link: item?.music?.url,
                                  });
                                }}
                                className={`single-music flex items-center justify-between gap-4 ${isActive ? "bg-[rgba(0,0,0,0.8)] active-music" : "bg-[rgba(0,0,0,0.4)]"} py-4 px-5 rounded-full relative cursor-pointer hover:bg-[rgba(0,0,0,0.8)] transition-all duration-300`}
                              >
                                <div className="title flex items-center gap-x-8">
                                  <div className="icon min-w-8">
                                    <PlayIcon2 />
                                  </div>
                                  <h5 className="text-[24px] leading-[1.2em]">
                                    {parse(item?.title || "")}
                                  </h5>
                                </div>

                                {/* Playing animation icon */}
                                <div
                                  className={`music-play absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isActive ? "opacity-100" : "opacity-0"}`}
                                >
                                  <PlayingIcon />
                                </div>

                                {/* Duration — shows real time once loaded, otherwise cached */}
                                <div className="duration text-[21px] leading-[100%] text-[#FBF4E6]">
                                  <p>
                                    {isActive
                                      ? formatTime(duration) ||
                                        musicDurations[item?.music?.url] ||
                                        "0:00"
                                      : musicDurations[item?.music?.url] ||
                                        "0:00"}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </SimpleBar>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="audio-player absolute left-[5vw] right-[5vw] bottom-[3vh] bg-[rgba(0,0,0,0.5)] h-22 backdrop-blur-lg rounded-full border border-[rgba(255,255,255,0.08)]">
            <div className="audio-player-wrapper w-full h-full flex items-center justify-between p-3.75">
              {/* Music info */}
              <div className="music-info flex items-center gap-x-4">
                <div className="thumb w-11 h-11 border border-[rgba(255,255,255,0.1)] rounded-[14px] overflow-hidden">
                  <Image
                    className="bg-image w-full object-cover object-center h-full"
                    src={AlbumImage?.src}
                    width="44"
                    height="44"
                    blurDataURL={AlbumImage?.blurDataURL}
                    placeholder={"blur"}
                    loading="lazy"
                    alt="Turntable"
                  />
                </div>
                <div className="title text-[16px] leading-[100%] font-bold">
                  {activeMusic.title}
                </div>
              </div>

              {/* Controls */}
              <div className="music-player-controls flex items-center flex-row-reverse gap-x-5">
                {/* Total duration */}
                <div className="duration text-[16px] text-[rgba(255,255,255,0.62)] min-w-10 text-center tabular-nums">
                  {formatTime(duration)}
                </div>

                {/* ── Timeline ── */}
                <div
                  ref={timelineRef}
                  onMouseDown={handleTimelineMouseDown}
                  className="player-timeline w-[38.4vw] h-2 border border-[#FFFFFF14] rounded-full relative cursor-pointer group select-none"
                >
                  {/* Filled progress */}
                  <div
                    ref={progressRef}
                    className="timeline absolute top-0 right-0 h-full w-0 bg-linear-to-l from-[#D1A941] to-[#E2C15A] rounded-full pointer-events-none transition-none"
                  />
                  {/* Scrubber thumb */}
                  <div
                    className="scrubber-thumb absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#C3A13F] rounded-full shadow-[0_0_6px_rgba(195,161,63,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{
                      right: progressRef.current
                        ? `calc(${progressRef.current.style.width} - 7px)`
                        : "-7px",
                    }}
                  />
                </div>

                {/* Current time */}
                <div className="current-time text-[16px] text-[rgba(255,255,255,0.62)] min-w-10 text-center tabular-nums">
                  {formatTime(currentTime)}
                </div>

                {/* Buttons */}
                <div className="controls flex gap-x-2.5 items-center flex-row-reverse">
                  <div
                    onClick={handleBackward}
                    className="backward cursor-pointer bg-[#FFFFFF0A] border border-[#FFFFFF1A] w-9 h-9 rounded-full flex items-center justify-center p-2 hover:bg-[#C3A13F] transition-all duration-300"
                  >
                    <BackwardIcon />
                  </div>
                  <div
                    onClick={handlePlayPause}
                    className={`play cursor-pointer bg-[#C3A13F] border border-[#FFFFFF1A] w-10.5 h-10.5 rounded-full flex items-center justify-center pt-3.5 pr-3 pb-3.5 ${isPlaying ? "pl-3.5" : "pl-4"} hover:bg-[#eacb70] transition-colors duration-300`}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon3 />}
                  </div>
                  <div
                    onClick={handleForward}
                    className="forward cursor-pointer bg-[#FFFFFF0A] border border-[#FFFFFF1A] w-9 h-9 rounded-full flex items-center justify-center p-2 hover:bg-[#C3A13F] transition-all duration-300"
                  >
                    <ForwardIcon />
                  </div>
                  <div
                    onClick={() => handleInfinityToggle()}
                    aria-pressed={isInfinityActive}
                    className={`infinity cursor-pointer border border-[#FFFFFF1A] w-9 h-9 rounded-full flex items-center justify-center p-2 hover:bg-[#C3A13F] transition-all duration-300 ${isInfinityActive ? "bg-[#C3A13F]" : "bg-[#FFFFFF0A]"}`}
                  >
                    <ReplayIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AudioPlayer2 audioRef={audio} src={activeMusic.link} />
    </section>
  );
}
