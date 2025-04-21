"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  ExternalLink,
  Loader2,
  Calendar,
  Star,
  X,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Project type definition
interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  techStack: string[];
  link?: string;
  projectType: string;
  featured: boolean;
  createdAt: string;
  content?: string;
  client?: string;
  duration?: string;
  completionDate?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("grid"); // Changed to "grid"
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    // Fetch projects
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
        setIsLoading(false);
        console.log("Fetched projects:", setSelectedProject); 
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on search query and project type
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      projectTypeFilter === "all" || project.projectType === projectTypeFilter;

    return matchesSearch && matchesType;
  });

  // Handle project deletion
  const handleDeleteProject = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      // Update the state to remove the deleted project
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project. Please try again.");
    }
  };

  // Get badge color based on project type
  const getProjectTypeBadge = (type: string) => {
    switch (type) {
      case "website":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          >
            Website
          </Badge>
        );
      case "app":
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          >
            App
          </Badge>
        );
      case "ui-design":
        return (
          <Badge
            variant="secondary"
            className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
          >
            UI Design
          </Badge>
        );
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  // Open project preview


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setViewMode(viewMode === "table" ? "grid" : "table")
                  }
                >
                  {viewMode === "table" ? (
                    <div className="h-4 w-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  ) : (
                    <div className="h-4 w-4 flex flex-col gap-0.5">
                      <div className="h-0.5 w-full bg-current rounded-sm"></div>
                      <div className="h-0.5 w-full bg-current rounded-sm"></div>
                      <div className="h-0.5 w-full bg-current rounded-sm"></div>
                    </div>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch to {viewMode === "table" ? "Grid" : "Table"} View</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button asChild>
            <Link href="/console/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                value={projectTypeFilter}
                onValueChange={setProjectTypeFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Project Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="app">App</SelectItem>
                  <SelectItem value="ui-design">UI Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground">No projects found</p>
          <Button asChild className="mt-4">
            <Link href="/console/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Link>
          </Button>
        </div>
      ) : viewMode === "table" ? (
        /* Table View */
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Tech Stack</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="relative h-12 w-16 overflow-hidden rounded-md">
                        <Image
                          src={
                            project.thumbnail ||
                            "/placeholder.svg?height=48&width=64"
                          }
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{project.title}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {project.description}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getProjectTypeBadge(project.projectType)}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.slice(0, 2).map((tech, index) => (
                          <Badge key={index} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack.length > 2 && (
                          <Badge variant="outline">
                            +{project.techStack.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {project.featured ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Yes
                        </Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(project.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/console/projects/${project.id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>

                            {project.link && (
                              <DropdownMenuItem asChild>
                                <Link
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Live
                                </Link>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => setConfirmDelete(project.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden flex flex-col">
              <div className="relative h-48 w-full">
                <Image
                  src={
                    project.thumbnail || "/placeholder.svg?height=192&width=384"
                  }
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {project.featured && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      <Star className="h-3 w-3 mr-1" /> Featured
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                  {getProjectTypeBadge(project.projectType)}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.techStack.map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/console/projects/${project.id}`}>
                      <Edit className="h-3 w-3 mr-1" /> Edit
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    onClick={() => setConfirmDelete(project.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Project Preview Dialog */}
      {selectedProject && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>Project Preview: {selectedProject.title}</span>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </DialogTitle>
              <DialogDescription>
                Preview how this project will appear on the website
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Project Image */}
              <div className="relative h-64 w-full rounded-lg overflow-hidden">
                <Image
                  src={
                    selectedProject.thumbnail ||
                    "/placeholder.svg?height=256&width=768"
                  }
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-2xl font-bold">
                    {selectedProject.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedProject.description}
                  </p>

                  {/* Project Content */}
                  {selectedProject.content && (
                    <div className="prose dark:prose-invert max-w-none">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedProject.content,
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Project Info Card */}
                  <Card>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Project Type
                        </h3>
                        <div className="mt-1">
                          {getProjectTypeBadge(selectedProject.projectType)}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Tech Stack
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {selectedProject.techStack.map((tech, index) => (
                            <Badge key={index} variant="outline">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {selectedProject.client && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Client
                          </h3>
                          <p className="mt-1">{selectedProject.client}</p>
                        </div>
                      )}

                      {selectedProject.duration && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Duration
                          </h3>
                          <p className="mt-1">{selectedProject.duration}</p>
                        </div>
                      )}

                      {selectedProject.completionDate && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Completion Date
                          </h3>
                          <p className="mt-1">
                            {new Date(
                              selectedProject.completionDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Featured
                        </h3>
                        <p className="mt-1">
                          {selectedProject.featured ? "Yes" : "No"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button asChild>
                      <Link href={`/console/projects/${selectedProject.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Project
                      </Link>
                    </Button>
                    {selectedProject.link && (
                      <Button variant="outline" asChild>
                        <Link
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Live Project
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!confirmDelete}
        onOpenChange={(open) => !open && setConfirmDelete(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                confirmDelete && handleDeleteProject(confirmDelete)
              }
            >
              Delete Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
