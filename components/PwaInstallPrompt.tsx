"use client";

import { useState, useEffect } from "react";

const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already dismissed the prompt
    const isDismissed = localStorage.getItem("pwaInstallDismissed");
    if (isDismissed) return;

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default mini-infobar from appearing
      e.preventDefault();
      // Store the event for later use
      setDeferredPrompt(e);
      // Show the install prompt
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Check if the app is already installed (e.g., running in PWA mode)
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Trigger the install prompt
    (deferredPrompt as any).prompt();
    // Wait for the user to respond
    const { outcome } = await (deferredPrompt as any).userChoice;
    if (outcome === "accepted") {
      console.log("PWA installation accepted");
    } else {
      console.log("PWA installation dismissed");
    }
    // Clear the prompt and hide the popup
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  const handleDismissClick = () => {
    // Save user preference to not show the prompt again
    localStorage.setItem("pwaInstallDismissed", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-gray-800 text-white p-4 rounded-lg shadow-lg flex justify-between items-center md:max-w-md">
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
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default PwaInstallPrompt;
