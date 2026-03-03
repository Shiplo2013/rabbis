"use client";
import { useEffect, useRef, useState } from "react";
import Footer from "../app/components/Footer";
import Header from "../app/components/Header";
import LoadingEffect from "../app/components/LoadingEffect";
import HomeBanner from "../app/components/home/HomeBanner";
import HomeSection1 from "../app/components/home/HomeSection1";
import HomeSection2 from "../app/components/home/HomeSection2";
import HomeSection3 from "../app/components/home/HomeSection3";
import HomeSection4 from "../app/components/home/HomeSection4";
import IntroSection from "../app/components/home/IntroSection";
import AudioPlayer from "../app/ui/AudioPlayer";
import SlidingArrow from "../app/ui/SlidingArrow";
import SmoothWrapper from "../app/ui/SmoothWrapper";
import {
  gsap,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  useGSAP
} from "../app/ui/plugins";
import CursorFollow from "./components/CursorFollow";
import TitleSplit from "./ui/TitleSplit";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

export default function Home() {
  const [audioLink, setAudioLink] = useState("http://dovp7.sg-host.com/wp-content/uploads/2026/02/music.mp3");
  const audio = useRef(null);
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

  // Load Page 
  useEffect(() => {
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
  const [contWidth, setContWidth] = useState(0);

  // Page Section Animation
  useGSAP(() => {
    // Overflow body
    document.body.classList.add("overflow-x-hidden", "overscroll-none");
    
    //console.log(section1);
    const scrubValue = 1;

    let container = document.querySelector('#panel-wrapper');
    //console.log(container.scrollWidth);
    //console.log("ScrollTrigger", ScrollTrigger)
    // Scroll Section
    ScrollTrigger.create({
        trigger: "#panel-wrapper",
        start: "top top",
        end: () => (container.scrollWidth - window.innerWidth),
          pin: true,
          anticipatePin: 1,
        scrub: scrubValue,
        invalidateOnRefresh: true,
    });

    // Section Move
    let thumbNails = gsap.utils.toArray(".panel-section");
    let containerWidth = 0;

    thumbNails.forEach((thumb, i) => {
    
      // Calculate Width
      //console.log(thumb.scrollWidth);
      containerWidth += thumb.scrollWidth;

      // Find Pined Section
      if (thumb.classList.contains('fakePin')) {

        // Fixed
        gsap.set(thumb, {x: () => { return -(container.scrollWidth - (window.innerWidth)) }});
        
        gsap.to(thumb, {
          x: () => { return -((window.innerWidth*3.4)) },
          ease: "none",
          scrollTrigger: {
            trigger: "#section-wrapper",
            start: 'top top',
            scrub: scrubValue,
            invalidateOnRefresh: false,
            end: () => "+=" + (window.innerWidth),
          }
        });
        
      }
      else {
        gsap.set(thumb, {x: () => { return -(container.scrollWidth - window.innerWidth) }});
        gsap.to(thumb, {
          x: () => { return (window.innerWidth) },
          ease: "none",
          scrollTrigger: {
            trigger: "#section-wrapper",
            start: 'top top',
            scrub: scrubValue,
            invalidateOnRefresh: false,
            end: () => "+=" + (container.scrollWidth),
          }
        });
      }
    });
    setContWidth(containerWidth);

    // Return
    return () => {
      ScrollTrigger.refresh()
    };
  }, []);

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

  return (
    <div className="relative overflow-hidden">
      <LoadingEffect animated={setAnimationPlayed} />
      <Header />
      <main
          id="page"
          dir="ltr"
          className="main opacity-0 relative overflow-hidden z-10"
      >
        <SmoothWrapper>
          <div id="panel-wrapper" className="w-screen h-screen">
              <div id="section-wrapper" className={`section-wrapp flex flex-nowrap flex-row-reverse w-[500vw] h-screen`}>
                  <HomeBanner audioControl={togglePlayPause} animated={isAllAnimationComplete} extraClass={"panel-section min-w-screen w-screen cursor-pointer"} />
                  <IntroSection animWidthText={0.2} extraClass={"panel-section min-w-[50vw] w-[50vw]"} />
                  <HomeSection1 animWidthPost={0.8} animWidthSlider={1.1} extraClass={"panel-section min-w-[70vw] w-[70vw]"} />
                  <HomeSection2 animWidthImage={1.7} animWidthText={2} extraClass={"panel-section min-w-screen w-screen bg-black"} />
                  <HomeSection3 animWidthImage={2.8} animWidthText={3} extraClass={"panel-section min-w-[90vw] w-[90vw]"} />
                  <HomeSection4 animWidth={3.8} extraClass={"panel-section min-w-[90vw] w-[90vw]"} />
              </div>
          </div>
        </SmoothWrapper>
      </main>
      <Footer />
      <SlidingArrow />
      <CursorFollow isPlaying={isPlaying} />
      <AudioPlayer audioRef={audio} src={audioLink} />
    </div>
  );
}
