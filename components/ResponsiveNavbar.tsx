"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"; 

export default function ResponsiveNavbar() {
  const pathname = usePathname();
  const isWorkDetailPage = pathname.startsWith("/work/");

  if (isWorkDetailPage) {
    return null;
  }

  return <Navbar />;
}