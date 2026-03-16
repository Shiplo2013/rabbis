"use client";
import { useEffect, useRef, useState } from "react";
import CursorFollow from "./components/CursorFollow";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoadingEffect from "./components/LoadingEffect";
import HomeBanner from "./components/home/HomeBanner";
import HomeSection1 from "./components/home/HomeSection1";
import HomeSection2 from "./components/home/HomeSection2";
import HomeSection3 from "./components/home/HomeSection3";
import HomeSection4 from "./components/home/HomeSection4";
import IntroSection from "./components/home/IntroSection";
import AudioPlayer from "./ui/AudioPlayer";
import SlidingArrow from "./ui/SlidingArrow";
import SmoothWrapper from "./ui/SmoothWrapper";
import TitleSplit from "./ui/TitleSplit";
import {
  gsap,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  useGSAP
} from "./ui/plugins";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

export default function Home() {
  const [audioLink, setAudioLink] = useState("http://dovp7.sg-host.com/wp-content/uploads/2026/02/music.mp3");
  const audio = useRef(null);
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

  // Load Page 
  useGSAP(() => {
    document.fonts.ready.then(() => {
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit === "true") {
      // Set Title
      const headingTitle = TitleSplit('.split-title', 'chars');
      // Subtitle 
      const headingContent = TitleSplit('.split-content', 'words');
      // Banner Button
      gsap.set(".banner-button", {opacity: 0, y: 50});
      // Timeline
      const tl = gsap.timeline({
        onComplete: () => {
            // Set Animation Played to true
            setIsAllAnimationComplete(true);
         }
      });
      tl.to("#page", {
        opacity: 1,
        ease: "easeInOut",
        duration: 1,
        delay: 0,
      })
      .to(".header-left", {
        opacity: 1,
        y: 0,
        ease: "easeInOut",
        duration: 1,
      }, "-=0.5")
      .to(".header-right", {
        opacity: 1,
        x: 0,
        ease: "easeInOut",
        duration: 1,
      }, "-=0.5")
      .to(headingTitle, {
        duration: 0.5,
        yPercent: 0,
        opacity: 1,
        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "slow.inOut",
        stagger: 0.1
      }, "-=0.5")
      .to(headingContent, {
        duration: 0.3,
        yPercent: 0,
        opacity: 1,
        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "slow.inOut",
        stagger: 0.07
      }, "-=0.5")
      .to(".banner-button", {
        duration: 0.5,
        opacity: 1,
        y: 0,
        ease: "back.easeIn",
      }, "-=0.5");
    }
  });
  }, [animationPlayed]);

  // Container width
  //const [contWidth, setContWidth] = useState(0);
  const panel = useRef(null);
  const wrapper = useRef(null);

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
          end: "+="+ (window.innerHeight * 6),
          scrub: scurbScale,
          pin: true,
        }
      });
      verticalSection.to(wrapper.current, {
        x: () => ((wrapper.current.offsetWidth)  - window.innerWidth),
        ease: "sine.out",
      });

    }
    // Return
    return () => {
      verticalSection.kill()
    };
  }, {scope: panel});

  // Play Pause State
  const [isPlaying, setIsPlaying] = useState(false);
  function isAudioPlaying(value) {
    return !value.paused;
  }
  const togglePlayPause = () => {
    if (isAudioPlaying(audio.current)) {
      gsap.to(audio.current, {volume: 0, duration: 2, onComplete: () => {
        audio.current.pause();
      }});
      setIsPlaying(false);
    } else {
      gsap.to(audio.current, {volume: 1, duration: 2});
      audio.current.play();
      setIsPlaying(true);
    }
  };
  // On Video End
  useEffect(() => {
    audio.current.addEventListener("ended", () => {
      audio.current.currentTime = 0;
      audio.current.play();
    }, false);
  }, [audio.current]);

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    }
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
          <div ref={panel} id="panel-wrapper" className="w-screen h-screen flex items-end justify-end">
              <div ref={wrapper} id="section-wrapper" className={`section-wrapp flex flex-nowrap flex-row-reverse w-[510vw] h-screen`}>
                  <HomeBanner audioControl={togglePlayPause} animated={isAllAnimationComplete} extraClass={"panel-section min-w-screen w-screen cursor-pointer"} panel={panel} />
                  <IntroSection animWidthText={0.1} extraClass={"panel-section min-w-[50vw] w-[50vw]"} />
                  <HomeSection1 animWidthPost={0.4} animWidthSlider={0.45} extraClass={"panel-section min-w-[70vw] w-[70vw]"} panel={panel} />
                  <HomeSection2 animWidthImage={0.7} animWidthText={0.8} extraClass={"panel-section min-w-screen w-screen bg-black"} />
                  <HomeSection3 animWidthImage={1.2} animWidthText={1.4} extraClass={"panel-section min-w-[90vw] w-[90vw]"} />
                  <HomeSection4 animWidth={2} extraClass={"panel-section min-w-screen w-screen"} />
              </div>
          </div>
      </main>
      <Footer className={"relative z-20"} />
      </SmoothWrapper>
      <SlidingArrow />
      <CursorFollow isPlaying={isPlaying} />
      <AudioPlayer audioRef={audio} src={audioLink} />
    </div>
  );
}
