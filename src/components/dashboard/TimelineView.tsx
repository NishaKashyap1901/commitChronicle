
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GitCommit, GitPullRequest, CheckCircle, FileText, Users, Workflow, Award, BookOpen, AlertTriangle, Info, ChevronLeft, ChevronRight, Link as LinkIcon
} from "lucide-react";
import { format, subDays } from "date-fns";
import Link from 'next/link';
import { useRouter } from "next/navigation";


// Define a mapping from iconName to actual Lucide components
const iconComponents: Record<string, React.ElementType> = {
  GitCommit: GitCommit,
  GitPullRequest: GitPullRequest,
  CheckCircle: CheckCircle,
  FileText: FileText,
  Users: Users,
  Workflow: Workflow,
  Award: Award,
  BookOpen: BookOpen,
  AlertTriangle: AlertTriangle,
  Info: Info,
};


export interface TimelineEvent {
  id: number;
  type: "commit" | "pr" | "jira_activity" | "task_completed" | "blocker_encountered" | "milestone_achieved" | "meeting_notes" | "documentation_update" | "general_log" | "log"; // "log" is for older compatibility
  title: string;
  details: string;
  date: string;
  author: string;
  iconName: string; // Store the name of the icon
  badgeText: string;
  relatedLink?: string;
}

const ITEMS_PER_PAGE = 5;
const today = new Date();

const getDefaultSampleEvents = (): TimelineEvent[] => [
  {
    id: 1,
    type: "git_activity",
    title: "feat: Implement user authentication module",
    details: "Added new endpoints and UI for login/registration.",
    date: format(subDays(today, 1), "MMM dd, yyyy"),
    author: "Nisha Kashyap",
    iconName: "GitCommit",
    badgeText: "Git",
    relatedLink: "https://github.com/example/commit/abc123xyz"
  },
  {
    id: 2,
    type: "git_activity",
    title: "Refactor: Dashboard widget components",
    details: "PR #42 - Improved performance and code structure.",
    date: format(subDays(today, 2), "MMM dd, yyyy"),
    author: "Nisha Kashyap",
    iconName: "GitPullRequest",
    badgeText: "Git PR",
    relatedLink: "https://github.com/example/pull/42"
  },
  {
    id: 3,
    type: "jira_activity",
    title: "BUG-123: Fix login button responsiveness",
    details: "Status changed from In Progress to Done.",
    date: format(subDays(today, 2), "MMM dd, yyyy"),
    author: "Nisha Kashyap",
    iconName: "Workflow",
    badgeText: "Jira Update",
    relatedLink: "https://jira.example.com/browse/BUG-123"
  },
  {
    id: 4,
    type: "meeting_notes",
    title: "Client meeting and feature planning session",
    details: "Discussed Q3 roadmap and new feature requests.",
    date: format(subDays(today, 3), "MMM dd, yyyy"),
    author: "Nisha Kashyap",
    iconName: "Users",
    badgeText: "Meeting"
  },
  {
    id: 5,
    type: "documentation_update",
    title: "docs: Update API documentation for v1.2",
    details: "Added examples for new /summary endpoint.",
    date: format(subDays(today, 4), "MMM dd, yyyy"),
    author: "Nisha Kashyap",
    iconName: "FileText",
    badgeText: "Docs"
  },
   {
    id: 6,
    type: "task_completed",
    title: "Onboard new team member",
    details: "Completed onboarding checklist for Alex.",
    date: format(subDays(today, 5), "MMM dd, yyyy"),
    author: "Nisha Kashyap",
    iconName: "CheckCircle",
    badgeText: "Task Done"
  },
  {
    id: 7,
    type: "general_log",
    title: "Research: Explored new charting libraries",
    details: "Evaluated Recharts, Nivo, and Chart.js for dashboard integration.",
    date: format(subDays(today, 6), "MMM dd, yyyy"),
    author: "Nisha Kashyap",
    iconName: "BookOpen",
    badgeText: "Log"
  },
  {
    id: 8,
    type: "milestone_achieved",
    title: "Project Alpha: Phase 1 Complete",
    details: "All core features for phase 1 deployed successfully to staging.",
    date: format(subDays(today, 7), "MMM dd, yyyy"),
    author: "Nisha Kashyap",
    iconName: "Award",
    badgeText: "Milestone"
  },
  {
    id: 9,
    type: "blocker_encountered",
    title: "API Rate Limiting Issue",
    details: "Third-party API for data sync is hitting rate limits, impacting real-time updates.",
    date: format(subDays(today, 8), "MMM dd, yyyy"),
    author: "Nisha Kashyap",
    iconName: "AlertTriangle",
    badgeText: "Blocker"
  },
  {
    id: 10,
    type: "jira_activity",
    title: "TASK-789: Prepare Q4 Presentation",
    details: "Moved from To Do to In Progress. Started drafting slides.",
    date: format(subDays(today, 9), "MMM dd, yyyy"),
    author: "Nisha Kashyap",
    iconName: "Workflow",
    badgeText: "Jira Update",
    relatedLink: "https://jira.example.com/browse/TASK-789"
  }
];


