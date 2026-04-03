import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ViewIcon2 from "../assets/icons/ViewIcon2";
import Frame from "../assets/images/pictures-frame.png";

interface ChildProps {
  key: number;
  data: {
    title: string;
    image: any;
    link: string;
  };
}

export default function SingleCyclePicture(props: ChildProps) {
  // Selectors
  const [viewContent, setViewContent] = useState(false);

  return (
    <div className="single-cycle-picture w-[44.27vw] will-change-transform">
      <div className="cycle-frame relative">
        <div className="group relative z-40 w-full h-full max-w-full">
          <Image
            className="w-full object-cover object-center h-full relative z-30 will-change-transform cursor-none pointer-events-none"
            src={Frame?.src}
            width="855"
            height="547"
            blurDataURL={Frame?.blurDataURL}
            placeholder={"blur"}
            loading="lazy"
            alt="Graduates"
          />
          <div className="cycle-content-wrapper absolute top-0 left-0 z-10 w-full h-full overflow-hidden">
            {props.data.image ? (
              <div className="picture-image absolute top-5 left-5 right-5 bottom-5 z-10 w-auto h-auto">
                <Image
                  className="w-full object-cover object-center h-full relative z-10 will-change-transform"
                  src={props.data.image?.src}
                  width="855"
                  height="547"
                  blurDataURL={props.data.image?.blurDataURL}
                  placeholder={"blur"}
                  loading="lazy"
                  alt="Graduates"
                />
              </div>
            ) : (
              <div
                className={`picture-content absolute top-5 left-5 bottom-5 right-5 bg-[#1A1A1A] w-full h-full z-30 text-[45px] leading-[1.2em] text-[#656158] px-[8vw] py-[12vh]`}
              >
                <p>
                  יש לך את תמונת המחזור של ועד ק״ל?
                  <br />
                  נשמח שתיצור איתנו קשר
                </p>
                <Link
                  href={"/"}
                  className="border-b border-[#D1A941] hover:border-[#ffffff] hover:text-white transition-all duration-300"
                >
                  לחץ כאן
                </Link>
              </div>
            )}
          </div>

          <div
            className={`picture-view absolute top-0 left-0 w-full h-full flex items-center justify-center z-40 bg-[#00000080] transition-all duration-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible`}
          >
            <button className="w-30 h-30 bg-[#D1A941CC] rounded-full flex items-center justify-center cursor-pointer">
              <ViewIcon2 />
            </button>
          </div>
        </div>
      </div>
      <div className="cycle-title mt-[5.8vh]">
        <h2 className="text-[55px] text-[#D1A941] leading-[70%] text-center">
          {parse(props.data?.title)}
        </h2>
      </div>
    </div>
  );
}
