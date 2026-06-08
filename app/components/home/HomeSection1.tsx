"use client";
import BackgroundImage2 from "@/app/ui/BackgroundImage2";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import WishIcon from "../../assets/icons/WishIcon";
import CardSlider from "../../ui/CardSlider";
import PostItem from "../../ui/PostItem";
import ThemeButton from "../../ui/ThemeButton";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthPost: number;
  animWidthSlider: number;
  panel: any;
  sectionData: SectionData;
}

type SectionData = {
  text_slider?: {
    text_slide_1?: string;
    text_slide_2?: string;
  };
  community_posts?: any;
  background_image?: any;
};

type HomePost = {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  date?: string;
  acf: Record<string, unknown> | unknown[] | null;
};

function parseCommunityPosts(input: unknown): unknown[] {
  if (Array.isArray(input)) {
    return input;
  }

  if (typeof input === "string") {
    try {
      const parsed = JSON.parse(input);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function extractPostId(item: unknown): number | undefined {
  if (typeof item === "number") {
    return Number.isFinite(item) ? item : undefined;
  }

  if (typeof item === "string") {
    const parsed = Number(item);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  if (item && typeof item === "object") {
    const candidate = (item as Record<string, unknown>).ID;
    const fallback = (item as Record<string, unknown>).id;
    const value = candidate ?? fallback;

    if (typeof value === "number") {
      return Number.isFinite(value) ? value : undefined;
    }

    if (typeof value === "string") {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : undefined;
    }
  }

  return undefined;
}

function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function HomeSection1(props: ChildProps) {
  // Selectors
  const wrapper = useRef<HTMLElement>(null);
  const CTAbutton = useRef<HTMLDivElement>(null);
  const homePost = useRef<HTMLDivElement>(null);
  const [isSlideOut, setIsSlideOut] = useState(false);
  // Route
  const pathname = usePathname();
  const sectionData = props.sectionData as SectionData;

  // Get Communite Posts
  const [homePosts, setHomePosts] = useState<HomePost[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadCommunityPosts = async () => {
      const communityPosts = parseCommunityPosts(sectionData?.community_posts);
      const ids = communityPosts
        .map(extractPostId)
        .filter((id): id is number => typeof id === "number");

      if (!ids.length) {
        if (isMounted) {
          setHomePosts([]);
        }
        return;
      }

      const uniqueIds = [...new Set(ids)];
      const params = new URLSearchParams({
        include: uniqueIds.join(","),
        per_page: String(uniqueIds.length),
        orderby: "include",
        order: "asc",
      });

      try {
        const response = await fetch(
          `/api/communities/posts?${params.toString()}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          if (isMounted) {
            setHomePosts([]);
          }
          return;
        }

        const data = (await response.json()) as { posts?: HomePost[] };
        const posts = Array.isArray(data.posts) ? data.posts : [];
        const orderIndex = new Map(uniqueIds.map((id, index) => [id, index]));
        const sortedPosts = [...posts].sort((a, b) => {
          const aIndex = orderIndex.get(a.id) ?? Number.MAX_SAFE_INTEGER;
          const bIndex = orderIndex.get(b.id) ?? Number.MAX_SAFE_INTEGER;
          return aIndex - bIndex;
        });

        if (isMounted) {
          setHomePosts(sortedPosts);
        }
      } catch {
        if (isMounted) {
          setHomePosts([]);
        }
      }
    };

    loadCommunityPosts();

    return () => {
      isMounted = false;
    };
  }, [sectionData?.community_posts]);

  // // Check data
  // useEffect(() => {
  //   if (homePosts.length !== 0) {
  //     console.log("Loaded community posts for HomeSection1:", homePosts);
  //   }
  // }, [homePosts]);

  useGSAP(() => {
    // Selectors
    const cyclePreview = wrapper.current?.querySelector("#cycle-preview");
    // HomeSection1
    if (!homePost.current || !cyclePreview) return;
    gsap.set(CTAbutton.current, { yPercent: 100, opacity: 0 });
    //gsap.set(homePost.current, { xPercent: 82 });
    gsap.to(CTAbutton.current, {
      scrollTrigger: {
        start: () => {
          return window.innerWidth * props.animWidthPost;
        },
        toggleActions: "restart pause play reverse",
      },
      duration: 1.5,
      yPercent: 0,
      opacity: 1,
      delay: 0,
      ease: "expo.inOut",
    });

    // CyclePreview
    gsap.set(cyclePreview, { opacity: 0 });
    gsap.to(cyclePreview, {
      scrollTrigger: {
        start: () => {
          return window.innerWidth * props.animWidthSlider;
        },
        toggleActions: "restart pause play reverse",
      },
      duration: 1.5,
      yPercent: 0,
      opacity: 1,
      delay: 0,
      stagger: 0.02,
      ease: "expo.inOut",
    });
  }, [pathname]);

  // Slider Animation
  useGSAP(() => {
    // On Button Click
    if (!isSlideOut) {
      // Slide in from right
      if (homePost.current) {
        gsap.to(homePost.current, {
          duration: 1.5,
          xPercent: 82,
          delay: 0,
          ease: "expo.inOut",
        });
      }
    } else {
      // Slide out to left
      if (homePost.current) {
        gsap.to(homePost.current, {
          duration: 1.5,
          xPercent: 0,
          delay: 0,
          ease: "expo.inOut",
        });
      }
    }
  }, [isSlideOut]);

  return (
    <section
      ref={wrapper}
      dir="rtl"
      className={`${props.extraClass} h-screen bg-no-repeat bg-center bg-cover flex items-center overflow-hidden relative`}
      data-scroll-section={props.animWidthPost}
    >
      <BackgroundImage2
        bgImage={sectionData?.background_image}
        panel={props.panel}
        start={props.animWidthPost}
      />
      <div className="section-content relative z-30 w-full h-full">
        <div
          id="cycle-preview"
          className="cycle-preview absolute left-[15%] top-1/6 transition-none"
        >
          <CardSlider
            SlideData={
              sectionData?.text_slider?.text_slide_1 &&
              sectionData?.text_slider?.text_slide_2
                ? [
                    {
                      text1: sectionData.text_slider.text_slide_1,
                      text2: sectionData.text_slider.text_slide_2,
                    },
                  ]
                : []
            }
          />
        </div>
        <div
          ref={homePost}
          className="post-wrapper absolute right-0 bottom-0 flex items-end gap-9 transition-none"
        >
          <div className="post-grid bg-[#F1EADA] text-[#C3A13F] p-11 max-h-100 relative">
            <Link
              href={"/communities"}
              className="absolute top-5 left-5 w-4 cursor-pointer"
            >
              <ArrowLeft extraClass="fill-[#C3A13F]" />
            </Link>
            <div className="grid-items w-67 h-full">
              <SimpleBar
                style={{ maxHeight: 310, paddingRight: 30, marginRight: -30 }}
                autoHide={false}
              >
                {homePosts.map((post: any, index: number) => (
                  <PostItem
                    key={post.id}
                    title={stripHtml(post.title)}
                    content={stripHtml(
                      post?.acf?.subtitle || post.excerpt || "",
                    )}
                    subtitle={
                      post.acf?.informations?.established
                        ? `נוסדה בשנת ${post?.acf?.informations?.established}`
                        : ""
                    }
                    buttonLabel={"קהילת בני ברק"}
                    buttonColor={
                      index % 2 === 0
                        ? "bg-[#C3A13F] hover:bg-[#c59811]"
                        : "bg-[#5A7C4E] hover:bg-[#2b6018]"
                    }
                    buttonLink={post?.slug ? `/communities/${post.slug}` : "#"}
                  />
                ))}
              </SimpleBar>
            </div>
          </div>
          <div
            ref={CTAbutton}
            onClick={() => setIsSlideOut(!isSlideOut)}
            className="wish-icon py-5"
          >
            <ThemeButton
              extraClass="w-13 h-13 flex item-center justify-center"
              bgColor="bg-[#ffffff]"
              textColor="text-[#000000]"
              hoverBgColor="bg-[#C3A13F]"
              svgIcon={<WishIcon className="group-hover:stroke-[#ffffff]" />}
              svgIconClass={""}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
