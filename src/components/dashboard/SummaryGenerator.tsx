"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wand2, Sparkles, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateWeeklySummary, GenerateWeeklySummaryInput, GenerateWeeklySummaryOutput } from "@/ai/flows/generate-weekly-summary";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const summaryGeneratorSchema = z.object({
  commits: z.string().min(1, "Commits summary cannot be empty."),
  jiraUpdates: z.string().min(1, "Jira updates summary cannot be empty."),
  manualLogs: z.string().optional(),
});

type SummaryGeneratorFormValues = z.infer<typeof summaryGeneratorSchema>;

export default function SummaryGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);

  const form = useForm<SummaryGeneratorFormValues>({
    resolver: zodResolver(summaryGeneratorSchema),
    defaultValues: {
      commits: "",
      jiraUpdates: "",
      manualLogs: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: SummaryGeneratorFormValues) {
    setIsLoading(true);
    setGeneratedSummary(null);
    try {
      const input: GenerateWeeklySummaryInput = {
        commits: data.commits,
        jiraUpdates: data.jiraUpdates,
        manualLogs: data.manualLogs || "", 
      };
      const result: GenerateWeeklySummaryOutput = await generateWeeklySummary(input);
      setGeneratedSummary(result.summary);
      toast({
        title: "Summary Generated!",
        description: "AI has crafted your weekly summary.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Error Generating Summary",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Sparkles className="mr-2 h-6 w-6 text-primary" />
          AI Weekly Summary Generator
        </CardTitle>
        <CardDescription>
          Provide summaries of your weekly activities, and let AI generate a concise report.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="commits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commits Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste or summarize your key commits for the week..."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Highlight significant changes and features.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jiraUpdates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jira/Task Updates Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Summarize your progress on Jira tickets or other tasks..."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Mention key task completions, status changes, or blockers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manualLogs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manual Log Highlights (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Include any important manual entries, achievements, or challenges..."
                      className="resize-y min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generate Summary
            </Button>
          </form>
        </Form>

        {generatedSummary && (
          <Alert className="mt-6 bg-primary/10 border-primary/30">
            <Sparkles className="h-5 w-5 text-primary" />
            <AlertTitle className="font-semibold text-primary">Generated Weekly Summary</AlertTitle>
            <AlertDescription className="mt-2 whitespace-pre-wrap text-foreground">
              {generatedSummary}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
