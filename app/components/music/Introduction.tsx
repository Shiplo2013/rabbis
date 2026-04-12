import parse from "html-react-parser";
import Image from "next/image";
import { useRef } from "react";
import TurntableDisk from "../../assets/images/turntable-disk.png";
import TurntableHead from "../../assets/images/turntable-head.png";

interface ChildProps {
  extraClass: string;
  animated: boolean;
  animationStatus: boolean;
  data: { title: string }[];
}

export default function Introduction(props: ChildProps) {
  // Section Selector
  const wrapper = useRef<HTMLDivElement>(null);
  return (
    <section
      ref={wrapper}
      className={`${props.extraClass} relative h-screen bg-[#525A45]`}
    >
      <div className="section-bg bg-linear-to-r from-[#525A45] to-[#21281A] absolute top-0 right-0 w-[170vw] h-full z-10"></div>
      <div dir="ltr" className="flex items-center w-full h-full relative z-30">
        <div className="turntable absolute w-[44vw] h-[60vh] top-[30%] right-[16%] opacity-10">
          <div className="disk absolute left-[10%] top-0 w-[26.5vw]">
            <Image
              className="bg-image w-full object-cover object-center h-full"
              src={TurntableDisk?.src}
              width="844"
              height="563"
              blurDataURL={TurntableDisk?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt="Turntable"
            />
          </div>
          <div className="head absolute right-[5vw] top-[1vw] w-[18vw] origin-top-right -rotate-20">
            <Image
              className="bg-image w-full object-cover object-center h-full"
              src={TurntableHead?.src}
              width="844"
              height="563"
              blurDataURL={TurntableHead?.blurDataURL}
              placeholder={"blur"}
              loading="lazy"
              alt="Turntable"
            />
          </div>
        </div>
        <div className="section-wrapper text-right flex flex-col items-end gap-x-[3.75vw]">
          <h1 className="intro-title text-[135px] text-white leading-[0.6em] overflow-hidden relative z-20 py-7.5">
            {parse(props.data[0].title)}
          </h1>
        </div>
      </div>
    </section>
  );
}
