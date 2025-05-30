
import KeyMetricsCard from "@/components/dashboard/KeyMetricsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GanttChartSquare, BookText, FileText, SettingsIcon, LayoutDashboard } from "lucide-react";
import TimelineView from "@/components/dashboard/TimelineView";
import ManualLogForm from "@/components/dashboard/ManualLogForm";
import SummaryGenerator from "@/components/dashboard/SummaryGenerator";
import ExportControls from "@/components/dashboard/ExportControls";
import DateFilterBar from "@/components/dashboard/DateFilterBar"; // New Import
import ActivityChart from "@/components/dashboard/ActivityChart"; // New Import

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-2 space-y-8">
      <h1 className="text-3xl font-bold text-primary">Welcome to CommitChronicle</h1>
      
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" /> Dashboard Overview
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <GanttChartSquare className="h-4 w-4" /> Timeline
          </TabsTrigger>
          <TabsTrigger value="manual-log" className="flex items-center gap-2">
            <BookText className="h-4 w-4" /> Manual Log
          </TabsTrigger>
          <TabsTrigger value="summaries" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> AI Summaries
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" /> Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="space-y-6">
            <DateFilterBar />
            <KeyMetricsCard />
            <ActivityChart />
          </div>
        </TabsContent>
        <TabsContent value="timeline">
          <TimelineView />
        </TabsContent>
        <TabsContent value="manual-log">
          <ManualLogForm />
        </TabsContent>
        <TabsContent value="summaries">
          <SummaryGenerator />
        </TabsContent>
        <TabsContent value="export">
          <ExportControls />
        </TabsContent>
      </Tabs>
    </div>
  );
}
