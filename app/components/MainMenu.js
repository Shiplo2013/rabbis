import Link from "next/link";
import Caret from "../assets/icons/Caret";
import CloseIcon from "../assets/icons/CloseIcon";
import Search from "../assets/icons/Search";
import bagImage from "../assets/images/main-menu-bg.jpg";

export default function MainMenu({ active, hideMenu }) {
  return (
    <div 
    id="main-menu" 
    style={{backgroundImage: `url(${bagImage.src})`}}
    className={`fixed top-0 left-0 w-screen h-screen bg-[#000000] bg-no-repeat bg-cover z-50 flex items-center justify-center gap-10 ${active ? 'opacity-100 visible' : 'opacity-0 invisible'} py-[5vh] px-[5vw]`}>
        <button onClick={() => hideMenu(false)} className="group absolute top-8 right-12.5 w-18 h-18 flex justify-center items-center cursor-pointer border border-[#C3A13F] rounded-full bg-[#0000007f]">
            <CloseIcon className="group-hover:rotate-180 transition-all duration-300" />
        </button>
        <div className="menu-wrapper w-[80%] h-auto text-[#E2D7C3] text-[24px]">
            <div className="main-menu-top flex">
                <div className="menu-right w-1/4">
                    <h3 className="text-[42px] leading-[0.7em] font-normal text-[#E2D7C3] mb-10.75">כנסת ישראל</h3>
                    <div className="menu-list">
                        <ul className="main-menu-list">
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">דף הבית</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500 ease-in-out">לבקר בהיכלו</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500 flex items-center gap-1.25">
                                    <span className="text">דברי הימים</span>
                                    <span className="icon"><Caret /></span>
                                </Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                                <ul className="child-menu hidden">
                                    <li className="relative pr-5">
                                        <span className="w-1.75 h-1.75 bg-[#D1A941] block rounded-full absolute top-1/2 right-0 -mt-1"></span>
                                        <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">שם הרב</Link>
                                    </li>
                                    <li className="relative pr-5">
                                        <span className="w-1.75 h-1.75 bg-[#D1A941] block rounded-full absolute top-1/2 right-0 -mt-1"></span>
                                        <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">שם הרב</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500 flex items-center gap-1.25">
                                    <span className="text">מזקנים אתבונן</span>
                                    <span className="icon"><Caret /></span>
                                </Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                                <ul className="child-menu hidden">
                                    <li className="relative pr-5">
                                        <span className="w-1.75 h-1.75 bg-[#D1A941] block rounded-full absolute top-1/2 right-0 -mt-1"></span>
                                        <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">שם הרב</Link>
                                    </li>
                                    <li className="relative pr-5">
                                        <span className="w-1.75 h-1.75 bg-[#D1A941] block rounded-full absolute top-1/2 right-0 -mt-1"></span>
                                        <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">שם הרב</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">רבני הישיבה</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">עוז וחדוה במקומו</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                        </ul>
                        <ul className="bottom-menu mt-10">
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">צור קשר</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">תרומות</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="menu-left w-1/4">
                    <h3 className="text-[42px] leading-[0.7em] font-normal text-[#E2D7C3] mb-10.75">כנסת הבוגרים</h3>
                    <div className="menu-list">
                        <ul className="menu-list-items">
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">בוגרי הישיבה</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">ראיונות - עדויות</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500 flex items-center gap-1.25">
                                    <span className="text">קהילות</span>
                                    <span className="icon"><Caret /></span>
                                </Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                                <ul className="child-menu hidden">
                                    <li className="relative pr-5">
                                        <span className="w-1.75 h-1.75 bg-[#D1A941] block rounded-full absolute top-1/2 right-0 -mt-1"></span>
                                        <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">שם הרב</Link>
                                    </li>
                                    <li className="relative pr-5">
                                        <span className="w-1.75 h-1.75 bg-[#D1A941] block rounded-full absolute top-1/2 right-0 -mt-1"></span>
                                        <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">שם הרב</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">גליונות - ביטאון</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">בוגרים זצ״ל</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">כנס הבוגרים</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">תמונות מחזור</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                        </ul>
                        <ul className="bottom-menu mt-10">
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">כנסת המנהגים</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                            <li className="group relative">
                                <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">עד שבחברון - חדשות</Link>
                                <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="main-menu-bottom mt-17 flex items-end">
                <div className="bottom-menu w-1/4">
                    <ul className="bottom-menu">
                        <li className="group relative">
                            <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">הצהרת נגישות</Link>
                            <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                        </li>
                        <li className="group relative">
                            <Link href={"/"} className="hover:text-[#C3A13F] transition-colors duration-500">מדיניות פרטיות</Link>
                            <span className="bg-[#C3A13F] group-hover:w-1.75 w-0 h-3.25 block absolute top-1/2 right-0 -translate-y-1/2 -mr-4 transition-all duration-300"></span>
                        </li>
                    </ul>
                </div>
                <div className="bottom-search w-1/4">
                    <p className="text-[26px] text-[#D1A941] mb-5 leading-[1em]">חפש באתר</p>
                    <div className="search relative h-10 bg-[#FDF9F5] w-50 flex justify-stretch">
                        <input
                        className="w-full h-full border outline-0 text-black pl-8 text-[18px] leading-[1em] p-2"
                        type="text"
                        placeholder=""
                        />
                        <button className="absolute left-2 top-1/2 -translate-y-1/2">
                            <Search />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
