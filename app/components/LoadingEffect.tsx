"use client";
import { useEffect, useState } from "react";
import Loading from "./Loading";

function LoadingEffect() {
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
    return <Loading />;
  }
  return <></>;
}

export default LoadingEffect;
