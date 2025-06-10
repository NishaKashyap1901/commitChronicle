
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, GitCommit, ListChecks, CheckSquare, Clock, AlertTriangle, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { TimelineEvent } from "./TimelineView"; // Import TimelineEvent type
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function KeyMetricsCard() {
  const router = useRouter();
  // Static sample data, notionally for nisha.kashyap@innogent.in
  const commitsLast6Months = 125;
  const activePRs = 3;
  const jiraToDo = 5;
  const jiraInProgress = 2;
  const jiraDoneLast6Months = 45;

  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasConnectedAccounts, setHasConnectedAccounts] = useState(false); 

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
      setTasksCompleted(0);
    }
    
    // Simulate checking if accounts are connected. 
    // In a real app, this would be based on actual integration status.
    // For demo purposes, let's assume if a user is logged in, we might want to show Nisha's data by default.
    // For a more robust demo, one might set these in localStorage upon "connecting" in settings.
    const githubConnected = localStorage.getItem('githubConnected') === 'true';
    const jiraConnected = localStorage.getItem('jiraConnected') === 'true';
    
    // If we're simulating Nisha's login, we can default to showing her data.
    const loggedInUserEmail = localStorage.getItem('commitChronicleLoggedInUser');
    if (loggedInUserEmail === "nisha.kashyap@innogent.in") {
      setHasConnectedAccounts(true); // Assume Nisha's accounts are connected for demo
    } else {
      setHasConnectedAccounts(githubConnected || jiraConnected);
    }


    setIsLoading(false);
  }, []);

  const goToSettings = () => {
    router.push('/dashboard/settings');
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

  if (!hasConnectedAccounts && tasksCompleted === 0) { 
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
           <p className="text-xs text-muted-foreground mt-3">
            (Manual task logs will still appear here)
          </p>
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
          <p className="text-2xl font-bold">{hasConnectedAccounts ? commitsLast6Months : 0}</p>
          <p className="text-sm text-muted-foreground text-center">Commits</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <ListChecks className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{tasksCompleted}</p>
          <p className="text-sm text-muted-foreground text-center">Tasks Completed (Manual Logs)</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <AlertTriangle className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{hasConnectedAccounts ? activePRs : 0}</p>
          <p className="text-sm text-muted-foreground text-center">Active PRs</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <Clock className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{hasConnectedAccounts ? jiraToDo : 0}</p>
          <p className="text-sm text-muted-foreground text-center">Jira: To Do</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <BarChart3 className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{hasConnectedAccounts ? jiraInProgress : 0}</p>
          <p className="text-sm text-muted-foreground text-center">Jira: In Progress</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <CheckSquare className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{hasConnectedAccounts ? jiraDoneLast6Months : 0}</p>
          <p className="text-sm text-muted-foreground text-center">Jira: Done</p>
        </div>
      </CardContent>
    </Card>
  );
}

    