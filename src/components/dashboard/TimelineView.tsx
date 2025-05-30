"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { GitCommit, GitPullRequest, CheckCircle, FileText } from "lucide-react";

// Mock data - replace with actual data fetching and processing
const mockTimelineEvents = [
  { id: 1, type: "commit", title: "feat: Implement user authentication", details: "Added JWT-based auth for users.", date: "2024-07-28", author: "Alice", icon: GitCommit, color: "text-blue-500", badge: "Feature" },
  { id: 2, type: "pr", title: "fix: Resolve issue #123", details: "Fixed critical bug in payment processing.", date: "2024-07-27", author: "Bob", icon: GitPullRequest, color: "text-purple-500", badge: "Bugfix" },
  { id: 3, type: "jira", title: "Task CC-45: Design new dashboard UI", details: "Status changed from In Progress to In Review.", date: "2024-07-26", author: "Carol", icon: CheckCircle, color: "text-green-500", badge: "Jira Update" },
  { id: 4, type: "log", title: "Manual Log: Researched alternative CI/CD pipelines", details: "Spent 2 hours exploring GitHub Actions vs Jenkins.", date: "2024-07-25", author: "Dave", icon: FileText, color: "text-orange-500", badge: "Manual Log" },
  { id: 5, type: "commit", title: "docs: Update README with setup instructions", details: "Clarified environment variable setup.", date: "2024-07-24", author: "Alice", icon: GitCommit, color: "text-blue-500", badge: "Docs" },
];

export default function TimelineView() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Activity Timeline</CardTitle>
        <CardDescription>Recent commits, pull requests, Jira updates, and manual logs.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="relative space-y-6 pl-6 before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-border">
            {mockTimelineEvents.map((event) => {
              const Icon = event.icon;
              return (
                <div key={event.id} className="relative flex items-start">
                  <div className="absolute -left-[calc(0.75rem-1px)] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background border-2 border-primary">
                    <Icon className={`h-3.5 w-3.5 ${event.color || 'text-primary'}`} />
                  </div>
                  <div className="ml-6 flex-1 rounded-md border p-4 shadow-sm bg-card hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">{event.title}</h4>
                      <Badge variant="outline">{event.badge}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{event.details}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>By {event.author}</span>
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
