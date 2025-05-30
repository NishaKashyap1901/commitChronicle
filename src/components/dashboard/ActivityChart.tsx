
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

// Mock data - replace with actual data fetching and processing based on filters
const chartData = [
  { date: "2024-07-22", commits: 5, tasks: 3 },
  { date: "2024-07-23", commits: 8, tasks: 5 },
  { date: "2024-07-24", commits: 3, tasks: 2 },
  { date: "2024-07-25", commits: 10, tasks: 7 },
  { date: "2024-07-26", commits: 7, tasks: 4 },
  { date: "2024-07-27", commits: 4, tasks: 6 },
  { date: "2024-07-28", commits: 6, tasks: 3 },
];

const chartConfig = {
  commits: {
    label: "Commits",
    color: "hsl(var(--primary))",
  },
  tasks: {
    label: "Tasks Completed",
    color: "hsl(var(--secondary))", // Using secondary for contrast
  },
} satisfies ChartConfig;

export default function ActivityChart() {
  // In a real app, chartData would be fetched or filtered based on DateFilterBar state
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <BarChart3Icon className="mr-2 h-5 w-5 text-primary" />
          Activity Overview
        </CardTitle>
        <CardDescription>Overview of commits and tasks completed. (Data is currently static)</CardDescription>
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
