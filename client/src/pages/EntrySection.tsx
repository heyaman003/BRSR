import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getSectiondata } from '../features/sections/sectionSlice';
import type { AppDispatch } from '@/store/store.ts';
import Leftcontainer from "@/components/dashboard/Leftcontainer";
import Horizontalscroll from "@/components/ui/Horizontalscroll";
import { Section } from "@/models/models";
import { plainToInstance } from "class-transformer";
import SectionUI from "./Section";
import { selectIsLoading, selectSectionError } from '@/features/sections/sectionSelectors';
import { RootState } from "@/store/store";
export default function QuestionnairePage() {
  const [sections, setSections] = useState<Section[] | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [activeSubsection, setActiveSubsection] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>(); // Properly typed dispatch

  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectSectionError);
  const companyId =useSelector((state: RootState) => state?.auth?.user?.data?.companyId);
 
  useEffect(() => {
   const sectionDataHandler=async()=>{
    const resultAction = await dispatch(getSectiondata({companyID:companyId}));
    console.log(resultAction?.payload?.data,"the main thing-----------")
    const sections: Section[] = plainToInstance(Section, resultAction?.payload?.data);
    setSections(sections);
    console.log(sections,"the section data is ----")
    setActiveSection(sections[0]?.id);
   }
   sectionDataHandler();
  }, []);

  useEffect(() => {
    if (sections && activeSection) {
      const activeSec = sections.find(
        (section: Section) => section.id === activeSection
      );
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
            activeSection={activeSection}
            subsections={
              sections?.find((section) => section.id === activeSection)
                ?.subSections
            }
            activeSubsection={activeSubsection}
            setActiveSubsection={setActiveSubsection}
          />

          <div className="h-screen overflow-auto pr-4 relative">
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

