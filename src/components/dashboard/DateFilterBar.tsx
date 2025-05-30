
"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, FilterIcon } from "lucide-react";
import * as React from "react";

export default function DateFilterBar() {
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const [selectedRange, setSelectedRange] = React.useState<string>("this_week");

  const handleRangeChange = (value: string) => {
    setSelectedRange(value);
    // Reset dates when changing range type, specific logic can be added later
    if (value !== "custom") {
      setStartDate(undefined);
      setEndDate(undefined);
    }
    // Add logic here to set startDate and endDate based on predefined ranges
    // e.g., if (value === "this_week") { /* set dates for this week */ }
  };

  const handleApplyFilter = () => {
    // In a real app, this would trigger data fetching/filtering
    console.log("Applying filters:", { selectedRange, startDate, endDate });
    // You would typically call a function here to update the data displayed
    // in KeyMetricsCard and ActivityChart based on these filters.
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <FilterIcon className="mr-2 h-5 w-5 text-primary" />
          Filter Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
          <Select value={selectedRange} onValueChange={handleRangeChange}>
            <SelectTrigger className="w-full sm:w-auto min-w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="this_year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          {selectedRange === "custom" && (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full sm:w-auto min-w-[180px] justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full sm:w-auto min-w-[180px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>End date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) =>
                      startDate ? date < startDate : false
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </>
          )}
          <Button className="w-full sm:w-auto" onClick={handleApplyFilter}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
