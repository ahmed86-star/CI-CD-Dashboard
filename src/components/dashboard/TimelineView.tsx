"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FilterIcon, SearchIcon } from "lucide-react";
import { format } from "date-fns";

interface TimelineEvent {
  id: string;
  timestamp: Date;
  service: string;
  status: "success" | "failure" | "in-progress";
  commitMessage: string;
  deployer: string;
  environment: string;
}

const TimelineView = ({
  events = mockEvents,
}: {
  events?: TimelineEvent[];
}) => {
  const [selectedService, setSelectedService] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  // Initialize dates after component mounts to prevent hydration mismatch
  useEffect(() => {
    setDateRange({
      from: new Date(new Date().setDate(new Date().getDate() - 7)),
      to: new Date(),
    });
    setMounted(true);
  }, []);

  // Filter events based on selected filters
  const filteredEvents = events.filter((event) => {
    // Filter by service
    if (selectedService !== "all" && event.service !== selectedService)
      return false;

    // Filter by status
    if (selectedStatus !== "all" && event.status !== selectedStatus)
      return false;

    // Filter by date range
    if (dateRange.from && event.timestamp < dateRange.from) return false;
    if (dateRange.to && event.timestamp > dateRange.to) return false;

    // Filter by search query
    if (
      searchQuery &&
      !(
        event.commitMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.deployer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.service.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
      return false;

    return true;
  });

  return (
    <Card className="w-full bg-background border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <CardTitle>Deployment Timeline</CardTitle>
          <div className="flex flex-wrap gap-2">
            <div className="relative w-full md:w-auto">
              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search deployments..."
                className="pl-8 w-full md:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="github">GitHub Actions</SelectItem>
                <SelectItem value="vercel">Vercel</SelectItem>
                <SelectItem value="aws">AWS</SelectItem>
                <SelectItem value="azure">Azure</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failure">Failure</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full md:w-auto justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {mounted && dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange as any}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="visual">Visual Timeline</TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="space-y-4">
            {filteredEvents.length > 0 ? (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <TimelineEventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No deployment events match your filters
              </div>
            )}
          </TabsContent>
          <TabsContent value="visual">
            <div className="relative py-6 px-4 overflow-x-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
              <div className="space-y-8 relative min-w-[600px]">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event, index) => (
                    <VisualTimelineEvent
                      key={event.id}
                      event={event}
                      index={index}
                    />
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No deployment events match your filters
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const TimelineEventCard = ({ event }: { event: TimelineEvent }) => {
  const statusColors = {
    success: "bg-green-500",
    failure: "bg-red-500",
    "in-progress": "bg-yellow-500",
  };

  const statusBadgeVariants = {
    success:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    failure: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    "in-progress":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  };

  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg bg-card">
      <div
        className={`w-3 h-3 mt-1.5 rounded-full ${statusColors[event.status]}`}
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
          <div className="font-medium">{event.service} Deployment</div>
          <div className="text-sm text-muted-foreground">
            {format(event.timestamp, "MMM d, yyyy 'at' h:mm a")}
          </div>
        </div>
        <div className="text-sm mb-2 truncate">{event.commitMessage}</div>
        <div className="flex flex-wrap gap-2 items-center">
          <Badge variant="outline">{event.environment}</Badge>
          <Badge className={statusBadgeVariants[event.status]}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
          <span className="text-xs text-muted-foreground">
            by {event.deployer}
          </span>
        </div>
      </div>
    </div>
  );
};

const VisualTimelineEvent = ({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) => {
  const isEven = index % 2 === 0;
  const statusColors = {
    success: "bg-green-500",
    failure: "bg-red-500",
    "in-progress": "bg-yellow-500",
  };

  const statusBadgeVariants = {
    success:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    failure: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
    "in-progress":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  };

  return (
    <div
      className={`flex items-center ${isEven ? "flex-row" : "flex-row-reverse"}`}
    >
      <div
        className={`w-[45%] ${isEven ? "text-right pr-8" : "text-left pl-8"}`}
      >
        <div className="p-4 border rounded-lg bg-card inline-block max-w-full">
          <div className="font-medium mb-1">{event.service} Deployment</div>
          <div className="text-sm mb-2">{event.commitMessage}</div>
          <div className="flex flex-wrap gap-2 items-center justify-end">
            <Badge variant="outline">{event.environment}</Badge>
            <Badge className={statusBadgeVariants[event.status]}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            by {event.deployer} •{" "}
            {format(event.timestamp, "MMM d, yyyy 'at' h:mm a")}
          </div>
        </div>
      </div>
      <div className="relative flex items-center justify-center z-10">
        <div
          className={`w-4 h-4 rounded-full ${statusColors[event.status]} border-4 border-background`}
        />
      </div>
      <div className="w-[45%]" />
    </div>
  );
};

// Mock data for demonstration
const mockEvents: TimelineEvent[] = [
  {
    id: "1",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
    service: "github",
    status: "success",
    commitMessage: "Fix authentication bug in login flow",
    deployer: "Sarah Chen",
    environment: "production",
  },
  {
    id: "2",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 5)),
    service: "vercel",
    status: "in-progress",
    commitMessage: "Update dashboard UI components",
    deployer: "Alex Johnson",
    environment: "staging",
  },
  {
    id: "3",
    timestamp: new Date(new Date().setHours(new Date().getHours() - 8)),
    service: "aws",
    status: "failure",
    commitMessage: "Implement new API endpoints for user management",
    deployer: "Miguel Rodriguez",
    environment: "development",
  },
  {
    id: "4",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
    service: "azure",
    status: "success",
    commitMessage: "Optimize database queries for better performance",
    deployer: "Priya Patel",
    environment: "production",
  },
  {
    id: "5",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
    service: "github",
    status: "success",
    commitMessage: "Add unit tests for core functionality",
    deployer: "Thomas Wilson",
    environment: "development",
  },
  {
    id: "6",
    timestamp: new Date(new Date().setDate(new Date().getDate() - 3)),
    service: "vercel",
    status: "failure",
    commitMessage: "Refactor code to improve maintainability",
    deployer: "Emma Davis",
    environment: "staging",
  },
];

export default TimelineView;
