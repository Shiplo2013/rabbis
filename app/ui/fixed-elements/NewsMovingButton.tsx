export default function NewsMovingButton() {
  return (
    <div
      id="moving-button"
      className="moving-button fixed top-0 left-0 mt-2 ml-2 z-30 flex items-center justify-center pointer-events-none bg-[#BBA588] rounded-3xl py-1 px-3 opacity-0"
    >
      <span className="text block text-black text-[20px] leading-[1em] font-bold">
        מעבר לחדשה הבאה
      </span>
    </div>
  );
}
