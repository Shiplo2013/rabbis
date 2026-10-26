import Image from "next/image";
import CreateShimmerDataUrl from "../CreateShimmerDataUrl";
import HistoryVideoPlayer from "../HistoryVideoPlayer";

export default function CardItemImages(props: { data: any; isOpen: boolean }) {
  return (
    <div
      className={`expand-images ${props.isOpen ? "block" : "hidden"} lg:block lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-full overflow-hidden z-40`}
    >
      <div className="images-wrapper flex gap-x-[2.7vw]">
        {props.data?.content &&
          props.data?.content?.map((item: any, index: number) => {
            if (item.type === "image" && item.image) {
              return (
                <div
                  key={"TimelineCard-" + index}
                  className={`image w-full h-auto ${index === 0 ? "lg:w-[28.8vw] lg:h-[38.1vh]" : "lg:w-[12vw] lg:h-[39vh]"}`}
                >
                  <Image
                    className="w-full object-cover object-center h-full relative z-10"
                    src={
                      item?.image?.sizes?.large ||
                      item?.image?.src ||
                      "/images/rabbis-timeline1.jpg"
                    }
                    width="553"
                    height="354"
                    blurDataURL={
                      CreateShimmerDataUrl(553, 354) || item.image?.blurDataURL
                    }
                    placeholder={"blur"}
                    loading="lazy"
                    alt="Card Image"
                  />
                </div>
              );
            } else {
              return (
                <div
                  key={"TimelineCard-" + index}
                  className={`video w-full h-auto ${index === 0 ? "lg:w-[28.8vw] lg:h-[38.1vh]" : "lg:w-[12vw] lg:h-[39vh]"} relative group`}
                >
                  {item.video.url && (
                    <HistoryVideoPlayer
                      key={String(props.isOpen)}
                      data={item}
                      isOpen={props.isOpen}
                    />
                  )}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
