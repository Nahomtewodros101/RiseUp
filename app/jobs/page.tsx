"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Briefcase,
  Building,
  CheckCircle,
  ChevronRight,
  Clock,
  Filter,
  Layers,
  MapPin,
  Search,
  Globe,
  Smartphone,
  Code,
  Database,
  Rocket,
  Users,
  LightbulbIcon,
  TrendingUp,
  Heart,
  Zap,
  Calendar,
  DollarSign,
  Laptop2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

interface BenefitCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary?: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  isActive: boolean;
  createdAt: string;
}

interface UserType {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

function JobApplicationButton({ selectedJob }: { selectedJob: Job | null }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleApplyClick = () => {
    if (isLoading || !selectedJob) return;

    if (!user) {
      router.push(
        "/login?callbackUrl=" + encodeURIComponent(`/careers/${selectedJob.id}`)
      );
    } else {
      router.push(`/careers/${selectedJob.id}`);
    }
  };

  return (
    <Button
      className="bg-blue-600 hover:bg-sky-600 w-full"
      onClick={handleApplyClick}
      disabled={isLoading || !selectedJob}
    >
      {isLoading ? "Loading..." : "Apply Now"}
    </Button>
  );
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("join");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobModalOpen, setJobModalOpen] = useState(false);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch("/api/careers");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  useEffect(() => {
    if (activeTab !== "join") return;

    let result = [...jobs];

    if (searchQuery) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (departmentFilter !== "all") {
      result = result.filter((job) => job.department === departmentFilter);
    }

    if (locationFilter !== "all") {
      result = result.filter((job) => job.location.includes(locationFilter));
    }

    setFilteredJobs(result);
  }, [searchQuery, departmentFilter, locationFilter, jobs, activeTab]);

  const departments = Array.from(new Set(jobs.map((job) => job.department)));
  const locations = Array.from(
    new Set(
      jobs.map((job) => {
        const parts = job.location.split(" / ");
        return parts[0];
      })
    )
  );

