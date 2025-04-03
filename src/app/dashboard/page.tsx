"use client";

import { useState } from "react";
import { Search, Bell, Settings, ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import PipelineCard from "@/components/dashboard/PipelineCard";
import TimelineView from "@/components/dashboard/TimelineView";
import NotificationCenter from "@/components/dashboard/NotificationCenter";

export default function DashboardPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Mock data for service health
  const serviceHealth = [
    { name: "GitHub Actions", status: "healthy", count: 12 },
    { name: "Vercel", status: "healthy", count: 8 },
    { name: "AWS", status: "warning", count: 5 },
    { name: "Azure", status: "critical", count: 3 },
  ];

  // Data for pipelines with real links
  const pipelines = [
    {
      id: "1",
      name: "Frontend Web App",
      service: "GitHub Actions",
      status: "success",
      commit: "feat: add new dashboard components",
      author: "Jane Doe",
      timestamp: "10 minutes ago",
      branch: "main",
      url: "https://github.com/features/actions",
    },
    {
      id: "2",
      name: "API Service",
      service: "Vercel",
      status: "in-progress",
      commit: "fix: resolve authentication issue",
      author: "John Smith",
      timestamp: "25 minutes ago",
      branch: "develop",
      url: "https://vercel.com/dashboard",
    },
    {
      id: "3",
      name: "Database Migration",
      service: "AWS",
      status: "failed",
      commit: "chore: update database schema",
      author: "Alex Johnson",
      timestamp: "1 hour ago",
      branch: "feature/db-update",
      url: "https://aws.amazon.com/console",
    },
    {
      id: "4",
      name: "Authentication Service",
      service: "Azure",
      status: "success",
      commit: "refactor: improve token handling",
      author: "Sam Wilson",
      timestamp: "2 hours ago",
      branch: "main",
      url: "https://portal.azure.com",
    },
    {
      id: "5",
      name: "Payment Gateway",
      service: "GitHub Actions",
      status: "warning",
      commit: "feat: add new payment provider",
      author: "Taylor Swift",
      timestamp: "3 hours ago",
      branch: "feature/payments",
      url: "https://github.com/features/actions",
    },
    {
      id: "6",
      name: "Analytics Dashboard",
      service: "Vercel",
      status: "success",
      commit: "feat: add new charts",
      author: "Chris Martin",
      timestamp: "4 hours ago",
      branch: "main",
      url: "https://vercel.com/dashboard",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">CI/CD Dashboard</h1>
            <div className="hidden md:flex items-center space-x-2">
              {serviceHealth.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center space-x-1 rounded-full px-3 py-1 text-xs"
                  style={{
                    backgroundColor:
                      service.status === "healthy"
                        ? "rgba(0, 200, 0, 0.1)"
                        : service.status === "warning"
                          ? "rgba(255, 200, 0, 0.1)"
                          : "rgba(255, 0, 0, 0.1)",
                    color:
                      service.status === "healthy"
                        ? "rgb(0, 150, 0)"
                        : service.status === "warning"
                          ? "rgb(200, 150, 0)"
                          : "rgb(200, 0, 0)",
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor:
                        service.status === "healthy"
                          ? "rgb(0, 200, 0)"
                          : service.status === "warning"
                            ? "rgb(255, 200, 0)"
                            : "rgb(255, 0, 0)",
                    }}
                  />
                  <span>{service.name}</span>
                  <span className="font-bold">{service.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search deployments..."
                className="pl-8"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center space-x-2">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex items-center">
                <span className="text-sm font-medium">Admin User</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">Deployment Pipelines</h2>
            <Tabs defaultValue="all" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="github">
                  <a
                    href="https://github.com/features/actions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    GitHub
                  </a>
                </TabsTrigger>
                <TabsTrigger value="vercel">
                  <a
                    href="https://vercel.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Vercel
                  </a>
                </TabsTrigger>
                <TabsTrigger value="aws">
                  <a
                    href="https://aws.amazon.com/console"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    AWS
                  </a>
                </TabsTrigger>
                <TabsTrigger value="azure">
                  <a
                    href="https://portal.azure.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Azure
                  </a>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              onClick={() => setShowTimeline(!showTimeline)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Timeline View
            </Button>
            <Button size="sm">+ New Deployment</Button>
          </div>
        </div>

        {/* Timeline View (Expandable) */}
        {showTimeline && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <TimelineView />
            </CardContent>
          </Card>
        )}

        {/* Pipeline Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pipelines.map((pipeline) => (
            <PipelineCard
              key={pipeline.id}
              id={pipeline.id}
              serviceName={pipeline.name}
              status={
                pipeline.status === "warning" ? "in-progress" : pipeline.status
              }
              latestCommit={{
                message: pipeline.commit,
                hash: "a1b2c3d", // Placeholder
                author: pipeline.author,
              }}
              deploymentTime={pipeline.timestamp}
              pipeline={pipeline}
            />
          ))}
        </div>
      </main>

      {/* Notification Center (Slide-out) */}
      {showNotifications && (
        <div className="fixed inset-y-0 right-0 z-20 w-80 border-l bg-background shadow-lg transition-transform">
          <NotificationCenter onClose={() => setShowNotifications(false)} />
        </div>
      )}
    </div>
  );
}
