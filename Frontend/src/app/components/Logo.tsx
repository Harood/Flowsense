interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  textColor?: string;
  iconColor?: string;
}

export function Logo({
  size = "md",
  showText = true,
  textColor = "text-white",
  iconColor = "text-white",
}: LogoProps) {
  const sizeClasses = {
    sm: { container: "w-8 h-8", text: "text-lg" },
    md: { container: "w-10 h-10", text: "text-2xl" },
    lg: { container: "w-14 h-14", text: "text-3xl" },
  };

  const { container, text } = sizeClasses[size];

  return (
    <div className="flex items-center gap-3">
      {/* Two Droplets Logo */}
      <div
        className={`${container} relative flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            className="fill-white/20"
            style={{ backdropFilter: "blur(8px)" }}
          />

          {/* Left Droplet (Larger) */}
          <path
            d="M35 30C35 30 25 45 25 55C25 63.284 31.716 70 40 70C48.284 70 55 63.284 55 55C55 45 45 30 35 30Z"
            className={
              iconColor === "text-white"
                ? "fill-white"
                : "fill-[#0066CC]"
            }
            opacity="0.9"
          />

          {/* Right Droplet (Smaller) */}
          <path
            d="M60 40C60 40 52 50 52 57C52 62.523 56.477 67 62 67C67.523 67 72 62.523 72 57C72 50 64 40 60 40Z"
            className={
              iconColor === "text-white"
                ? "fill-white"
                : "fill-[#00D4FF]"
            }
            opacity="0.85"
          />

          {/* Highlight effect on left droplet */}
          <ellipse
            cx="38"
            cy="50"
            rx="5"
            ry="8"
            className={
              iconColor === "text-white"
                ? "fill-white"
                : "fill-[#0088EE]"
            }
            opacity="0.3"
          />

          {/* Highlight effect on right droplet */}
          <ellipse
            cx="64"
            cy="53"
            rx="3"
            ry="5"
            className={
              iconColor === "text-white"
                ? "fill-white"
                : "fill-[#00E4FF]"
            }
            opacity="0.3"
          />
        </svg>
      </div>

      {showText && (
        <span className={`${text} font-bold ${textColor}`}>
          FlowSense
        </span>
      )}
    </div>
  );
}