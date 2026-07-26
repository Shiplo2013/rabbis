"use client";
import BackgroundImage2 from "@/app/ui/BackgroundImage2";
import ThemeButton2 from "@/app/ui/ThemeButton2";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SimpleBar from "simplebar-react";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import WishIcon from "../../assets/icons/WishIcon";
import CardSlider from "../../ui/CardSlider";
import PostItem from "../../ui/PostItem";
import { gsap, ScrollTrigger, useGSAP } from "../../ui/plugins";
import { useAppState } from "../AppContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ChildProps {
  extraClass: string;
  animWidthPost: number;
  animWidthSlider: number;
  panel: any;
  sectionData: SectionData;
  postsData: HomePost[];
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
  title: {
    rendered: string;
  };
  slug: string;
  acf: {
    subtitle?: string;
    informations?: {
      established?: string;
    };
  };
};

export default function HomeSection1(props: ChildProps) {
  // Selectors
  const wrapper = useRef<HTMLElement>(null);
  const CTAbutton = useRef<HTMLDivElement>(null);
  const homePost = useRef<HTMLDivElement>(null);
  const [isSlideOut, setIsSlideOut] = useState(false);
  // Route
  const pathname = usePathname();
  const router = useRouter();
  const sectionData = props.sectionData as SectionData;

  // Get Communite Posts
  const [homePosts, setHomePosts] = useState<HomePost[]>([]);
  const { isLoading, setIsLoading } = useAppState();

  useEffect(() => {
    if (props.postsData && props.postsData.length > 0) {
      setHomePosts(props.postsData);
    }
  }, [props.postsData]);

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
          return window.innerWidth > 1024
            ? window.innerWidth * props.animWidthPost
            : (cyclePreview.getBoundingClientRect().top ?? 0) +
                window.scrollY -
                window.innerHeight * 0.2;
        },
        toggleActions: "restart none none reverse",
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
          return window.innerWidth > 1024
            ? window.innerWidth * props.animWidthSlider
            : (cyclePreview.getBoundingClientRect().top ?? 0) +
                window.scrollY -
                window.innerHeight * 0.8;
        },
        toggleActions: "restart none none reverse",
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

  // OnClick Handler for Link Navigation
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      router.push(e.currentTarget.href);
    }
  };

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
              onClick={(e) => {
                handleLinkClick(e);
              }}
              className="absolute top-5 left-5 w-4 cursor-pointer"
            >
              <ArrowLeft extraClass="fill-[#C3A13F]" />
            </Link>
            <div className="grid-items w-50 sm:w-67 h-full">
              <SimpleBar
                style={{ maxHeight: 310, paddingRight: 30, marginRight: -30 }}
                autoHide={false}
              >
                {homePosts.map((post: any, index: number) => (
                  <PostItem
                    key={post.id}
                    title={post.title.rendered}
                    content={post?.acf?.subtitle || post.excerpt || ""}
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
            className="wish-icon py-5 cursor-pointer"
          >
            <ThemeButton2
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
