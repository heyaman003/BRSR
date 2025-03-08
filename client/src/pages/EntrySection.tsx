import { useEffect, useState } from "react";
import Leftcontainer from "@/components/dashboard/Leftcontainer";
import Horizontalscroll from "@/components/ui/Horizontalscroll";
import { Section } from "@/models/models";
import { plainToInstance } from "class-transformer";
import SectionUI from "./Section";

export default function QuestionnairePage() {
  const [sections, setSections] = useState<Section[] | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [activeSubsection, setActiveSubsection] = useState<string>("");

  useEffect(() => {
    listSections("67cacb1dcc99821024bdff3e").then((res) => {
      const sections: Section[] = plainToInstance(Section, res);
      setSections(sections);
      setActiveSection(sections[0].id);
    });
  }, []);

  useEffect(() => {
    if (sections && activeSection) {
      const activeSec = sections.find((section: Section) => section.id === activeSection);
      if (activeSec && activeSec.subSections.length > 0) {
        setActiveSubsection(activeSec.subSections[0].id);
      }
    }
  }, [activeSection]);

  return (
    <div className="h-full bg-background">
      <div className=" mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 h-[100vh] overflow-y-auto bg-[#f2f9fa]">
          {/* Left Sidebar */}
          <Leftcontainer
            subsections={
              sections?.find((section) => section.id === activeSection)
                ?.subSections
            }
            activeSubsection={activeSubsection}
            setActiveSubsection={setActiveSubsection}
          />

          <div className="h-screen overflow-auto pr-4">

            {/* Top bar containing the section buttons e.g. 'Section A' */}
            <Horizontalscroll
              sections={sections}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />

            {/* Main container for questions */}
            <SectionUI subsectionId={activeSubsection} />
          </div>
        </div>
      </div>
    </div>
  );
}

const listSections = async (companyId: string): Promise<Object[]> => {
  const raw = await fetch(
    `http://localhost:8000/company/${companyId}/sections`,{credentials:"include"}
  );
  const res = await raw.json();
  return res.data;
};
