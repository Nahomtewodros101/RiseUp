import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

<Card className="max-w-2xl bg-background border border-muted shadow-md p-6 rounded-2xl text-center">
  <CardContent>
    <Sparkles className="mx-auto mb-2 h-6 w-6 text-blue-600" />
    <blockquote className="text-xl font-semibold italic text-blue-600 dark:text-blue-400">
      “We're not just writing code — we're crafting digital experiences with
      soul. Every product we build reflects our obsession with excellence and
      empathy.”
    </blockquote>
    <p className="mt-4 text-sm font-medium text-foreground">— The Iceiy Team</p>
  </CardContent>
</Card>;
