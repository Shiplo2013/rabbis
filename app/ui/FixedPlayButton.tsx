export default function FixedPlayButton() {
  return (
    <div className="play-button fixed left-0 top-0 z-30 -ml-18.25 -mt-7.25 cursor-none opacity-0 pointer-events-none">
      <button className="bg-[#C3A13F] flex items-center justify-center hover:bg-[#c59811] transition-colors cursor-none 2xl:text-[35px] xl:text-[30px] lg:text-[25px] md:text-[20px] sm:text-[15px] leading-[150%] text-black px-5">
        (הפעל)
      </button>
    </div>
  );
}
