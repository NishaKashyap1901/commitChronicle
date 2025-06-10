
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, GitCommit, ListChecks, CheckSquare, Clock, AlertTriangle, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { TimelineEvent } from "./TimelineView"; // Import TimelineEvent type

export default function KeyMetricsCard() {
  // Static sample data, notionally for nisha.kashyap@innogent.in, except for Tasks Completed
  const commitsLast6Months = 125;
  // tasksCompletedLast6Months will be dynamically loaded from localStorage
  const activePRs = 3;
  const jiraToDo = 5;
  const jiraInProgress = 2;
  const jiraDoneLast6Months = 45;

  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasConnectedAccounts, setHasConnectedAccounts] = useState(true); // Assume connected for now

  useEffect(() => {
    setIsLoading(true);
    const storedEventsString = localStorage.getItem('commitChronicleTimelineEvents');
    if (storedEventsString) {
      try {
        const allEvents: TimelineEvent[] = JSON.parse(storedEventsString);
        const completedTasksCount = allEvents.filter(event => event.type === "task_completed").length;
        setTasksCompleted(completedTasksCount);
      } catch (e) {
        console.error("Failed to parse timeline events from localStorage for KeyMetricsCard", e);
        setTasksCompleted(0); // Fallback on error
      }
    } else {
      // If no events in localStorage, it means no manual logs yet, so tasks completed from manual logs is 0.
      // This also simulates the state before connecting accounts.
      setTasksCompleted(0);
    }
    // Simulate check for connected accounts (in a real app, this would be a state from context/API)
    // For now, we'll assume if there's no local storage, accounts might not be connected for other metrics.
    setHasConnectedAccounts(!!storedEventsString); // Basic check, improve with real integration status
    setIsLoading(false);
  }, []);

  // Placeholder for navigating to settings
  const goToSettings = () => {
    // In a real app, use Next.js router: router.push('/dashboard/settings');
    alert("Navigate to Settings page to connect accounts.");
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-primary" />
            Key Metrics (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Info className="mx-auto h-10 w-10 text-muted-foreground animate-pulse" />
          <p className="mt-2 text-sm text-muted-foreground">Loading key metrics...</p>
        </CardContent>
      </Card>
    );
  }

  if (!isLoading && !hasConnectedAccounts && tasksCompleted === 0) { // A more nuanced check might be needed
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-primary" />
            Key Metrics (Last 6 Months)
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Info className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Connect your Git and Jira accounts in settings to see your key metrics.
          </p>
          <Button onClick={goToSettings} className="mt-4" variant="outline">
            Go to Settings
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-primary" />
          Key Metrics (Last 6 Months)
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <GitCommit className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{commitsLast6Months}</p>
          <p className="text-sm text-muted-foreground text-center">Commits</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <ListChecks className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{tasksCompleted}</p>
          <p className="text-sm text-muted-foreground text-center">Tasks Completed (Manual Logs)</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <AlertTriangle className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{activePRs}</p>
          <p className="text-sm text-muted-foreground text-center">Active PRs</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <Clock className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{jiraToDo}</p>
          <p className="text-sm text-muted-foreground text-center">Jira: To Do</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <BarChart3 className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{jiraInProgress}</p>
          <p className="text-sm text-muted-foreground text-center">Jira: In Progress</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <CheckSquare className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{jiraDoneLast6Months}</p>
          <p className="text-sm text-muted-foreground text-center">Jira: Done</p>
        </div>
      </CardContent>
    </Card>
  );
}
