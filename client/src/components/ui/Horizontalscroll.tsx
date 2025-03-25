import { cn } from "@/lib/utils";
import { Section } from "@/models/models";


type HorizontalscrollProps = {
  activeSection: string; // Ensures activeSection is a valid key
  setActiveSection: (section: string) => void;
  sections: Section[] | null
};


const Horizontalscroll = ({
  activeSection,
  setActiveSection,
  sections
}: HorizontalscrollProps) => {
  return (
    <div>
      <div className="w-[90%]">
        <div className="overflow-y-auto flex justify-betwwen gap-10 w-[90%] rw-full  pt-7">
          {sections && sections.sort((a, b)=>a.title.localeCompare(b.title)).map((section: Section) => (
            <button
              onClick={() => setActiveSection(section.id)}
              key={section.id}
              className={cn(
                "px-4 py-2 rounded-md text-md font-bold whitespace-nowrap w-[100%] md:w-[30.3%]",
                `${
                  activeSection !== section.id ? "bg-[#8dcba3]" : "bg-[#04b52d]"
                } text-primary-foreground hover:bg-[#04b52d]  tracking-[2px]`
              )}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Horizontalscroll;