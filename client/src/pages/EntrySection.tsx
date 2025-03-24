import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSectiondata } from "../features/sections/sectionSlice";
import type { AppDispatch } from "@/store/store.ts";
import Leftcontainer from "@/components/dashboard/Leftcontainer";
import Horizontalscroll from "@/components/ui/Horizontalscroll";
import { Section } from "@/models/models";
import { plainToInstance } from "class-transformer";
import SectionUI from "./Section";
import {
  selectIsLoading,
  selectSectionError,
} from "@/features/sections/sectionSelectors";
import { RootState } from "@/store/store";
import CommentSidebar from "@/components/component/commentSidebar/CommentSidebar";
export default function QuestionnairePage() {
  const [sections, setSections] = useState<Section[] | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [activeSubsection, setActiveSubsection] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>(); // Properly typed dispatch


  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectSectionError);
  const companyId = useSelector(
    (state: RootState) => state?.auth?.user?.data?.companyId
  );

  useEffect(() => {
    const sectionDataHandler = async () => {
      const resultAction = await dispatch(
        getSectiondata({ companyID: companyId })
      );
      const sections: Section[] = plainToInstance(
        Section,
        resultAction?.payload?.data
      );
      setSections(sections);
      setActiveSection(sections[0]?.id);
    };
    sectionDataHandler();
  }, []);

  useEffect(() => {
    if (sections && activeSection) {
      const activeSec = sections.find(
        (section: Section) => section.id === activeSection
      );
      if (activeSec && activeSec?.subsections?.length > 0) {
        setActiveSubsection(activeSec.subsections[0].id);
      }
    }
    // console.log("the section is is",activeSection)
  }, [activeSection]);


  return (
    <div className="h-full">
      <div className=" mx-auto ">
        {/* For the comment sidebar */}
          {/* <SidebarInset> */}
          <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 h-[100vh] overflow-y-auto bg-[#f2f9fa]">
            {/* Left Sidebar */}
            <Leftcontainer
              activeSection={activeSection}
              subsections={
                sections?.find((section) => section.id === activeSection)
                  ?.subsections
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
            {activeSection==="C"}
            {/* Main container for questions */}
            <SectionUI activeSection={activeSection} subsectionId={activeSubsection} />
          </div>
        </div>
      </div>
    </div>
  );
}
