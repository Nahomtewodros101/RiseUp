"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Send,
  Calendar,
  Users,
  Info,
  AlertTriangle,
  CheckCircle,
  Bell,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type NotificationType = "info" | "warning" | "success";

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  scheduled: boolean;
  scheduledDate: Date | null;
  targetAudience: string[];
  isPriority: boolean;
  createdAt: Date;
  creator: { name: string } | null;
}

interface NotificationModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function NotificationModal({
  isOpen,
  closeModal,
}: NotificationModalProps) {
  const [message, setMessage] = useState("");
  const [notificationType, setNotificationType] =
    useState<NotificationType>("info");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
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
        console.log("Clicked outside the modal", isPreview);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    } else {
      setTimeout(() => {
        resetForm();
        setNotifications([]);
        setEditingId(null);
        setDeletingId(null);
        setDeleteConfirmOpen(null);
      }, 300);
    }
  }, [isOpen]);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/notifications", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const formattedNotifications = data.map((notif: Notification) => ({
          ...notif,
          createdAt: new Date(notif.createdAt),
          scheduledDate: notif.scheduledDate
            ? new Date(notif.scheduledDate)
            : null,
        }));
        setNotifications(formattedNotifications);
      } else {
        console.error("Failed to fetch notifications:", await response.json());
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const data = {
      message,
      type: notificationType,
      scheduled: isScheduled,
      scheduledDate: scheduledDate ? scheduledDate.toISOString() : null,
      targetAudience,
      isPriority,
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
        const formattedNotification = {
          ...updatedNotification,
          createdAt: new Date(updatedNotification.createdAt),
          scheduledDate: updatedNotification.scheduledDate
            ? new Date(updatedNotification.scheduledDate)
            : null,
        };

        setNotifications((prev) =>
          editingId
            ? prev.map((notif) =>
                notif.id === editingId ? formattedNotification : notif
              )
            : [formattedNotification, ...prev]
        );
        resetForm();
        setEditingId(null);
      } else {
        console.error("Failed to save notification:", await response.json());
      }
    } catch (error) {
      console.error("Error saving notification:", error);
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
      } else {
        console.error("Failed to delete notification:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    } finally {
      setDeletingId(null);
      setDeleteConfirmOpen(null);
    }
  };

  const resetForm = () => {
    setMessage("");
    setNotificationType("info");
    setIsScheduled(false);
    setScheduledDate(null);
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

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case "info":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
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
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Notification Manager
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeModal}
              className="rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Tabs defaultValue="compose" className="w-full">
            <div className="px-4 border-b">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger
                  value="compose"
                  onClick={() => setIsPreview(false)}
                >
                  Compose
                </TabsTrigger>
                <TabsTrigger value="preview" onClick={() => setIsPreview(true)}>
                  Preview
                </TabsTrigger>
                <TabsTrigger value="manage" onClick={() => setIsPreview(false)}>
                  Manage
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="compose" className="p-4 space-y-4">
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Enter your notification message here..."
                  className="min-h-[120px] resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Notification Type</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={
                        notificationType === "info" ? "default" : "outline"
                      }
                      className={cn(
                        "flex-1",
                        notificationType === "info"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : ""
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
                        "flex-1",
                        notificationType === "warning"
                          ? "bg-amber-500 hover:bg-amber-600"
                          : ""
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
                        "flex-1",
                        notificationType === "success"
                          ? "bg-green-500 hover:bg-green-600"
                          : ""
                      )}
                      onClick={() => setNotificationType("success")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Success
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Target Audience</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
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
                      className="w-[200px] p-0 popover-content"
                      align="start"
                    >
                      <div className="p-2">
                        <div
                          className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                          onClick={() => toggleAudience("all")}
                        >
                          <span>All Users</span>
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border",
                              targetAudience.includes("all")
                                ? "bg-blue-600 border-blue-600"
                                : "border-gray-300 dark:border-gray-600"
                            )}
                          >
                            {targetAudience.includes("all") && (
                              <CheckCircle className="h-4 w-4 text-white" />
                            )}
                          </div>
                        </div>
                        {["Admins", "Clients"].map((audience) => (
                          <div
                            key={audience}
                            className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
                            onClick={() =>
                              toggleAudience(audience.toLowerCase())
                            }
                          >
                            <span>{audience}</span>
                            <div
                              className={cn(
                                "w-4 h-4 rounded-full border",
                                targetAudience.includes(audience.toLowerCase())
                                  ? "bg-blue-600 border-blue-600"
                                  : "border-gray-300 dark:border-gray-600"
                              )}
                            >
                              {targetAudience.includes(
                                audience.toLowerCase()
                              ) && (
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
                    <Label htmlFor="scheduled">Schedule for later</Label>
                    <Switch
                      id="scheduled"
                      checked={isScheduled}
                      onCheckedChange={setIsScheduled}
                    />
                  </div>
                  {isScheduled && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !scheduledDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {scheduledDate ? (
                            format(scheduledDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 popover-content">
                        <CalendarComponent
                          mode="single"
                          selected={scheduledDate || undefined}
                          onSelect={(date) => setScheduledDate(date || null)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="priority">Mark as priority</Label>
                    <Switch
                      id="priority"
                      checked={isPriority}
                      onCheckedChange={setIsPriority}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preview" className="p-4">
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-400">
                        A
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Admin</p>
                      <p className="text-xs text-gray-500">
                        {isScheduled && scheduledDate
                          ? format(scheduledDate, "MMM d, yyyy")
                          : format(new Date(), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isPriority && (
                      <Badge
                        variant="outline"
                        className="bg-red-50 text-red-600 border-red-200"
                      >
                        Priority
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className={cn(
                        notificationType === "info" &&
                          "bg-blue-50 text-blue-600 border-blue-200",
                        notificationType === "warning" &&
                          "bg-amber-50 text-amber-600 border-amber-200",
                        notificationType === "success" &&
                          "bg-green-50 text-green-600 border-green-200"
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
                        <p className="whitespace-pre-wrap">{message}</p>
                      ) : (
                        <p className="text-gray-400 italic">
                          Your notification preview will appear here...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="manage" className="p-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Manage Notifications</h3>
                {isLoading ? (
                  <p className="text-gray-500">Loading notifications...</p>
                ) : notifications.length === 0 ? (
                  <p className="text-gray-500">No notifications found.</p>
                ) : (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-sky-100 text-sky-600 dark:bg-sky-900 dark:text-sky-400">
                                {notification.creator?.name?.charAt(0) || "A"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {notification.creator?.name || "Unknown Admin"}
                              </p>
                              <p className="text-xs text-gray-500">
                                {notification.scheduled &&
                                notification.scheduledDate
                                  ? format(
                                      notification.scheduledDate,
                                      "MMM d, yyyy"
                                    )
                                  : format(
                                      notification.createdAt,
                                      "MMM d, yyyy"
                                    )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {notification.isPriority && (
                              <Badge
                                variant="outline"
                                className="bg-red-50 text-red-600 border-red-200"
                              >
                                Priority
                              </Badge>
                            )}
                            <Badge
                              variant="outline"
                              className={cn(
                                notification.type === "info" &&
                                  "bg-blue-50 text-blue-600 border-blue-200",
                                notification.type === "warning" &&
                                  "bg-amber-50 text-amber-600 border-amber-200",
                                notification.type === "success" &&
                                  "bg-green-50 text-green-600 border-green-200"
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
                              <p className="whitespace-pre-wrap">
                                {notification.message}
                              </p>
                              <p className="text-sm text-gray-500 mt-2">
                                Audience:{" "}
                                {notification.targetAudience.join(", ") ||
                                  "All"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t flex justify-end gap-2">
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
                            <PopoverContent className="w-[300px] p-4 popover-content">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                                  <h4 className="font-semibold">
                                    Confirm Deletion
                                  </h4>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                  Are you sure you want to delete this
                                  notification? This action cannot be undone.
                                </p>
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setDeleteConfirmOpen(null)}
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

          <div className="flex justify-end gap-2 p-4 border-t bg-gray-50 dark:bg-gray-900">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!message || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Send className="mr-2 h-4 w-4" />
              {editingId
                ? isScheduled
                  ? "Update Scheduled Notification"
                  : "Update Notification"
                : isScheduled
                ? "Schedule Notification"
                : "Post Notification"}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
