"use client";
import { useAppState } from "@/app/components/AppContext";
import MirrorAudioPlayer from "@/app/components/music/MirrorAudioPlayer";
import Image from "next/image";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";

const MusicPlayerAndFixedImage = () => {
  // Selectors
  const {
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
  } = useAppState();

  return (
    <>
      <div
        id="hover-image"
        className="fixed top-0 left-0 z-999 w-29 h-43.25 -ml-14.5 -mt-21.5 overflow-hidden opacity-0 invisible cursor-none pointer-events-none"
      >
        {musicPageData?.holidayPosts?.map((item: any, index: number) => {
          return (
            <div
              key={item?.id}
              data-index={item?.id}
              className={`image-wrapper hover-image-${index} w-29 h-43.25 absolute top-0 left-0`}
            >
              <Image
                className="bg-image w-full object-cover object-center h-full"
                src={
                  item?.acf?.introduction?.album_image_1?.sizes?.thumbnail ||
                  item?.acf?.introduction?.album_image_1?.url ||
                  item?.acf?.introduction?.album_image_1?.src
                }
                width="116"
                height="173"
                blurDataURL={CreateShimmerDataUrl(116, 173)}
                placeholder={"blur"}
                loading="lazy"
                alt={item?.acf?.introduction?.album_title || "Album Image"}
                unoptimized
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
  );
};

export default MusicPlayerAndFixedImage;
