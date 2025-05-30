
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
import { CalendarIcon, BookPlus } from "lucide-react";
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
  // date: new Date(), // Problematic for hydration: server and client `new Date()` can differ.
  type: "task",
  entry: "", // Initialize all fields for consistency
  relatedTicket: "",
};

export default function ManualLogForm() {
  const { toast } = useToast();
  const form = useForm<ManualLogFormValues>({
    resolver: zodResolver(manualLogFormSchema),
    defaultValues,
    mode: "onChange",
  });

  React.useEffect(() => {
    // Set the date only on the client, after initial mount, if it's not already set.
    // This avoids hydration mismatch for the default new Date().
    if (!form.getValues("date")) {
      form.setValue("date", new Date(), {
        shouldDirty: false, 
        shouldValidate: false, // Avoid immediate validation if not desired
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  function onSubmit(data: ManualLogFormValues) {
    console.log(data);
    toast({
      title: "Log Submitted",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    // Reset to defaultValues which now includes an undefined date,
    // useEffect will then repopulate it client-side for the next entry.
    form.reset(defaultValues); 
    // Explicitly set date again after reset using useEffect logic
    form.setValue("date", new Date(), {
        shouldDirty: false, 
        shouldValidate: false,
    });
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
            <Button type="submit" className="w-full md:w-auto">Add Log Entry</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
