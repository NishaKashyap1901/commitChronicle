
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitCommit, GitPullRequest, CheckCircle, FileText, ChevronLeft, ChevronRight } from "lucide-react";

interface TimelineEvent {
  id: number;
  type: "commit" | "pr" | "jira" | "log";
  title: string;
  details: string;
  date: string;
  author: string;
  icon: React.ElementType;
  badgeText: string; // Renamed from badge to badgeText to avoid conflict with Badge component
}

// Mock data - replace with actual data fetching and processing
const mockTimelineEvents: TimelineEvent[] = [
  { id: 1, type: "commit", title: "feat: Implement user authentication", details: "Added JWT-based auth for users.", date: "2024-07-28", author: "Alice", icon: GitCommit, badgeText: "Feature" },
  { id: 2, type: "pr", title: "fix: Resolve issue #123", details: "Fixed critical bug in payment processing.", date: "2024-07-27", author: "Bob", icon: GitPullRequest, badgeText: "Bugfix" },
  { id: 3, type: "jira", title: "Task CC-45: Design new dashboard UI", details: "Status changed from In Progress to In Review.", date: "2024-07-26", author: "Carol", icon: CheckCircle, badgeText: "Jira Update" },
  { id: 4, type: "log", title: "Manual Log: Researched CI/CD", details: "Explored GitHub Actions vs Jenkins.", date: "2024-07-25", author: "Dave", icon: FileText, badgeText: "Manual Log" },
  { id: 5, type: "commit", title: "docs: Update README", details: "Clarified env setup.", date: "2024-07-24", author: "Alice", icon: GitCommit, badgeText: "Docs" },
  { id: 6, type: "jira", title: "Task CC-48: API endpoint for users", details: "Status changed to In Progress.", date: "2024-07-23", author: "Eve", icon: CheckCircle, badgeText: "Jira Update" },
  { id: 7, type: "pr", title: "refactor: Optimize database queries", details: "Improved performance of user lookup.", date: "2024-07-22", author: "Frank", icon: GitPullRequest, badgeText: "Refactor" },
  { id: 8, type: "commit", title: "feat: Add dark mode toggle", details: "Implemented theme switching.", date: "2024-07-21", author: "Grace", icon: GitCommit, badgeText: "Feature" },
  { id: 9, type: "log", title: "Manual Log: Team meeting notes", details: "Discussed Q3 roadmap.", date: "2024-07-20", author: "Hank", icon: FileText, badgeText: "Meeting" },
  { id: 10, type: "commit", title: "fix: Correct typo in login page", details: "Small textual fix.", date: "2024-07-19", author: "Alice", icon: GitCommit, badgeText: "Fix" },
];

const ITEMS_PER_PAGE = 5;

const getIconElement = (IconComponent: React.ElementType, type: TimelineEvent["type"]): JSX.Element => {
  let iconClassName = "h-5 w-5";
  switch (type) {
    case "commit":
      iconClassName += " text-primary";
      break;
    case "pr":
      iconClassName += " text-foreground"; 
      break;
    case "jira":
      iconClassName += " text-accent-foreground"; 
      break;
    case "log":
      iconClassName += " text-muted-foreground";
      break;
    default:
      iconClassName += " text-primary";
  }
  return <IconComponent className={iconClassName} />;
};

export default function TimelineView() {
  const [currentPage, setCurrentPage] = React.useState(1);

  const totalPages = Math.ceil(mockTimelineEvents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEvents = mockTimelineEvents.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Activity Timeline</CardTitle>
        <CardDescription>Recent commits, pull requests, Jira updates, and manual logs. (Connect filters for dynamic data)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="min-h-[320px]"> {/* Set a min-height to prevent layout shift during pagination */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Type</TableHead>
                <TableHead>Title & Details</TableHead>
                <TableHead className="w-[120px]">Author</TableHead>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead className="w-[120px] text-right">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{getIconElement(event.icon, event.type)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-muted-foreground">{event.details}</div>
                  </TableCell>
                  <TableCell>{event.author}</TableCell>
                  <TableCell>{event.date}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">{event.badgeText}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

