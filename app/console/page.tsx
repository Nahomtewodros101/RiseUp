"use client";

import { useState, useEffect } from "react";
import { Users, Eye, TrendingUp, TrendingDown } from "lucide-react";
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching dashboard data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // For demo purposes, I'll use mock data
        setTimeout(() => {
          setStats({
            totalProjects: 9,
            totalTeamMembers: 6,
            activeTeamMembers: 5,
            websiteViews: 1254,
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
        setIsLoading(false);
      }
    };

    fetchData();
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.totalProjects}
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
              {isLoading ? "..." : stats.totalTeamMembers}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
              +1 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Active Members
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.activeTeamMembers}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.activeTeamMembers < stats.totalTeamMembers ? (
                <TrendingDown className="inline h-3 w-3 text-red-500 mr-1" />
              ) : (
                <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
              )}
              {Math.round(
                (stats.activeTeamMembers / stats.totalTeamMembers) * 100
              )}
              % of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Website Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.websiteViews}
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-500 mr-1" />
              +12% from last month
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
              <Link href="/console/team">Add Team Member</Link>
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
