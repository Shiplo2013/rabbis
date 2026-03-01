import CloseIcon from "../assets/icons/CloseIcon";
import bagImage from "../assets/images/main-menu-bg.jpg";

export default function MainMenu({ active, hideMenu }) {
  return (
    <div 
    id="main-menu" 
    style={{backgroundImage: `url(${bagImage.src})`}}
    className={`fixed top-0 left-0 w-screen h-screen bg-[#000000] bg-no-repeat bg-cover z-50 flex items-center justify-center gap-10 ${active ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <button onClick={() => hideMenu(false)} className="group absolute top-8 right-12.5 w-18 h-18 flex justify-center items-center cursor-pointer border border-[#C3A13F] rounded-full bg-[#0000007f]">
            <CloseIcon className="group-hover:rotate-180 transition-all duration-300" />
        </button>
        <div className="menu-wrapper w-[80%] h-[80%]">
            <div className="menu-right">
                <h3>כנסת ישראל</h3>
                <div className="menu-list">
                    <ul className="main-menu-list">
                        <li>
                            
                        </li>
                        <li><a href="#">Menu Item 2</a></li>
                        <li><a href="#">Menu Item 3</a></li>
                        <li><a href="#">Menu Item 4</a></li>
                        <li><a href="#">Menu Item 5</a></li>
                    </ul>
                </div>
            </div>
            <div className="menu-left"></div>
        </div>
    </div>
  )
}
