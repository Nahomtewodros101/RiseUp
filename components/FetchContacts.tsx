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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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
        console.log(data); // Log the data to check if it's an array
        setContacts(Array.isArray(data) ? data : []); // Ensure data is always an array
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        setContacts([]); // Fallback to empty array on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete contact");
      }

      // Optional: remove the contact from the UI state
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

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
      {contacts && Array.isArray(contacts) && contacts.length > 0 ? (
        contacts.map((contact) => (
          <Card
            key={contact.id}
            className="relative transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:border-blue-600 border border-gray-200 rounded-lg p-4"
          >
            <CardHeader className="flex items-center gap-4">
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
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(contact.id)}
              className="absolute top-2 right-2"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </Card>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-500">No messages found</p>
        </div>
      )}
    </div>
  );
}
