"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
export default function AdminContacts() {
  interface Contact {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
  }

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contact");
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return (
    <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2">
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
      {!isLoading && contacts.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-500">No messages found</p>
        </div>
      )}
      {contacts.map((contact) => (
        <Card
          key={contact.id}
          className="transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:border-blue-600 border border-gray-200 rounded-lg p-4"
        >
          <CardHeader className="flex items-center gap-4">
            <h1>Admin Contact Messages</h1>
            <Avatar className="w-14 h-14">
              <AvatarImage
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt={contact.name}
              />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-semibold text-lg">
                {contact.name}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {contact.email}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-700">{contact.message}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
