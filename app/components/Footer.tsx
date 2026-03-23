import Link from "next/link";
import { useRef } from "react";
import Cookies from "../assets/icons/Cookies";
import FooterProject from "../ui/FooterProject";
import { gsap, ScrollToPlugin, ScrollTrigger, useGSAP } from "../ui/plugins";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface ChildProps {
  className: string;
}

function Footer(props: ChildProps) {
  const footerRef = useRef(null);
  useGSAP(() => {
    gsap.to(footerRef.current, {
      opacity: 1,
    });
    // element animation
    gsap.set(".hover-image", {
      yPercent: 100,
    });
    // Animate on hover
    let projects = gsap.utils.toArray(".single-project");
    projects.forEach((project, index) => {
      // Hide all project element
      gsap.set(project as HTMLElement, {
        yPercent: 100,
        opacity: 0,
      });
      // On MouseEnter
      (project as HTMLElement).addEventListener("mouseenter", (e) => {
        // Handle mouse enter event
        const image = (e.target as HTMLElement).querySelectorAll(
          ".hover-image",
        );
        gsap.to(image, {
          yPercent: 0,
        });
      });
      //On Mouse Leave
      (project as HTMLElement).addEventListener("mouseleave", (e) => {
        // Handle mouse enter event
        const image = (e.target as HTMLElement).querySelectorAll(
          ".hover-image",
        );
        gsap.to(image, {
          yPercent: 100,
        });
      });
      // Animate all project element on scroll
      gsap.to(project as HTMLElement, {
        yPercent: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
        ease: "easeInOut",
        duration: 1,
      });
    });
    // Footer Widget
    gsap.set(".footer-widget1", {
      yPercent: 100,
      opacity: 0,
    });
    gsap.to(".footer-widget1", {
      yPercent: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 30%",
        toggleActions: "play none none reverse",
      },
      ease: "easeInOut",
      duration: 1,
    });
    // Footer Widget
    gsap.set(".footer-widget2", {
      yPercent: 100,
      opacity: 0,
    });
    gsap.to(".footer-widget2", {
      yPercent: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 30%",
        toggleActions: "play none none reverse",
      },
      ease: "easeInOut",
      duration: 1,
      delay: 0.2,
    });
    // Footer Widget
    gsap.set(".footer-widget3", {
      yPercent: 100,
      opacity: 0,
    });
    gsap.to(".footer-widget3", {
      yPercent: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 30%",
        toggleActions: "play none none reverse",
      },
      ease: "easeInOut",
      duration: 1,
      delay: 0.4,
    });
    // Privacy Policy
    gsap.set(".privacy-policy", {
      y: 100,
      opacity: 0,
    });
    gsap.to(".privacy-policy", {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 20%",
        toggleActions: "play none none reverse",
      },
      ease: "easeInOut",
      duration: 1,
    });
    // Privacy Policy
    gsap.set(".footer-cookies", {
      yPercent: 100,
      opacity: 0,
    });
    gsap.to(".footer-cookies", {
      yPercent: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 20%",
        toggleActions: "play none none reverse",
      },
      ease: "easeInOut",
      duration: 1,
      delay: 0.4,
    });
  }, []);
  return (
    <footer
      ref={footerRef}
      className={`w-full h-auto flex items-center justify-end ${props.className} opacity-0 bg-[#F5F0EB]`}
    >
      <div className="footer-wrapper w-[calc(100%-100px)] -mt-25 bg-amber-50 flex items-center justify-center text-black pt-30 pb-25">
        <div className="w-[80%] max-w-282.5">
          <div className="footer-projects border-b-2 border-[#000000]">
            <FooterProject title={"דברי הימים"} />
            <FooterProject title={"מזקנים אתבונן"} />
            <FooterProject title={"רבני הישיבה"} />
            <FooterProject title={"לבקר בהיכלו"} />
          </div>
          <div className="footer-widgets mt-34 flex justify-between overflow-hidden">
            <div className="footer-widget3">
              <ul className="flex flex-col text-2xl leading-[2em]">
                <li>
                  <Link
                    href={"/"}
                    className="hover:text-(--theme-color) transition-colors duration-300"
                  >
                    עד שבחברון - חדשות
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/"}
                    className="hover:text-(--theme-color) transition-colors duration-300"
                  >
                    ראיונת - עדויות
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/"}
                    className="hover:text-(--theme-color) transition-colors duration-300"
                  >
                    בוגרי הישיבה
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/"}
                    className="hover:text-(--theme-color) transition-colors duration-300"
                  >
                    תרומות
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/"}
                    className="hover:text-(--theme-color) transition-colors duration-300"
                  >
                    צור קשר
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer-widget2">
              <h3 className="text-[52px] leading-[]0.9 font-bold mb-4">
                צרו קשר
              </h3>
              <div className="footer-info text-[28px] leading-[1.5em]">
                <p>לכל שאלה, אנא צרו קשר:</p>
                <p>הרב חיים הלר 8 ירושלים ישראל</p>
                <p>
                  <Link
                    href={"mailto:office@chevron.org.il"}
                    className="hover:text-(--theme-color) transition-colors duration-300"
                  >
                    office@chevron.org.il
                  </Link>
                </p>
                <p>
                  <Link
                    href={"tel:02-6209331"}
                    className="hover:text-(--theme-color) transition-colors duration-300"
                  >
                    02-6209331
                  </Link>
                </p>
              </div>
            </div>
            <div className="footer-widget1">
              <h3 className="text-[52px] leading-[]0.9 font-bold mb-4">
                הישאר מחובר
              </h3>
              <p className="text-[28px] leading-[0.9]">הרשמה לעדכונים וחדשות</p>
            </div>
          </div>
          <div className="privacy-policy text-2xl leading-[1.2em] mt-5">
            <p>
              <Link
                href={"/"}
                className="hover:text-(--theme-color) transition-colors duration-300"
              >
                הצהרת נגישות
              </Link>{" "}
              -{" "}
              <Link
                href={"/"}
                className="hover:text-(--theme-color) transition-colors duration-300"
              >
                מדיניות פרטיות
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-cookies absolute left-6 bottom-10 flex items-center">
        <div className="cookies-icon ml-2">
          <Cookies />
        </div>
        <div className="cookies-text text-[14px] leading-[1em] bg-black text-white py-2 px-5 h-10 flex items-center">
          <p>האתר הזה משתמש בעוגיות</p>
        </div>
        <div className="cookies-text text-[17px] leading-[1em] bg-(--theme-color) text-[#010101] py-2 px-5 h-10 flex items-center">
          <p>אישור</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
