import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import LoadingScreen from "@/components/LoadingScreen";
import BackgroundGrid from "@/components/BacgroundGrid";
import CookieConsent from "../components/CookieConsent";
export const metadata = {
  title: "Qemem Devs - Tech Startup",
  description:
    "Transforming ideas into digital reality with cutting-edge technology solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundGrid />
          <LoadingScreen />
          <CookieConsent />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
