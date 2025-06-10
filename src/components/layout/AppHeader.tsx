
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
import { useRouter } from "next/navigation";

export default function AppHeader() {
  // const { toggleSidebar } = useSidebar(); 
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, this would also clear any authentication tokens/session state.
    console.log("Logout initiated");
    router.push("/login");
  };

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
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="currentColor"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path
              d="M50 5C25.1472 5 5 25.1472 5 50C5 74.8528 25.1472 95 50 95C74.8528 95 95 74.8528 95 50C95 37.0261 89.6987 25.1307 81.2132 16.7132C74.8693 10.3013 65.8833 5.87289 56 5H50Z"
              fill="url(#grad1)"
            />
            <path
              d="M50 5C56.2289 5 62.0198 6.47628 67.0396 8.99334L35 40L25 30L50 5Z"
              fill="hsl(var(--primary-foreground))"
              opacity="0.5"
            />
            <circle cx="50" cy="50" r="15" fill="hsl(var(--primary-foreground))" />
            <path d="M50 35 A15 15 0 0 1 50 65 A15 15 0 0 1 50 35 Z" fill="hsl(var(--primary))" />
            <path d="M50 42 A8 8 0 0 1 50 58 A8 8 0 0 1 50 42 Z" fill="hsl(var(--primary-foreground))" />
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
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
