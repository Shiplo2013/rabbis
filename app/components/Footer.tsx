import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "../ui/plugins";

gsap.registerPlugin(SplitText);

interface ChildProps {
  className: string;
}

function Footer(props: ChildProps) {
  const textRef = useRef(null);
  useGSAP(() => {
    document.fonts.ready.then(() => {
      gsap.set(textRef.current, { opacity: 1 });

      let split;
      SplitText.create(textRef.current, {
        type: "words,lines,chars",
        linesClass: "lines",
        autoSplit: true,
        mask: "lines",
        onSplit: (self) => {
          split = gsap.from(self.lines, {
            duration: 0.6,
            yPercent: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "expo.out",
            //onComplete: () => self.revert(),
          });
          return split;
        },
      });
    });
  }, []);
  return (
    <footer
      className={`w-full h-screen flex items-center justify-end ${props.className}`}
    >
      <div className="footer-wrapper w-[calc(100%-100px)] h-[calc(100%+100px)] -mt-25 bg-amber-50 flex items-center justify-center text-black">
        <div className="text-4xl w-8/12">
          <div ref={textRef} id="text-lines" className="will-change-transform">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
