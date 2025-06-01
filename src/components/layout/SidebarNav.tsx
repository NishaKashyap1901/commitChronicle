
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, GanttChartSquare, FileText, Settings, BookText, Download } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  matchSegments?: number; // Number of path segments to match for active state
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: Home, matchSegments: 1 },
  { href: "/dashboard/timeline", label: "Timeline", icon: GanttChartSquare, matchSegments: 2 },
  { href: "/dashboard/manual-log", label: "Manual Log", icon: BookText, matchSegments: 2 },
  { href: "/dashboard/summaries", label: "Summaries", icon: FileText, matchSegments: 2 },
  { href: "/dashboard/export", label: "Export", icon: Download, matchSegments: 2 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, matchSegments: 2 },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.matchSegments) {
      const currentPathSegments = pathname.split('/').filter(Boolean);
      const itemPathSegments = item.href.split('/').filter(Boolean);
      if (currentPathSegments.length < item.matchSegments || itemPathSegments.length < item.matchSegments) {
        return pathname === item.href;
      }
      return currentPathSegments.slice(0, item.matchSegments).join('/') === itemPathSegments.slice(0, item.matchSegments).join('/');
    }
    return pathname === item.href;
  };

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={isActive(item)}
              tooltip={item.label}
              className={cn(
                isActive(item)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "justify-start"
              )}
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">
                  {item.label}
                </span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
