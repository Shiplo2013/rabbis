export default function ScrollButton() {
  return (
    <button className="scroll-button flex text-[17px] text-[#E2D7C3] transition-opacity pointer-events-none gap-2 items-center">
        <span>התחילו לגלול</span>
        <div className="line w-34 h-0.5 relative bg-[#d4af377b] overflow-hidden">
            <div className="line-move absolute top-0 left-0 w-full h-full bg-[#D4AF37]"></div>
        </div>
    </button>
  )
}
