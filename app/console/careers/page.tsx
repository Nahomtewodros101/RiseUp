"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  MoreHorizontal,
  ExternalLink,
  Loader2,
  Users,
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
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Career type definition
interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  isActive: boolean;
  createdAt: string;
  applications?: JobApplication[];
}

interface JobApplication {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: string;
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [careerToDelete, setCareerToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchCareers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/careers");

        if (!response.ok) {
          throw new Error("Failed to fetch careers");
        }

        const data = await response.json();
        setCareers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching careers:", error);
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const filteredCareers = careers.filter((career) => {
    const matchesSearch =
      career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      departmentFilter === "all" || career.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const departments = Array.from(
    new Set(careers.map((career) => career.department))
  );

  const handleDeleteCareer = async () => {
    if (!careerToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/careers/${careerToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === "Application not found") {
          alert("The career you are trying to delete does not exist.");
          setDeleteDialogOpen(false);
          setCareerToDelete(null);
          return;
        }
        throw new Error(errorData.error || "Failed to delete career");
      }

      setCareers((prevCareers) =>
        prevCareers.filter((career) => career.id !== careerToDelete)
      );

      setDeleteDialogOpen(false);
      setCareerToDelete(null);
    } catch (error) {
      console.error("Error deleting career:", error);
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred while deleting the career. Please try again."
      );
    } finally {
      setIsDeleting(false);
      window.location.reload();
    }
  };

  const confirmDelete = (id: string) => {
    setCareerToDelete(id);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="flex-col space-y-10 mt-10 shadow-xl  shadow-gray-200 rounded-lg p-10  items-center mx-auto max-w-7xl justify-between">
      <div className="flex items-center mx-auto max-w-7xl justify-between">
        <h2 className="text-3xl text-black font-bold tracking-tight">
          Careers
        </h2>
        <Button asChild>
          <Link className="bg-blue-600" href="/console/careers/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Career
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 bg-blue-50">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search careers..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Careers Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredCareers.length === 0 ? (
            <div className="flex flex-col  items-center justify-center p-8 text-center">
              <p className="text-muted-foreground">No careers found</p>
              <Button asChild className="mt-4">
                <Link href="/console/careers/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Career
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                {filteredCareers.map((career) => (
                  <TableRow key={career.id}>
                    <TableCell className="font-medium ">
                      {career.title}
                    </TableCell>
                    <TableCell>{career.department}</TableCell>
                    <TableCell>{career.location}</TableCell>
                    <TableCell>{career.type}</TableCell>
                    <TableCell>
                      {career.isActive ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-right">
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
                            <Link href={`/console/careers/${career.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/console/careers/${career.id}/applications`}
                            >
                              <Users className="mr-2 h-4 w-4" />
                              View Applications
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/careers/${career.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Live
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => confirmDelete(career.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this career? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteCareer}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
