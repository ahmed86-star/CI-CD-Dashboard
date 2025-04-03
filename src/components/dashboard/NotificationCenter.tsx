"use client";

import React, { useState } from "react";
import {
  Bell,
  Settings,
  X,
  Check,
  AlertTriangle,
  Info,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  severity: "critical" | "warning" | "info";
  read: boolean;
}

interface NotificationCenterProps {
  notifications?: NotificationItem[];
  onMarkAsRead?: (id: string) => void;
  onClearAll?: () => void;
  onSaveSettings?: (settings: NotificationSettings) => void;
}

interface NotificationSettings {
  slackChannel: string;
  emailRecipients: string;
  notifyOnFailure: boolean;
  notifyOnSuccess: boolean;
  notifyOnInProgress: boolean;
  emailNotifications: boolean;
  slackNotifications: boolean;
}

export default function NotificationCenter({
  notifications = [
    {
      id: "1",
      title: "Deployment Failed",
      message: "Frontend deployment failed on Vercel",
      timestamp: "2023-05-15T14:30:00Z",
      severity: "critical",
      read: false,
    },
    {
      id: "2",
      title: "Build In Progress",
      message: "Backend build started on GitHub Actions",
      timestamp: "2023-05-15T13:45:00Z",
      severity: "info",
      read: false,
    },
    {
      id: "3",
      title: "Warning",
      message: "High CPU usage detected on production server",
      timestamp: "2023-05-15T12:15:00Z",
      severity: "warning",
      read: true,
    },
    {
      id: "4",
      title: "Deployment Successful",
      message: "API service deployed successfully to AWS",
      timestamp: "2023-05-15T10:30:00Z",
      severity: "info",
      read: true,
    },
    {
      id: "5",
      title: "Database Migration Complete",
      message: "Database schema updated successfully",
      timestamp: "2023-05-14T22:10:00Z",
      severity: "info",
      read: true,
    },
  ],
  onMarkAsRead = () => {},
  onClearAll = () => {},
  onSaveSettings = () => {},
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("notifications");
  const [settings, setSettings] = useState<NotificationSettings>({
    slackChannel: "#deployments",
    emailRecipients: "devops@example.com, team@example.com",
    notifyOnFailure: true,
    notifyOnSuccess: false,
    notifyOnInProgress: true,
    emailNotifications: true,
    slackNotifications: true,
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleSettingsChange = (
    key: keyof NotificationSettings,
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSettings = () => {
    onSaveSettings(settings);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge className="bg-amber-500">Warning</Badge>;
      case "info":
        return <Badge variant="secondary">Info</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  return (
    <div className="bg-background">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent
          className="w-[350px] sm:w-[400px] overflow-y-auto"
          side="right"
        >
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>

          <Tabs
            defaultValue="notifications"
            className="mt-4"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notifications">Alerts</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {unreadCount} unread notifications
                </span>
                <Button variant="ghost" size="sm" onClick={onClearAll}>
                  Clear all
                </Button>
              </div>

              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${notification.read ? "bg-background" : "bg-muted"}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        {getSeverityIcon(notification.severity)}
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {notification.title}
                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {getSeverityBadge(notification.severity)}
                          </div>
                        </div>
                      </div>

                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onMarkAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-4 space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Channels</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="slack-notifications">
                      Slack Notifications
                    </Label>
                    <Switch
                      id="slack-notifications"
                      checked={settings.slackNotifications}
                      onCheckedChange={(checked) =>
                        handleSettingsChange("slackNotifications", checked)
                      }
                    />
                  </div>

                  {settings.slackNotifications && (
                    <div className="space-y-2">
                      <Label htmlFor="slack-channel">Slack Channel</Label>
                      <Input
                        id="slack-channel"
                        value={settings.slackChannel}
                        onChange={(e) =>
                          handleSettingsChange("slackChannel", e.target.value)
                        }
                        placeholder="#channel-name"
                      />
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">
                      Email Notifications
                    </Label>
                    <Switch
                      id="email-notifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) =>
                        handleSettingsChange("emailNotifications", checked)
                      }
                    />
                  </div>

                  {settings.emailNotifications && (
                    <div className="space-y-2">
                      <Label htmlFor="email-recipients">Email Recipients</Label>
                      <Input
                        id="email-recipients"
                        value={settings.emailRecipients}
                        onChange={(e) =>
                          handleSettingsChange(
                            "emailRecipients",
                            e.target.value,
                          )
                        }
                        placeholder="email@example.com, another@example.com"
                      />
                      <p className="text-xs text-muted-foreground">
                        Separate multiple emails with commas
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                <h3 className="text-sm font-medium">Alert Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-failure">Deployment Failures</Label>
                    <Switch
                      id="notify-failure"
                      checked={settings.notifyOnFailure}
                      onCheckedChange={(checked) =>
                        handleSettingsChange("notifyOnFailure", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-success">Deployment Success</Label>
                    <Switch
                      id="notify-success"
                      checked={settings.notifyOnSuccess}
                      onCheckedChange={(checked) =>
                        handleSettingsChange("notifyOnSuccess", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="notify-progress">
                      Deployment In Progress
                    </Label>
                    <Switch
                      id="notify-progress"
                      checked={settings.notifyOnInProgress}
                      onCheckedChange={(checked) =>
                        handleSettingsChange("notifyOnInProgress", checked)
                      }
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button onClick={saveSettings} className="w-full">
                    Save Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
    </div>
  );
}