const getIconElement = (iconName: string, type: TimelineEvent["type"]): JSX.Element => {
  const IconComponent = iconComponents[iconName] || BookOpen; // Default to BookOpen if iconName is not found
  let iconClassName = "h-5 w-5";
  switch (type) {
    case "commit":
    case "git_activity":
      iconClassName += " text-primary";
      break;
    case "pr":
      iconClassName += " text-foreground";
      break;
    case "jira_activity":
      iconClassName += " text-blue-500"; // Specific color for Jira
      break;
    case "task_completed":
      iconClassName += " text-green-500";
      break;
    case "blocker_encountered":
      iconClassName += " text-red-500";
      break;
    case "milestone_achieved":
      iconClassName += " text-yellow-500";
      break;
    case "meeting_notes":
      iconClassName += " text-purple-500";
      break;
    case "documentation_update":
      iconClassName += " text-indigo-500";
      break;
    case "general_log":
    case "log": // For backward compatibility with old "log" type
    default:
      iconClassName += " text-muted-foreground";
  }
  return <IconComponent className={iconClassName} />;
};

const getBadgeVariant = (type: TimelineEvent['type'], badgeText: string): "default" | "secondary" | "destructive" | "outline" => {
  if (type === "blocker_encountered" || (type === "jira_activity" && badgeText.toLowerCase().includes("bug"))) {
    return "destructive";
  }
  if (type === "milestone_achieved" || type === "task_completed") {
    return "default"; // Use primary color for positive events
  }
  return "outline";
};


export default function TimelineView() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [allEvents, setAllEvents] = React.useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const storedEventsString = localStorage.getItem('commitChronicleTimelineEvents');
    let loadedEvents: TimelineEvent[] = [];
    if (storedEventsString) {
      try {
        loadedEvents = JSON.parse(storedEventsString);
      } catch (e) {
        console.error("Failed to parse timeline events from localStorage", e);
        loadedEvents = getDefaultSampleEvents(); // Fallback to default (Nisha's) data
        localStorage.setItem('commitChronicleTimelineEvents', JSON.stringify(loadedEvents));
      }
    } else {
      loadedEvents = getDefaultSampleEvents(); // Load default (Nisha's) data if localStorage is empty
      localStorage.setItem('commitChronicleTimelineEvents', JSON.stringify(loadedEvents));
    }
    // Ensure events are sorted by date (newest first) if IDs are timestamps
    // Or rely on unshift in ManualLogForm to keep newest first
    loadedEvents.sort((a, b) => b.id - a.id); // Assuming higher ID means newer
    setAllEvents(loadedEvents);
    setIsLoading(false);
  }, []);


  const totalPages = Math.max(1, Math.ceil(allEvents.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEvents = allEvents.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleConnectPrompt = () => {
    router.push('/dashboard/settings');
  };


  if (isLoading) {
     return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Activity Timeline</CardTitle>
          <CardDescription>Chronological view of your development activities. Add manual logs or connect accounts in settings.</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-10">
            <Info className="mx-auto h-12 w-12 text-muted-foreground animate-pulse" />
            <h3 className="mt-4 text-lg font-medium">Loading timeline...</h3>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Activity Timeline</CardTitle>
        <CardDescription>Chronological view of your development activities. Add manual logs or connect accounts in settings for full data.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="min-h-[320px]"> {/* Ensure a minimum height for the table area */}
          {allEvents.length === 0 && !isLoading ? (
             <div className="text-center py-10">
                <Info className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No Activity Yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add some manual logs or connect your Git/Jira accounts in settings to populate your timeline.
                </p>
                <Button onClick={handleConnectPrompt} className="mt-4">Go to Settings</Button>
            </div>
          ) : (
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
                      <TableCell>{getIconElement(event.iconName, event.type)}</TableCell>
                      <TableCell>
                        <div className="font-medium flex items-center">
                          {event.title}
                          {event.relatedLink && (
                            <Link href={event.relatedLink} target="_blank" rel="noopener noreferrer" className="ml-2">
                              <LinkIcon className="h-4 w-4 text-primary hover:text-primary/80" />
                            </Link>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{event.details}</div>
                      </TableCell>
                      <TableCell>{event.author}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={getBadgeVariant(event.type, event.badgeText)}>
                          {event.badgeText}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                   !isLoading && ( // Only show "No activity for this page" if not loading and currentEvents is empty but allEvents might not be
                    <TableRow>
                        <TableCell colSpan={5} className="text-center py-10">
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <Info className="h-10 w-10" />
                            <p className="text-lg">No activity to display for this page.</p>
                            { allEvents.length > 0 && <p className="text-sm">Try other pages or adjust filters.</p> }
                        </div>
                        </TableCell>
                    </TableRow>
                   )
                )}
              </TableBody>
            </Table>
          )}
        </div>
        {allEvents.length > ITEMS_PER_PAGE && (
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
              disabled={currentPage === totalPages || allEvents.length === 0}
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

    