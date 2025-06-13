import { cn } from "@/lib/utils";

interface LaptopIllustrationProps {
  className?: string;
}

export function LaptopIllustration({ className }: LaptopIllustrationProps) {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
    >
      {/* Base */}
      <path
        d="M50 320L100 350H400L450 320H50Z"
        fill="white"
        stroke="black"
        strokeWidth="3"
      />

      {/* Screen Outer */}
      <rect
        x="100"
        y="50"
        width="300"
        height="300"
        rx="10"
        fill="white"
        stroke="black"
        strokeWidth="3"
      />

      {/* Screen Inner */}
      <rect x="120" y="70" width="260" height="200" fill="black" />

      {/* Keyboard */}
      <rect x="150" y="330" width="200" height="10" rx="2" fill="black" />

      {/* Trackpad */}
      <rect
        x="200"
        y="290"
        width="100"
        height="50"
        rx="4"
        fill="#f1f1f1"
        stroke="black"
        strokeWidth="1"
      />

      {/* Screen Content */}
      <rect x="140" y="90" width="220" height="20" rx="4" fill="white" />
      <rect x="140" y="130" width="100" height="100" rx="4" fill="white" />
      <rect x="260" y="130" width="100" height="40" rx="4" fill="white" />
      <rect x="260" y="190" width="100" height="40" rx="4" fill="white" />
      <rect x="140" y="240" width="220" height="10" rx="4" fill="white" />
    </svg>
  );
}
