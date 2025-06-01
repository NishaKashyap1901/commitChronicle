
import ExportControls from "@/components/dashboard/ExportControls";
import { Download } from "lucide-react";

export default function ExportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Download className="h-7 w-7 text-primary" />
        <h1 className="text-3xl font-semibold">Export Your Journal</h1>
      </div>
      <p className="text-muted-foreground">
        Download your activity logs and summaries in various formats.
      </p>
      <ExportControls />
    </div>
  );
}
