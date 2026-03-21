import ThemeButton from "@/app/ui/ThemeButton";
import Image from "next/image";
import PlusIcon from "../../assets/icons/PlusIcon";
import thumb from "../../assets/images/video-section.jpg";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function SingleVideoSection(props: ChildProps) {
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} bg-black flex items-center relative z-20`}
    >
      <div className="video-wrapper w-full h-full relative">
        <div className="video h-full w-[26vw] relative z-10">
          <Image
            className="w-full object-cover object-center h-full"
            src={thumb?.src}
            width={"500"}
            height={"932"}
            blurDataURL={thumb?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt={"Section Image"}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 z-30 -translate-1/2">
          <ThemeButton
            extraClass="w-29.25 h-29.25 flex items-center justify-center border-2 border-[#C3A13F] group"
            bgColor="bg-[#0F0F0F85]"
            hoverBgColor="bg-[#000000]"
            svgIcon={<PlusIcon />}
            svgIconClass={
              "-skew-x-10 group-hover:skew-0 transition-all duration-500 group-hover:rotate-180"
            }
          />
        </div>
      </div>
    </section>
  );
}
