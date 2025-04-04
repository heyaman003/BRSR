import  { useState } from "react";
import { cn } from "@/lib/utils";
import { Section } from "@/models/models";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import MentionsDropdown from "./mentions.dropdown";

type HorizontalscrollProps = {
  activeSection: string; // Ensures activeSection is a valid key
  setActiveSection: (section: string) => void;
  sections: Section[] | null;
};

const Horizontalscroll = ({
  activeSection,
  sections,
}: HorizontalscrollProps) => {
  const userId = useSelector((state: RootState) => state.auth.user?.data?.id);

  const [_searchParams, setSearchParams] = useSearchParams();
 
  return (
    <nav className="top-0 w-full flex justify-between items-center py-4 mt-2 bg-[#f2f9fa] z-10 pr-4">
      <div className="overflow-y-auto flex justify-betwwen gap-10 w-full">
        {sections &&
          sections
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((section: Section) => (
              <button
                onClick={() =>
                  setSearchParams((params) => {
                    params.set("section", section.id);
                    return params;
                  })
                }
                key={section.id}
                className={cn(
                  " px-8 py-2 rounded-md text-md font-bold whitespace-nowrap",
                  `${
                    activeSection !== section.id
                      ? "bg-[#8dcba3]"
                      : "bg-[#04b52d]"
                  } text-primary-foreground hover:bg-[#04b52d] tracking-[2px]`
                )}
              >
                {section.title}
              </button>
            ))}
            
      </div>

      <MentionsDropdown userId={userId} />
      
    </nav>
  );
};

export default Horizontalscroll;
