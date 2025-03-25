import React, { useState } from "react";
import { ChevronRight, ChevronDown, Leaf, BarChart2, Globe, Settings, MessageCircle, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubSection } from "@/models/models";


type MainNavigationProps = {
  subsections: SubSection[] | undefined;
  setActiveSubsection: (sectionId: string) => void;
}
const MainNavigationforC: React.FC<MainNavigationProps> = ({subsections,setActiveSubsection}) => {
  const [activeSection, setActiveSection] = useState<String | null>(null);
  // const [loaderProgress, setLoaderProgress] = useState<number>(10);
  console.log("the subsections are",subsections)
  const toggleSection = (sectionId:any) => {
    setActiveSubsection(sectionId);
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="nav-container h-screen  bg-green-50/80  shadow-sm overflow-auto scrollbar-hide [&::-webkit-scrollbar]:hidden">
      <div className="py-4 px-3">
        {subsections?.sort((a: SubSection, b: SubSection)=>a.title.localeCompare(b.title)).map((section) => (
          <div key={section.id} className="mb-2">
            <button
              onClick={() => toggleSection(section.id)}
              className={cn(
                "nav-section w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left",
                activeSection === section.id
                  ? "bg-green-100 text-green-900"
                  : "text-green-700 hover:bg-green-50"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className="text-green-600"><UserCircle className="w-5 h-5" /></div>
                <span className="font-medium">{section.title.substring(0,11)}</span>
              </div>
              {activeSection === section.id ? (
                <ChevronDown className="h-4 w-4 text-green-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-green-600" />
              )}
            </button>
            <div
              className={cn(
                "subsection-container pl-2 pr-1",
                activeSection === section.id ? "active" : ""
              )}
            >
              {section.questions.sort((a, b)=>Number(a.desc.split('.')[0])>Number(b.desc.split('.')[0])?Number(b.desc.split('.')[0]):Number(b.desc.split('.')[0])).map((qus, index) => (
                <div
                  key={qus.id}
                  className="subsection"
                  style={{ "--index": index } as React.CSSProperties}
                >
                  <button
                    onClick={() => {
                      setActiveSubsection(section.id); // Set active subsection to parent section
                      window.location.hash = `#${qus.id}`; // Set URL hash to question ID
                      console.log("the question id is",qus.id,window.location.hash)
                    }}
                    className="block py-2 px-3 my-1 rounded-md text-green-700 hover:bg-green-50 hover:text-green-900 text-[12px] transition-colors"
                  >
                    {qus?.desc} 
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainNavigationforC;

const fetchSubsectionData = async (
  subsectionId: string,
  updateProgress: (value: number) => void
) => {
  updateProgress(10);
  const raw = await fetch(
    `${import.meta.env.VITE_SERVER_URI}/section/subsection/${subsectionId}`,
    {
      credentials: "include",
      headers: { "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "" },
    }
  );
  updateProgress(50);
  const res = await raw.json();
  await new Promise((res: any) =>{
      updateProgress(90);
      res();
  }
  );

  return res.data;
};