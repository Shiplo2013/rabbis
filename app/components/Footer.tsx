"use client";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import FooterProject from "../ui/FooterProject";
import { gsap, ScrollToPlugin, ScrollTrigger, useGSAP } from "../ui/plugins";
import { useAppState } from "./AppContext";
import FooterBottom from "./footer/FooterBottom";
import FooterWidgets from "./footer/FooterWidgets";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);
}

interface ChildProps {
  className: string;
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
  const router = useRouter();
  const footerRef = useRef<HTMLElement | null>(null);
  const { isLoading, setIsLoading, appData } = useAppState();
  const [footerData, setFooterData] = useState<FooterApiResponse | null>(
    appData?.footer || null,
  );

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
      });
    }

    // Cleanup function to kill animations
    return () => {
      animations.forEach((animation) => {
        animation.kill();
      });
    };
  }, [pathname, footerData]);

  useGSAP(() => {
    const el = document.getElementById("page");
    if (!el) return;

    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    footerData && (
      <footer
        ref={footerRef}
        id="footer"
        className={`w-full h-auto flex items-center justify-end ${props.className} opacity-0 bg-[#F5F0EB]`}
      >
        <div className="footer-wrapper w-full bg-amber-50 flex items-center justify-center text-black pt-15 sm:pt-30 pb-25">
          <div className="w-[80%] max-w-282.5">
            <div className="footer-projects border-b-2 border-[#000000]">
              {footerData?.acf?.big_menu?.map((project, index) => (
                <FooterProject
                  key={project.link}
                  title={project.title}
                  link={project.link}
                  images={project.images}
                />
              ))}
            </div>
            <FooterWidgets footerData={footerData} />
            <FooterBottom footerData={footerData} />
          </div>
        </div>
      </footer>
    )
  );
}

export default Footer;
