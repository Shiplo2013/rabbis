"use client";
import MicIcon from "@/app/assets/icons/MicIcon";
import { useEffect, useState } from "react";
import { createContext } from "vm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingEffect from "../components/LoadingEffect";

const AnimContext = createContext();

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [animationPlayed, setAnimationPlayed] = useState(false);
  useEffect(() => {
    console.log(animationPlayed);
  }, [animationPlayed]);
  return (
    <>
      <LoadingEffect animated={setAnimationPlayed} />
      <Header />
      <main
        id="page"
        dir="ltr"
        className="main opacity-0 relative overflow-hidden"
      >
        {children}
      </main>
      <Footer />
      <div
        id="cursorFollower"
        className={`fixed left-0 top-0 z-50 pointer-events-none flex justify-center items-center opacity-0 w-21 h-21 rounded-full bg-[#C3A13FB2] -ml-10.5 -mt-10.5`}
      >
        <MicIcon />
      </div>
    </>
  );
}
