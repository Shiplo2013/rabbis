"use client";
import ArrowLeft3 from "@/app/assets/icons/ArrowLeft3";
import ArrowLeftBottom from "@/app/assets/icons/ArrowLeftBottom";
import ThemeButton from "@/app/ui/ThemeButton";
import parse from "html-react-parser";
import Link from "next/dist/client/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import IntroBG from "../../assets/images/intro-bg-10.jpg";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../../ui/plugins";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger, useGSAP);
}

type KnessetPosts = {
  id: number;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: string;
  acf: any;
};

type AllPosts = {
  pagination: any;
  posts: [
    {
      id: number;
      title: string;
      slug: string;
      acf: any;
    },
  ];
};

export default function KnessetScriptProviderSlug({
  data,
}: {
  data: { postsData: KnessetPosts; allPostsData: AllPosts };
}) {
  // Container Ref
  const main = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLDivElement>(null);
  // Page Data
  const sectionData = {
    bgImage: IntroBG,
  };
  // Router Path
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug as string;
  const [post, setPost] = useState<KnessetPosts | null>(null);
  const [allPosts, setAllPosts] = useState<AllPosts | null | any>(null);
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setIsLoading, animationPlayed, setAnimationPlayed } =
    useAppState();
  const [pageDataFetched, setPageDataFetched] = useState(false);
  // Animation State
  const [isAllAnimationComplete, setIsAllAnimationComplete] = useState(false);

  // Get Page Data From backend
  useEffect(() => {
    if (!data) {
      throw new Error("Post not found.");
      return;
    }
    setPost(data.postsData);
    setAllPosts(data.allPostsData);
  }, [data]);

  useEffect(() => {
    if (!post) {
      return;
    }
    if (animationPlayed) {
      setPageDataFetched(true);
      setIsLoading(false);
    }
  }, [post, allPosts, animationPlayed]);

  // Load Page
  useGSAP(() => {
    if (typeof window !== "undefined" && main.current) {
      document.fonts.ready.then(() => {
        // Selectors
        const page = document.getElementById(
          "page-wrapper",
        ) as HTMLElement | null;
        const headerLeft = document.querySelector(
          ".header-left",
        ) as HTMLElement | null;
        const headerRight = document.querySelector(
          ".header-right",
        ) as HTMLElement | null;

        // Set localStorage variable
        const userVisit = localStorage.getItem("hasVisited");
        if (userVisit === "true" && animationPlayed && pageDataFetched) {
          // Timeline
          const tl = gsap.timeline({
            onComplete: () => {
              // Set Animation Played to true
              setIsAllAnimationComplete(true);
            },
          });
          if (page) {
            tl.to(page, {
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
        }
      });
    }
  }, [pageDataFetched]);

  // Set Body Overflow Hidden
  useEffect(() => {
    if (isAllAnimationComplete) {
      // Body Overflow Hidden
      document.body.classList.remove("!overflow-hidden");
      document.body.classList.add("!overflow-auto");
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAllAnimationComplete]);

  // Hide header-left on scroll down, show on scroll up (only for this page)
  useGSAP(() => {
    if (!isAllAnimationComplete || !main.current) {
      return;
    }

    const headerLeft = document.querySelector(
      ".header-left",
    ) as HTMLElement | null;

    if (!headerLeft) {
      return;
    }

    let lastScrollY = window.scrollY;
    let isHidden = false;
    const deltaThreshold = 6;

    const showHeaderLeft = () => {
      if (!isHidden) return;
      isHidden = false;
      gsap.to(headerLeft, {
        y: "0%",
        autoAlpha: 1,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const hideHeaderLeft = () => {
      if (isHidden) return;
      isHidden = true;
      gsap.to(headerLeft, {
        y: "-120%",
        autoAlpha: 0,
        duration: 0.22,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;

      if (Math.abs(diff) < deltaThreshold) {
        return;
      }

      if (currentScrollY <= 10 || diff < 0) {
        showHeaderLeft();
      } else if (diff > 0) {
        hideHeaderLeft();
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.set(headerLeft, { clearProps: "transform,opacity,visibility" });
    };
  }, [isAllAnimationComplete]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold">Post Not Found</h1>
          <p className="text-gray-600">
            The requested post could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    post && (
      <main
        ref={main}
        id="page"
        dir="rtl"
        className="main relative overflow-hidden z-10 bg-[#F5F0EB]"
      >
        <section className="knesset-page min-h-screen w-full flex justify-center items-start relative z-20 pt-[20vh] pb-[10vh] px-5">
          <div className="knesset-wrapper max-w-375 w-[80%] flex items-start gap-x-[2.5vw]">
            <div className="knesset-left-content w-[74%]">
              <h1 className="text-[55px] leading-[70%] font-bold text-[#D1A941] italic">
                {parse(post?.title?.rendered)}
              </h1>
              <div className="breadcumb text-[22px] leading-[1.1em] text-[#000000] mt-[5vh] mb-[6vh] flex items-center gap-x-3">
                <Link
                  href="/"
                  className="home hover:text-[#D1A941] transition-colors duration-300"
                >
                  בית
                </Link>
                <span className="separator w-5">
                  <ArrowLeft3 />
                </span>
                <Link
                  href="/the-knesset-of-customs"
                  className="knesset hover:text-[#D1A941] transition-colors duration-300"
                >
                  מאמרים
                </Link>
                <span className="separator w-5">
                  <ArrowLeft3 />
                </span>
                <span className="post">{parse(post?.title?.rendered)}</span>
              </div>
              <div className="knesset-content text-[#000000] text-[21px] leading-[1.4em] [&>h2]:text-[55px] [&>h2]:leading-[1em] [&>h2]:mb-[5vh] [&>h3]:text-[38px] [&>h3]:leading-[1em] [&>h3]:mb-[3vh] [&>p]:mb-[5vh]">
                {parse(post?.content?.rendered)}
              </div>
            </div>
            <div className="knesset-left-sidebar w-[26%]">
              <div className="related-posts flex flex-col gap-y-[5vh] pr-7.5 border-r border-[#000000]">
                {allPosts?.map((item: any, index: number) => {
                  if (
                    decodeURIComponent(item.slug) === decodeURIComponent(slug)
                  ) {
                    return null;
                  }
                  return (
                    <div
                      key={index}
                      className="singel-related flex items-end gap-x-3 justify-between"
                    >
                      <Link
                        href={`/the-knesset-of-customs/${item.slug}`}
                        className="text-[40px] leading-[70%] text-[#D1A941] hover:text-[#000000] transition-colors duration-300"
                      >
                        {parse(item?.title?.rendered)}
                      </Link>
                      <ThemeButton
                        buttonLink={
                          item?.slug
                            ? `/the-knesset-of-customs/${item.slug}`
                            : "#"
                        }
                        extraClass="w-15 h-12.5 flex items-center justify-center rounded-full"
                        bgColor={"bg-[#C3A13F]"}
                        svgIconClass={""}
                        svgIcon={
                          <ArrowLeftBottom
                            extraClass={
                              "group-hover:fill-white transition-all duration-300 ease-in-out"
                            }
                          />
                        }
                        hoverBgColor="bg-black"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  );
}