  const openJobDetails = (job: Job) => {
    setSelectedJob(job);
    setJobModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center gap-2">
              <Laptop2 className="h-8 w-8 text-blue-600" />
              <Link href="/" className="text-2xl font-bold">
                Qmem Tech
              </Link>
            </div>
            <h1 className="text-3xl text-blue-600 font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Let us Talk Business Now
            </h1>

            <Button onClick={() => window.history.back()}>
              Not feeling like it?
            </Button>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-8">
        <Tabs
          defaultValue="join"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="hire" className="text-lg text-blue-600 py-3">
              Hire Our Team
            </TabsTrigger>
            <TabsTrigger value="join" className="text-lg text-blue-600 py-3">
              Join Our Team
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hire" className="mt-0">
            <ClientServices />
          </TabsContent>

          <TabsContent value="join" className="mt-0">
            <JoinTeam />

            <div className="mt-16">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <h2 className="text-3xl text-blue-600 font-bold tracking-tighter">
                  Current Openings
                </h2>

                {/* Filters */}
                <Card className="w-full md:w-auto">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search jobs..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-400" />
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
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <Select
                          value={locationFilter}
                          onValueChange={setLocationFilter}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Locations</SelectItem>
                            {locations.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-2">
                              <Skeleton className="h-6 w-48" />
                              <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-20" />
                              </div>
                            </div>
                            <Skeleton className="h-10 w-28" />
                          </div>
                          <Skeleton className="h-4 w-full mt-4" />
                          <Skeleton className="h-4 w-5/6 mt-2" />
                          <Skeleton className="h-4 w-4/6 mt-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onClick={() => openJobDetails(job)}
                    />
                  ))}
                </div>
              ) : (
                <Card className="overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">
                      No job openings match your criteria.
                    </p>
                    {(searchQuery ||
                      departmentFilter !== "all" ||
                      locationFilter !== "all") && (
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("");
                          setDepartmentFilter("all");
                          setLocationFilter("all");
                        }}
                      >
                        Clear filters
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Job Details Modal */}
      <Dialog open={jobModalOpen} onOpenChange={setJobModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl font-bold">
                    {selectedJob.title}
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setJobModalOpen(false)}
                  ></Button>
                </div>
                <DialogDescription asChild>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-sky-50 text-sky-700 border-sky-200"
                    >
                      <Building className="h-3 w-3" />
                      {selectedJob.department}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-sky-50 text-sky-700 border-sky-200"
                    >
                      <MapPin className="h-3 w-3" />
                      {selectedJob.location}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-sky-50 text-sky-700 border-sky-200"
                    >
                      <Briefcase className="h-3 w-3" />
                      {selectedJob.type}
                    </Badge>
                    {selectedJob.salary && (
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200"
                      >
                        <DollarSign className="h-3 w-3" />
                        {selectedJob.salary}
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 bg-sky-50 text-sky-700 border-sky-200"
                    >
                      <Calendar className="h-3 w-3" />
                      {format(new Date(selectedJob.createdAt), "MMM d, yyyy")}
                    </Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">About the Role</h3>
                  <p className="text-gray-700">{selectedJob.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Responsibilities
                  </h3>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Experience</h3>
                  <p className="text-gray-700">{selectedJob.experience}</p>
                </div>
              </div>

              <DialogFooter>
                <JobApplicationButton selectedJob={selectedJob} />
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setJobModalOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function JobCard({ job, onClick }: { job: Job; onClick: () => void }) {
  const postedDate = new Date(job.createdAt);
  const formattedDate = format(postedDate, "MMM d, yyyy");

  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-all border-sky-100 hover:border-sky-200 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl text-blue-600 font-bold">{job.title}</h3>
              <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.type}</span>
                </div>
                {job.salary && (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {job.salary}
                  </Badge>
                )}
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-sky-600 whitespace-nowrap">
              View Details
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <p className="mt-4 text-gray-600 line-clamp-2">{job.description}</p>

          <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
            <Clock className="h-4 w-4" />
            <span>Posted on {formattedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ClientServices() {
  return (
    <div className="space-y-16">
      <section>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl text-blue-600 font-bold tracking-tighter">
              Why Work With Us
            </h2>
            <p className="text-gray-500">
              At Qmem Tech, we combine technical expertise with strategic
              thinking to deliver solutions that drive real business results.
              Our team of experienced developers, designers, and strategists
              work together to bring your vision to life.
            </p>
            <ul className="space-y-2">
              {[
                "Expert team with proven track record",
                "Transparent communication and process",
                "Agile methodology for faster delivery",
                "Scalable solutions built for growth",
                "Ongoing support and maintenance",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Button className="bg-blue-600 hover:bg-sky-600">
                <Link href="/contact">Discuss Your Project</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="/Logo.webp"
              width={500}
              height={400}
              alt="Team collaboration"
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl text-blue-600 font-bold tracking-tighter mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            icon={<Globe className="h-6 w-6 text-blue-600" />}
            title="Web Development"
            description="Custom websites and web applications built with the latest technologies to deliver exceptional user experiences."
          />
          <ServiceCard
            icon={<Smartphone className="h-6 w-6 text-blue-600" />}
            title="Mobile Development"
            description="Native and cross-platform mobile applications that work seamlessly across iOS and Android devices."
          />
          <ServiceCard
            icon={<Code className="h-6 w-6 text-blue-600" />}
            title="Custom Software"
            description="Bespoke software solutions tailored to your specific business needs and challenges."
          />
          <ServiceCard
            icon={<Database className="h-6 w-6 text-blue-600" />}
            title="Data & Analytics"
            description="Turn your data into actionable insights with our analytics and business intelligence solutions."
          />
          <ServiceCard
            icon={<Layers className="h-6 w-6 text-blue-600" />}
            title="UI/UX Design"
            description="User-centered design that creates intuitive, engaging experiences for your customers."
          />
          <ServiceCard
            icon={<CheckCircle className="h-6 w-6 text-blue-600" />}
            title="Quality Assurance"
            description="Comprehensive testing and quality assurance to ensure your software is reliable and bug-free."
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl text-blue-600 font-bold tracking-tighter mb-8">
          Our Process
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "01",
              title: "Discovery",
              description:
                "We start by understanding your business, goals, and requirements through in-depth discussions.",
            },
            {
              step: "02",
              title: "Planning",
              description:
                "Our team creates a detailed project plan, including timelines, milestones, and deliverables.",
            },
            {
              step: "03",
              title: "Development",
              description:
                "We build your solution using agile methodologies, with regular updates and feedback cycles.",
            },
            {
              step: "04",
              title: "Launch & Support",
              description:
                "After thorough testing, we deploy your solution and provide ongoing support and maintenance.",
            },
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="text-4xl font-bold text-blue-600">{item.step}</div>
              <h3 className="text-xl font-bold mt-2">{item.title}</h3>
              <p className="text-gray-500 mt-2">{item.description}</p>
              {i < 3 && (
                <div className="hidden lg:block absolute top-10 right-0 w-1/2 h-0.5 bg-blue-100"></div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <Card className="border-black hover:border-blue-600 hover:shadow-md transition-all">
      <CardContent className="p-6 flex flex-col items-start space-y-4">
        <div className="p-3 rounded-full bg-sky-50">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}

function JoinTeam() {
  return (
    <div className="space-y-16">
      <section>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex justify-center order-last lg:order-first">
            <Image
              src="/Logo.webp"
              width={500}
              height={400}
              alt="Team collaboration"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl text-blue-600 font-bold tracking-tighter">
              Why Join Our Team
            </h2>
            <p className="text-gray-500">
              At Qmem Tech, we are building a team of passionate technologists
              who are excited about solving complex problems and creating
              impactful solutions. We offer a collaborative, inclusive
              environment where you can grow your skills and advance your
              career.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <BenefitCard
                icon={<Rocket className="h-5 w-5 text-blue-600" />}
                title="Challenging Projects"
                description="Work on innovative projects that push the boundaries of technology."
              />
              <BenefitCard
                icon={<Users className="h-5 w-5 text-blue-600" />}
                title="Collaborative Culture"
                description="Join a team that values collaboration, diversity, and inclusion."
              />
              <BenefitCard
                icon={<LightbulbIcon className="h-5 w-5 text-blue-600" />}
                title="Continuous Learning"
                description="Access to learning resources and opportunities to develop new skills."
              />
              <BenefitCard
                icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
                title="Career Growth"
                description="Clear paths for advancement and professional development."
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl text-blue-600 font-bold tracking-tighter mb-8">
          Our Benefits
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Heart className="h-6 w-6 text-blue-600" />,
              title: "Health & Wellness",
              benefits: [
                "Comprehensive health insurance",
                "Mental health support",
                "Wellness stipend",
                "Flexible work hours",
              ],
            },
            {
              icon: <Zap className="h-6 w-6 text-blue-600" />,
              title: "Growth & Development",
              benefits: [
                "Learning and development budget",
                "Conference attendance",
                "Mentorship program",
                "Internal knowledge sharing",
              ],
            },
            {
              icon: <Users className="h-6 w-6 text-blue-600" />,
              title: "Work-Life Balance",
              benefits: [
                "Flexible remote work policy",
                "Generous PTO",
                "Paid parental leave",
                "Company retreats and team events",
              ],
            },
          ].map((category, i) => (
            <Card key={i} className="border-sky-100">
              <CardContent className="p-6 space-y-4">
                <div className="p-3 rounded-full bg-sky-50 w-fit">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
                <ul className="space-y-2">
                  {category.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-full bg-sky-50 mt-1">{icon}</div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
