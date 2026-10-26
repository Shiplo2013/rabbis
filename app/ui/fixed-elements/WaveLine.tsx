import Wave from "@/app/assets/images/wave.svg";

export default function WaveLine() {
  return (
    <div
      id={"wave-line"}
      className="wave-line fixed bottom-10 right-1/2 w-30 h-6 translate-x-1/2 overflow-hidden z-30 hidden"
    >
      <div
        id={"wave-mask"}
        style={{
          maskImage: `url(${Wave.src})`,
        }}
        className="mask w-full h-full absolute top-0 left-0 mask-no-repeat mask-center bg-(--theme-color) mask-contain translate-y-full"
      >
        <div
          id={"progress"}
          className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#0a0a0a] z-10"
        ></div>
      </div>
    </div>
  );
}
