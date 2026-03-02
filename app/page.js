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
import ContentSplit from "./ui/ContentSplit";
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
  // Page Element Animation
  useGSAP(() => {
    // Section Title 2
    const introTitle = TitleSplit('.intro-title');
      gsap.to(introTitle, {
        scrollTrigger: {
          start: () => { return (window.innerWidth*0.2) },
          toggleActions: "restart pause resume reverse"
        },
        duration: 0.5,
        yPercent: 0,
        opacity: 1,
        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "slow.inOut",
        stagger: 0.05
    });
    // HomeSection1
    gsap.set("#home-post", {yPercent: 100, opacity: 0});
    gsap.set("#cycle-preview", {yPercent: 100, opacity: 0});
    gsap.to("#home-post", {
        scrollTrigger: {
          start: () => { return (window.innerWidth*0.8) },
        },
        duration: 0.5,
        yPercent: 0,
        opacity: 1,
        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "slow.inOut",
    });
    gsap.to("#cycle-preview", {
        scrollTrigger: {
          start: () => { return (window.innerWidth*1.1) },
        },
        duration: 0.6,
        yPercent: 0,
        opacity: 1,
        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "slow.inOut",
    });
    // Section 1 Image
    gsap.to(".home-section2>.section-image", {
        scrollTrigger: {
          start: () => { return (window.innerWidth*1.7) },
          toggleActions: "restart pause resume reverse"
        },
        scale: 1,
        duration: 0.6,
        ease: "slow.inOut",
    });
    // Section 1 content
    const sec1Content = ContentSplit(".home-section2>.section-content>.text>p", "words");
    gsap.set(".home-section2>.section-content>.text>p", {opacity: 1})
    gsap.to(sec1Content, {
        scrollTrigger: {
          start: () => { return (window.innerWidth*2) },
          toggleActions: "restart pause resume reverse"
        },
        duration: 0.6,
        yPercent: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "expo.out",
      });
    // Section 2 Image
    gsap.to(".home-section3 .section-image", {
        scrollTrigger: {
          start: () => { return (window.innerWidth*2.8) },
          toggleActions: "restart pause resume reverse"
        },
        scale: 1,
        duration: 0.6,
        ease: "slow.inOut",
    });
    // Section 2 content
    const sec2Content = ContentSplit(".home-section3 .section-content .text>p", "words");
    gsap.set(".home-section3>.section-content>.text>p", {opacity: 1})
    gsap.to(sec2Content, {
      scrollTrigger: {
        start: () => { return (window.innerWidth*3) },
        toggleActions: "restart pause resume reverse"
      },
      duration: 0.6,
      yPercent: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "expo.out",
    });
    // Section 3 content
    const sec3Content = ContentSplit(".home-section4 .section-content .text>p", "lines");
    gsap.to(sec3Content, {
      scrollTrigger: {
        start: () => { return (window.innerWidth*3.8) },
        toggleActions: "restart pause resume reverse"
      },
      duration: 0.6,
      yPercent: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "expo.out",
    });
    // let split;
    // SplitText.create(".home-section4 .section-content .text>p", {
    //   type: "words,lines",
    //   linesClass: "line",
    //   autoSplit: true,
    //   mask: "lines",
    //   onSplit: (self) => {
    //     split = gsap.from(self.lines, {
    //       scrollTrigger: {
    //         start: () => { return (window.innerWidth*3.8) },
    //         toggleActions: "restart pause resume reverse"
    //       },
    //       duration: 0.6,
    //       yPercent: 100,
    //       opacity: 0,
    //       stagger: 0.1,
    //       ease: "expo.out",
    //     });
    //     return split;
    //   }
    // });
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
                  <IntroSection extraClass={"panel-section min-w-[50vw] w-[50vw]"} />
                  <HomeSection1 extraClass={"panel-section min-w-[70vw] w-[70vw]"} />
                  <HomeSection2 extraClass={"panel-section min-w-screen w-screen bg-black"} />
                  <HomeSection3 extraClass={"panel-section min-w-[90vw] w-[90vw]"} />
                  <HomeSection4 extraClass={"panel-section min-w-[90vw] w-[90vw]"} />
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
