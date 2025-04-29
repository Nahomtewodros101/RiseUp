"use client";
import { FC } from "react";

const OfflinePage: FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-100 text-white overflow-hidden relative">
      {/* Background Wave SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 -z-10"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#3B82F6"
          fillOpacity="0.5"
          d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,192L48,170.7C96,149,192,107,288,106.7C384,107,480,149,576,165.3C672,181,768,171,864,160C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
              M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,128C672,107,768,117,864,138.7C960,160,1056,192,1152,197.3C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </path>
      </svg>

      {/* Main Content */}
      <div className="text-center max-w-lg px-4 z-10">
        <div className="mb-5">
          {/* Cloud SVG with Disconnect Icon */}
          <svg
            width="200"
            height="200"
            viewBox="0 0 100 100"
            className="animate-pulse-custom mx-auto"
          >
            <g fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2">
              <path d="M75,40c0-10-8-18-18-18h-8c-12,0-22,10-22,22,0,2,1,4,2,6-10,2-18,10-18,20,0,12,10,22,22,22h40c12,0,22-10,22-22,0-10-8-18-20-20Z" />
              <path
                d="M40,50l10-10m0,10l-10-10"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-md">
          You&apos;re Offline
        </h1>
        <p className="text-lg md:text-xl text-blue-100 mb-6">
          No internet connection detected. Please check your network and try again.
        </p>
        <button
          onClick={handleReload}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>

      {/* Inline Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes pulse-custom {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse-custom {
          animation: pulse-custom 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default OfflinePage;