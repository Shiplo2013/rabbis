import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppState } from "../AppContext";
import FooterCredits from "../FooterCredits";

export default function FooterBottom({ footerData }: { footerData: any }) {
  const router = useRouter();
  const { setIsLoading } = useAppState();
  // Handle Link Click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (window.location.pathname !== e.currentTarget.pathname) {
      setIsLoading(true);
      window.scrollTo(0, 0);
      router.push(e.currentTarget.href);
    }
  };
  return (
    <div className="footer-bottom flex justify-between gap-y-5 mt-10 lg:mt-5 flex-col lg:flex-row">
      <div className="privacy-policy text-[20px] sm:text-2xl leading-[1.2em]">
        <p>
          {footerData?.acf?.footer_menu?.map((item: any, index: number) => (
            <span key={item.link}>
              <Link
                href={item.link}
                onClick={handleLinkClick}
                prefetch={false}
                className="hover:text-(--theme-color) transition-colors duration-300"
              >
                {item.title}
              </Link>
              {index < footerData?.acf?.footer_menu?.length - 1 && " - "}
            </span>
          ))}
        </p>
      </div>
      <div className="footer-credits flex flex-col gap-y-2 items-end">
        <FooterCredits />
      </div>
    </div>
  );
}
