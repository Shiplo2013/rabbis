"use client";
import { useParams, usePathname } from "next/navigation";
export default function Page() {
  // Router Path
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug as string;
  return <div>Page: {slug}</div>;
}
