"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Caret from "../assets/icons/Caret";

interface ChildProps {
  itemText: string;
  subItem: { id: number; title: string }[];
}

export default function SubMenuItem(props: ChildProps) {
  const [menuActive, setMenuActive] = useState(false);
  const menuDropdown = useRef(null);

  useEffect(() => {
    //console.log(props.subItem);
  }, []);

  // 2. Define the "open" animation (sliding down)
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };
  return (
    <>
      <button
        onClick={toggleMenu}
        className={`${menuActive ? "text-[#C3A13F]" : "hover:text-[#C3A13F]"} transition-colors duration-500 flex items-center gap-1.25 cursor-pointer`}
      >
        <span className="text">{props.itemText}</span>
        <span className="icon">
          <Caret />
        </span>
      </button>
      <span
        className={`bg-[#C3A13F] ${menuActive ? "w-1.75" : ""} h-3.25 block absolute top-3 right-0 -mr-4 transition-all duration-300`}
      ></span>
      <ul
        ref={menuDropdown}
        className={`child-menu overflow-hidden ${menuActive ? `h-auto` : "h-0"} transition-all duration-500`}
      >
        {props.subItem.map((item, index) => (
          <li key={index} className="relative pr-5">
            <span className="w-1.75 h-1.75 bg-[#D1A941] block rounded-full absolute top-1/2 right-0 -mt-1"></span>
            <Link
              href={"/"}
              className="hover:text-[#C3A13F] transition-colors duration-500"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
