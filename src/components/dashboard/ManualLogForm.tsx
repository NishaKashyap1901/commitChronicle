
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
import { CalendarIcon, BookPlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const manualLogFormSchema = z.object({
  entry: z.string().min(10, {
    message: "Log entry must be at least 10 characters.",
  }).max(1000, {
    message: "Log entry must not exceed 1000 characters."
  }),
  date: z.date({
    required_error: "A date for the log is required.",
  }),
  type: z.enum(["task", "blocker", "achievement"], {
    required_error: "You need to select a log type.",
  }),
  relatedTicket: z.string().optional(),
});

type ManualLogFormValues = z.infer<typeof manualLogFormSchema>;

const defaultValues: Partial<ManualLogFormValues> = {
  type: "task",
  entry: "", 
  relatedTicket: "",
};

// Placeholder for a backend submission function
// In a real app, this would be a Server Action or an API call.
async function saveLogToCloud(data: ManualLogFormValues): Promise<{ success: boolean; message: string }> {
  console.log("Attempting to save log to cloud:", data);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate a successful response
  // In a real scenario, you would make an HTTP request to your backend (e.g., a Cloud Function or Next.js API route)
  // which would then save the data to Firestore or another database on Google Cloud.
  // For example:
  // const response = await fetch('/api/log-entry', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // if (!response.ok) {
  //   return { success: false, message: "Failed to save log." };
  // }
  // return { success: true, message: "Log saved successfully!" };
  
  // For now, always return success for demo purposes
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

  async function onSubmit(data: ManualLogFormValues) {
    setIsSubmitting(true);
    try {
      // Here you would call your actual backend function
      // const result = await saveLogToYourBackend(data, userId); // userId would come from auth
      const result = await saveLogToCloud(data);

      if (result.success) {
        toast({
          title: "Log Submitted!",
          description: result.message,
        });
        form.reset(defaultValues); 
        form.setValue("date", new Date(), { // Reset date for next entry
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
        <CardDescription>Log tasks, blockers, or achievements not automatically tracked.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="entry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Log Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your task, blocker, or achievement..."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a clear and concise description.
                  </FormDescription>
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
                            date > new Date() || date < new Date("1900-01-01")
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Log Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select log type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="task">Task Completed</SelectItem>
                        <SelectItem value="blocker">Blocker Encountered</SelectItem>
                        <SelectItem value="achievement">Achievement / Milestone</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
              control={form.control}
              name="relatedTicket"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Related Ticket/Issue (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., JIRA-123, GH-45" {...field} />
                  </FormControl>
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
