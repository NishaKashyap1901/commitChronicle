
"use client";

import * as React from "react";
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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, BookPlus, Loader2, LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { TimelineEvent } from "./TimelineView"; // Import TimelineEvent type

const manualLogFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(150, {
    message: "Title must not exceed 150 characters."
  }),
  details: z.string().max(1000, {
    message: "Details must not exceed 1000 characters."
  }).optional(),
  date: z.date({
    required_error: "A date for the log is required.",
  }),
  category: z.enum([
    "task_completed", 
    "blocker_encountered", 
    "milestone_achieved", 
    "git_activity", 
    "jira_activity", 
    "meeting_notes", 
    "documentation_update", 
    "general_log"
  ], {
    required_error: "You need to select a category.",
  }),
  relatedLink: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

type ManualLogFormValues = z.infer<typeof manualLogFormSchema>;

const defaultValues: Partial<ManualLogFormValues> = {
  category: "general_log",
  title: "",
  details: "", 
  relatedLink: "",
};

async function saveLogToCloud(data: ManualLogFormValues): Promise<{ success: boolean; message: string }> {
  console.log("Attempting to save log to cloud (simulated):", data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: "Log entry submitted to cloud (simulated)." };
}

export default function ManualLogForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<ManualLogFormValues>({
    resolver: zodResolver(manualLogFormSchema),
    defaultValues,
    mode: "onChange",
  });

  React.useEffect(() => {
    if (!form.getValues("date")) {
      form.setValue("date", new Date(), {
        shouldDirty: false, 
        shouldValidate: false, 
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const getIconAndBadgeForCategory = (category: ManualLogFormValues['category']): { iconName: string; badgeText: string } => {
    switch (category) {
      case "task_completed": return { iconName: "CheckCircle", badgeText: "Task" };
      case "blocker_encountered": return { iconName: "AlertTriangle", badgeText: "Blocker" };
      case "milestone_achieved": return { iconName: "Award", badgeText: "Milestone" };
      case "git_activity": return { iconName: "GitCommit", badgeText: "Git" };
      case "jira_activity": return { iconName: "Workflow", badgeText: "Jira" };
      case "meeting_notes": return { iconName: "Users", badgeText: "Meeting" };
      case "documentation_update": return { iconName: "FileText", badgeText: "Docs" };
      case "general_log":
      default:
        return { iconName: "BookOpen", badgeText: "Log" };
    }
  };


  async function onSubmit(data: ManualLogFormValues) {
    setIsSubmitting(true);
    try {
      const result = await saveLogToCloud(data);

      if (result.success) {
        toast({
          title: "Log Submitted!",
          description: result.message,
        });

        // Save to localStorage for TimelineView
        const timelineEventsString = localStorage.getItem('commitChronicleTimelineEvents');
        const timelineEvents: TimelineEvent[] = timelineEventsString ? JSON.parse(timelineEventsString) : [];
        
        const { iconName, badgeText } = getIconAndBadgeForCategory(data.category);

        const newEvent: TimelineEvent = {
          id: Date.now(), // Simple unique ID
          type: data.category as TimelineEvent['type'], // Cast for now, ensure categories align
          title: data.title,
          details: data.details || "",
          date: format(data.date, "MMM dd, yyyy"),
          author: "Nisha Kashyap", // Placeholder, replace with actual user later
          iconName: iconName,
          badgeText: badgeText,
          relatedLink: data.relatedLink || undefined,
        };

        timelineEvents.unshift(newEvent); // Add to the beginning of the array
        localStorage.setItem('commitChronicleTimelineEvents', JSON.stringify(timelineEvents));
        
        form.reset(defaultValues); 
        form.setValue("date", new Date(), {
            shouldDirty: false, 
            shouldValidate: false,
        });
      } else {
        toast({
          title: "Submission Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting log:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <BookPlus className="mr-2 h-6 w-6 text-primary" />
          Manual Log Entry
        </CardTitle>
        <CardDescription>Log tasks, updates, achievements, or any notable events.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Fixed login bug, Attended Q3 planning" {...field} />
                  </FormControl>
                  <FormDescription>
                    A concise summary of the log entry.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide more context if needed..."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("2000-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select log category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="task_completed">Task Completed</SelectItem>
                        <SelectItem value="blocker_encountered">Blocker Encountered</SelectItem>
                        <SelectItem value="milestone_achieved">Achievement / Milestone</SelectItem>
                        <SelectItem value="git_activity">Git Commit / PR</SelectItem>
                        <SelectItem value="jira_activity">Jira Issue Update</SelectItem>
                        <SelectItem value="meeting_notes">Meeting Notes</SelectItem>
                        <SelectItem value="documentation_update">Documentation Update</SelectItem>
                        <SelectItem value="general_log">General Log</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
              control={form.control}
              name="relatedLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Related Link (Optional)</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="h-5 w-5 text-muted-foreground" />
                      <Input placeholder="e.g., https://jira.example.com/browse/TASK-123" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    URL to a relevant Jira ticket, PR, commit, document, etc.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <BookPlus className="mr-2 h-4 w-4" />
              )}
              Add Log Entry
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
