import parse from "html-react-parser";
import Image from "next/image";
import { useEffect } from "react";
import GraduateBG from "../assets/images/graduate-text-bg.png";

interface ChildProps {
  key: number;
  data: { title: string; content: string };
}

export default function SingleGraduates(props: ChildProps) {
  useEffect(() => {
    //console.log(props.data.title);
  }, []);
  return (
    <div className="single-graduate w-[19.27vw] h-auto relative">
      <div className="text-bg">
        <Image
          className="w-full object-cover object-center h-full relative z-10 will-change-transform"
          src={GraduateBG?.src}
          width="370"
          height="554"
          blurDataURL={GraduateBG?.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Graduates"
        />
        <div className="graduate-text absolute top-0 left-0 z-20 w-full h-full flex items-center text-[28px] text-black leading-[90%] py-[30%] px-[24%]">
          <p>{parse(props.data?.content)}</p>
        </div>
      </div>
      <div className="graduate-title text-center relative z-30 -mt-5">
        <h2 className="text-[#D1A941] text-[55px] leading-[70%]">
          {parse(props.data?.title)}
        </h2>
      </div>
    </div>
  );
}
