"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Send,
  Users,
  Info,
  AlertTriangle,
  CheckCircle,
  Bell,
  ChevronDown,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Notification } from "@/types";

interface NotificationModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (data: Notification) => Promise<void>;
}

export default function NotificationModal({
  isOpen,
  closeModal,
  onSubmit,
}: NotificationModalProps) {
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] =
    useState<Notification["type"]>("info");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<string | undefined>(
    undefined
  );
  const [targetAudience, setTargetAudience] = useState<string[]>(["all"]);
  const [isPriority, setIsPriority] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState<string | null>(
    null
  );
  const [creator, setCreator] = useState<{ id: string; name: string } | null>(
    null
  );
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !Array.from(document.querySelectorAll(".popover-content")).some((el) =>
          el.contains(event.target as Node)
        )
      ) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      fetchUser();
      fetchNotifications();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        resetForm();
        setNotifications([]);
        setEditingId(null);
        setDeletingId(null);
        setDeleteConfirmOpen(null);
      }, 300);
    }
  }, [isOpen]);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });
      if (response.ok) {
        const { user } = await response.json();
        setCreator({ id: user.id, name: user.name });
      } else {
        setCreator(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setCreator(null);
    }
  };

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/notifications", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const formattedNotifications = data.notifications.map(
          (notif: Notification) => ({
            ...notif,
            createdAt: new Date(notif.createdAt).toISOString(),
            scheduledDate: notif.scheduledDate
              ? new Date(notif.scheduledDate).toISOString()
              : undefined,
          })
        );
        setNotifications(formattedNotifications);
      } else {
        toast.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Error fetching notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!message.trim() || !creator) {
      toast.error("Message and creator are required");
      return;
    }

    setIsLoading(true);
    const data = {
      message,
      type: notificationType,
      scheduled: isScheduled,
      scheduledDate: isScheduled && scheduledDate ? scheduledDate : undefined,
      targetAudience,
      isPriority,
      creator: { id: creator.id, name: creator.name },
    };

    try {
      const url = editingId
        ? `/api/notifications/${editingId}`
        : "/api/notifications";
      const method = editingId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const updatedNotification = await response.json();
        const formattedNotification: Notification = {
          ...updatedNotification,
          createdAt: new Date(updatedNotification.createdAt).toISOString(),
          scheduledDate: updatedNotification.scheduledDate
            ? new Date(updatedNotification.scheduledDate).toISOString()
            : undefined,
          creator: {
            id: updatedNotification.creator?.id || creator.id,
            name: updatedNotification.creator?.name || creator.name,
          },
        };
        setNotifications((prev) =>
          editingId
            ? prev.map((notif) =>
                notif.id === editingId ? formattedNotification : notif
              )
            : [formattedNotification, ...prev]
        );
        await onSubmit(formattedNotification);
        toast.success(
          editingId
            ? "Notification updated successfully"
            : "Notification created successfully"
        );
        resetForm();
        setEditingId(null);
        closeModal();
        document
          .querySelector('[value="manage"]')
          ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      } else {
        const errorData = await response.json();
        toast.error(`Failed to save notification: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error saving notification:", error);
      toast.error(
        error instanceof Error ? error.message : "Error saving notification"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/notifications", {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setNotifications([]);
        toast.success("All notifications deleted successfully");
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete all notifications: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting all notifications:", error);
      toast.error("Error deleting all notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (response.ok) {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
        toast.success("Notification deleted successfully");
      } else {
        const errorData = await response.json();
        toast.error(`Failed to delete notification: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Error deleting notification");
    } finally {
      setDeletingId(null);
      setDeleteConfirmOpen(null);
    }
  };

  const handleEdit = (notification: Notification) => {
    setEditingId(notification.id);
    setMessage(notification.message);
    setNotificationType(notification.type);
    setIsScheduled(notification.scheduled);
    setScheduledDate(notification.scheduledDate);
    setTargetAudience(notification.targetAudience);
    setIsPriority(notification.isPriority);
    setIsPreview(false);
    document
      .querySelector('[value="compose"]')
      ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  };

  const resetForm = () => {
    setMessage("");
    setNotificationType("info");
    setIsScheduled(false);
    setScheduledDate(undefined);
    setTargetAudience(["all"]);
    setIsPriority(false);
    setIsPreview(false);
  };

  const toggleAudience = (audience: string) => {
    if (audience === "all") {
      setTargetAudience(["all"]);
      return;
    }

    const newAudience = targetAudience.includes(audience)
      ? targetAudience.filter((a) => a !== audience)
      : [...targetAudience.filter((a) => a !== "all"), audience];

    setTargetAudience(newAudience.length ? newAudience : ["all"]);
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue0" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return "bg-blue border-blue0 dark:bg-blue0/20 dark:border-blue0";
      case "warning":
        return "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800";
      case "success":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-start justify-center mt-10 backdrop-blur-sm z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-2xl w-full mx-4 overflow-hidden"
          ref={modalRef}
        >
          <div className="flex items-center justify-between border-b border-blue0 dark:border-blue0 p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-blue0 dark:text-blue0">
              <Bell className="h-5 w-5 text-blue0 dark:text-blue0" />
              Notification Manager
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeModal}
              className="rounded-full text-blue0 dark:text-blue0 hover:bg-blue0 dark:hover:bg-blue0/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Tabs defaultValue="compose" className="w-full">
            <div className="px-4 border-b border-blue0 dark:border-blue0">
              <TabsList className="grid grid-cols-3 bg-blue dark:bg-blue0/20">
                <TabsTrigger
                  value="compose"
                  onClick={() => setIsPreview(false)}
                  className="data-[state=active]:bg-white data-[state=active]:text-blue0 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-blue0"
                >
                  Compose
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  onClick={() => setIsPreview(true)}
                  className="data-[state=active]:bg-white data-[state=active]:text-blue0 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-blue0"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="manage"
                  onClick={() => setIsPreview(false)}
                  className="data-[state=active]:bg-white data-[state=active]:text-blue0 dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:text-blue0"
                >
                  Manage
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="compose" className="p-4 space-y-4">
              <div className="space-y-2">
                <Label className="text-blue0 dark:text-blue0">Message</Label>
                <Textarea
                  placeholder="Enter your notification message here..."
                  className="min-h-[120px] resize-none border-blue0 dark:border-blue0 focus:ring-blue0 text-blue0 dark:text-blue0"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-blue0 dark:text-blue0">
                    Notification Type
                  </Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={
                        notificationType === "info" ? "default" : "outline"
                      }
                      className={cn(
                        "flex-1 border-blue0 dark:border-blue0",
                        notificationType === "info"
                          ? "bg-blue0 hover:bg-blue0 text-white"
                          : "text-blue0 dark:text-blue0 hover:bg-blue0 dark:hover:bg-blue0/20"
                      )}
                      onClick={() => setNotificationType("info")}
                    >
                      <Info className="mr-2 h-4 w-4" />
                      Info
                    </Button>
                    <Button
                      type="button"
                      variant={
                        notificationType === "warning" ? "default" : "outline"
                      }
                      className={cn(
                        "flex-1 border-blue0 dark:border-blue0",
                        notificationType === "warning"
                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                          : "text-blue0 dark:text-blue0 hover:bg-blue0 dark:hover:bg-blue0/20"
                      )}
                      onClick={() => setNotificationType("warning")}
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Warning
                    </Button>
                    <Button
                      type="button"
                      variant={
                        notificationType === "success" ? "default" : "outline"
                      }
                      className={cn(
                        "flex-1 border-blue0 dark:border-blue0",
                        notificationType === "success"
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "text-blue0 dark:text-blue0 hover:bg-blue0 dark:hover:bg-blue0/20"
                      )}
                      onClick={() => setNotificationType("success")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Success
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-blue0 dark:text-blue0">
                    Target Audience
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between border-blue0 dark:border-blue0 text-blue0 dark:text-blue0 hover:bg-blue0 dark:hover:bg-blue0/20"
                      >
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>
                            {targetAudience.includes("all")
                              ? "All Users"
                              : `${targetAudience.length} group${
                                  targetAudience.length > 1 ? "s" : ""
                                } selected`}
                          </span>
                        </div>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[200px] p-0 popover-content bg-white dark:bg-gray-900"
                      align="start"
                    >
                      <div className="p-2">
                        <div
                          className="flex items-center justify-between p-2 hover:bg-blue0 dark:hover:bg-blue0/20 rounded-md cursor-pointer"
                          onClick={() => toggleAudience("all")}
                        >
                          <span className="text-blue0 dark:text-blue0">
                            All Users
                          </span>
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border",
                              targetAudience.includes("all")
                                ? "bg-blue0 border-blue0"
                                : "border-blue0 dark:border-blue0"
                            )}
                          >
                            {targetAudience.includes("all") && (
                              <CheckCircle className="h-4 w-4 text-white" />
                            )}
                          </div>
                        </div>
                        {["admins", "users"].map((audience) => (
                          <div
                            key={audience}
                            className="flex items-center justify-between p-2 hover:bg-blue0 dark:hover:bg-blue0/20 rounded-md cursor-pointer"
                            onClick={() => toggleAudience(audience)}
                          >
                            <span className="text-blue0 dark:text-blue0">
                              {audience.charAt(0).toUpperCase() +
                                audience.slice(1)}
                            </span>
                            <div
                              className={cn(
                                "w-4 h-4 rounded-full border",
                                targetAudience.includes(audience)
                                  ? "bg-blue0 border-blue0"
                                  : "border-blue0 dark:border-blue0"
                              )}
                            >
                              {targetAudience.includes(audience) && (
                                <CheckCircle className="h-4 w-4 text-white" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="scheduled"
                      className="text-blue0 dark:text-blue0"
                    >
                      Schedule for later
                    </Label>
                    <Switch
                      id="scheduled"
                      checked={isScheduled}
                      onCheckedChange={setIsScheduled}
                      className="data-[state=checked]:bg-blue0"
                    />
                  </div>
                  {isScheduled && (
                    <input
                      type="datetime-local"
                      value={
                        scheduledDate
                          ? new Date(scheduledDate).toISOString().slice(0, 16)
                          : ""
                      }
                      onChange={(e) =>
                        setScheduledDate(new Date(e.target.value).toISOString())
                      }
                      className="w-full border border-blue0 dark:border-blue0 rounded-md p-2 bg-white dark:bg-gray-800 text-blue0 dark:text-blue0 focus:ring-blue0"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="priority"
                      className="text-blue0 dark:text-blue0"
                    >
                      Mark as priority
                    </Label>
                    <Switch
                      id="priority"
                      checked={isPriority}
                      onCheckedChange={setIsPriority}
                      className="data-[state=checked]:bg-blue0"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="p-4">
              <div className="border border-blue0 dark:border-blue0 rounded-lg overflow-hidden">
                <div className="p-4 bg-blue dark:bg-blue0/20 border-b border-blue0 dark:border-blue0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue0 text-blue0 dark:bg-blue0 dark:text-blue0">
                        {creator?.name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-blue0 dark:text-blue0">
                        {creator?.name || "Admin"}
                      </p>
                      <p className="text-xs text-blue0 dark:text-blue0">
                        {isScheduled && scheduledDate
                          ? format(new Date(scheduledDate), "MMM d, yyyy")
                          : format(new Date(), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isPriority && (
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700"
                      >
                        Priority
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className={cn(
                        notificationType === "info" &&
                          "bg-blue text-blue0 border-blue0 dark:bg-blue0/20 dark:text-blue0 dark:border-blue0",
                        notificationType === "warning" &&
                          "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700",
                        notificationType === "success" &&
                          "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700"
                      )}
                    >
                      {notificationType.charAt(0).toUpperCase() +
                        notificationType.slice(1)}
                    </Badge>
                  </div>
                </div>
                <div
                  className={cn("p-4", getNotificationColor(notificationType))}
                >
                  <div className="flex gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notificationType)}
                    </div>
                    <div>
                      {message ? (
                        <p className="whitespace-pre-wrap text-blue0 dark:text-blue0">
                          {message}
                        </p>
                      ) : (
                        <p className="text-blue0 dark:text-blue0 italic">
                          Your notification preview will appear here...
                        </p>
                      )}
                      <p className="text-xs text-blue0 dark:text-blue0 mt-2">
                        Audience: {targetAudience.join(", ") || "All"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="manage" className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-blue0 dark:text-blue0">
                    Manage Notifications
                  </h3>
                  {notifications.length > 0 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          disabled={isLoading}
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete All
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-4 popover-content bg-white dark:bg-gray-900">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-amber-500" />
                            <h4 className="font-semibold text-blue0 dark:text-blue0">
                              Confirm Delete All
                            </h4>
                          </div>
                          <p className="text-sm text-blue0 dark:text-blue0">
                            Are you sure you want to delete all notifications?
                            This action cannot be undone.
                          </p>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue0 text-blue0 hover:bg-blue0 dark:border-blue0 dark:text-blue0 dark:hover:bg-blue0/20"
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={handleDeleteAll}
                              disabled={isLoading}
                            >
                              {isLoading ? "Deleting..." : "Delete All"}
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
                {isLoading ? (
                  <p className="text-blue0 dark:text-blue0">
                    Loading notifications...
                  </p>
                ) : notifications.length === 0 ? (
                  <p className="text-blue0 dark:text-blue0">
                    No notifications found.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="border border-blue0 dark:border-blue0 rounded-lg overflow-hidden"
                      >
                        <div className="p-4 bg-blue dark:bg-blue0/20 border-b border-blue0 dark:border-blue0 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-blue0 text-blue0 dark:bg-blue0 dark:text-blue0">
                                {notification.creator?.name?.charAt(0) || "A"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-blue0 dark:text-blue0">
                                {notification.creator?.name || "Admin"}
                              </p>
                              <p className="text-xs text-blue0 dark:text-blue0">
                                {notification.scheduled &&
                                notification.scheduledDate
                                  ? format(
                                      new Date(notification.scheduledDate),
                                      "MMM d, yyyy"
                                    )
                                  : format(
                                      new Date(notification.createdAt),
                                      "MMM d, yyyy"
                                    )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {notification.isPriority && (
                              <Badge
                                variant="outline"
                                className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-700"
                              >
                                Priority
                              </Badge>
                            )}
                            <Badge
                              variant="outline"
                              className={cn(
                                notification.type === "info" &&
                                  "bg-blue text-blue0 border-blue0 dark:bg-blue0/20 dark:text-blue0 dark:border-blue0",
                                notification.type === "warning" &&
                                  "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700",
                                notification.type === "success" &&
                                  "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700"
                              )}
                            >
                              {notification.type.charAt(0).toUpperCase() +
                                notification.type.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <div
                          className={cn(
                            "p-4",
                            getNotificationColor(notification.type)
                          )}
                        >
                          <div className="flex gap-3">
                            <div className="mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div>
                              <p className="whitespace-pre-wrap text-blue0 dark:text-blue0">
                                {notification.message}
                              </p>
                              <p className="text-xs text-blue0 dark:text-blue0 mt-2">
                                Audience:{" "}
                                {notification.targetAudience.join(", ") ||
                                  "All"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-blue dark:bg-blue0/20 border-t border-blue0 dark:border-blue0 flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(notification)}
                            className="border-blue0 text-blue0 hover:bg-blue0 dark:border-blue0 dark:text-blue0 dark:hover:bg-blue0/20"
                          >
                            Edit
                          </Button>
                          <Popover
                            open={deleteConfirmOpen === notification.id}
                            onOpenChange={(open) =>
                              setDeleteConfirmOpen(
                                open ? notification.id : null
                              )
                            }
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                disabled={deletingId === notification.id}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                {deletingId === notification.id
                                  ? "Deleting..."
                                  : "Delete"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-4 popover-content bg-white dark:bg-gray-900">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                                  <h4 className="font-semibold text-blue0 dark:text-blue0">
                                    Confirm Deletion
                                  </h4>
                                </div>
                                <p className="text-sm text-blue0 dark:text-blue0">
                                  Are you sure you want to delete this
                                  notification? This action cannot be undone.
                                </p>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setDeleteConfirmOpen(null)}
                                    className="border-blue0 text-blue0 hover:bg-blue0 dark:border-blue0 dark:text-blue0 dark:hover:bg-blue0/20"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                      handleDelete(notification.id)
                                    }
                                    disabled={deletingId === notification.id}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 p-4 border-t border-blue0 dark:border-blue0 bg-blue dark:bg-blue0/20">
            <Button
              variant="outline"
              onClick={closeModal}
              className="border-blue0 text-blue0 hover:bg-blue0 dark:border-blue0 dark:text-blue0 dark:hover:bg-blue0/20"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!message.trim() || isLoading || !creator}
              className="bg-blue0 hover:bg-blue0 text-white disabled:bg-blue0 dark:disabled:bg-blue0"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  {editingId ? "Updating..." : "Posting..."}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {editingId
                    ? isScheduled
                      ? "Update Scheduled Notification"
                      : "Update Notification"
                    : isScheduled
                    ? "Schedule Notification"
                    : "Post Notification"}
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
