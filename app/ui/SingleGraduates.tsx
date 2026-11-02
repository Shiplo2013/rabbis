import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GraduateBG from "../assets/images/graduate-text-bg.png";
import { useAppState } from "../components/AppContext";

interface ChildProps {
  key: number;
  data: { title: string; content: string; link: string };
}

export default function SingleGraduates(props: ChildProps) {
  const router = useRouter();
  const { setIsLoading } = useAppState();
  // Link click handler for navigation
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (window.location.pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };
  useEffect(() => {
    //console.log(props.data.title);
  }, []);
  return (
    <div className="single-graduate w-full sm:w-[calc((100%-3.3vw)/2)] lg:w-[19.27vw] h-auto relative">
      <div className="text-bg">
        <Image
          className="w-full object-cover object-center h-full relative z-10"
          src={GraduateBG?.src}
          width="370"
          height="554"
          blurDataURL={GraduateBG?.blurDataURL}
          placeholder={"blur"}
          loading="lazy"
          alt="Graduates"
        />
        <div className="graduate-text absolute top-0 left-0 z-20 w-full h-full flex items-center 2xl:text-[28px] xl:text-[22px] sm:text-[28px] text-[25px] text-black leading-[90%] py-[30%] px-[24%]">
          <Link href={props.data?.link} onClick={handleLinkClick}>
            <p>{parse(props.data?.content)}</p>
          </Link>
        </div>
      </div>
      <div className="graduate-title text-center relative z-30 -mt-5">
        <h2 className="text-[#D1A941] 2xl:text-[55px] xl:text-[45px] sm:text-[35px] text-[30px] leading-[70%]">
          <Link href={props.data?.link} onClick={handleLinkClick}>
            {parse(props.data?.title)}
          </Link>
        </h2>
      </div>
    </div>
  );
}
