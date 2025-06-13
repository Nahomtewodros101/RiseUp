import type React from "react";

interface IPhoneFrameProps {
  children: React.ReactNode;
}

export function IPhoneFrame({ children }: IPhoneFrameProps) {
  return (
    <div className="relative w-full max-w-[320px] mx-auto drop-shadow-xl">
      {/* iPhone Frame SVG with transparent middle */}
      <div className="relative w-full pb-[200%]">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 380 760"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* iPhone Outer Frame */}
          <rect
            x="10"
            y="10"
            width="360"
            height="740"
            rx="50"
            fill="#f5f5f5"
            stroke="#333"
            strokeWidth="10"
          />

          {/* iPhone Inner Screen (transparent) */}
          <rect
            x="30"
            y="60"
            width="320"
            height="640"
            rx="5"
            fill="transparent"
          />

          {/* iPhone Notch */}
          <rect x="120" y="20" width="140" height="25" rx="12.5" fill="#333" />

          {/* iPhone Camera */}
          <circle cx="190" cy="32.5" r="8" fill="#222" />

          {/* iPhone Home Indicator */}
          <rect x="140" y="720" width="100" height="5" rx="2.5" fill="#333" />
        </svg>

        {/* Content Container - fits inside the transparent screen area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[84%] h-[84%] mt-[16%] overflow-y-auto rounded-lg bg-white dark:bg-gray-800 shadow-inner">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
