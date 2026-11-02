import BooksIcon from "@/app/assets/icons/BooksIcon";
import CardsIcon from "@/app/assets/icons/CardsIcon";
import MenuIcon from "@/app/assets/icons/MenuIcon";
import { useAppState } from "@/app/components/AppContext";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface ChildProps {
  extraClass: string;
  postId: number;
}

export default function RabbisOptions(props: ChildProps) {
  const { currentRabbisPost, setIsLoading } = useAppState();
  const router = useRouter();

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
  return (
    <div
      className={`rabbis-menu text-[35px] lg:text-[55px] text-[#D1A941] leading-[70%] w-full ${props.extraClass}`}
    >
      {currentRabbisPost?.acf?.popup_1?.title !== "" && (
        <div className="rabbis-menu-item card-button flex items-center gap-x-[1.8vw] group cursor-pointer">
          <div className="icon w-15 h-15 p-4 lg:w-17.5 lg:min-w-17.5 lg:h-17.5 border-2 border-[#C3A13F] rounded-full flex items-center justify-center bg-[#43493B] group-hover:bg-[#000000] transition-colors duration-300">
            <CardsIcon />
          </div>
          <div className="text">מעשה</div>
        </div>
      )}
      {currentRabbisPost?.acf?.popup_2?.title !== "" && (
        <div className="rabbis-menu-item book-button flex items-center gap-x-[1.8vw] group cursor-pointer">
          <div className="icon w-15 h-15 p-4 lg:w-17.5 lg:min-w-17.5 lg:h-17.5 border-2 border-[#C3A13F] rounded-full flex items-center justify-center bg-[#43493B] group-hover:bg-[#000000] transition-colors duration-300">
            <BooksIcon />
          </div>
          <div className="text">ספרים</div>
        </div>
      )}
      <div className="rabbis-menu-item more-options group cursor-pointer">
        <Link
          href={`/chronicles?rabbis-post=${props.postId}`}
          onClick={handleLinkClick}
          className="flex items-center gap-x-[1.8vw]"
        >
          <div className="icon w-15 h-15 p-4 lg:w-17.5 lg:min-w-17.5 lg:h-17.5 border-2 border-[#C3A13F] rounded-full flex items-center justify-center bg-[#43493B] group-hover:bg-[#000000] transition-colors duration-300">
            <MenuIcon />
          </div>
          <div className="text">על ציר הזמן</div>
        </Link>
      </div>
    </div>
  );
}
