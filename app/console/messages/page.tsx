import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import FetchContacts from "@/components/FetchContacts";
import { Button } from "@/components/ui/button";

function page() {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" className="w-full">
        <Button
          onClick={() => {
            window.history.back();
          }}
        >
          Go Back
        </Button>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Contact info or recent updates</CardDescription>
        </CardHeader>
        <CardContent>
          <FetchContacts />
        </CardContent>
      </Card>
    </div>
  );
}

export default page;
