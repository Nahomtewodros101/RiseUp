"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  FileText,
  Loader2,
  Mail,
  Phone,
  Calendar,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

interface JobApplication {
  id: string;
  careerId: string;
  careerPosition: {
    id: string;
    title: string;
    department: string;
    location: string;
  };
  fullName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter?: string;
  status: "pending" | "reviewed" | "interviewed" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

type Params = Promise<{ id: string }>;

// Main component for the Application Detail Page
export default function ApplicationDetailPage({ params }: { params: Params }) {
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const fetchApplication = async () => {
      const resolvedParams = await params;
      if (!resolvedParams.id) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/careers/applications/${resolvedParams.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch application");
        }

        const data = await response.json();
        setApplication(data);
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching application:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplication();
  }, [params]);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">Application not found</h2>
        <p className="text-muted-foreground">
          The application you are looking for does not exist or has been removed.
        </p>
        <Button className="mt-4" asChild>
          <Link href="/console/careers/applications">Back to Applications</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/console/careers/applications">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">
          Application Details
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Applicant Information */}
        <Card>
          <CardHeader>
            <CardTitle>Applicant Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{application.fullName}</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${application.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {application.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`tel:${application.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {application.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Applied on{" "}
                    {application.createdAt
                      ? format(
                          new Date(application.createdAt),
                          "MMMM d, yyyy 'at' h:mm a"
                        )
                      : "Unknown date"}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium">Resume/CV</h3>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" asChild>
                  <a
                    href={application.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View Resume
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={application.resumeUrl}
                    download={`${application.fullName.replace(
                      /\s+/g,
                      "_"
                    )}_Resume.pdf`}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium">Cover Letter</h3>
              {application.coverLetter ? (
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {application.coverLetter}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No cover letter provided.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Information */}
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Department: </span>
                {application.careerPosition.department}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Location: </span>
                {application.careerPosition.location}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Position: </span>
                {application.careerPosition.title}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Update */}
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={status}
              onValueChange={(newStatus) => setStatus(newStatus)}
            >
              <SelectTrigger>
                <SelectValue>{status || "Select Status"}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="interviewed">Interviewed</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {/* Footer Section */}
      <div className="mt-8 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href="/console/careers/applications">Back to Applications</Link>
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={async () => {
            const response = await fetch(
              `/api/careers/applications/${application.id}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
              }
            );

            if (!response.ok) {
              alert("Failed to update the application status");
            } else {
              alert("Application status updated successfully");
            }
          }}
        >
          Update Status
        </Button>
      </div>
    </div>
  );
}
