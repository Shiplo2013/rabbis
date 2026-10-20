// app/context/AppContext.tsx
"use client"; // Required for useState and createContext

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type ContextType = {
  // Default States
  smoother: React.MutableRefObject<ScrollSmoother | null>;
  animationPlayed: boolean;
  setAnimationPlayed: (value: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  audioFile: string | null;
  setAudioFile: (value: string | null) => void;

  // Hamburger Menu States
  activeHamburgerMenu: boolean;
  setActiveHamburgerMenu: (value: boolean) => void;

  // Zatzel Posts States
  zatzelPosts: {
    sections: {
      sectionTitle: string;
      sectionContent: {
        title: string;
        yearOfDeath: string;
        image: {
          sizes: {
            thumbnail: string;
          };
        };
        popup: {
          title: string;
          content: string;
        };
      }[];
    }[];
  };
  setZatzelPosts: (value: {
    sections: {
      sectionTitle: string;
      sectionContent: {
        title: string;
        yearOfDeath: string;
        image: {
          sizes: {
            thumbnail: string;
          };
        };
        popup: {
          title: string;
          content: string;
        };
      }[];
    }[];
  }) => void;
  zatzelPopupIndex: { catIndex: number; postIndex: number };
  setZatzelPopupIndex: (value: { catIndex: number; postIndex: number }) => void;
  zatzelActivePopup: boolean;
  setZatzelActivePopup: (value: boolean) => void;
  zatzelSelectedDate: Date | null;
  setZatzelSelectedDate: (value: Date | null) => void;
  zatzelSearchedData: string | null;
  setZatzelSearchedData: (value: string | null) => void;

  // Cycle Of Pictures States
  cycleActiveCategory: number | null;
  setCycleActiveCategory: (value: number | null) => void;
  cycleCategories: {
    count: number;
    id: number;
    name: string;
    parent: number;
    slug: string;
  }[];
  setCycleCategories: (
    value: {
      count: number;
      id: number;
      name: string;
      parent: number;
      slug: string;
    }[],
  ) => void;
  cycleAllPosts: any | null;
  setCycleAllPosts: (value: any) => void;
  activeCyclePopup: boolean;
  setActiveCyclePopup: (value: boolean) => void;
  cyclePopupIndex: number;
  setCyclePopupIndex: (value: number) => void;

  // Temple States
  templeTabData: {
    tab_title?: string;
  }[];
  setTempleTabData: (value: { tab_title?: string }[]) => void;
  templeActiveTab: number;
  setTempleActiveTab: (value: number) => void;
  // Music Page States
  audioPopup: boolean;
  setAudioPopup: (value: boolean) => void;
  activeMusicItem: number;
  setActiveMusicItem: (value: number) => void;
  activeMusicFolder: number;
  setActiveMusicFolder: (value: number) => void;
  activeMusicTab: number;
  setActiveMusicTab: (value: number) => void;
  musicPageData: any;
  setMusicPageData: (value: any) => void;
  // Rabbis States
  currentRabbisPost: any;
  setCurrentRabbisPost: (value: any) => void;
  allRabbisPosts: any;
  setAllRabbisPosts: (value: any) => void;

  // Past Rabbis
  pastRabbisSearchQuery: string | null;
  setPastRabbisSearchQuery: (value: string | null) => void;

  // Communities States
  currentCommunitiesPost: any;
  setCurrentCommunitiesPost: (value: any) => void;
  communityHeaderData: any;
  setCommunityHeaderData: (value: any) => void;
  communitySheetsCategoryData: any;
  setCommunitySheetsCategoryData: (value: number) => void;
  // Parent Cat
  sheetsOnSelectCategoryId: number | null;
  setSheetsOnSelectCategoryId: (value: number | null) => void;
  sheetsOnSelectCategoryChildId: number | null;
  setSheetsOnSelectCategoryChildId: (value: number | null) => void;

  // Knesset States
  knessetCategoryData: any;
  setKnessetCategoryData: (value: any) => void;
  knessetActiveCategory: string | null;
  setKnessetActiveCategory: (value: string | null) => void;
  knessetSearchQuery: string | null;
  setKnessetSearchQuery: (value: string | null) => void;

  historyTimelineData: any;
  setHistoryTimelineData: (value: any) => void;
  appData: any; // Add this line to include the appData prop in the context
  activeRabbisMenu: boolean;
  setActiveRabbisMenu: (value: boolean) => void;
  listOfRabbis: any;
  setListOfRabbis: (value: any) => void;
  isVideoPopupOpen: boolean;
  setIsVideoPopupOpen: (value: boolean) => void;
  openNotificationPopup: boolean;
  setOpenNotificationPopup: (value: boolean) => void;
  notificationData: any;
  setNotificationData: (value: any) => void;
  // Cycle Pictures States
  cyclePostNavigation: {
    nextPage: number | null;
    prevPage: number | null;
    currentPage: number | null;
    currentCategory: string | null;
    maxPages: number | null;
    postsPerPage: number | null;
    postsData: any[] | null;
    categoryData: any[] | null;
  };
  setCyclePostNavigation: (value: {
    nextPage: number | null;
    prevPage: number | null;
    currentPage: number | null;
    currentCategory: string | null;
    maxPages: number | null;
    postsPerPage: number | null;
    postsData: any[] | null;
    categoryData: any[] | null;
  }) => void;
};

const AppContext = createContext<ContextType | undefined>(undefined);

function useCoreState() {
  const smoother = useRef<ScrollSmoother | null>(null);
  const [animationPlayed, setAnimationPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [audioFile, setAudioFile] = useState<string | null>(
    "https://dovp7.sg-host.com/wp-content/uploads/2026/02/music.mp3",
  );
  const [activeHamburgerMenu, setActiveHamburgerMenu] = useState(false);

  return useMemo(
    () => ({
      smoother,
      animationPlayed,
      setAnimationPlayed,
      isPlaying,
      setIsPlaying,
      isLoading,
      setIsLoading,
      audioFile,
      setAudioFile,
      activeHamburgerMenu,
      setActiveHamburgerMenu,
    }),
    [
      smoother,
      animationPlayed,
      isPlaying,
      isLoading,
      audioFile,
      activeHamburgerMenu,
    ],
  );
}

function useZatzelState() {
  const [zatzelPosts, setZatzelPosts] = useState<ContextType["zatzelPosts"]>({
    sections: [],
  });
  const [zatzelPopupIndex, setZatzelPopupIndex] = useState({
    catIndex: 0,
    postIndex: 0,
  });
  const [zatzelActivePopup, setZatzelActivePopup] = useState(false);
  const [zatzelSelectedDate, setZatzelSelectedDate] = useState<Date | null>(
    null,
  );
  const [zatzelSearchedData, setZatzelSearchedData] = useState<string | null>(
    null,
  );

  return useMemo(
    () => ({
      zatzelPosts,
      setZatzelPosts,
      zatzelPopupIndex,
      setZatzelPopupIndex,
      zatzelActivePopup,
      setZatzelActivePopup,
      zatzelSelectedDate,
      setZatzelSelectedDate,
      zatzelSearchedData,
      setZatzelSearchedData,
    }),
    [
      zatzelPosts,
      zatzelPopupIndex,
      zatzelActivePopup,
      zatzelSelectedDate,
      zatzelSearchedData,
    ],
  );
}

function useCycleState() {
  const [cycleActiveCategory, setCycleActiveCategory] = useState<number | null>(
    -1,
  );
  const [cycleCategories, setCycleCategories] = useState<any>(null);
  const [cycleAllPosts, setCycleAllPosts] = useState<any>(null);
  const [activeCyclePopup, setActiveCyclePopup] = useState(false);
  const [cyclePopupIndex, setCyclePopupIndex] = useState(0);

  return useMemo(
    () => ({
      cycleActiveCategory,
      setCycleActiveCategory,
      cycleCategories,
      setCycleCategories,
      cycleAllPosts,
      setCycleAllPosts,
      activeCyclePopup,
      setActiveCyclePopup,
      cyclePopupIndex,
      setCyclePopupIndex,
    }),
    [
      cycleActiveCategory,
      cycleCategories,
      cycleAllPosts,
      activeCyclePopup,
      cyclePopupIndex,
    ],
  );
}

function useTempleMusicState() {
  const [templeTabData, setTempleTabData] = useState<
    ContextType["templeTabData"]
  >([]);
  const [templeActiveTab, setTempleActiveTab] = useState(0);
  const [musicPageData, setMusicPageData] = useState<any>(null);
  const [audioPopup, setAudioPopup] = useState(false);
  const [activeMusicItem, setActiveMusicItem] = useState(0);
  const [activeMusicFolder, setActiveMusicFolder] = useState(0);
  const [activeMusicTab, setActiveMusicTab] = useState(0);

  return useMemo(
    () => ({
      templeTabData,
      setTempleTabData,
      templeActiveTab,
      setTempleActiveTab,
      musicPageData,
      setMusicPageData,
      audioPopup,
      setAudioPopup,
      activeMusicItem,
      setActiveMusicItem,
      activeMusicFolder,
      setActiveMusicFolder,
      activeMusicTab,
      setActiveMusicTab,
    }),
    [
      templeTabData,
      templeActiveTab,
      musicPageData,
      audioPopup,
      activeMusicItem,
      activeMusicFolder,
      activeMusicTab,
    ],
  );
}

function useRabbiState() {
  const [currentRabbisPost, setCurrentRabbisPost] = useState<any>(null);
  const [allRabbisPosts, setAllRabbisPosts] = useState<any>(null);
  const [pastRabbisSearchQuery, setPastRabbisSearchQuery] = useState<any>();

  return useMemo(
    () => ({
      currentRabbisPost,
      setCurrentRabbisPost,
      allRabbisPosts,
      setAllRabbisPosts,
      pastRabbisSearchQuery,
      setPastRabbisSearchQuery,
    }),
    [currentRabbisPost, allRabbisPosts, pastRabbisSearchQuery],
  );
}

function useCommunityState() {
  const [currentCommunitiesPost, setCurrentCommunitiesPost] =
    useState<any>(null);
  const [communityHeaderData, setCommunityHeaderData] = useState<any>(null);
  const [communitySheetsCategoryData, setCommunitySheetsCategoryData] =
    useState<any>(null);
  const [sheetsOnSelectCategoryId, setSheetsOnSelectCategoryId] = useState<
    number | null
  >(0);
  const [sheetsOnSelectCategoryChildId, setSheetsOnSelectCategoryChildId] =
    useState<number | null>(0);

  return useMemo(
    () => ({
      currentCommunitiesPost,
      setCurrentCommunitiesPost,
      communityHeaderData,
      setCommunityHeaderData,
      communitySheetsCategoryData,
      setCommunitySheetsCategoryData,
      sheetsOnSelectCategoryId,
      setSheetsOnSelectCategoryId,
      sheetsOnSelectCategoryChildId,
      setSheetsOnSelectCategoryChildId,
    }),
    [
      currentCommunitiesPost,
      communityHeaderData,
      communitySheetsCategoryData,
      sheetsOnSelectCategoryId,
      sheetsOnSelectCategoryChildId,
    ],
  );
}

function useSiteState() {
  const [knessetCategoryData, setKnessetCategoryData] = useState<any>(null);
  const [knessetActiveCategory, setKnessetActiveCategory] = useState<
    string | null
  >(null);
  const [knessetSearchQuery, setKnessetSearchQuery] = useState<string | null>(
    null,
  );
  const [historyTimelineData, setHistoryTimelineData] = useState<any>(null);
  const [activeRabbisMenu, setActiveRabbisMenu] = useState(false);
  const [listOfRabbis, setListOfRabbis] = useState<any>(null);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  const [openNotificationPopup, setOpenNotificationPopup] = useState(false);
  const [notificationData, setNotificationData] = useState<any>(null);

  return useMemo(
    () => ({
      knessetCategoryData,
      setKnessetCategoryData,
      knessetActiveCategory,
      setKnessetActiveCategory,
      knessetSearchQuery,
      setKnessetSearchQuery,
      historyTimelineData,
      setHistoryTimelineData,
      activeRabbisMenu,
      setActiveRabbisMenu,
      listOfRabbis,
      setListOfRabbis,
      isVideoPopupOpen,
      setIsVideoPopupOpen,
      openNotificationPopup,
      setOpenNotificationPopup,
      notificationData,
      setNotificationData,
    }),
    [
      knessetCategoryData,
      knessetActiveCategory,
      knessetSearchQuery,
      historyTimelineData,
      activeRabbisMenu,
      listOfRabbis,
      isVideoPopupOpen,
      openNotificationPopup,
      notificationData,
    ],
  );
}

function useCycleNavigationState() {
  const [cyclePostNavigation, setCyclePostNavigation] = useState<
    ContextType["cyclePostNavigation"]
  >({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    currentCategory: null,
    maxPages: 0,
    postsPerPage: null,
    postsData: null,
    categoryData: null,
  });

  return useMemo(
    () => ({ cyclePostNavigation, setCyclePostNavigation }),
    [cyclePostNavigation],
  );
}

function useAppContextValue(appData: any) {
  const coreState = useCoreState();
  const zatzelState = useZatzelState();
  const cycleState = useCycleState();
  const templeMusicState = useTempleMusicState();
  const rabbiState = useRabbiState();
  const communityState = useCommunityState();
  const siteState = useSiteState();
  const cycleNavigationState = useCycleNavigationState();

  return useMemo<ContextType>(
    () => ({
      ...coreState,
      ...zatzelState,
      ...cycleState,
      ...templeMusicState,
      ...rabbiState,
      ...communityState,
      ...siteState,
      ...cycleNavigationState,
      appData,
    }),
    [
      appData,
      coreState,
      zatzelState,
      cycleState,
      templeMusicState,
      rabbiState,
      communityState,
      siteState,
      cycleNavigationState,
    ],
  );
}

export function AppProvider({
  appData,
  children,
}: {
  appData: any;
  children: ReactNode;
}) {
  const contextValue = useAppContextValue(appData);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppState must be used within AppProvider");
  return context;
}
