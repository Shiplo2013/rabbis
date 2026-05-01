import BooksIcon from "@/app/assets/icons/BooksIcon";
import CardsIcon from "@/app/assets/icons/CardsIcon";
import MenuIcon from "@/app/assets/icons/MenuIcon";

interface ChildProps {
  extraClass: string;
}

export default function RabbisOptions(props: ChildProps) {
  return (
    <div
      className={`rabbis-menu text-[55px] text-[#D1A941] leading-[70%] w-full ${props.extraClass}`}
    >
      <div className="rabbis-menu-item card-button flex items-center gap-x-[1.8vw] group cursor-pointer">
        <div className="icon w-17.5 min-w-17.5 h-17.5 border-2 border-[#C3A13F] rounded-full flex items-center justify-center bg-[#43493B] group-hover:bg-[#000000] transition-all duration-300">
          <CardsIcon />
        </div>
        <div className="text">מעשה</div>
      </div>
      <div className="rabbis-menu-item book-button flex items-center gap-x-[1.8vw] group cursor-pointer">
        <div className="icon w-17.5 min-w-17.5 h-17.5 border-2 border-[#C3A13F] rounded-full flex items-center justify-center bg-[#43493B] group-hover:bg-[#000000] transition-all duration-300">
          <BooksIcon />
        </div>
        <div className="text">ספרים</div>
      </div>
      <div className="rabbis-menu-item more-options flex items-center gap-x-[1.8vw] group cursor-pointer">
        <div className="icon w-17.5 min-w-17.5 h-17.5 border-2 border-[#C3A13F] rounded-full flex items-center justify-center bg-[#43493B] group-hover:bg-[#000000] transition-all duration-300">
          <MenuIcon />
        </div>
        <div className="text">על ציר הזמן</div>
      </div>
    </div>
  );
}
