import ArrowLeft from "@/app/assets/icons/ArrowLeft";
import CloseIcon2 from "@/app/assets/icons/CloseIcon2";
import PlayIcon2 from "@/app/assets/icons/PlayIcon2";
import PlayingIcon from "@/app/assets/icons/PlayingIcon";
import SearchIcon2 from "@/app/assets/icons/SearchIcon2";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
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

const getAudioDuration = (url: string) => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.src = url;
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration); // Duration is in seconds
    });
  });
};

export default function MirrorAudioPlayer(props: ChildProps) {
  // Selector
  const wrapper = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Get Section Data
  const [sectionData, setSectionData] = useState(JSON.parse(props.data));
  const [activeTab, setActiveTab] = useState(0);
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
                      className={`single-tab-head text-[#ffffff] text-[24px] leading-[100%] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.12)] py-3 px-5 flex items-center justify-between rounded-full hover:bg-[rgba(0,0,0,0.60)] cursor-pointer w-1/4 transition-all duration-300 ${index === 0 && "active-tab"}`}
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
                    <div className="tab-music-list flex flex-col gap-y-4 mt-7.5">
                      {sectionData.tabs[activeTab]?.musics?.map(
                        (
                          music: { title: string; link: string },
                          index: number,
                        ) => (
                          <div
                            key={index}
                            className="single-music flex items-center justify-between bg-[rgba(0,0,0,0.4)] py-4 px-5 rounded-full relative cursor-pointer hover:bg-[rgba(0,0,0,0.8)] transition-all duration-300"
                          >
                            <div className="title flex items-center gap-x-8">
                              <PlayIcon2 />
                              <h5 className="text-[24px] leading-[1.2em]">
                                {music.title}
                              </h5>
                            </div>
                            <div className="music-play absolute top-1/2 left-1/2 -translate-1/2">
                              <PlayingIcon />
                            </div>
                            <div className="duration text-[21px] leading-[100%] text-[#FBF4E6]">
                              <p>5:25</p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
