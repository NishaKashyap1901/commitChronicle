
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GitCommit, GitPullRequest, CheckCircle, FileText, ChevronLeft, ChevronRight, Info } from "lucide-react"; // Added Info icon

interface TimelineEvent {
  id: number;
  type: "commit" | "pr" | "jira" | "log";
  title: string;
  details: string;
  date: string;
  author: string;
  icon: React.ElementType;
  badgeText: string;
}

// Initialize with empty data
const timelineEvents: TimelineEvent[] = [];

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

  // In a real application, timelineEvents would be fetched from a data source
  // and potentially filtered by the DateFilterBar component.

  const totalPages = Math.max(1, Math.ceil(timelineEvents.length / ITEMS_PER_PAGE)); // Ensure totalPages is at least 1
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEvents = timelineEvents.slice(startIndex, endIndex);

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
        <CardDescription>Displays your recent activity. Connect your accounts or add manual logs to see data.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="min-h-[320px]">
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
              {currentEvents.length > 0 ? (
                currentEvents.map((event) => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Info className="h-10 w-10" />
                      <p className="text-lg">No activity to display.</p>
                      <p className="text-sm">Try adjusting filters or connect your accounts.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {timelineEvents.length > 0 && (
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
              disabled={currentPage === totalPages || timelineEvents.length === 0}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
