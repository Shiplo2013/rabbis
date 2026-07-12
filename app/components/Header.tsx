"use client";
import { usePathname } from "next/navigation";
import CommunityPageHeader from "./CommunityPageHeader";
import PageHeader from "./PageHeader";
import RabbisHeader from "./RabbisHeader";
import SinglePageHeader from "./SinglePageHeader";

export default function Header() {
  const pathname = usePathname();

  const OtherPageHeader = pathname.startsWith("/past-rabbis/") ? (
    <RabbisHeader />
  ) : pathname.startsWith("/news/") ? (
    <SinglePageHeader link={"/news"} />
  ) : pathname.startsWith("/communities/") &&
    pathname !== "/communities/sheets" ? (
    <CommunityPageHeader />
  ) : null;

  return (
    <>
      {OtherPageHeader}
      <PageHeader />
    </>
  );
}
