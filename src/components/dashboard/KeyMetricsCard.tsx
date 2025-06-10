
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, GitCommit, ListChecks, CheckSquare, Clock, AlertTriangle, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { TimelineEvent } from "./TimelineView"; 
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function KeyMetricsCard() {
  const router = useRouter();
  
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = React.useState<string>("User");


  // Default generic metrics for any logged-in user
  const defaultCommitsLast6Months = 78;
  const defaultActivePRs = 4;
  const defaultJiraToDo = 6;
  const defaultJiraInProgress = 3;
  const defaultJiraDoneLast6Months = 32;

  useEffect(() => {
    setIsLoading(true);
    const loggedInUserEmail = localStorage.getItem('commitChronicleLoggedInUser');
    const name = localStorage.getItem('commitChronicleLoggedInUserName') || "User";
    setLoggedInUserName(name);

    if (loggedInUserEmail) {
      setIsUserLoggedIn(true);
      const timelineKey = `commitChronicleTimelineEvents_${loggedInUserEmail}`;
      const storedEventsString = localStorage.getItem(timelineKey);
      if (storedEventsString) {
        try {
          const allEvents: TimelineEvent[] = JSON.parse(storedEventsString);
          const completedTasksCount = allEvents.filter(event => event.type === "task_completed").length;
          setTasksCompleted(completedTasksCount);
        } catch (e) {
          console.error("Failed to parse timeline events from localStorage for KeyMetricsCard", e);
          setTasksCompleted(0); 
        }
      } else {
        setTasksCompleted(0); // No specific logs for this user yet
      }
    } else {
      setIsUserLoggedIn(false);
      setTasksCompleted(0);
    }
    setIsLoading(false);
  }, []); // Re-run if router changes, e.g., after login/logout

  const goToSettings = () => {
    router.push('/dashboard/settings');
  };
   const goToLogin = () => {
    router.push('/login');
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

  if (!isUserLoggedIn) { 
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
            Please log in to view your key metrics.
          </p>
          <Button onClick={goToLogin} className="mt-4">
            Go to Login
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
          Key Metrics for {loggedInUserName} (Last 6 Months)
        </CardTitle>
         <p className="text-xs text-muted-foreground pt-1">
            Git/Jira data is sample. Manual logs are from your entries. Connect accounts in settings for real data.
        </p>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <GitCommit className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{defaultCommitsLast6Months}</p>
          <p className="text-sm text-muted-foreground text-center">Commits (Sample)</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <ListChecks className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{tasksCompleted}</p>
          <p className="text-sm text-muted-foreground text-center">Tasks Completed (Manual)</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <AlertTriangle className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{defaultActivePRs}</p>
          <p className="text-sm text-muted-foreground text-center">Active PRs (Sample)</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <Clock className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{defaultJiraToDo}</p>
          <p className="text-sm text-muted-foreground text-center">Jira: To Do (Sample)</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <BarChart3 className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{defaultJiraInProgress}</p>
          <p className="text-sm text-muted-foreground text-center">Jira: In Progress (Sample)</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <CheckSquare className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">{defaultJiraDoneLast6Months}</p>
          <p className="text-sm text-muted-foreground text-center">Jira: Done (Sample)</p>
        </div>
      </CardContent>
    </Card>
  );
}
