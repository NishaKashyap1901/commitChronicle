
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, UserCircle, Settings, LogOut } from "lucide-react";
// import { useSidebar } from "@/components/ui/sidebar"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppHeader() {
  // const { toggleSidebar } = useSidebar(); 

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 shadow-sm">
      {/* Mobile Menu - using Sheet for a drawer */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-card">
          {/* Placeholder for mobile navigation links */}
          <nav className="grid gap-2 text-lg font-medium mt-8">
            <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
            <Link href="/dashboard/timeline" className="hover:text-primary">Timeline</Link>
            <Link href="/dashboard/summaries" className="hover:text-primary">Summaries</Link>
            <Link href="/dashboard/export" className="hover:text-primary">Export</Link>
            <Link href="/dashboard/settings" className="hover:text-primary">Settings</Link>
          </nav>
        </SheetContent>
      </Sheet>
      
      {/* Desktop: App Name & New Logo */}
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-semibold text-foreground hover:text-primary transition-colors">
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-7 w-7 text-primary"
            fill="currentColor" 
          >
            <path d="M12 2a10 10 0 1 0 10 10H12V2Z" fill="hsl(var(--primary))" />
            <path d="M22 12A10 10 0 0 0 12 2v10Z" fill="hsl(var(--accent))" />
            <circle cx="12" cy="12" r="3" fill="hsl(var(--primary-foreground))" stroke="hsl(var(--primary))" />
          </svg>
          Commit Chronicle
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserCircle className="h-8 w-8 text-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { /* Handle logout */ console.log("Logout"); }}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
