import donationIcon from "@/app/assets/images/donation-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function HeaderDonationButton({ data }: { data: any }) {
  const pathname = usePathname();
  // handle link click
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (window.location.pathname !== e.currentTarget.pathname) {
      window.scrollTo(0, 0);
      window.location.href = e.currentTarget.href;
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
