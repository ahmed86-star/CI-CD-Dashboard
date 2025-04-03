"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Play,
  RotateCcw,
  Bell,
  ChevronDown,
  ChevronUp,
  Clock,
  GitCommit,
  User,
} from "lucide-react";

interface PipelineCardProps {
  id?: string;
  serviceName?: string;
  status?: "success" | "failed" | "in-progress";
  latestCommit?: {
    message: string;
    hash: string;
    author: string;
  };
  deploymentTime?: string;
  logs?: string[];
  expanded?: boolean;
  pipeline?: {
    id: string;
    name: string;
    service: string;
    status: string;
    commit: string;
    author: string;
    timestamp: string;
    branch: string;
    url?: string;
  };
}

const PipelineCard = ({
  id = "pipeline-1",
  serviceName = "Frontend Web App",
  status = "success",
  latestCommit = {
    message: "Fix responsive layout issues",
    hash: "a1b2c3d",
    author: "Jane Doe",
  },
  deploymentTime = "2 hours ago",
  logs = [
    "Installing dependencies...",
    "Running tests...",
    "Building application...",
    "Deployment successful!",
  ],
  expanded: initialExpanded = false,
  pipeline = undefined,
}: PipelineCardProps) => {
  const [expanded, setExpanded] = useState(initialExpanded);
  const statusColors = {
    success: "bg-green-500",
    failed: "bg-red-500",
    "in-progress": "bg-yellow-500",
  };

  const statusText = {
    success: "Deployed Successfully",
    failed: "Deployment Failed",
    "in-progress": "Deployment in Progress",
  };

  // Define handlers inside the component
  const handleTriggerBuild = () => {
    console.log(`Triggering build for ${id}`);
    // Add your build trigger logic here
  };

  const handleRollback = () => {
    console.log(`Rolling back ${id}`);
    // Add your rollback logic here
  };

  const handleNotify = () => {
    console.log(`Notifying team about ${id}`);
    // Add your notification logic here
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      className={`w-full max-w-[350px] transition-all duration-300 ${expanded ? "h-auto" : "h-[220px]"} bg-card`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">
            {pipeline?.url ? (
              <a
                href={pipeline.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-primary transition-colors"
              >
                {serviceName}
              </a>
            ) : (
              serviceName
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div
              className={`h-3 w-3 rounded-full ${statusColors[status]}`}
            ></div>
            <Badge
              variant={
                status === "success"
                  ? "default"
                  : status === "failed"
                    ? "destructive"
                    : "secondary"
              }
            >
              {statusText[status]}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <GitCommit className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="font-medium truncate" title={latestCommit.message}>
              {latestCommit.message.length > 30
                ? `${latestCommit.message.substring(0, 30)}...`
                : latestCommit.message}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <User className="h-3 w-3 mr-1" />
              <span>{latestCommit.author}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{deploymentTime}</span>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 space-y-3">
            <div className="text-sm font-medium">Deployment Logs:</div>
            <div className="bg-muted p-2 rounded-md text-xs font-mono h-32 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="py-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleTriggerBuild}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Trigger Build</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Rollback</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to roll back this deployment? This will
                  revert to the previous stable version.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRollback}>
                  Confirm Rollback
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={handleNotify}>
                  <Bell className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notify Team</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button size="sm" variant="ghost" onClick={toggleExpand}>
          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PipelineCard;
