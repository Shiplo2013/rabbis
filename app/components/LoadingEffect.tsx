"use client";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function LoadingEffect(props: { animated: (value: boolean) => void }) {
  // Initialize state to check if the user has visited
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  // Set localStorage variable
  useEffect(() => {
    // Set localStorage variable
    const userVisit = localStorage.getItem("hasVisited");
    if (userVisit == null || userVisit == "false") {
      localStorage.setItem("hasVisited", "false");
      setIsFirstVisit(true);
    } else {
      setIsFirstVisit(false);
    }
  }, []);
  // loadin is true
  if (isFirstVisit) {
    return <Loading animated={props.animated} />;
  }
  return <></>;
}

export default LoadingEffect;
