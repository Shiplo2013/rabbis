import CycleArrow from "@/app/assets/icons/CycleArrow";
export default function SlidingArrow() {
  return (
    <div className="arrow-button fixed left-0 top-0 z-30 -ml-13 -mt-13 cursor-none opacity-0 pointer-events-none scale-0">
      <button
        className="w-27 h-27 rounded-full bg-[#C3A13F] flex items-center justify-center hover:bg-[#c59811] transition-colors cursor-none"
      >
        <CycleArrow />
      </button>
    </div>
  )
}
