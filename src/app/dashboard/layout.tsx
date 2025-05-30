
import AppHeader from "@/components/layout/AppHeader";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarInset, 
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full flex-col">
        <AppHeader />
        <div className="flex flex-1">
          <Sidebar className="border-r" collapsible="icon">
            <SidebarContent className="pt-16 md:pt-0"> {/* Added md:pt-0 to reset padding on desktop where fixed positioning handles it */}
              <ScrollArea className="h-full py-2">
                <SidebarNav />
              </ScrollArea>
            </SidebarContent>
          </Sidebar>
          <SidebarInset className="flex-1">
            <main className="p-7 flex-1">
              {children}
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
