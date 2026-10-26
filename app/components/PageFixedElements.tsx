"use client";
import PlayPauseButton from "@/app/ui/fixed-elements/PlayPauseButton";
import WishButton from "@/app/ui/fixed-elements/WishButton";

import { useEffect, useSyncExternalStore } from "react";

import { usePathname } from "next/navigation";
import FixedPlayButton from "../ui/FixedPlayButton";
import RabbisHamburgerMenuHome from "../ui/past-rabbis/RabbisHamburgerMenuHome";
import { gsap, useGSAP } from "../ui/plugins";
import SlidingArrow from "../ui/SlidingArrow";
import { useAppState } from "./AppContext";
import CookieBanner from "./CookieBanner";
import CursorFollow from "./CursorFollow";
import LoadingEffect from "./LoadingEffect";
import TabMenu from "./visit-temple/TabMenu";
// Swiper slider
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ChroniclesElements from "../ui/fixed-elements/ChroniclesElements";
import CommunityFixedSidebar from "../ui/fixed-elements/CommunityFixedSidebar";
import CommunityLoader from "../ui/fixed-elements/CommunityLoader";
import CycleOfPicturesFixedElements from "../ui/fixed-elements/CycleOfPicturesFixedElements";
import KnessetFixedSidebar from "../ui/fixed-elements/KnessetFixedSidebar";
import MusicPlayerAndFixedImage from "../ui/fixed-elements/MusicPlayerAndFixedImage";
import NewsMovingButton from "../ui/fixed-elements/NewsMovingButton";
import NewsViewButton from "../ui/fixed-elements/NewsViewButton";
import PageLoader from "../ui/fixed-elements/PageLoader";
import PastRabbisFixedElements from "../ui/fixed-elements/PastRabbisFixedElements";
import PastRabbisSidebar from "../ui/fixed-elements/PastRabbisSidebar";
import WaveLine from "../ui/fixed-elements/WaveLine";
import ZatzelGraduatesPopup from "../ui/fixed-elements/ZatzelGraduatesPopup";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const subscribeToDesktopViewport = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getDesktopViewportSnapshot = () =>
  window.matchMedia("(min-width: 768px)").matches;

const getServerDesktopViewportSnapshot = () => false;

export default function PageFixedElements() {
  const isDesktopViewport = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getServerDesktopViewportSnapshot,
  );

  // Use Refs
  const pathname = usePathname();

  // Animation State
  const { animationPlayed, setAnimationPlayed } = useAppState();

  // Play Pause State
  const { isLoading, setIsLoading, isPlaying, setIsPlaying } = useAppState();
  const {
    templeTabData,
    setTempleTabData,
    templeActiveTab,
    setTempleActiveTab,
    listOfRabbis,
  } = useAppState();

  // Page default
  useEffect(() => {
    window.scrollTo(0, 0);
    // Page Overflow Hidden
    document.body.classList.remove("!overflow-auto", "overflow-hidden");
    document.body.classList.add("!overflow-hidden");
  }, [pathname]);

  // Stop Right click for user
  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      const handleContextMenu = (e: any) => {
        e.preventDefault(); // Prevents the right-click menu from opening
      };
      document.addEventListener("contextmenu", handleContextMenu);
      // Clean up the event listener when the component unmounts
      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
      };
    }
  }, [pathname]);

  return (
    <>
      {/* Loading Effect */}
      {isLoading && <PageLoader />}
      {/* End of Loading Effect */}
      {/** Page Cookie Popup **/}
      <CookieBanner />
      {/* End of Page Cookie Popup */}
      {/* Loading Effect */}
      <LoadingEffect animated={setAnimationPlayed} />
      {/* End of Loading Effect */}

      {/* Each of the following renders (or doesn't) its own fixed element
          based on the current route. They are separate components, rather
          than inline JSX conditions here, so this component's own render
          logic stays simple to read. */}
      <SlidingArrowSection pathname={pathname} />
      <HomePageOnlyElements pathname={pathname} isPlaying={isPlaying} />
      <VisitTempleNavSection
        pathname={pathname}
        templeTabData={templeTabData}
        templeActiveTab={templeActiveTab}
      />
      <WaveLineSection pathname={pathname} />
      <CircleOfTheYearMusicSection pathname={pathname} />
      <PastRabbisPageElements pathname={pathname} />
      <NewsPageElements pathname={pathname} />
      <CommunityLoaderSection pathname={pathname} />
      <RabbisHamburgerMenuSection
        pathname={pathname}
        listOfRabbis={listOfRabbis}
      />
      <ExactPathFixedElements pathname={pathname} />
    </>
  );
}

// Home page only: cursor-follow effect, the floating wish button, and the
// audio play/pause button.
function HomePageOnlyElements({
  pathname,
  isPlaying,
}: {
  pathname: string;
  isPlaying: boolean;
}) {
  if (pathname !== "/") return null;
  return (
    <>
      <CursorFollow isPlaying={isPlaying} />
      <WishButton />
      <PlayPauseButton />
    </>
  );
}

