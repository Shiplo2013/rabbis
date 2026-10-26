import ViewIcon2 from "@/app/assets/icons/ViewIcon2";

export default function NewsViewButton() {
  return (
    <div
      id="view-button"
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-50 select-none pointer-events-none opacity-0 scale-0"
    >
      <button
        type="button"
        aria-label="View News"
        className="w-25 h-25 bg-[#D1A941CC] rounded-full flex items-center justify-center cursor-pointer"
      >
        <span className="block w-12 h-auto">
          <ViewIcon2 />
        </span>
      </button>
    </div>
  );
}
