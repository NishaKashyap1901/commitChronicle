import ManualLogForm from "@/components/dashboard/ManualLogForm";

export default function ManualLogPage() {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-semibold">Manual Log Entry</h1>
      <p className="text-muted-foreground">
        Manually add tasks, blockers, achievements, or any other notable events to your timeline.
      </p>
      <ManualLogForm />
    </div>
  );
}
