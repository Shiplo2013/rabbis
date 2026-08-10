// app/context/AppContext.tsx
"use client"; // Required for useState and createContext

import { createContext, ReactNode, useContext, useRef, useState } from "react";

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
  // Communities States
  currentCommunitiesPost: any;
  setCurrentCommunitiesPost: (value: any) => void;
  communityHeaderData: any;
  setCommunityHeaderData: (value: any) => void;
  communitySheetsCategoryData: any;
  setCommunitySheetsCategoryData: (value: any) => void;
  sheetsOnSelectCategoryId: number | null;
  setSheetsOnSelectCategoryId: (value: number | null) => void;

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

export function AppProvider({
  appData,
  children,
}: {
  appData: any;
  children: ReactNode;
}) {
  // Default States
  const smoother = useRef(null);
  const [animationPlayed, setAnimationPlayed] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [audioFile, setAudioFile] = useState<string | null>(
    "https://dovp7.sg-host.com/wp-content/uploads/2026/02/music.mp3",
  );
  // Hamburger Menu States
  const [activeHamburgerMenu, setActiveHamburgerMenu] = useState(false);

  // Zatzel Posts States
  const [zatzelPosts, setZatzelPosts] = useState<{
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
  }>({ sections: [] });
  const [zatzelPopupIndex, setZatzelPopupIndex] = useState({
    catIndex: 0,
    postIndex: 0,
  });
  const [zatzelActivePopup, setZatzelActivePopup] = useState<boolean>(false);

  // Temple States
  const [templeTabData, setTempleTabData] = useState<{ tab_title?: string }[]>(
    [],
  );
  const [templeActiveTab, setTempleActiveTab] = useState<number>(0);
  // Music Page States
  const [musicPageData, setMusicPageData] = useState<any>(null);
  const [audioPopup, setAudioPopup] = useState<boolean>(false);
  const [activeMusicItem, setActiveMusicItem] = useState<number>(0);
  const [activeMusicFolder, setActiveMusicFolder] = useState<number>(0);
  const [activeMusicTab, setActiveMusicTab] = useState<number>(0);

  // Past Rabbis States
  const [currentRabbisPost, setCurrentRabbisPost] = useState<any>(null);
  const [allRabbisPosts, setAllRabbisPosts] = useState<any>(null);

  // Communites States
  const [currentCommunitiesPost, setCurrentCommunitiesPost] =
    useState<any>(null);
  const [communityHeaderData, setCommunityHeaderData] = useState<any>(null);
  const [communitySheetsCategoryData, setCommunitySheetsCategoryData] =
    useState<any>(null);
  const [sheetsOnSelectCategoryId, setSheetsOnSelectCategoryId] = useState<
    number | null
  >(0);

  // History Page
  const [historyTimelineData, setHistoryTimelineData] = useState<any>(null);
  const [activeRabbisMenu, setActiveRabbisMenu] = useState<boolean>(false);
  const [listOfRabbis, setListOfRabbis] = useState<any>(null);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState<boolean>(false);
  const [openNotificationPopup, setOpenNotificationPopup] = useState(false);
  const [notificationData, setNotificationData] = useState<any>(null);

  // Cycle Pictures States
  const [cyclePostNavigation, setCyclePostNavigation] = useState<{
    nextPage: number | null;
    prevPage: number | null;
    currentPage: number | null;
    currentCategory: string | null;
    maxPages: number | null;
    postsPerPage: number | null;
    postsData: any[] | null;
    categoryData: any[] | null;
  }>({
    nextPage: 0,
    prevPage: 0,
    currentPage: 0,
    currentCategory: null,
    maxPages: 0,
    postsPerPage: null,
    postsData: null,
    categoryData: null,
  });

  return (
    <AppContext.Provider
      value={{
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
        zatzelPosts,
        setZatzelPosts,
        zatzelPopupIndex,
        setZatzelPopupIndex,
        zatzelActivePopup,
        setZatzelActivePopup,
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
        currentRabbisPost,
        setCurrentRabbisPost,
        allRabbisPosts,
        setAllRabbisPosts,
        currentCommunitiesPost,
        setCurrentCommunitiesPost,
        communityHeaderData,
        setCommunityHeaderData,
        communitySheetsCategoryData,
        setCommunitySheetsCategoryData,
        sheetsOnSelectCategoryId,
        setSheetsOnSelectCategoryId,
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
        smoother,
        appData,
        // Cycle Pictures States
        cyclePostNavigation,
        setCyclePostNavigation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppState must be used within AppProvider");
  return context;
}
