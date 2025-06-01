
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, GitCommit, ListChecks, CheckSquare, Clock, AlertTriangle } from "lucide-react";

export default function KeyMetricsCard() {
  // Data would be fetched based on user ID and date range (last 6 months)
  const commitsLast6Months = 750; // Placeholder
  const tasksCompletedLast6Months = 180; // Placeholder
  const activePRs = 8; // Placeholder
  const jiraToDo = 15; // Placeholder
  const jiraInProgress = 7; // Placeholder
  const jiraDoneLast6Months = 120; // Placeholder

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
          <p className="text-2xl font-bold">{tasksCompletedLast6Months}</p>
          <p className="text-sm text-muted-foreground text-center">Tasks Completed</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <AlertTriangle className="h-8 w-8 mb-2 text-primary" /> {/* Using AlertTriangle for PRs for variety */}
          <p className="text-2xl font-bold">{activePRs}</p>
          <p className="text-sm text-muted-foreground text-center">Active PRs</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <Clock className="h-8 w-8 mb-2 text-primary" /> {/* Icon for To Do */}
          <p className="text-2xl font-bold">{jiraToDo}</p>
          <p className="text-sm text-muted-foreground text-center">Jira: To Do</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <BarChart3 className="h-8 w-8 mb-2 text-primary" /> {/* Icon for In Progress */}
          <p className="text-2xl font-bold">{jiraInProgress}</p>
          <p className="text-sm text-muted-foreground text-center">Jira: In Progress</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <CheckSquare className="h-8 w-8 mb-2 text-primary" /> {/* Icon for Done */}
          <p className="text-2xl font-bold">{jiraDoneLast6Months}</p>
          <p className="text-sm text-muted-foreground text-center">Jira: Done</p>
        </div>
      </CardContent>
    </Card>
  );
}
