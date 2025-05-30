import SummaryGenerator from "@/components/dashboard/SummaryGenerator";

export default function SummariesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">AI Weekly Summary Generator</h1>
       <p className="text-muted-foreground">
        Generate concise weekly reports by providing summaries of your commits, task updates, and manual logs.
      </p>
      <SummaryGenerator />
    </div>
  );
}
