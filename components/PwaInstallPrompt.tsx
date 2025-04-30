"use client";

import { useState, useEffect } from "react";

// Define the BeforeInstallPromptEvent interface
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log("PWA Prompt: useEffect running");
    const isDismissed = localStorage.getItem("pwaInstallDismissed") === "true";
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    console.log("PWA Prompt Debug:", { isDismissed, isStandalone });

    if (isDismissed || isStandalone) {
      console.log("PWA Prompt: Suppressed due to dismissal or standalone mode");
      setIsVisible(false);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      console.log("PWA Prompt: beforeinstallprompt event fired");
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      console.log("PWA Prompt: Cleaning up beforeinstallprompt listener");
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      console.log("PWA Prompt: No deferred prompt available");
      return;
    }

    console.log("PWA Prompt: Triggering install prompt");
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA Prompt: Installation ${outcome}`);
    localStorage.setItem("pwaInstallDismissed", "true");
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismissClick = () => {
    console.log("PWA Prompt: Dismissed by user");
    localStorage.setItem("pwaInstallDismissed", "true");
    setIsVisible(false);
    setDeferredPrompt(null);
  };

  if (!isVisible) {
    console.log("PWA Prompt: Not visible, returning null");
    return null;
  }

  console.log("PWA Prompt: Rendering popup");
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-blue-800 text-white p-4 rounded-lg shadow-lg flex justify-between items-center md:max-w-md">
      <div>
        <p className="font-semibold">Install Our App</p>
        <p className="text-sm">
          Get the best experience by adding Qemem Tech to your home screen!
        </p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={handleInstallClick}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Install
        </button>
        <button
          onClick={handleDismissClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default PwaInstallPrompt;