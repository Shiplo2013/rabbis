import ArrowLeft2 from "@/app/assets/icons/ArrowLeft2";
import ArrowRight from "@/app/assets/icons/ArrowRight";
import Link from "next/dist/client/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "../components/AppContext";
import NavigationImage from "./news/NavigationImage";

type NewsPostData = {
  title: string;
  link: string;
  image: any;
};
interface ChildProps {
  extraClass: string;
  data: string;
  currentPostId: number;
  posts: {
    prevPost: NewsPostData | null;
    nextPost: NewsPostData | null;
  } | null;
}

export default function PostNavigation(props: ChildProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useAppState();

  const navigationData = props.posts;

  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };

  return (
    <div
      className={`post-navigation bg-black py-10 px-12 flex items-center justify-between ${props.extraClass}`}
    >
      {navigationData?.nextPost && (
        <Link
          href={navigationData?.nextPost?.link}
          onClick={handleLinkClick}
          className="next-post nav-link relative group"
        >
          <div className="image w-[12vw] h-[12vw] overflow-hidden">
            <NavigationImage image={navigationData?.nextPost?.image} />
          </div>
          <h4 className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-[#D1A941] text-black p-3 text-center text-[15px] leading-[70%] min-w-32 max-w-full">
            {navigationData?.nextPost.title}
          </h4>
          <div className="absolute top-1/2 -translate-y-1/2 right-full -mr-8 w-25 h-25 rounded-full bg-[#121616] hover:bg-[#1a1a1a] flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-3">
            <div className="w-12 h-auto transition-all duration-300 group-hover:translate-x-1">
              <ArrowRight />
            </div>
          </div>
        </Link>
      )}
      {navigationData?.prevPost && (
        <Link
          href={navigationData?.prevPost?.link}
          className="prev-post nav-link relative group mr-auto"
          onClick={handleLinkClick}
        >
          <div className="image w-[12vw] h-[12vw] overflow-hidden">
            <NavigationImage image={navigationData?.prevPost?.image} />
          </div>
          <h4 className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-[#D1A941] text-black p-3 text-center text-[15px] leading-[70%] min-w-32 max-w-full">
            {navigationData?.prevPost.title}
          </h4>
          <div className="absolute top-1/2 -translate-y-1/2 left-full -ml-8 w-25 h-25 rounded-full bg-[#121616] hover:bg-[#1a1a1a] flex items-center justify-center text-white transition-all duration-300 group-hover:-translate-x-3">
            <div className="w-12 h-auto transition-all duration-300 group-hover:-translate-x-1">
              <ArrowLeft2 />
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
