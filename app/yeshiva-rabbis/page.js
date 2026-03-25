"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Rabbis1 from "../assets/images/rabbis1.jpg";
import Rabbis2 from "../assets/images/rabbis2.jpg";
import Rabbis3 from "../assets/images/rabbis3.jpg";
import Rabbis4 from "../assets/images/rabbis4.jpg";
import Rabbis5 from "../assets/images/rabbis5.jpg";
import Rabbis6 from "../assets/images/rabbis6.jpg";
import Rabbis7 from "../assets/images/rabbis7.jpg";
import Rabbis8 from "../assets/images/rabbis8.jpg";
import Wave from "../assets/images/wave.svg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingEffect from "../components/LoadingEffect";
import { gsap, useGSAP } from "../ui/plugins";
import RabbisSection from "../ui/rabbis/RabbisSection";
import SmoothWrapper from "../ui/SmoothWrapper";

export default function Rabbis() {
  // Router Path
  const pathname = usePathname();
  // Rabbis Data
  const RabbisSection1 = [
    {
      sectionTitle: "ראשי הישיבה",
      sectionContent: [
        {
          title: `מרן ראש הישיבה<br/> הגאון רבי פרבשטיין משה<br/> מרדכי שליט״א`,
          image: Rabbis1,
        },
        {
          title: `מרן ראש הישיבההגאון רבי שלמה כץ שליט"א`,
          image: Rabbis2,
        },
        {
          title: `מרן ראש הישיבההגאון רבי יוסף חברוני שליט"א`,
          image: Rabbis3,
        }
      ]
    }
  ]
  const RabbisSection2 = [
    {
      sectionTitle: "מנהל רוחני",
      sectionContent: [
        {
          title: `מרן המשגיחהגאון רבי חיים יצחק קפלן שליט"א`,
          image: Rabbis4,
        }
      ]
    }
  ]
  const RabbisSection3 = [
    {
      sectionTitle: "רמים",
      sectionContent: [
        {
          title: `הגאון רבי אברהם לויסון שליט"א`,
          image: Rabbis5,
        },
        {
          title: `הגאון רבי איתן יפהן שליט"א`,
          image: Rabbis5,
        },
        {
          title: `הגאון רבי חיים אהרון רלבג שליט"א`,
          image: Rabbis6,
        },
        {
          title: `הגאון רבי  נחום  בר חיים שליט"א`,
          image: Rabbis7,
        },
        {
          title: `הגאון רבי חנוך הרטמן שליט"א`,
          image: Rabbis8,
        },
      ]
    }
  ]
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

  const panel = useRef(null);
  const wrapper = useRef(null);
  const waveLine = useRef(null);
  const progress = useRef(null);

  // Page Section Animation
  useGSAP(() => {
    let verticalSection = null;
    if (typeof window !== 'undefined' && panel) {
      // Overflow body
      document.body.classList.add("overflow-x-hidden", "overscroll-none");
      const scurbScale = 2;
      
      // Vertical Section
      verticalSection = gsap.timeline({
        scrollTrigger: {
          trigger: panel.current,
          start: "top top",
          end: "+="+ (window.innerHeight * 3),
          scrub: scurbScale,
          pin: true,
          onUpdate: (self) => {
            gsap.to(progress.current, { width: `${(100*self.progress)}%` });
            if(self.progress === 1) {
              gsap.to(waveLine.current, {opacity: 0, duration: 0.1, delay: 0});
            } else {
              gsap.to(waveLine.current, {opacity: 1, duration: 0.1, delay: 0});
            }
          }
        }
      });
      verticalSection.to(wrapper.current, {
        x: () => ((wrapper.current.offsetWidth)  - window.innerWidth),
        ease: "slow.inOut",
        scrollTrigger: {
          trigger: panel.current,
          start: panel.current.offsetTop,
          end: "+="+ ((window.innerHeight * 3) - 300),
          scrub: scurbScale,
        }
      });
    }
    // Return
    return () => {
      verticalSection.kill()
    };
  }, {scope: panel});
  // Load Page
  useEffect(() => {
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit === "true") {
      // Timeline
      const tl = gsap.timeline();
      tl.to("#page", {
        opacity: 1,
        ease: "easeInOut",
        duration: 1,
        delay: 0,
      })
        .to(
          ".header-left",
          {
            opacity: 1,
            y: 0,
            ease: "easeInOut",
            duration: 1,
          },
          "-=0.5",
        )
        .to(
          ".header-right",
          {
            opacity: 1,
            x: 0,
            ease: "easeInOut",
            duration: 1,
          },
          "-=0.5",
        );
    }
  }, []);
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <div className="relative overflow-hidden">
      <LoadingEffect animated={setAnimationPlayed} />
      <Header />
      <SmoothWrapper>
        <main
          id="page"
          dir="ltr"
          className="main opacity-0 relative overflow-hidden z-10"
        >
          <div
            ref={panel}
            id="panel-wrapper"
            className="w-screen h-screen flex items-end justify-end"
          >
            <div
              ref={wrapper}
              id="section-wrapper"
              className={`section-wrapp flex flex-nowrap flex-row-reverse w-[400vw] h-screen items-center`}
            >
              <section
                className={`min-w-[15vw]`}></section>
              <RabbisSection
                rabbisContent={RabbisSection1}
              />
              <section
                className={`min-w-[10vw]`}></section>
              <RabbisSection
                rabbisContent={RabbisSection2}
              />
              <section
                className={`min-w-[10vw]`}></section>
              <RabbisSection
                rabbisContent={RabbisSection3}
              />
              <section
                className={`min-w-[15vw]`}></section>
            </div>
          </div>
        </main>
      <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <div 
      ref={waveLine}
      className="wave-line fixed bottom-10 right-1/2 w-30 h-6 translate-x-1/2">
        <div 
        style={{
            maskImage: `url(${Wave.src})`,
          }}
        className="mask w-full h-full absolute top-0 left-0 mask-no-repeat mask-center bg-(--theme-color) mask-contain">
          <div ref={progress} className="progress-bar-inner w-0 h-full absolute top-0 right-0 bg-[#0a0a0a] z-10"></div>
        </div>
      </div>
    </div>
  );
}
