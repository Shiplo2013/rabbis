import CloseIcon from "../assets/icons/CloseIcon";
export default function MainMenu({ active, hideMenu }) {
  return (
    <div id="main-menu" className={`fixed top-0 left-0 w-full h-screen bg-[#000000] z-50 flex flex-col items-center justify-center gap-10 ${active ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <button onClick={() => hideMenu(false)} className="group absolute top-8 right-12.5 w-18 h-18 flex justify-center items-center cursor-pointer border border-[#C3A13F] rounded-full bg-[#0000007f]">
            <CloseIcon className="group-hover:rotate-180 transition-all duration-300" />
        </button>
    </div>
  )
}