function SlidingArrowSection({ pathname }: { pathname: string }) {
  if (pathname !== "/" && pathname !== "/chronicles") return null;
  return <SlidingArrow />;
}

function VisitTempleNavSection({
  pathname,
  templeTabData,
  templeActiveTab,
}: {
  pathname: string;
  templeTabData: { tab_title?: string }[];
  templeActiveTab: number;
}) {
  if (
    pathname !== "/visit-temple" &&
    !pathname.startsWith("/visit-temple/")
  ) {
    return null;
  }
  return <TabMenu data={templeTabData} activeTab={templeActiveTab} />;
}

// Pages that show the connecting "wave line" graphic between sections. Kept
// as plain data (not a long chain of JSX `||` conditions) so it's easy to
// scan and doesn't add to PageFixedElements' own branching/complexity.
const WAVE_LINE_EXACT_PATHS = new Set([
  "/zatzel-graduates",
  "/the-circle-of-the-year",
  "/testimonials",
  "/past-rabbis",
  "/news",
  "/donation",
  "/communities",
  "/communities/sheets",
  "/cycle-pictures",
  "/visit-temple",
  "/yeshiva-rabbis",
  "/yeshiva-graduates",
  "/the-knesset-of-customs",
]);
const WAVE_LINE_PATH_PREFIXES = [
  "/the-circle-of-the-year/",
  "/past-rabbis/",
  "/cycle-pictures/",
  "/visit-temple/",
];

function shouldShowWaveLine(pathname: string) {
  return (
    WAVE_LINE_EXACT_PATHS.has(pathname) ||
    WAVE_LINE_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}

function WaveLineSection({ pathname }: { pathname: string }) {
  if (!shouldShowWaveLine(pathname)) return null;
  return <WaveLine />;
}

function CircleOfTheYearMusicSection({ pathname }: { pathname: string }) {
  if (
    pathname !== "/the-circle-of-the-year" &&
    !pathname.startsWith("/the-circle-of-the-year/")
  ) {
    return null;
  }
  return <MusicPlayerAndFixedImage />;
}

// "/past-rabbis/<slug>" and "/past-rabbis" are mutually exclusive, so this
// combines both of the original branches into one component.
function PastRabbisPageElements({ pathname }: { pathname: string }) {
  if (pathname.startsWith("/past-rabbis/")) {
    return <PastRabbisFixedElements />;
  }
  if (pathname === "/past-rabbis") {
    return <PastRabbisSidebar />;
  }
  return null;
}

// "/news" and "/news/<slug>" are mutually exclusive, so this combines both
// of the original branches into one component.
function NewsPageElements({ pathname }: { pathname: string }) {
  if (pathname === "/news") {
    return <NewsViewButton />;
  }
  if (pathname.startsWith("/news/")) {
    return <NewsMovingButton />;
  }
  return null;
}

function isCommunityLoaderPath(pathname: string) {
  return (
    pathname.startsWith("/communities/") &&
    pathname !== "/communities/sheets" &&
    pathname !== "/communities/sheets/v2" &&
    pathname !== "/communities/sheets/old"
  );
}

function CommunityLoaderSection({ pathname }: { pathname: string }) {
  if (!isCommunityLoaderPath(pathname)) return null;
  return <CommunityLoader />;
}

// Preserved exactly as originally written, including its pre-existing
// operator-precedence quirk (`||` binds looser than `&&`, so on
// "/past-rabbis" this expression evaluates to the boolean `true`, which
// React renders as nothing, rather than the hamburger menu). This refactor
// only relocates the branch out of PageFixedElements; it intentionally does
// not change behavior.
function RabbisHamburgerMenuSection({
  pathname,
  listOfRabbis,
}: {
  pathname: string;
  listOfRabbis: any;
}) {
  return (
    <>
      {pathname === "/past-rabbis" ||
        (pathname === "/chronicles" && (
          <RabbisHamburgerMenuHome extraClass="hidden" data={listOfRabbis} />
        ))}
    </>
  );
}

// Pages that render exactly one extra fixed element, with no props beyond
// the pathname itself. A lookup table keeps this declarative instead of a
// long if/else chain (see the canonical fix for
// react-doctor/no-high-complexity-react-function).
const EXACT_PATH_FIXED_ELEMENTS: Record<string, () => React.ReactElement> = {
  "/zatzel-graduates": () => <ZatzelGraduatesPopup />,
  "/donation": () => <FixedPlayButton />,
  "/chronicles": () => <ChroniclesElements />,
  "/the-knesset-of-customs": () => <KnessetFixedSidebar />,
  "/cycle-pictures": () => <CycleOfPicturesFixedElements />,
  "/communities/sheets/old": () => <CommunityFixedSidebar />,
};

function ExactPathFixedElements({ pathname }: { pathname: string }) {
  const render = EXACT_PATH_FIXED_ELEMENTS[pathname];
  return render ? render() : null;
}
