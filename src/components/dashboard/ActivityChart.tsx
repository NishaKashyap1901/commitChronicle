
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

// Initialize with empty data, to be populated by actual data fetching
const chartData: { date: string; commits: number; tasks: number }[] = [];

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
        <CardDescription>Overview of commits and tasks completed. Awaiting real data.</CardDescription>
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
