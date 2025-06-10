
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { BarChart3Icon } from "lucide-react";
import { addDays, format } from "date-fns";

// Sample data, notionally for nisha.kashyap@innogent.in
const today = new Date();
const chartData = [
  { date: format(addDays(today, -6), "yyyy-MM-dd"), commits: 3, tasks: 1 },
  { date: format(addDays(today, -5), "yyyy-MM-dd"), commits: 5, tasks: 2 },
  { date: format(addDays(today, -4), "yyyy-MM-dd"), commits: 2, tasks: 0 },
  { date: format(addDays(today, -3), "yyyy-MM-dd"), commits: 4, tasks: 3 },
  { date: format(addDays(today, -2), "yyyy-MM-dd"), commits: 1, tasks: 1 },
  { date: format(addDays(today, -1), "yyyy-MM-dd"), commits: 6, tasks: 2 },
  { date: format(today, "yyyy-MM-dd"), commits: 3, tasks: 1 },
];

const chartConfig = {
  commits: {
    label: "Commits",
    color: "hsl(var(--primary))",
  },
  tasks: {
    label: "Tasks Completed",
    color: "hsl(var(--accent))", // Using accent for better visual distinction from primary
  },
} satisfies ChartConfig;

export default function ActivityChart() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <BarChart3Icon className="mr-2 h-5 w-5 text-primary" />
          Activity Overview (Last 7 Days)
        </CardTitle>
        <CardDescription>Overview of commits and tasks completed for the selected period. Connect accounts in settings for real data.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                allowDecimals={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="commits" fill="var(--color-commits)" radius={4} />
            <Bar dataKey="tasks" fill="var(--color-tasks)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

    