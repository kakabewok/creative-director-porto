"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const WORK_VIEW_ROUTES = ["/work", "/work/spectrum", "/work/timeline"];

export default function ResponsiveNavbar() {
  const pathname = usePathname();

  // Hide navbar only on project detail pages (/work/[slug]),
  // but keep it visible on view routes (/work, /work/spectrum, /work/timeline)
  const isWorkSlugPage =
    pathname.startsWith("/work/") && !WORK_VIEW_ROUTES.includes(pathname);

  if (isWorkSlugPage) {
    return null;
  }

  return <Navbar />;
}
