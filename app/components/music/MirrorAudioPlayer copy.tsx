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
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
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
  data: string;
}

export default function MirrorAudioPlayer(props: ChildProps) {
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const playerControls = useRef<HTMLDivElement>(null);
  const animationCleanupRef = useRef<(() => void) | null>(null);
  const pathname = usePathname();
  // Get Section Data
  const [sectionData, setSectionData] = useState(JSON.parse(props.data));
  const [activeTab, setActiveTab] = useState(0);
  const [activeMusic, setActiveMusic] = useState({
    tabIndex: 0,
    musicIndex: 0,
    title: `${sectionData.tabs[0].musics[0].title}`,
    link: `${sectionData.tabs[0].musics[0].link}`,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerDuration, setPlayerDuration] = useState("0:00");
  const [playerCurrentTime, setPlayerCurrentTime] = useState("0:00");

  // Music Playing animate funciton
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
        ease: "easeInOut",
        transformOrigin: "50% 50%",
        onComplete: run, // repeat forever with a new random value each cycle
      });
    };

    run();

    return () => gsap.killTweensOf(path); // cleanup
  }
  const startAnimation = (currentMusic: Element | null) => {
    const paths = Array.from(
      currentMusic?.querySelectorAll(".music-play>svg>g>path") || [],
    ) as SVGPathElement[];

    const cleanups = paths.map((p) => scaleYPathRandomly(p));

    return () => cleanups.forEach((fn) => fn());
  };
  // Stop animation
  const stopAnimation = () => {
    if (animationCleanupRef.current) {
      animationCleanupRef.current();
      animationCleanupRef.current = null;
    }
    // Reset all paths to original scale
    const paths = Array.from(
      wrapper?.current?.querySelectorAll(".music-play>svg>g>path") || [],
    ) as SVGPathElement[];
    paths.forEach((p) =>
      gsap.to(p, {
        scaleY: 0,
        duration: 0.3,
        ease: "easeInOut",
        transformOrigin: "50% 50%",
      }),
    );
  };

  // Handle play/pause click
  const handlePlayPause = () => {
    if (isPlaying) {
      audio.current?.pause();
      stopAnimation();
    } else {
      audio.current?.play();
      if (wrapper?.current?.querySelector(".single-music.active-music")) {
        animationCleanupRef.current = startAnimation(
          wrapper?.current?.querySelector(".single-music.active-music"),
        );
      }
    }
    setIsPlaying(!isPlaying);
  };
  // Effect On Active Music Change
  useEffect(() => {
    if (audio?.current) {
      audio.current.load();
      // On audio load, get the duration and set it to the duration element
      audio?.current.addEventListener("load", () => {
        // Selector
        const musicTitle =
          playerControls?.current?.querySelector(".music-info .title");

        // Calculate and log the duration of the audio in minutes and seconds
        const duration = audio?.current?.duration
          ? (audio.current.duration / 60).toFixed(2)
          : "0:00";
        console.log("Audio duration:", duration);

        // Frontend display of duration
        setPlayerDuration(duration.replace(".", ":"));
        // Update Title
        if (musicTitle) {
          musicTitle.innerHTML = activeMusic.title;
        }
      });
      // After Loaded Metadata, play the audio
      audio?.current.addEventListener("loadedmetadata", () => {
        if (audio.current) {
          audio.current.muted = false;
          setIsPlaying(true);
        }
      });
      // Audio Playing Animation
      audio?.current.addEventListener("playing", () => {
        const currentMusic = wrapper?.current?.querySelector(
          ".single-music.active-music",
        );
        console.log(audio?.current?.currentTime);
        // if (currentMusic) {
        //   animationCleanupRef.current = startAnimation(currentMusic);
        // }
      });
    }
  }, [activeMusic]);
  // Use GSAP
  useGSAP(
    () => {
      const playerPopup = wrapper?.current;
      const playerBG = playerPopup?.querySelector(".player-bg");
      if (props.audioPopup) {
        document.body.classList.add("overflow-hidden");
        const popupOpen = gsap.timeline();
        //console.log(playerPopup);
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
    },
    {
      scope: wrapper,
      dependencies: [pathname, props.audioPopup],
    },
  );
  return (
    <section
      ref={wrapper}
      dir="rtl"
      id="audio-player"
      className={`${props.extraClass} h-screen fixed top-0 left-0 bg-black flex items-center z-999 overflow-hidden opacity-0 invisible`}
    >
      <div
        style={{
          clipPath: "inset(100% 0% 0% 0%)",
        }}
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
        <button
          onClick={() => props.setAudioPopup(false)}
          className="absolute top-4 left-4 cursor-pointer"
        >
          <CloseIcon2 className="w-5 h-auto" />
        </button>
        <div className="player-content flex items-start w-full h-full gap-x-[4.4vw]">
          <div className="player-widgets w-92.5 min-w-92.5">
            <div className="album-widget w-full h-full px-3.5 py-4.5 pb-8 bg-linear-to-b from-[#ffffff15] to-[#ffffff08] backdrop-blur-lg rounded-3xl drop-shadow-[0_21px_70px_0_rgba(0,0,0,0.55)]">
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
                  <div className="overlay absolute top-0 left-0 w-full h-full bg-linear-to-b from-[rgba(0,0,0,0.1) to-[rgba(0,0,0,0.72)]"></div>
                </div>
                <div className="album-info absolute right-0 bottom-0 px-3.5 py-3 flex flex-col gap-y-2">
                  <h4 className="text-[#F4EDDD] text-[18px] leading-[120%]">
                    ימים נוראים
                  </h4>
                  <p className="tags text-[#ffffff] text-[10px] leading-[100%] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] py-2 px-3 rounded-full">
                    אוסף • תיקיות לפי נושא
                  </p>
                </div>
              </div>
              <div className="album-result-count mt-7">
                <p className="flex items-center justify-between text-[#ffffff] text-[11px] leading-[100%]">
                  תיקיות ראשיות
                  <span className="w-6.5 h-6.5 text-[#ffffff] text-[10px] leading-[100%] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] p-1 flex items-center justify-center rounded-full">
                    3
                  </span>
                </p>
              </div>
              <div className="album-result mt-3 flex flex-col gap-y-2">
                <button className="text-[#F4EDDD] text-[18px] leading-[100%] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)] rounded-2xl text-right py-3 px-4 hover:bg-[rgba(0,0,0,0.60)] cursor-pointer transition-all duration-300">
                  סליחות
                </button>
                <button className="text-[#F4EDDD] text-[18px] leading-[100%] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)] rounded-2xl text-right py-3 px-4 hover:bg-[rgba(0,0,0,0.60)] cursor-pointer transition-all duration-300">
                  ראש השנה
                </button>
                <button className="text-[#F4EDDD] text-[18px] leading-[100%] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)] rounded-2xl text-right py-3 px-4 hover:bg-[rgba(0,0,0,0.60)] cursor-pointer transition-all duration-300">
                  יום כיפור
                </button>
              </div>
              <div className="album-search mt-7.5 flex items-center gap-x-2">
                <input
                  className="w-full text-[#F4EDDD] text-[18px] leading-[100%] bg-[rgba(255,255,255,0.40)] border border-[rgba(255,255,255,0.10)] rounded-full text-right py-3 px-4 hover:bg-[rgba(0,0,0,0.60)] focus:outline-0 transition-all duration-300"
                  type="text"
                  id="search"
                  name={"search"}
                />
                <button className="fill-[#F4EDDD] min-w-11 w-11 h-11 text-[#ffffff] text-[10px] leading-[100%] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] p-3 flex items-center justify-center rounded-full hover:bg-[rgba(0,0,0,0.60)] cursor-pointer focus:outline-0 transition-all duration-300">
                  <SearchIcon2 />
                </button>
              </div>
            </div>
          </div>
          <div className="player-left w-full flex flex-col gap-y-[7vh]">
            <div className="player-content flex flex-col gap-y-[2vh]">
              <h2 className="text-[#C3A13F] text-[55px] leading-[75%]">
                {sectionData.title}
              </h2>
              <div className="text max-w-177 text-[23px] leading-[120%]">
                {sectionData.text}
              </div>
            </div>
            <div className="player-content-tabs flex flex-col gap-y-5">
              <div className="tab-head flex gap-x-6">
                {sectionData.tabs?.map(
                  (
                    item: {
                      tabTitle: string;
                      text: string;
                      musics: { title: string; link: string };
                    },
                    index: number,
                  ) => (
                    <div
                      key={index}
                      data-key={index}
                      onClick={() => setActiveTab(index)}
                      className={`single-tab-head text-[#ffffff] text-[24px] leading-[100%] ${activeTab === index ? "bg-[rgba(0,0,0,0.60)]" : "bg-[rgba(255,255,255,0.04)]"} border border-[rgba(255,255,255,0.12)] py-3 px-5 flex items-center justify-between rounded-full hover:bg-[rgba(0,0,0,0.60)] cursor-pointer w-1/4 transition-all duration-300 ${activeTab === index && "active-tab"}`}
                    >
                      <p>{item.tabTitle}</p>
                      <span className="icon w-3">
                        <ArrowLeft extraClass="fill-white" />
                      </span>
                    </div>
                  ),
                )}
              </div>
              <div className="tab-content-wrapper">
                {sectionData.tabs[activeTab] && (
                  <div data-index={activeTab} className="tab-content">
                    <div className="text text-[18px] leading-[120%] max-w-191.25">
                      {sectionData.tabs[activeTab].text}
                      <Link
                        href={"/"}
                        className="text-[14px] leading-[100%] text-[#E5C15A] mr-2"
                      >
                        קרא עוד...
                      </Link>
                    </div>
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
                          {sectionData.tabs[activeTab]?.musics?.map(
                            (
                              music: { title: string; link: string },
                              index: number,
                            ) => (
                              <div
                                key={index}
                                onClick={() => {
                                  setActiveMusic({
                                    ...activeMusic,
                                    tabIndex: activeTab,
                                    musicIndex: index,
                                    title: music.title,
                                    link: music.link,
                                  });
                                }}
                                className={`single-music flex items-center justify-between ${activeMusic.musicIndex === index && activeMusic.tabIndex === activeTab ? "bg-[rgba(0,0,0,0.8)] active-music" : "bg-[rgba(0,0,0,0.4)]"} py-4 px-5 rounded-full relative cursor-pointer hover:bg-[rgba(0,0,0,0.8)] transition-all duration-300`}
                              >
                                <div className="title flex items-center gap-x-8">
                                  <PlayIcon2 />
                                  <h5 className="text-[24px] leading-[1.2em]">
                                    {music.title}
                                  </h5>
                                </div>
                                <div
                                  className={`music-play absolute top-1/2 left-1/2 -translate-1/2 ${activeMusic.musicIndex === index && activeMusic.tabIndex === activeTab ? "opacity-100" : "opacity-0"}`}
                                >
                                  <PlayingIcon />
                                </div>
                                <div className="duration text-[21px] leading-[100%] text-[#FBF4E6]">
                                  <p>5:25</p>
                                </div>
                              </div>
                            ),
                          )}
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
              <div
                ref={playerControls}
                className="music-player-controls flex items-center flex-row-reverse gap-x-5"
              >
                <div className="duration text-[16px] text-[rgba(255,255,255,0.62)]">
                  0:00
                </div>
                <div className="player-timeline w-[38.4vw] h-2 border border-[#FFFFFF14] rounded-full relative">
                  <div className="timeline absolute top-0 right-0 h-full w-0 bg-linear-to-l from-[#D1A941] to-[#E2C15A] rounded-full"></div>
                </div>
                <div className="current-time text-[16px] text-[rgba(255,255,255,0.62)]">
                  0:00
                </div>
                <div className="controls flex gap-x-2.5 items-center flex-row-reverse">
                  <div className="backward cursor-pointer bg-[#FFFFFF0A] border border-[#FFFFFF1A] w-9 h-9 rounded-full flex items-center justify-center p-2 hover:bg-[#C3A13F] transition-all duration-300">
                    <BackwardIcon />
                  </div>
                  <div
                    onClick={() => handlePlayPause()}
                    className={`play cursor-pointer bg-[#C3A13F] border border-[#FFFFFF1A] w-10.5 h-10.5 rounded-full flex items-center justify-center pt-3.5 pr-3 pb-3.5 ${isPlaying ? "pl-3.5" : "pl-4"} hover:bg-[#eacb70] transition-colors duration-300`}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon3 />}
                  </div>
                  <div className="forward cursor-pointer bg-[#FFFFFF0A] border border-[#FFFFFF1A] w-9 h-9 rounded-full flex items-center justify-center p-2 hover:bg-[#C3A13F] transition-all duration-300">
                    <ForwardIcon />
                  </div>
                  <div className="infinity cursor-pointer bg-[#FFFFFF0A] border border-[#FFFFFF1A] w-9 h-9 rounded-full flex items-center justify-center p-2 hover:bg-[#C3A13F] transition-all duration-300">
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
