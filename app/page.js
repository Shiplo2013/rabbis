"use client";
import { useEffect, useState } from "react";
import Footer from "../app/components/Footer";
import Header from "../app/components/Header";
import LoadingEffect from "../app/components/LoadingEffect";
import BackgroundSection from "../app/components/home/BackgroundSection";
import HomeBanner from "../app/components/home/HomeBanner";
import HomeSection1 from "../app/components/home/HomeSection1";
import HomeSection2 from "../app/components/home/HomeSection2";
import HomeSection3 from "../app/components/home/HomeSection3";
import HomeSection4 from "../app/components/home/HomeSection4";
import IntroSection from "../app/components/home/IntroSection";
import SmoothWrapper from "../app/ui/SmoothWrapper";
import {
    gsap,
    ScrollToPlugin,
    ScrollTrigger,
    SplitText,
    useGSAP,
} from "../app/ui/plugins";
import CursorFollow from "./components/CursorFollow";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);
  // Load Page 
  useEffect(() => {
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
    // Set Items
    // Section Title 2
    var introTitle = new SplitText('.intro-title', { type: "words,chars" }),
      introTitlechars = introTitle.chars;
      gsap.set('.intro-title', { perspective: 400 });
      gsap.set(introTitlechars, {yPercent: 100, opacity: 0})
      gsap.to(introTitlechars, {
        scrollTrigger: {
          start: () => { return (window.innerWidth*0.2) },
        },
        duration: 0.6,
        yPercent: 0,
        opacity: 1,
        //rotationX: 180,
        transformOrigin: "0% 50%",
        ease: "back.easeIn",
        stagger: 0.05
    });

  }, []);
  return (
    <div className="relative overflow-hidden">
        <LoadingEffect animated={setAnimationPlayed} />
        <Header />
        <main
            id="page"
            dir="ltr"
            className="main opacity-0 relative overflow-hidden"
        >
            <SmoothWrapper>
                <div id="panel-wrapper" className="w-screen h-screen">
                    <div id="section-wrapper" className={`section-wrapp flex flex-nowrap flex-row-reverse w-[525vw] h-screen`}>
                        <HomeBanner animated={isAllAnimationComplete} extraClass={"panel-section min-w-screen w-screen"} />
                        <IntroSection extraClass={"panel-section min-w-[50vw] w-[50vw]"} />
                        <HomeSection1 extraClass={"panel-section min-w-[70vw] w-[70vw]"} />
                        <BackgroundSection extraClass={"panel-section min-w-[35vw] w-[35vw]"} />
                        <HomeSection2 extraClass={"panel-section min-w-[70vw] w-[70vw] bg-black"} />
                        <HomeSection3 extraClass={"panel-section min-w-screen w-screen"} />
                        <HomeSection4 extraClass={"panel-section min-w-screen w-screen"} />
                    </div>
                </div>
            </SmoothWrapper>
        </main>
        <Footer />
        <CursorFollow />
    </div>
  );
}
