"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function LoadingEffect(props: { animated: (value: boolean) => void }) {
  // Initialize state to check if the user has visited
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const pathname = usePathname();
  const [hardRefresh, setHardRefresh] = useState(false);
  // Check localStorage on component mount
  useEffect(() => {
    // Loading effect for first time visitors
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl + Shift + R (Windows/Linux) or Cmd + Shift + R (Mac)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === "R" || e.key === "r")
      ) {
        localStorage.setItem("hasVisited", "false");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [pathname]);
  // Set localStorage variable
  useEffect(() => {
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit == null || userVisit == "false") {
      //localStorage.setItem("hasVisited", "true");
      setIsFirstVisit(true);
    } else {
      props.animated(true);
      setIsFirstVisit(false);
    }
  }, [pathname]);
  // loadin is true
  if (isFirstVisit) {
    return <Loading animated={props.animated} />;
  }
  return <></>;
}

export default LoadingEffect;
