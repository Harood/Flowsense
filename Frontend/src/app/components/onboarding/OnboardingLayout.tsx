import { ReactNode } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router";
import { Logo } from "../Logo";

interface OnboardingLayoutProps {
  step: number;
  title: string;
  features: string[];
  illustration: "droplet" | "house" | "meter";
  children: ReactNode;
}

export function OnboardingLayout({
  step,
  title,
  features,
  illustration,
  children,
}: OnboardingLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Blue Gradient */}
      <div className="w-[40%] bg-gradient-to-br from-[#0066CC] to-[#0055AA] text-white flex flex-col justify-between p-12">
        {/* Logo */}
        <div>
          <div className="mb-16">
            <Logo size="md" showText={true} textColor="text-white" iconColor="text-white" />
          </div>

          {/* Illustration */}
          <div className="flex justify-center mb-12">
            {illustration === "droplet" && (
              <div className="relative">
                <svg
                  className="w-48 h-48"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Large droplet */}
                  <path
                    d="M70 40C70 40 50 70 50 95C50 116.539 67.461 134 89 134C110.539 134 128 116.539 128 95C128 70 108 40 70 40Z"
                    className="fill-white/20 animate-pulse"
                  />
                  {/* Medium droplet */}
                  <path
                    d="M120 60C120 60 105 82 105 100C105 115.464 117.536 128 133 128C148.464 128 161 115.464 161 100C161 82 146 60 120 60Z"
                    className="fill-[#00D4FF]/30"
                  />
                  {/* Small droplet accent */}
                  <path
                    d="M150 90C150 90 142 100 142 107C142 112.523 146.477 117 152 117C157.523 117 162 112.523 162 107C162 100 154 90 150 90Z"
                    className="fill-white/40"
                  />
                  {/* Ripple effect */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    className="stroke-[#00D4FF]/20 fill-none animate-ping"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            )}
            {illustration === "house" && (
              <div className="relative">
                <svg
                  className="w-48 h-48"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 30L30 80V170H80V120H120V170H170V80L100 30Z"
                    fill="white"
                    fillOpacity="0.2"
                  />
                  <circle cx="60" cy="140" r="8" fill="#00D4FF" />
                  <circle cx="140" cy="140" r="8" fill="#00D4FF" />
                  <path d="M100 50L60 80V100L100 70L140 100V80L100 50Z" fill="#00D4FF" />
                </svg>
              </div>
            )}
            {illustration === "meter" && (
              <div className="relative">
                <svg
                  className="w-48 h-48"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="50"
                    y="60"
                    width="100"
                    height="80"
                    rx="8"
                    fill="white"
                    fillOpacity="0.2"
                  />
                  <circle cx="100" cy="100" r="25" fill="#00D4FF" />
                  <path d="M100 75L110 100H90L100 75Z" fill="white" />
                  <circle cx="80" cy="120" r="4" fill="white" />
                  <circle cx="120" cy="120" r="4" fill="white" />
                </svg>
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-8">{title}</h2>

          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-[#00C853] rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Link */}
        <div className="text-center">
          <p className="text-white/80">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="font-semibold underline hover:text-white transition-colors"
            >
              Login
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - White Background */}
      <div className="w-[60%] bg-[#F9FAFB] flex items-center justify-center p-12 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
