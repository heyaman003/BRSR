import { cn } from "@/lib/utils";
const topSections = ["A", "B", "C"];
const sectionsd = {
  A: "Section A",
  B: "Section B",
  C:"Section C",
};

type HorizontalscrollProps = {
  activeSection: keyof typeof sectionsd; // Ensures activeSection is a valid key
  setActiveSection: (section: keyof typeof sectionsd) => void;
};


const Horizontalscroll = ({
  activeSection,
  setActiveSection,
}: HorizontalscrollProps) => {
  return (
    <div>
      <div className="w-[90%]">
        <div className="overflow-y-auto flex justify-betwwen gap-10 w-[90%] rw-full  pt-7">
          {topSections.map((section) => (
            <button
              onClick={() => setActiveSection(section as keyof typeof sectionsd)}
              key={section}
              className={cn(
                "px-4 py-2 rounded-md text-md font-bold whitespace-nowrap w-[100%] md:w-[30.3%]",
                `${
                  activeSection !== section ? "bg-[#8dcba3]" : "bg-[#04b52d]"
                } text-primary-foreground hover:bg-[#04b52d]  tracking-[2px]`
              )}
            >
              SECTION {section}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Horizontalscroll;
