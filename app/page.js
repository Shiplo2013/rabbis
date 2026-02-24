"use client";
import { useEffect, useState } from "react";
import HomeBanner from "./components/home/HomeBanner";
import HomeSection1 from "./components/home/HomeSection1";
import IntroSection from "./components/home/IntroSection";
import SmoothWrapper from "./ui/SmoothWrapper";
import {
  gsap,
  ScrollToPlugin,
  ScrollTrigger,
  useGSAP,
} from "./ui/plugins";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  useEffect(() => {
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit === "true") {
      gsap.to("#page", {
        opacity: 1,
        ease: "easeInOut",
        duration: 1,
        delay: 0,
      });
    }
  }, []);

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
            end: () => "+=" + (window.innerWidth*1.3),
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
        <div id="section-wrapper" className={`flex flex-nowrap flex-row-reverse w-[300vw] h-screen`}>
          <HomeBanner extraClass={"panel-section min-w-screen w-screen"} />
          <IntroSection extraClass={"panel-section min-w-[50vw] w-[50vw]"} />
          <HomeSection1 extraClass={"panel-section min-w-screen w-screen"} />
        </div>
      </div>
    </SmoothWrapper>
  );
}
