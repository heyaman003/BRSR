import { cn } from "@/lib/utils";
import { Button } from "../ui/button"
import { SubSection } from "@/models/models";
import { useEffect } from "react";

  type LeftcontainerProps = {
    subsections: SubSection[] | undefined; // Ensures sections is an object where each key holds an array of Section
    setActiveSubsection: (sectionId: string) => void;
    activeSubsection: string;
  };
  
  const Leftcontainer: React.FC<LeftcontainerProps> = ({
    subsections,
    setActiveSubsection,
    activeSubsection,
  }) => {
    const progress: number = 44;
    const total: number = 178;
    const percentage: number = Math.round((progress / total) * 100);
    
  return (
    <div className="space-y-10 bg-green-50 px-4 pt-5 h-[100vh] overflow-y-auto border-r-4 border-yellow-400 scrollbar-hide [&::-webkit-scrollbar]:hidden">
    {/* Progress Circle */}
    <div className="relative w-[180px] h-[180px] m-auto">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="stroke-muted fill-none"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="46"
        />
        <circle
          className="stroke-green-500 fill-none"
          strokeWidth="8"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="46"
          strokeDasharray={`${percentage * 2.89} 289`}
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="50"
          className="text-2xl font-bold"
          textAnchor="middle"
          dy="0.3em"
          fill="currentColor"
        >
          {percentage}%
        </text>
      </svg>
      <div className="text-center text-sm text-muted-foreground mt-2 absolute top-[62%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        {progress}/189
      </div>
    </div>

      <nav className="space-y-5 py-10 pt-5">
        {subsections?.map((subsection: SubSection) => (
        <button
          key={subsection.id}
          onClick={() => setActiveSubsection(subsection.id)}
          className={cn(
          "w-full text-left px-4 py-2 rounded-lg text-sm",
          "hover:bg-muted transition-colors",
          activeSubsection === subsection.id &&
            "bg-green-100 text-green-600"
          )}
        >
          <div className="font-medium text-primary">
          {subsection.title}
          </div>
          <div className="flex justify-between">
          <div className="text-xs px-2 py-[1px] text-green-700 rounded-md bg-green-200">
            In progress
          </div>
          <div className="text-xs font-bold text-green-500">
            2/{subsection?.questions?.length||14}
          </div>
          </div>
        </button>
        ))}
      </nav>
       <Button type="submit" 
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"> Send for approval </Button>
      </div>
      )
}

export default Leftcontainer
