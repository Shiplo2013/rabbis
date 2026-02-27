import MicIcon from "@/app/assets/icons/MicIcon";
export default function CursorFollow() {
  return (
    <div
      id="cursorFollower"
      className={`fixed left-0 top-0 z-50 pointer-events-none flex justify-center items-center opacity-0 w-21 h-21 rounded-full bg-[#C3A13FB2] -ml-10.5 -mt-10.5`}
    >
      <MicIcon />
    </div>
  );
}
