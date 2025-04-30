"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem("pwaInstallDismissed") === "true";
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;

    if (isDismissed || isStandalone) {
      setIsVisible(false);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []); 

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("PWA installation accepted");
      localStorage.setItem("pwaInstallDismissed", "true");
    } else {
      console.log("PWA installation dismissed");
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismissClick = () => {
    localStorage.setItem("pwaInstallDismissed", "true");
    // Hide the popup
    setIsVisible(false);
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4  right-4 z-50 bg-blue-800 text-white p-4 rounded-lg shadow-lg flex justify-between items-center md:max-w-md">
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