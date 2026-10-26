import Search from "@/app/assets/icons/Search";
import parse from "html-react-parser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { parseJsonResponse } from "../../lib/parseJsonResponse";
import { useAppState } from "../AppContext";

export default function BottomSearch() {
  const { setIsLoading, activeHamburgerMenu, setActiveHamburgerMenu } =
    useAppState();
  // Selectors
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const searchResultsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      setSearchMessage("אנא הזן מונח חיפוש");
      return;
    }
    setIsSearching(true);
    setSearchMessage("");
    setSearchResults([]);
    let isMounted = true;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/search?search=${encodeURIComponent(query)}&per_page=100&_fields=id,title,url,subtype`,
        {
          cache: "no-store",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to load search data.");
        isMounted = false;
      }

      const data = await parseJsonResponse<any[]>(
        response,
        [],
        "main-menu-search",
      );

      if (isMounted) {
        if (data.length > 0) {
          console.log("Search results:", data);
          setSearchResults(data);
        } else {
          setSearchMessage("לא נמצאו תוצאות");
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchMessage("אירעה שגיאה בעת החיפוש");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      searchResultsRef.current?.classList.remove(
        "opacity-0",
        "visibility-hidden",
      );
    } else {
      searchResultsRef.current?.classList.add("opacity-0", "visibility-hidden");
    }
  }, [searchResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        searchResultsRef.current?.classList.add(
          "opacity-0",
          "visibility-hidden",
        );
      } else {
        searchResultsRef.current?.classList.remove(
          "opacity-0",
          "visibility-hidden",
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getLinkUrl = (link: string, type: string) => {
    const segments = new URL(link).pathname.match(/[^/]+/g);
    const slug = segments ? segments.pop() : "";
    if (type === "post") {
      return `/news/${slug}`;
    } else if (type === "page") {
      return `/${slug}`;
    } else if (type === "knesset-of-customs") {
      return `/the-knesset-of-customs/${slug}`;
    } else if (type === "zatzel-graduates") {
      return `/zatzel-graduates`;
    } else if (type === "communities") {
      return `/communities/${slug}`;
    } else if (type === "past-rabbis") {
      return `/past-rabbis/${slug}`;
    } else if (type === "holidays") {
      return `/the-circle-of-the-year/${slug}`;
    } else {
      return `/${slug}`;
    }
  };

  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (window.location.pathname !== e.currentTarget.pathname) {
      activeHamburgerMenu && setActiveHamburgerMenu(!activeHamburgerMenu);
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };

  return (
    <>
      <p className="text-[26px] text-[#D1A941] mb-5 leading-[1em]">חפש באתר</p>
      <form
        className="search relative h-10 bg-[#FDF9F5] w-50 flex justify-stretch group"
        onSubmit={handleSearch}
        aria-label="Search Form"
      >
        <input
          ref={searchRef}
          className="w-full h-full border outline-0 text-black pl-8 text-[18px] leading-[1em] p-2"
          type="text"
          placeholder=""
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          disabled={isSearching}
          aria-label="Search"
        />
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 disabled:opacity-50"
          type="submit"
          disabled={isSearching}
          aria-label="Submit Search"
        >
          <Search />
        </button>
        {searchResults.length > 0 && (
          <div
            ref={searchResultsRef}
            className="search-result absolute w-full max-h-60 bg-white left-0 bottom-full overflow-y-auto opacity-0 visibility-hidden"
          >
            <div className="search-link-list">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  href={getLinkUrl(result.url, result.subtype)}
                  onClick={handleLinkClick}
                  prefetch={false}
                  className="block py-3 px-3 text-[16px] leading-[1em] text-black hover:bg-gray-200 transition-colors duration-300 not-last:border-b not-last:border-b-[#C3A13F]"
                  aria-label={result.title}
                >
                  {parse(result.title)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </form>
      {searchMessage ? (
        <p className="text-[14px] text-red-500 mt-2">{searchMessage}</p>
      ) : null}
    </>
  );
}
