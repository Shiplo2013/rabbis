interface ChildProps {
  extraClass: string;
  animated: boolean;
  audioControl: () => void;
  panel: any;
}

export default function Introduction(props: ChildProps) {
  // Cursor Follower Function
  // function moveCircle(e: { screenY: number; clientX: any; clientY: any }) {
  //   const yskale = -(e.screenY / 100) * 1;
  //   //console.log(e.clientX, e.clientY)
  //   gsap.to("#cursorFollower", { x: e.clientX, y: e.clientY, duration: 0.2 });
  // }
  return (
    <section
      // onClick={props.audioControl}
      // onMouseMove={(e) => {
      //   moveCircle(e);
      // }}
      // onMouseEnter={() => {
      //   gsap.to("#cursorFollower", { opacity: 1, scale: 1 });
      // }}
      // onMouseLeave={() => {
      //   gsap.to("#cursorFollower", { opacity: 0, scale: 0 });
      // }}
      className={`${props.extraClass} overflow-hidden relative h-screen bg-black`}
    >
      <div dir="rtl" className="flex items-center h-full relative z-30">
        <div className="section-wrapper text-center">
          <h1 className="split-title text-[204px] text-[#AC832E] leading-[1em] overflow-hidden relative z-20">
            סלבודקא
          </h1>
          <h4 className="split-content overflow-hidden text-[55px] leading-[1em] text-[#FBF4E6] -mt-6 relative z-30">
            תרל"ז - תרע"ד
          </h4>
        </div>
      </div>
    </section>
  );
}
