"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../assets/images/intro-bg-10.jpg";
import ContactSection from "../components/contact/ContactSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingEffect from "../components/LoadingEffect";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../ui/plugins";
import SmoothWrapper from "../ui/SmoothWrapper";
import TextSplitLines from "../ui/TextSplitLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

export default function Contact() {
  // Container Ref
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  // Page Data
  const sectionData = {
    bgImage: IntroBG,
  };
  // Router Path
  const pathname = usePathname();
  // Animation State
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

  // Load Page
  useGSAP(
    () => {
      if (typeof window !== "undefined" && main) {
        document.fonts.ready.then(() => {
          // Selectors
          const headerLeft = main.current?.querySelector(".header-left");
          const headerRight = main.current?.querySelector(".header-right");
          // Banner Overlay
          const bannerBackgroundOverlay = main.current?.querySelector(
            ".contact-section .intro-background .intro-bg-mask",
          );
          // Contact Form
          const contactForm = main.current?.querySelector(
            ".contact-section .contact-content .contact-form .contact-form-wrapper",
          );
          // Contact Heading
          const contactHeading = main.current?.querySelector(
            ".contact-section .contact-content .contact-heading>h2",
          );
          // Contact Info Item
          const contactInfoItem = main.current?.querySelectorAll(
            ".contact-section .contact-content .contact-info .info-item .info-item-wrapper",
          );
          // Contact Heading
          let splitTitle;
          if (contactHeading) {
            splitTitle = TextSplitLines(contactHeading);
            gsap.set(contactHeading, {
              perspective: 400,
            });
            gsap.set(splitTitle, {
              yPercent: 150,
              opacity: 0,
            });
          }

          // Set localStorage variable
          const userVisit = localStorage.getItem("hasVisited");
          if (userVisit === "true" && animationPlayed) {
            // Timeline
            const tl = gsap.timeline({
              onComplete: () => {
                // Set Animation Played to true
                setIsAllAnimationComplete(true);
              },
            });
            if (main.current) {
              tl.to(main.current, {
                opacity: 1,
                ease: "none",
                duration: 0.5,
                delay: 0,
              });
            }
            if (headerLeft) {
              tl.to(headerLeft, {
                opacity: 1,
                ease: "none",
                duration: 1,
              });
            }
            if (headerRight) {
              tl.to(
                headerRight,
                {
                  opacity: 1,
                  ease: "none",
                  duration: 1,
                },
                "-=1",
              );
            }
            if (page.current) {
              tl.to(
                page.current,
                {
                  opacity: 1,
                  ease: "none",
                  duration: 1,
                },
                "-=1",
              );
            }

            // Contact Heading
            if (contactHeading && splitTitle) {
              tl.to(
                splitTitle,
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 3,
                  delay: 0,
                  stagger: 0.02,
                  ease: "expo.inOut",
                },
                "-=1.5",
              );
            }

            // Contact Info Item
            if (contactInfoItem) {
              tl.from(
                contactInfoItem,
                {
                  translateY: "100%",
                  opacity: 0,
                  delay: 0,
                  duration: 3,
                  ease: "expo.inOut",
                },
                "-=2.5",
              );
            }

            // Contact Form
            if (contactForm) {
              tl.from(
                contactForm,
                {
                  translateY: "100%",
                  opacity: 0,
                  delay: 0,
                  duration: 3,
                  ease: "expo.inOut",
                },
                "-=2.5",
              );
            }

            if (bannerBackgroundOverlay) {
              tl.to(
                bannerBackgroundOverlay,
                {
                  translateY: "-100%",
                  delay: 0,
                  duration: 3,
                  ease: "expo.inOut",
                },
                "-=2.5",
              );
            }
          }
        });
      }
    },
    { scope: main, dependencies: [animationPlayed, pathname] },
  );

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      // Body Overflow Hidden
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("overflow-x-hidden", "overscroll-none");
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAllAnimationComplete]);

  // On Page Load
  useGSAP(() => {
    document.body.classList.add("overflow-hidden");
    // Set onbeforeunload to fade out page
    window.onbeforeunload = function () {
      gsap.to(main.current, {
        opacity: 0,
        duration: 0.1,
      });
      gsap.to(page.current, {
        opacity: 0,
        duration: 0,
        onComplete: () => {
          window.scrollTo(0, 0);
        },
      });
    };
  }, []);
  return (
    <div ref={main} className="relative overflow-hidden">
      <LoadingEffect animated={setAnimationPlayed} />
      <Header animationStatus={false} />
      <SmoothWrapper>
        <main
          ref={page}
          id="page"
          dir="ltr"
          className="main opacity-0 relative overflow-hidden z-10"
        >
          <ContactSection
            extraClass={
              "contact-section w-screen min-h-[calc(100vh+100px)] h-auto"
            }
            animWidthText={0}
            data={sectionData}
          />
        </main>
        <Footer className={"relative z-20"} />
      </SmoothWrapper>
    </div>
  );
}
