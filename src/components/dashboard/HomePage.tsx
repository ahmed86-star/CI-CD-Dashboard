"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Code2,
  GitBranch,
  Globe,
  LineChart,
  Rocket,
  Server,
  Settings,
  Shield,
  Users,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    positive: boolean;
  };
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
}: StatCardProps) => (
  <Card className="bg-white dark:bg-gray-950 border-0 shadow-md hover:shadow-lg transition-all duration-200">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </CardTitle>
      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        {description}
      </p>
      {trend && (
        <div
          className={`flex items-center mt-2 text-xs ${trend.positive ? "text-green-500" : "text-red-500"}`}
        >
          {trend.positive ? "↑" : "↓"} {trend.value}
        </div>
      )}
    </CardContent>
  </Card>
);

interface DeploymentCardProps {
  name: string;
  environment: string;
  status: "success" | "failed" | "in-progress";
  time: string;
  author: {
    name: string;
    avatar: string;
  };
}

const DeploymentCard = ({
  name,
  environment,
  status,
  time,
  author,
}: DeploymentCardProps) => {
  const statusColors = {
    success:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    "in-progress":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  };

  const statusIcons = {
    success: <CheckCircle className="h-4 w-4" />,
    failed: <Shield className="h-4 w-4" />,
    "in-progress": <Clock className="h-4 w-4" />,
  };

  return (
    <Card className="bg-white dark:bg-gray-950 border-0 shadow-sm hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs font-normal">
                {environment}
              </Badge>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3" /> {time}
              </span>
            </div>
          </div>
          <Badge className={`${statusColors[status]} flex items-center gap-1`}>
            {statusIcons[status]}
            {status === "in-progress"
              ? "In Progress"
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-600 dark:text-gray-300">
            {author.name}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: "Total Deployments",
      value: "1,284",
      description: "Last 30 days",
      icon: <Rocket className="h-4 w-4" />,
      trend: { value: "12%", positive: true },
    },
    {
      title: "Success Rate",
      value: "94.2%",
      description: "Last 30 days",
      icon: <CheckCircle className="h-4 w-4" />,
      trend: { value: "3.1%", positive: true },
    },
    {
      title: "Avg. Deploy Time",
      value: "4m 32s",
      description: "Last 30 days",
      icon: <Clock className="h-4 w-4" />,
      trend: { value: "1m 12s", positive: true },
    },
    {
      title: "Active Services",
      value: "16",
      description: "Across all platforms",
      icon: <Server className="h-4 w-4" />,
    },
  ];

  const recentDeployments = [
    {
      name: "Frontend v2.4.0",
      environment: "production",
      status: "success" as const,
      time: "2h ago",
      author: {
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
    },
    {
      name: "API Gateway",
      environment: "staging",
      status: "in-progress" as const,
      time: "15m ago",
      author: {
        name: "Alex Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      },
    },
    {
      name: "Auth Service",
      environment: "production",
      status: "failed" as const,
      time: "1d ago",
      author: {
        name: "Miguel Diaz",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=miguel",
      },
    },
    {
      name: "Database Migration",
      environment: "development",
      status: "success" as const,
      time: "3h ago",
      author: {
        name: "Priya Sharma",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      },
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Deployment Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Monitor and manage your deployments across all platforms
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-4 w-4" />
              Last 30 Days
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <Rocket className="h-4 w-4" />
                  New Deployment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Deployment</DialogTitle>
                  <DialogDescription>
                    Configure and trigger a new deployment to your selected
                    environment.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Frontend v2.5.0"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="service" className="text-right">
                      Service
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="api">API Gateway</SelectItem>
                        <SelectItem value="auth">Auth Service</SelectItem>
                        <SelectItem value="database">Database</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="environment" className="text-right">
                      Environment
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="staging">Staging</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="platform" className="text-right">
                      Platform
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="github">GitHub</SelectItem>
                        <SelectItem value="vercel">Vercel</SelectItem>
                        <SelectItem value="aws">AWS</SelectItem>
                        <SelectItem value="azure">Azure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() =>
                      alert(
                        "Deployment initiated! You can track its progress in the Deployment Activity section.",
                      )
                    }
                  >
                    Deploy Now
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-gray-950 border-0 shadow-md overflow-hidden">
              <CardHeader className="pb-0">
                <div className="flex items-center justify-between">
                  <CardTitle>Deployment Activity</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-blue-600 dark:text-blue-400"
                  >
                    View All <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid grid-cols-4 w-full max-w-md">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="github">GitHub</TabsTrigger>
                    <TabsTrigger value="vercel">Vercel</TabsTrigger>
                    <TabsTrigger value="aws">AWS</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {recentDeployments.map((deployment, index) => (
                    <DeploymentCard key={index} {...deployment} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white dark:bg-gray-950 border-0 shadow-md h-full">
              <CardHeader>
                <CardTitle>Service Health</CardTitle>
                <CardDescription>
                  Current status of all services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Frontend</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Vercel
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Healthy
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                        <Code2 className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">API Gateway</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          AWS
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Healthy
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                        <Users className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Auth Service</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Azure
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                      Degraded
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                        <Server className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Database</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          AWS
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Healthy
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                        <GitBranch className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">CI Pipeline</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          GitHub
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                      Healthy
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-4">
                <Button variant="outline" className="w-full gap-1">
                  <Settings className="h-4 w-4" />
                  Manage Services
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-8">
          <Card className="bg-white dark:bg-gray-950 border-0 shadow-md overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Performance Metrics</CardTitle>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full max-w-md"
                >
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="response">Response Time</TabsTrigger>
                    <TabsTrigger value="errors">Error Rate</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-md">
                {activeTab === "overview" && (
                  <div className="flex flex-col items-center">
                    <BarChart3 className="h-16 w-16 text-blue-500 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Performance metrics visualization would appear here
                    </p>
                  </div>
                )}
                {activeTab === "response" && (
                  <div className="flex flex-col items-center">
                    <LineChart className="h-16 w-16 text-green-500 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Response time metrics would appear here
                    </p>
                  </div>
                )}
                {activeTab === "errors" && (
                  <div className="flex flex-col items-center">
                    <Bell className="h-16 w-16 text-red-500 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Error rate metrics would appear here
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
