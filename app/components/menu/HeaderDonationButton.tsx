import donationIcon from "@/app/assets/images/donation-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useAppState } from "../AppContext";

export default function HeaderDonationButton({ data }: { data: any }) {
  const router = useRouter();
  const { setIsLoading } = useAppState();
  // handle link click
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
    <div className="menu-item group/parent flex items-center justify-center relative">
      <Link
        key={data?.text}
        className={`gap-4 bg-[#D4AF37] hover:bg-[#bc9924] text-[#000000] transition-colors w-full h-full flex items-center justify-center`}
        href={data?.link || "/donation"}
        onClick={(e) => {
          handleLinkClick(e);
        }}
        prefetch={false}
      >
        <Image
          className="w-auto h-auto rotate-90"
          src={donationIcon.src}
          width={13}
          height={23}
          //blurDataURL={donationIcon?.blurDataURL}
          //placeholder="blur"
          alt={"היה שות לקול התורה"}
        />
        <span>{data?.title}</span>
      </Link>
    </div>
  );
}
