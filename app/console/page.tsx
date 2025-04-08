"use client";

import { useState, useEffect } from "react";
import {
  Users,
  FolderKanban,
  Eye,
  TrendingUp,
  TrendingDown,
  UserCheck,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FetchContacts from "@/components/FetchContacts";

export default function ConsoleDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTeamMembers: 0,
    activeTeamMembers: 0,
    websiteViews: 0,
  });

  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch project data
        const projectResponse = await fetch("/api/projects");
        const projectData = await projectResponse.json();
        setStats((prevStats) => ({
          ...prevStats,
          totalProjects: projectData.totalProjects || 0,
        }));

        // Fetch team members data
        const teamResponse = await fetch("/api/team");
        const teamData = await teamResponse.json();
        setStats((prevStats) => ({
          ...prevStats,
          totalTeamMembers: teamData.totalTeamMembers || 0,
          activeTeamMembers: teamData.activeTeamMembers || 0,
        }));

        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        setIsLoading(false);
      }
    };

    // Fetch user count data
    const fetchUserCount = async () => {
      setIsLoadingUsers(true);
      try {
        const response = await fetch("/api/dashboard/user-count");
        if (!response.ok) {
          throw new Error("Failed to fetch user count");
        }
        const data = await response.json();
        setUserStats({
          totalUsers: data.totalUsers || 0,
          activeUsers: data.activeUsers || 0,
        });
      } catch (error) {
        console.error("Failed to fetch user count:", error);
        // Set fallback values if the API fails
        setUserStats({
          totalUsers: 0,
          activeUsers: 0,
        });
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchData();
    fetchUserCount();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/console/projects/new">Add New Project</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.totalProjects || 4}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.totalTeamMembers || 6}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
              +1 from last month
            </p>
          </CardContent>
        </Card>

        {/* User Stats Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Registered Users
            </CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingUsers ? "..." : userStats.totalUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
              {isLoadingUsers ? "..." : userStats.activeUsers} active today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* FetchContact Component */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Contact info or recent updates</CardDescription>
        </CardHeader>
        <CardContent>
          <FetchContacts />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/console/projects/new">Add New Project</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/console/team/new">Add Team Member</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/" target="_blank">
                View Website
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <span className="flex items-center text-sm text-green-500">
                  <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage</span>
                <span className="flex items-center text-sm text-green-500">
                  <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API</span>
                <span className="flex items-center text-sm text-green-500">
                  <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span>
                  Operational
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
