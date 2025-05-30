
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, GitCommit, ListChecks } from "lucide-react";

export default function KeyMetricsCard() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-primary" />
          Key Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <GitCommit className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">125</p>
          <p className="text-sm text-muted-foreground">Commits This Week</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <ListChecks className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">32</p>
          <p className="text-sm text-muted-foreground">Tasks Completed</p>
        </div>
        <div className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
          <BarChart3 className="h-8 w-8 mb-2 text-primary" />
          <p className="text-2xl font-bold">8</p>
          <p className="text-sm text-muted-foreground">Active PRs</p>
        </div>
      </CardContent>
    </Card>
  );
}
