"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Search, Trash2, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [processingAction, setProcessingAction] = useState<number | null>(null);
  const usersPerPage = 5;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/admin/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    let result = [...users];

    if (searchQuery) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (roleFilter) {
      result = result.filter((user) => user.role === roleFilter);
    }

    setFilteredUsers(result);
    setCurrentPage(1);
  }, [searchQuery, roleFilter, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  async function handleDelete(userId: number) {
    setProcessingAction(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
      setProcessingAction(null);
    }
  }

  async function handleRoleChange(userId: number, newRole: string) {
    setProcessingAction(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user role");
      }
      const updatedUser = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingAction(null);
    }
  }

  function getRoleBadgeColor(role: string) {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-900 dark:text-sky-200 dark:hover:bg-sky-800";
      case "user":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600";
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600";
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <Card className="container mx-auto shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="bg-blue-50 dark:from-gray-800 dark:to-gray-700 border-b dark:border-gray-600">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center gap-2 text-blue-600 dark:text-gray-100">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                User Management
              </CardTitle>
              <CardDescription className="mt-1 text-gray-600 dark:text-gray-300">
                View and manage user accounts and permissions
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="px-3 py-1 text-blue-600 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              >
                Total: {users.length}
              </Badge>
              <Badge
                variant="outline"
                className="bg-sky-50 text-blue-600 px-3 py-1 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-600"
              >
                Admins: {users.filter((user) => user.role === "admin").length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-300" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              />
            </div>
            <Select
              value={roleFilter || "all"}
              onValueChange={(value) =>
                setRoleFilter(value === "all" ? null : value)
              }
            >
              <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-600" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px] bg-gray-200 dark:bg-gray-600" />
                    <Skeleton className="h-4 w-[200px] bg-gray-200 dark:bg-gray-600" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredUsers.length > 0 ? (
            <>
              <div className="rounded-md border overflow-hidden dark:border-gray-600">
                <Table>
                  <TableHeader className="bg-sky-50 dark:bg-gray-700">
                    <TableRow>
                      <TableHead className="text-gray-900 dark:text-gray-200">
                        Name
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-200">
                        Email
                      </TableHead>
                      <TableHead className="text-gray-900 dark:text-gray-200">
                        Role
                      </TableHead>
                      <TableHead className="text-right text-gray-900 dark:text-gray-200">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.map((user) => (
                      <TableRow
                        key={user.id}
                        className="hover:bg-blue-300 dark:hover:bg-gray-600"
                      >
                        <TableCell className="text-gray-900 dark:text-gray-200">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-300">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getRoleBadgeColor(user.role)} text-blue-600`}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Select
                              value={user.role}
                              onValueChange={(value) =>
                                handleRoleChange(user.id, value)
                              }
                              disabled={processingAction === user.id}
                            >
                              <SelectTrigger className="w-[110px] h-8 bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setUserToDelete(user.id);
                                setShowDeleteModal(true);
                              }}
                              disabled={processingAction === user.id}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          className={
                            currentPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer text-gray-900 dark:text-gray-200"
                          }
                        />
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, i) => {
                        const pageNumber = i + 1;
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          pageNumber === currentPage ||
                          pageNumber === currentPage - 1 ||
                          pageNumber === currentPage + 1
                        ) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                onClick={() => setCurrentPage(pageNumber)}
                                isActive={pageNumber === currentPage}
                                className="text-gray-900 dark:text-gray-200"
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }

                        if (pageNumber === 2 || pageNumber === totalPages - 1) {
                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationEllipsis className="text-gray-900 dark:text-gray-200" />
                            </PaginationItem>
                          );
                        }

                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          className={
                            currentPage === totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer text-gray-900 dark:text-gray-200"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg border border-dashed dark:border-gray-600">
              <AlertCircle className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-300" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-200">
                No users found
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                {searchQuery || roleFilter
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "There are no users in the system yet."}
              </p>
              {(searchQuery || roleFilter) && (
                <Button
                  variant="outline"
                  className="mt-4 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  onClick={() => {
                    setSearchQuery("");
                    setRoleFilter(null);
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              This action cannot be undone. This will permanently delete the
              user account and remove all associated data.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this user?
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
              disabled={processingAction !== null}
              className="dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => userToDelete && handleDelete(userToDelete)}
              disabled={processingAction !== null}
            >
              {processingAction !== null ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                  Deleting...
                </span>
              ) : (
                "Delete User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Page;
