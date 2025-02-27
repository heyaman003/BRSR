import { useState } from "react";
import { cn } from "@/lib/utils";
import Horizontalscroll from "@/components/ui/Horizontalscroll";
import { sections } from "@/data/SectionA/GDDATA";
import TableHelper from "../components/pages/Table.helper";
import TableHelper2 from "@/components/pages/Table.helper2";
import TableHelper3 from "@/components/pages/Table.helper3";
type NormalQuestion = {
  id: string;
  label: string;
  type: string;
};

type TabularQuestion = {
  id: string;
  label: string;
  tabulardata: string[][];
  defaultLength: number;
};

type Section = {
  id: string;
  title: string;
  type: "normal" | "tabular";
  progress: number[];
  inProgress: boolean;
  questions: (NormalQuestion | TabularQuestion)[];
};

export default function QuestionnairePage() {
  const [activeSection, setActiveSection] = useState("Collectiveinput");
  const activeSectionData = sections.A.find((s) => s.id === activeSection);
  const activeQuestions = activeSectionData?.questions || [];
  const progress: number = 44;
  const total: number = 178;
  const percentage: number = Math.round((progress / total) * 100);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <Horizontalscroll />
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 h-[80vh] overflow-y-auto">
          {/* Left Sidebar */}
          <div className="space-y-6 bg-green-50 px-4 pt-5 h-[80vh] overflow-y-auto">
            {/* Progress Circle */}
            <div className="relative w-32 h-32 m-auto">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="stroke-muted fill-none"
                  strokeWidth="8"
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
                {progress}/{total}
              </div>
            </div>

            {/* Section Navigation */}
            <nav className="space-y-1 py-10 pt-5">
              {sections.A.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-lg text-sm",
                    "hover:bg-muted transition-colors",
                    activeSection === section.id &&
                      "bg-green-100 text-green-600"
                  )}
                >
                  <div className="font-medium text-primary">
                    {section.title}
                  </div>
                  <div className="flex justify-between">
                    <div className="text-xs px-2 py-[1px] text-green-700 rounded-md bg-green-200">
                      In progress
                    </div>
                    <div className="text-xs font-bold text-green-500">
                      2/{section.questions.length}
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="bg-card rounded-lg p-6 pt-0 h-[80vh] overflow-y-auto">
            <h1 className="text-xl font-bold mb-8">GENERAL DISCLOSURES</h1>

            {/* Render based on section type */}
            {activeSectionData?.type === "normal" ? (
              <form className="space-y-6">
                {activeQuestions.map((question) =>
                  question["type"] === "confirm" ? (
                    <span>
                      <div key={question.id} className="space-y-2">
                        <label
                          htmlFor={question.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {question.label}
                        </label>
                        {/* <input
                      // type={question.type}
                      id={question.id}
                      className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                        "ring-offset-background file:border-0 file:bg-transparent",
                        "file:text-sm file:font-medium placeholder:text-muted-foreground",
                        "focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-ring focus-visible:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50"
                      )}
                    /> */}
                        <div className={cn("flex gap-6")}>
                          <button className={cn("py-1 px-8 text-white bg-green-500 rounded-sm text-sm")}>Yes</button>
                          <button className={cn("py-1 px-8 text-white bg-red-500 rounded-sm text-sm")}>No</button>
                        </div>
                      </div>
                    </span>
                  ) : (
                    <div key={question.id} className="space-y-2">
                      <label
                        htmlFor={question.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {question.label}
                      </label>
                      <input
                        // type={question.type}
                        id={question.id}
                        className={cn(
                          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                          "ring-offset-background file:border-0 file:bg-transparent",
                          "file:text-sm file:font-medium placeholder:text-muted-foreground",
                          "focus-visible:outline-none focus-visible:ring-2",
                          "focus-visible:ring-ring focus-visible:ring-offset-2",
                          "disabled:cursor-not-allowed disabled:opacity-50"
                        )}
                      />
                    </div>
                  )
                )}
              </form>
            ) : activeSectionData?.type === "tabular" ? (
              <>
                {activeSectionData?.tabletype === 1 && (
                  <TableHelper section={activeSectionData} />
                )}
                {activeSectionData?.tabletype === 3 && (
                  <div>
                    <TableHelper2 section={activeSectionData} />
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          b. What is the contribution of exports as a percentage
                          of the total turnover of the entity?
                        </label>
                        <input
                          type="text"
                          className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                            "ring-offset-background file:border-0 file:bg-transparent",
                            "file:text-sm file:font-medium placeholder:text-muted-foreground",
                            "focus-visible:outline-none focus-visible:ring-2",
                            "focus-visible:ring-ring focus-visible:ring-offset-2",
                            "disabled:cursor-not-allowed disabled:opacity-50"
                          )}
                        />
                      </div>
                    </form>
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          c. A brief on types of customers
                        </label>
                        <input
                          type="text"
                          className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                            "ring-offset-background file:border-0 file:bg-transparent",
                            "file:text-sm file:font-medium placeholder:text-muted-foreground",
                            "focus-visible:outline-none focus-visible:ring-2",
                            "focus-visible:ring-ring focus-visible:ring-offset-2",
                            "disabled:cursor-not-allowed disabled:opacity-50 "
                          )}
                        />
                      </div>
                    </form>
                  </div>
                )}
                {
                  activeSectionData?.tabletype === 4 && <TableHelper3 section={activeSectionData}/>
                }
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
