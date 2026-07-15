import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "../components/AppContext";

// Handle Link Click
export const HandleLinkClick = (
  e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) => {
  e.preventDefault();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useAppState();
  if (pathname !== e.currentTarget.pathname) {
    setIsLoading(true);
    window.scrollTo(0, 0);
    router.push(e.currentTarget.href);
  }
};
