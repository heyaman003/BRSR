import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Horizontalscroll from "@/components/ui/Horizontalscroll";
import { sections } from "@/data/SectionA/GDDATA";
import TableHelper from "../components/pages/Table.helper";
import TableHelper2 from "@/components/pages/Table.helper2";
import TableHelper3 from "@/components/pages/Table.helper3";
import { Button } from "@/components/ui/button";
import Leftcontainer from "@/components/dashboard/Leftcontainer";
import SectionB from "./SectionB";
// type NormalQuestion = {
//   id: string;
//   label: string;
//   type: string;
// };

// type TabularQuestion = {
//   id: string;
//   label: string;
//   tabulardata: string[][];
//   defaultLength: number;
// };

const sectionsd = {
  A: "Section A",
  B: "Section B",
  C:"Section C",
};
function hasTypeProperty(
  data: any
): data is { type: string; tabletype?: number } {
  return data && typeof data.type === "string";
}

export default function QuestionnairePage() {
  const [activeSection, setActiveSection] = useState<keyof typeof sectionsd>("A");
  const [activeSectionTab, setActiveSectionTab] = useState("Collectiveinput");
  const activeSectionData = sections[activeSection].find((s) => 'id' in s && s.id === activeSectionTab);
  const activeQuestions = activeSectionData?.questions || [];
      useEffect(() => {
        setActiveSectionTab(sections[activeSection][0].id);
        console.log("triggered-----section a",activeSection,sections[activeSection][0].id);
      }, [activeSection]);
  return (
    <div className="h-full bg-background">
      <div className=" mx-auto ">
     
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 h-[100vh] overflow-y-auto bg-[#f2f9fa]">
          {/* Left Sidebar */}
         <Leftcontainer sections={sections} activeSectionTab={activeSectionTab} activeSection={activeSection} setActiveSectionTab={setActiveSectionTab}  />

          {/* Main Content */}
          <div className=" rounded-lg p-6 pt-0 h-[100vh] overflow-y-auto ">
          <div className=" h-[10vh] sticky top-0 z-10 bg-[#f2f9fa] w-full">
       <Horizontalscroll activeSection={activeSection} setActiveSection={setActiveSection} />
      </div>
            <h1 className="text-xl font-bold mb-8">{activeSection==='A'? 'GENERAL DISCLOSURES ':'MANAGEMENT AND PROCESS DISCLOSURES'}</h1>

            {/* Render based on section type */}
            {activeSection==='A'&&<>
            {activeSection === "A" && hasTypeProperty(activeSectionData) && activeSectionData.type === "normal" ? (
              <form className="space-y-6">
               {activeQuestions?.map((question: any) => 
                   hasTypeProperty(question) &&question?.type=== "confirm" ? (
                    <div key={question?.id} className="space-y-2">
                      <label
                        htmlFor={question?.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {question?.label}
                      </label>

                      <div className={cn("flex gap-6")}>
                        <button className={cn("py-1 px-8 text-white bg-green-500 rounded-sm text-sm")}>Yes</button>
                        <button className={cn("py-1 px-8 text-white bg-red-500 rounded-sm text-sm")}>No</button>
                      </div>
                    </div>
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
            </>}
            {
              activeSection==='B'&&<SectionB activeSection={activeSection} activeSectionTab={activeSectionTab}  />
            }
            <Button type="submit" 
              className="w-[400px]  mt-5 bg-yellow-500 hover:bg-yellow-600 text-white"> Save and Next </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
