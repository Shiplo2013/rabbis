import parse from "html-react-parser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import Cookies from "../assets/icons/Cookies";
import FooterProject from "../ui/FooterProject";
import { gsap, ScrollToPlugin, ScrollTrigger, useGSAP } from "../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
}

interface ChildProps {
  className: string;
  data?: FooterApiResponse | null;
}

type FooterApiResponse = {
  acf: {
    big_menu: {
      title: string;
      link: string;
      images: any;
    }[];
    widget_1: {
      widget_title: string;
      content: string;
    };
    widget_2: {
      widget_title: string;
      content: string;
    };
    widget_3: {
      menu_items: {
        title: string;
        link: string;
      }[];
    };
    footer_menu: {
      title: string;
      link: string;
    }[];
  };
};

function Footer(props: ChildProps) {
  // Footer Ref
  const footerRef = useRef<HTMLElement | null>(null);
  const [footerData, setFooterData] = useState<FooterApiResponse | null>(
    props.data || null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Static Data
  const staticData: FooterApiResponse = {
    acf: {
      big_menu: [
        {
          title: "דברי הימים",
          link: "/chronicles",
          images: null,
        },
        {
          title: "מזקנים אתבונן",
          link: "#",
          images: null,
        },
        {
          title: "רבני הישיבה",
          link: "/yeshiva-rabbis",
          images: null,
        },
        {
          title: "לבקר בהיכלו",
          link: "#",
          images: null,
        },
      ],
      widget_1: {
        widget_title: "הישאר מחובר",
        content: "הרשמה לעדכונים וחדשות",
      },
      widget_2: {
        widget_title: "צרו קשר",
        content: "לכל שאלה, אנא צרו קשר: nהרב חיים הלר 8 ירושלים ישראל",
      },
      widget_3: {
        menu_items: [
          {
            title: "עד שבחברון - חדשות",
            link: "/",
          },
          {
            title: "ראיונת - עדויות",
            link: "/",
          },
          {
            title: "בוגרי הישיבה",
            link: "/",
          },
          {
            title: "תרומות",
            link: "/",
          },
          {
            title: "צור קשר",
            link: "/",
          },
        ],
      },
      footer_menu: [
        {
          title: "הצהרת נגישות",
          link: "/",
        },
        {
          title: "מדיניות פרטיות",
          link: "/",
        },
      ],
    },
  };

  // Router Path
  const pathname = usePathname();

  // Footer Animations
  useGSAP(() => {
    const animations: gsap.core.Tween[] = [];

    if (!footerRef.current) {
      return;
    }

    if (footerRef.current) {
      const animation = gsap.to(footerRef.current, {
        opacity: 1,
      });
      animations.push(animation);
    }
    // element animation
    const footerImage = footerRef.current?.querySelectorAll(".hover-image");
    if (footerImage && footerImage.length > 0) {
      gsap.set(footerImage, {
        yPercent: 100,
      });
    }
    // Animate on hover
    let projects = gsap.utils.toArray(".single-project");
    if (projects.length > 0) {
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
          const animationImage = gsap.to(image, {
            yPercent: 0,
          });
          animations.push(animationImage);
        });
        //On Mouse Leave
        (project as HTMLElement).addEventListener("mouseleave", (e) => {
          // Handle mouse enter event
          const image = (e.target as HTMLElement).querySelectorAll(
            ".hover-image",
          );
          const animationImage = gsap.to(image, {
            yPercent: 100,
          });
          animations.push(animationImage);
        });
        // Animate all project element on scroll
        const animationScroll = gsap.to(project as HTMLElement, {
          yPercent: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
          ease: "easeInOut",
          duration: 1,
        });
        animations.push(animationScroll);
      });
    }
    // Footer Widget
    const footerWidget1 = footerRef?.current?.querySelector(".footer-widget1");
    if (footerWidget1) {
      gsap.set(footerWidget1, {
        yPercent: 100,
        opacity: 0,
      });
      const animationWidget1 = gsap.to(footerWidget1, {
        yPercent: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 30%",
          toggleActions: "play none none none",
        },
        ease: "easeInOut",
        duration: 1,
      });
      animations.push(animationWidget1);
    }
    // Footer Widget
    const footerWidget2 = footerRef?.current?.querySelector(".footer-widget2");
    if (footerWidget2) {
      gsap.set(footerWidget2, {
        yPercent: 100,
        opacity: 0,
      });
      const animationWidget2 = gsap.to(footerWidget2, {
        yPercent: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 30%",
          toggleActions: "play none none none",
        },
        ease: "easeInOut",
        duration: 1,
        delay: 0.2,
      });
      animations.push(animationWidget2);
    }
    // Footer Widget
    const footerWidget3 = footerRef?.current?.querySelector(".footer-widget3");
    if (footerWidget3) {
      gsap.set(footerWidget3, {
        yPercent: 100,
        opacity: 0,
      });
      const animationWidget3 = gsap.to(footerWidget3, {
        yPercent: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 30%",
          toggleActions: "play none none none",
        },
        ease: "easeInOut",
        duration: 1,
        delay: 0.4,
      });
      animations.push(animationWidget3);
    }
    // Privacy Policy
    const privacyPolicy = footerRef?.current?.querySelector(".privacy-policy");
    if (privacyPolicy) {
      gsap.set(privacyPolicy, {
        y: 100,
        opacity: 0,
      });
      const animationPrivacyPolicy = gsap.to(privacyPolicy, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 20%",
          toggleActions: "play none none none",
        },
        ease: "easeInOut",
        duration: 1,
      });
      animations.push(animationPrivacyPolicy);
    }
    // Footer Cookies
    const footerCookies = footerRef?.current?.querySelector(".footer-cookies");
    if (footerCookies) {
      gsap.set(footerCookies, {
        yPercent: 100,
        opacity: 0,
      });
      const animationFooterCookies = gsap.to(footerCookies, {
        yPercent: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 20%",
          toggleActions: "play none none none",
        },
        ease: "easeInOut",
        duration: 1,
        delay: 0.4,
      });
      animations.push(animationFooterCookies);
    }

    // Cleanup function to kill animations
    return () => {
      animations.forEach((animation) => {
        animation.kill();
      });
    };
  }, [pathname, footerData]);

  return (
    footerData && (
      <footer
        ref={footerRef}
        className={`w-full h-auto flex items-center justify-end ${props.className} opacity-0 bg-[#F5F0EB] will-change-transform`}
      >
        <div className="footer-wrapper w-full bg-amber-50 flex items-center justify-center text-black pt-30 pb-25">
          <div className="w-[80%] max-w-282.5">
            <div className="footer-projects border-b-2 border-[#000000]">
              {footerData?.acf?.big_menu?.map((project, index) => (
                <FooterProject
                  key={index}
                  title={project.title}
                  link={project.link}
                  images={project.images}
                />
              ))}
            </div>
            <div className="footer-widgets mt-34 flex justify-between overflow-hidden">
              <div className="footer-widget3">
                <ul className="flex flex-col text-2xl leading-[2em]">
                  {footerData?.acf?.widget_3?.menu_items?.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.link}
                        className="hover:text-(--theme-color) transition-colors duration-300"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-widget2">
                {footerData?.acf?.widget_2?.widget_title && (
                  <h3 className="text-[52px] leading-[0.9] font-bold mb-4">
                    {footerData?.acf?.widget_2?.widget_title}
                  </h3>
                )}
                {footerData?.acf?.widget_2?.content && (
                  <div className="footer-info text-[28px] leading-[1.5em] [&>p>a]:hover:text-(--theme-color) [&>p>a]:transition-colors [&>p>a]:duration-300">
                    {parse(footerData?.acf?.widget_2?.content || "")}
                  </div>
                )}
              </div>
              <div className="footer-widget1">
                {footerData?.acf?.widget_1?.widget_title && (
                  <h3 className="text-[52px] leading-[0.9] font-bold mb-4">
                    {footerData?.acf?.widget_1?.widget_title}
                  </h3>
                )}
                {footerData?.acf?.widget_1?.content && (
                  <div className="text-[28px] leading-[0.9] [&>p>a]:hover:text-(--theme-color) [&>p>a]:transition-colors [&>p>a]:duration-300">
                    {parse(footerData?.acf?.widget_1?.content || "")}
                  </div>
                )}
              </div>
            </div>
            <div className="privacy-policy text-2xl leading-[1.2em] mt-5">
              <p>
                {footerData?.acf?.footer_menu?.map((item, index) => (
                  <span key={index}>
                    <Link
                      href={item.link}
                      className="hover:text-(--theme-color) transition-colors duration-300"
                    >
                      {item.title}
                    </Link>
                    {index < footerData?.acf?.footer_menu.length - 1 && " - "}
                  </span>
                ))}
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
    )
  );
}

export default Footer;
