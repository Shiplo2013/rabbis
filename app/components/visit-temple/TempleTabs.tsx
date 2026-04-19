import { useState } from "react";

interface ChildProps {
  extraClass: string;
  animWidthText: number;
}

export default function TempleTabs(props: ChildProps) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section
      dir="rtl"
      className={`${props.extraClass} h-full bg-black flex items-center relative z-20`}
    >
      <div className="tabs-wrapper w-full h-full"></div>
    </section>
  );
}
