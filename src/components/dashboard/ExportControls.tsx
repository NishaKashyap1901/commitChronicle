"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, FileText, FileType } from "lucide-react"; // FileType for PDF generic icon
import { useToast } from "@/hooks/use-toast";

export default function ExportControls() {
  const { toast } = useToast();

  const handleExport = (format: "PDF" | "Markdown") => {
    // Placeholder for actual export logic
    console.log(`Exporting as ${format}`);
    toast({
      title: `Exporting as ${format}`,
      description: `Your journal is being prepared for ${format} export. (This is a demo)`,
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Download className="mr-2 h-6 w-6 text-primary" />
          Export Journal
        </CardTitle>
        <CardDescription>Download your activity logs and summaries in various formats.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4">
        <Button 
          variant="outline" 
          className="w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow"
          onClick={() => handleExport("PDF")}
        >
          <FileType className="mr-2 h-5 w-5" /> 
          Export to PDF
        </Button>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto shadow-sm hover:shadow-md transition-shadow"
          onClick={() => handleExport("Markdown")}
        >
          <FileText className="mr-2 h-5 w-5" />
          Export to Markdown
        </Button>
      </CardContent>
    </Card>
  );
}
