import MicIcon from "@/app/assets/icons/MicIcon";
import { useEffect } from "react";
export default function CursorFollow({isPlaying}) {
  useEffect(() => {
    console.log(isPlaying);
  })
  return (
    <div
      id="cursorFollower"
      className={`fixed left-0 top-0 z-50 pointer-events-none flex justify-center items-center opacity-0 w-21 h-21 rounded-full bg-[#C3A13FB2] -ml-10.5 -mt-10.5 scale-0`}
    >
      <div className={`absolute top-1/2 left-1/2 w-0.5 h-10 bg-[#091B24] -mt-5 origin-center rotate-45 ${isPlaying && "opacity-0"}`}></div>
      <MicIcon />
    </div>
  );
}
