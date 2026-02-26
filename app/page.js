"use client";
import { useEffect, useState } from "react";
import BackgroundSection from "./components/home/BackgroundSection";
import HomeBanner from "./components/home/HomeBanner";
import HomeSection1 from "./components/home/HomeSection1";
import HomeSection2 from "./components/home/HomeSection2";
import HomeSection3 from "./components/home/HomeSection3";
import HomeSection4 from "./components/home/HomeSection4";
import IntroSection from "./components/home/IntroSection";
import SmoothWrapper from "./ui/SmoothWrapper";
import {
  gsap,
  ScrollToPlugin,
  ScrollTrigger,
  SplitText,
  useGSAP,
} from "./ui/plugins";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const [animationPlayed, setAnimationPlayed] = useState(false);
  // Load Page 
  useEffect(() => {
    // Hide Elements before animation
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit === "true") {
      // Set Title
      var stitle = SplitText.create('.split-title', { type: "words,chars" }),
      sTitlechars = stitle.chars;
      gsap.set('.split-title', { perspective: 400 });
      gsap.set(sTitlechars, {yPercent: 100, opacity: 0});
      // Subtitle 
      let splitText = SplitText.create(".split-content", { type: "words", aria: "hidden" });
      gsap.set(splitText.words, {yPercent: 100, opacity: 0});
      // Banner Button
      gsap.set(".banner-button", {opacity: 0, y: 100});
      // Timeline
      const tl = gsap.timeline();
      tl.to("#page", {
        opacity: 1,
        ease: "easeInOut",
        duration: 1,
        delay: 0.5,
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
      .to(sTitlechars, {
        duration: 0.5,
        yPercent: 0,
        opacity: 1,
        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "back.easeIn",
        stagger: 0.1
      }, "-=0.5")
      .to(splitText.words, {
        duration: 0.5,
        yPercent: 0,
        opacity: 1,
        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "back.easeIn",
        stagger: 0.1
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

  // Animation
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

  return (
    <SmoothWrapper>
      <div id="panel-wrapper" className="w-screen h-screen">
        <div id="section-wrapper" className={`flex flex-nowrap flex-row-reverse w-[525vw] h-screen`}>
          <HomeBanner extraClass={"panel-section min-w-screen w-screen"} />
          <IntroSection extraClass={"panel-section min-w-[50vw] w-[50vw]"} />
          <HomeSection1 extraClass={"panel-section min-w-[70vw] w-[70vw]"} />
          <BackgroundSection extraClass={"panel-section min-w-[35vw] w-[35vw]"} />
          <HomeSection2 extraClass={"panel-section min-w-[70vw] w-[70vw] bg-black"} />
          <HomeSection3 extraClass={"panel-section min-w-screen w-screen"} />
          <HomeSection4 extraClass={"panel-section min-w-screen w-screen"} />
        </div>
      </div>
    </SmoothWrapper>
  );
}
