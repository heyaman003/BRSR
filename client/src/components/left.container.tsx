import { cn } from "@/lib/utils";
import { SubSection } from "@/models/models";
import { useEffect, useState } from "react";
import {
  Leaf,
  Flower,
  Cloud,
} from "@/components/component/SustainabilityElements";
import MainNavigationforC from "./component/SectioncNav";
import BottomLeftContainer from "./component/BottomLeftContainer";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "@/hooks/use-fetch";
type LeftcontainerProps = {
  subsections: SubSection[] | undefined;
  setActiveSubsection: (sectionId: string) => void;
  activeSubsection: string;
  activeSection: string;
};

const Leftcontainer: React.FC<LeftcontainerProps> = ({
  subsections,
  setActiveSubsection,
  activeSubsection,
  activeSection,
}) => {
  const customFetch = useFetch();
  const [searchParams] = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [leaves, setLeaves] = useState<React.ReactNode[]>([]);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [totalAnsweredQuestions, setTotalAnsweredQuestions] =
    useState<number>(0);

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

    fetchQuestionStats(searchParams.get("company") || "").then((res) => {
      setTotalAnsweredQuestions(res.answered);
      setTotalQuestions(res.total);
    });

    return () => {
      document.documentElement.style.opacity = "1";
    };
  }, []);

  const fetchQuestionStats = async (companyId: string) => {
    try {
      const res = await customFetch(`/company/${companyId}/question/stats`, {
        method: "GET",
      });
      return res.data;
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      throw e;
    }
  };

  return (
    <div className="space-y-10 bg-green-50 px-4 pt-5 overflow-y-auto border-r-4 border-yellow-400 scrollbar-hide [&::-webkit-scrollbar]:hidden relative w-full h-screen">
      {/* Progress Circle */}
      {mounted && leaves}
      <Cloud className="absolute top-[10%] right-[10%] opacity-50 animate-float" />
      <Cloud
        className="absolute top-[25%] left-[5%] opacity-30 animate-float"
        style={{ animationDelay: "1s" }}
      />
      <Flower className="absolute top-[1%] opacity-70 animate-spin" />
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
            strokeDasharray={`${
              Math.round((totalAnsweredQuestions / totalQuestions) * 100) * 2.89
            } 289`}
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
            {Math.round((totalAnsweredQuestions / totalQuestions) * 100)}%
          </text>
        </svg>
        <div className="text-center text-sm text-muted-foreground mt-2 absolute top-[62%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {totalAnsweredQuestions}/{totalQuestions}
        </div>
      </div>

      {/* Subsection buttons */}
      {subsections?.length != 9 ? (
        <nav className="space-y-5 py-10 pt-5">
          {subsections
            ?.sort((a: SubSection, b: SubSection) =>
              a.title.localeCompare(b.title)
            )
            .map((subsection: SubSection) => (
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
                    {subsection?._count?.questions}/
                    {subsection?.questions?.length || 14}
                  </div>
                </div>
              </button>
            ))}
        </nav>
      ) : (
        <div className="overflow-y-auto">
          <MainNavigationforC
            setActiveSubsection={setActiveSubsection}
            subsections={subsections}
          />
        </div>
      )}
      <BottomLeftContainer activeSection={activeSection} />
    </div>
  );
};

export default Leftcontainer;
