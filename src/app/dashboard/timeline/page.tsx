import TimelineView from "@/components/dashboard/TimelineView";

export default function TimelinePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Activity Timeline</h1>
      <p className="text-muted-foreground">
        View all your tracked commits, pull requests, Jira updates, and manual logs in chronological order.
      </p>
      <TimelineView />
    </div>
  );
}
