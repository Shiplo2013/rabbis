"use client";

import { useEffect } from "react";

interface Header2Props {
  // Define any props you want to pass to the Header2 component here
  data?: any; // Example prop, replace with actual type as needed
  animationStatus?: boolean; // Example prop, replace with actual type as needed
}

export default function Header2(props: Header2Props) {
  useEffect(() => {
    // Example of using the props
    console.log("Header2 props:", props);
  }, [props]);

  return <div>Header2</div>;
}
