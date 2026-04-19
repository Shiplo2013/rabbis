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
  const [menuHeight, setMenuHeight] = useState(0);
  const menuDropdown = useRef<HTMLUListElement>(null);
  const dropdownId = `submenu-${props.itemText}-${props.subItem.length}`;

  useEffect(() => {
    if (menuDropdown.current) {
      setMenuHeight(menuDropdown.current.scrollHeight);
    }
  }, [menuActive, props.subItem]);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        aria-expanded={menuActive}
        aria-controls={dropdownId}
        className={`${menuActive ? "text-[#C3A13F]" : "hover:text-[#C3A13F]"} transition-colors duration-500 flex items-center gap-1.25 cursor-pointer`}
      >
        <span className="text">{props.itemText}</span>
        <span
          className={`icon transition-transform duration-500 ${menuActive ? "rotate-180" : "rotate-0"}`}
        >
          <Caret />
        </span>
      </button>
      <span
        className={`bg-[#C3A13F] ${menuActive ? "w-1.75" : ""} h-3.25 block absolute top-3 right-0 -mr-4 transition-all duration-300`}
      ></span>
      <ul
        id={dropdownId}
        ref={menuDropdown}
        style={{
          maxHeight: menuActive ? `${menuHeight}px` : "0px",
          opacity: menuActive ? 1 : 0,
        }}
        className="child-menu overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
      >
        {props.subItem.map((item) => (
          <li key={item.id} className="relative pr-5">
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
