"use client";

import { DialogTrigger } from "@/components/ui/dialog";
import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit,
  ToggleLeft,
  ToggleRight,
  MoreHorizontal,
  Loader2,
  UserPlus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import type { TeamMember } from "@/types";

export default function ConsoleTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    bio: "",
    image: "/placeholder.svg?height=400&width=400",
    order: 0,
    isActive: true,
    socialLinks: {
      twitter: "",
      linkedin: "",
      github: "",
    },
    skills: [] as string[],
  });

  // Fetch team members
  const fetchTeamMembers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/team", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch team members");
      }

      const data = await response.json();
      console.log("Fetched team members:", data); 
      setTeamMembers(data);
    } catch (error) {
      console.error("Failed to fetch team members:", error);
      console.error("Failed to fetch team members. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.skills || []).some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && member.isActive) ||
      (statusFilter === "inactive" && !member.isActive);

    return matchesSearch && matchesStatus;
  });

  const toggleTeamMemberStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/team/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update team member status");
      }

      setTeamMembers(
        teamMembers.map((member) =>
          member.id === id ? { ...member, isActive: !currentStatus } : member
        )
      );

      console.log(`Team member ${currentStatus ? "deactivated" : "activated"}`);
    } catch (error) {
      console.error("Failed to update team member status:", error);
      console.error("Failed to update team member status:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("socialLinks.")) {
      const key = name.split(".")[1];
      setNewMember((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [key]: value },
      }));
    } else if (name === "skills") {
      setNewMember((prev) => ({
        ...prev,
        skills: value
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill),
      }));
    } else if (name === "order") {
      setNewMember((prev) => ({
        ...prev,
        order: Number.parseInt(value) || 0,
      }));
    } else {
      setNewMember((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSwitchChange = (checked: boolean, name: string) => {
    setNewMember((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAddTeamMember = async () => {
    try {
      // Validate form
      if (!newMember.name || !newMember.role || !newMember.bio) {
        console.error("Please fill in all required fields.");
        return;
      }

      const response = await fetch("/api/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
        body: JSON.stringify(newMember),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create team member: ${errorText}`);
      }

      await fetchTeamMembers();

      setNewMember({
        name: "",
        role: "",
        bio: "",
        image: "/placeholder.svg?height=400&width=400",
        order: 0,
        isActive: true,
        socialLinks: {
          twitter: "",
          linkedin: "",
          github: "",
        },
        skills: [],
      });
      setIsAddDialogOpen(false);

      console.log("Team member added successfully.");
    } catch (error) {
      console.error("Error in adding team member:", error);
    }
  };

  const handleDeleteTeamMember = async () => {
    if (!memberToDelete) return;

    try {
      const response = await fetch(`/api/team/${memberToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete team member");
      }

      setTeamMembers(
        teamMembers.filter((member) => member.id !== memberToDelete.id)
      );

      setIsDeleteDialogOpen(false);
      setMemberToDelete(null);

      console.log("Team member deleted successfully.");
    } catch (error) {
      console.error("Failed to delete team member:", error);
      console.error("Failed to delete team member:", error);
    }
  };

  const openDeleteDialog = (member: TeamMember) => {
    setMemberToDelete(member);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl text-black dark:text-white font-bold tracking-tight">
          Team Members
        </h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>
                Add a new member to your team. They will be displayed on the
                team page.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name*
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newMember.name}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role*
                </Label>
                <Input
                  id="role"
                  name="role"
                  value={newMember.role}
                  onChange={handleInputChange}
                  placeholder="Job title"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio*
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={newMember.bio}
                  onChange={handleInputChange}
                  placeholder="Professional biography"
                  className="col-span-3"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Expertise
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={newMember.skills.join(", ")}
                  onChange={handleInputChange}
                  placeholder="e.g., JavaScript, React, Node.js"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image"
                  name="image"
                  value={newMember.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="order" className="text-right">
                  Display Order
                </Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  value={newMember.order.toString()}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isActive" className="text-right">
                  Active Status
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="isActive"
                    checked={newMember.isActive}
                    onCheckedChange={(checked) =>
                      handleSwitchChange(checked, "isActive")
                    }
                  />
                  <Label htmlFor="isActive">
                    {newMember.isActive
                      ? "Visible on website"
                      : "Hidden from website"}
                  </Label>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="twitter" className="text-right">
                  Twitter URL
                </Label>
                <Input
                  id="twitter"
                  name="socialLinks.twitter"
                  value={newMember.socialLinks.twitter}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/username"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="linkedin" className="text-right">
                  LinkedIn URL
                </Label>
                <Input
                  id="linkedin"
                  name="socialLinks.linkedin"
                  value={newMember.socialLinks.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/username"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="github" className="text-right">
                  GitHub URL
                </Label>
                <Input
                  id="github"
                  name="socialLinks.github"
                  value={newMember.socialLinks.github}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddTeamMember}>Add Team Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className=" dark:bg-gray-800 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Members</SelectItem>
                  <SelectItem value="active">Active Only</SelectItem>
                  <SelectItem value="inactive">Inactive Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredTeamMembers.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground">No team members found</p>
          <Button className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Team Member
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeamMembers.map((member) => (
            <Card
              key={member.id}
              className={`overflow-hidden ${
                !member.isActive ? "opacity-70" : ""
              }`}
            >
              <div className="relative aspect-square">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                    onClick={() =>
                      toggleTeamMemberStatus(member.id, member.isActive)
                    }
                  >
                    {member.isActive ? (
                      <ToggleRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="sr-only">
                      {member.isActive ? "Deactivate" : "Activate"}
                    </span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/console/team/${member.id}`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          toggleTeamMemberStatus(member.id, member.isActive)
                        }
                      >
                        {member.isActive ? (
                          <>
                            <ToggleLeft className="mr-2 h-4 w-4" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <ToggleRight className="mr-2 h-4 w-4" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => openDeleteDialog(member)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {!member.isActive && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-900/80 text-white text-center py-2 text-sm">
                    Hidden on website
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400">
                  {member.role}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                  {member.bio}
                </p>
                {(member.skills?.length ?? 0) > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <AnimatePresence>
                      {member.skills!.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            duration: 0.2,
                            delay: skillIndex * 0.05,
                          }}
                        >
                          <Badge
                            variant="secondary"
                            className="bg-blue-600 text-white font-bold uppercase text-xs py-1 px-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 hover:rotate-2"
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    No skills listed
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the team member 
              {memberToDelete?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setMemberToDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTeamMember}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
