import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSectiondata } from "../features/sections/sectionSlice";
import type { AppDispatch } from "@/store/store.ts";
import Leftcontainer from "@/components/left.container";
import Horizontalscroll from "@/components/ui/Horizontalscroll";
import { Section } from "@/models/models";
import { plainToInstance } from "class-transformer";
import SectionUI from "@/components/section/section";

// import { RootState } from "@/store/store";
import { useSearchParams } from "react-router-dom";
export default function QuestionnairePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[] | null>(null);
  const [activeSection, setActiveSection] = useState<string>(""); //Stores the id of the currect active section
  const [activeSubsection, setActiveSubsection] = useState<string>(""); //Stores the id of the currect active subsection
  const dispatch = useDispatch<AppDispatch>();
  
  
  useEffect(() => {
    const sectionDataHandler = async (companyId: string) => {
      const resultAction = await dispatch(
        getSectiondata({ companyID: companyId })
      );
      if(!activeSection){
        setSearchParams(params=>{params.set("section", resultAction?.payload?.data[0]?.id);return params});
        setSearchParams(params=>{params.set("subsection", resultAction?.payload?.data[0]?.subsections[0]?.id); return params});
      }
      const sections: Section[] = plainToInstance(
        Section,
        resultAction?.payload?.data
      );
      setSections(sections);
    };
    if(companyId)
      sectionDataHandler(companyId);
  }, [companyId]);

  useEffect(() => {
    // Extracting the search params and setting them in state variables
    // This will be used to set the active section and subsection
    setActiveSection(searchParams.get("section") || "");
    setActiveSubsection(searchParams.get("subsection") || "");
    setCompanyId(searchParams.get("company") || "");
  }, [searchParams]);

  return (
    <div className="h-full">
      <div className=" mx-auto ">
        {/* For the comment sidebar */}
        <div className="flex bg-[#f2f9fa]">
          {/* Left Sidebar */}
          <div className="w-[350px]">
            <Leftcontainer
              activeSection={activeSection}
              subsections={
                sections?.find((section) => section.id === activeSection)
                  ?.subsections
              }
              activeSubsection={activeSubsection}
              setActiveSubsection={(subsectionId) =>
                setSearchParams((params) => {
                  params.set("subsection", subsectionId);
                  return params;
                })
              }
            />
          </div>

          <div className="h-screen w-[calc(100%-350px)] flex flex-col relative pl-3">
            {/* Top bar containing the section buttons e.g. 'Section A' */}
            <Horizontalscroll
              sections={sections}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
            {/* {activeSection === "C"} */}
            <SectionUI subsectionId={activeSubsection} />
          </div>
        </div>
      </div>
    </div>
  );
}
