import { useState, useEffect } from "react";
import { Droplet, Leaf, Wind } from "lucide-react";

type SustainabilityLoaderProps = {
  onLoadComplete?: () => void;
  delay?: number;
  message?: string;
  progress: number;
};

const SustainabilityLoader = ({
  message = "Loading sustainable content",
  progress,
}: SustainabilityLoaderProps) => {
  const [activeIcon, setActiveIcon] = useState<number>(0);

  useEffect(() => {
    // Rotate through the sustainability icons
    const iconInterval = setInterval(() => {
      setActiveIcon((prev) => (prev + 1) % 3);
    }, 500);
    return () => clearInterval(iconInterval);
  }, []);

  // Colors from the nature theme
  const colors = {
    leaf: "#8CC084",
    water: "#7AB7D0",
    wind: "#A8D4DE",
  };

  // Define icons based on the activeIcon state
  const icons = [
    <Leaf
      key="leaf"
      className="animate-float text-nature-leaf"
      style={{ color: colors.leaf }}
      strokeWidth={1.5}
    />,
    <Droplet
      key="droplet"
      className="animate-float"
      style={{ color: colors.water }}
      strokeWidth={1.5}
    />,
    <Wind
      key="wind"
      className="animate-float"
      style={{ color: colors.wind }}
      strokeWidth={1.5}
    />,
  ];

  return (
    <div className="m-auto absolute top-0 left-0 z-[60] inset-0 flex flex-col items-center justify-center bg-green-50/20 backdrop-blur-animation h-full w-full">
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Icon Circle */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Circular progress track */}
          <div className="absolute inset-0 rounded-full border-4 border-nature-stone opacity-30"></div>

          {/* Circular progress indicator */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="38"
              fill="white"
              stroke={"rgb(22 163 74)"}
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 38}`}
              strokeDashoffset={`${2 * Math.PI * 38 * (1 - progress / 100)}`}
              className="text-nature-forest transition-all duration-200"
            />
          </svg>

          {/* Active icon */}
          <div className="text-3xl">{icons[activeIcon]}</div>
        </div>

        {/* Message */}
        <div className="text-center text-green-600 font-semibold">
          <p className="text-nature-forest text-sm tracking-wide">
            {message}
            <span className="animate-pulse-opacity">...</span>
          </p>
          <p className="mt-1 text-nature-forest text-xs opacity-7">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityLoader;
