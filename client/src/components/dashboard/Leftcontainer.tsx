import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { SubSection } from "@/models/models";
import { useEffect, useState } from "react";
import {
  Leaf,
  Flower,
  Cloud,
} from "@/components/component/SustainabilityElements";
import { toast } from "sonner";
type LeftcontainerProps = {
  subsections: SubSection[] | undefined; // Ensures sections is an object where each key holds an array of Section
  setActiveSubsection: (sectionId: string) => void;
  activeSubsection: string;
  activeSection: string
};

const Leftcontainer: React.FC<LeftcontainerProps> = ({
  subsections,
  setActiveSubsection,
  activeSubsection,
  activeSection
}) => {
  const [mounted, setMounted] = useState(false);
  const [leaves, setLeaves] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    // Animate fade in for the entire page
    document.documentElement.style.opacity = "0";
    setTimeout(() => {
      document.documentElement.style.opacity = "1";
      setMounted(true);
    }, 50);

    // Create leaves for animation
    const leafElements = [];
    for (let i = 0; i < 8; i++) {
      const delay = Math.random() * 10;
      const duration = 15 + Math.random() * 20;
      const size = 15 + Math.random() * 10;
      const left = Math.random() * 90;

      leafElements.push(
        <Leaf
          key={i}
          style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      );
    }
    setLeaves(leafElements);
    return () => {
      document.documentElement.style.opacity = "1";
    };
  }, []);
  const progress: number = 44;
  const total: number = 178;
  const percentage: number = Math.round((progress / total) * 100);

  return (
    <div className="space-y-10 bg-green-50 px-4 pt-5 h-[100vh] overflow-y-auto border-r-4 border-yellow-400 scrollbar-hide [&::-webkit-scrollbar]:hidden relative">
      {/* Progress Circle */}
      {mounted && leaves}
      <Cloud className="absolute top-[10%] right-[10%] opacity-50 animate-float" />
      <Cloud
        className="absolute top-[25%] left-[5%] opacity-30 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <Flower className="absolute top-[1%] opacity-70 animate-spin" />
      {/* <Flower
          className="absolute bottom-[20%] right-[8%] opacity-60 animate-pulse-grow"
          style={{ animationDelay: "2s" }}
        /> */}
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

      {/* Subsection buttons */}
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
            <div className="font-medium text-primary">{subsection.title}</div>
            <div className="flex justify-between">
              <div className="text-xs px-2 py-[1px] text-green-700 rounded-md bg-green-200">
                In progress
              </div>
              <div className="text-xs font-bold text-green-500">
                2/{subsection?.questions?.length || 14}
              </div>
            </div>
          </button>
        ))}
      </nav>

      {/* Bottom button contaner */}
      <div className="flex gap-4 pb-6">
        <Button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Send for approval
        </Button>
        <Button
        onClick={()=>toast.promise(extractToPdf(activeSection), {
          loading: 'Generating pdf.',
          success: (data)=> data,
          error: (err)=>err.message
        })}
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Extract to PDF
        </Button>
      </div>
    </div>
  );
};

export default Leftcontainer;


const extractToPdf = async (sectionId: string) => {
    const raw = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/section/${sectionId}/extract`,
      {
        headers: {
          'X-Csrf-Token': sessionStorage.getItem('X-Csrf-Token') || ''
        },
        credentials: 'include'
      }
    );


    if(raw.status<200 || raw.status>=400){
      const res = await raw.json()
      throw new Error(res.message);
    }

    const blob: Blob = await raw.blob();

    const url: string = window.URL.createObjectURL(blob);

    const a: HTMLAnchorElement = document.createElement('a');

    a.href = url;

    a.download = sectionId;

    document.body.appendChild(a);

    a.click();

    a.remove()

    return 'Extracted section to PDF successfully.'

};
