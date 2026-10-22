import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "../components/AppContext";

// Handle Link Click
export const useHandleLinkClick = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading } = useAppState();

  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      if (pathname !== e.currentTarget.pathname) {
        setIsLoading(true);
        window.scrollTo(0, 0);
        router.push(e.currentTarget.href);
      }
    },
    [pathname, router, setIsLoading],
  );
};
