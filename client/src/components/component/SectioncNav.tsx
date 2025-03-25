import React, { useState } from "react";
import { ChevronRight, ChevronDown, Leaf, BarChart2, Globe, Settings, MessageCircle, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubSection } from "@/models/models";
interface SubSection1 {
  id: number;
  title: string;
}

interface Section1 {
  id: number;
  title: string;
  icon: React.ReactNode;
  subsections: SubSection1[];
}

const sections: Section1[] = [
  {
    id: 1,
    title: "Principal",
    icon: <Leaf className="w-5 h-5" />,
    subsections: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      title: `Eco Metric ${i + 1}`
    }))
  },
  {
    id: 2,
    title: "Principal",
    icon: <BarChart2 className="w-5 h-5" />,
    subsections: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      title: `Sustainability Report ${i + 1}`
    }))
  },
  {
    id: 3,
    title: "Principal",
    icon: <Globe className="w-5 h-5" />,
    subsections: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      title: `Initiative ${i + 1}`
    }))
  },
  {
    id: 4,
    title: "Principal",
    icon: <Settings className="w-5 h-5" />,
    subsections: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      title: `Eco Setting ${i + 1}`
    }))
  },
  {
    id: 5,
    title: "Principal",
    icon: <MessageCircle className="w-5 h-5" />,
    subsections: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      title: `Community Forum ${i + 1}`
    }))
  },
  {
    id: 6,
    title: "Principal",
    icon: <UserCircle className="w-5 h-5" />,
    subsections: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      title: `Sustainability Goal ${i + 1}`
    }))
  },
  {
    id: 7,
    title: "Principal",
    icon: <UserCircle className="w-5 h-5" />,
    subsections: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      title: `Sustainability Goal ${i + 1}`
    }))
  },
  {
    id: 8,
    title: "Principal",
    icon: <UserCircle className="w-5 h-5" />,
    subsections: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      title: `Sustainability Goal ${i + 1}`
    }))
  },
  {
    id: 9,
    title: "Principal",
    icon: <UserCircle className="w-5 h-5" />,
    subsections: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      title: `Sustainability Goal ${i + 1}`
    }))
  }
];
 
type MainNavigationProps = {
  subsections: SubSection[] | undefined;
}
const MainNavigationforC: React.FC<MainNavigationProps> = ({subsections}) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  // const [loaderProgress, setLoaderProgress] = useState<number>(10);
  console.log("the subsections are",subsections)
  const toggleSection = (sectionId: number) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="nav-container h-screen  bg-green-50/80  shadow-sm overflow-hidden">
      <div className="py-4 px-3">
        {sections.map((section) => (
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
                <div className="text-green-600">{section.icon}</div>
                <span className="font-medium">{section.title} {section.id }</span>
              </div>
              {activeSection === section.id ? (
                <ChevronDown className="h-4 w-4 text-green-600" />
              ) : (
                <ChevronRight className="h-4 w-4 text-green-600" />
              )}
            </button>
            <div
              className={cn(
                "subsection-container pl-8 pr-3",
                activeSection === section.id ? "active" : ""
              )}
            >
              {section.subsections.map((subsection, index) => (
                <div
                  key={subsection.id}
                  className="subsection"
                  style={{ "--index": index } as React.CSSProperties}
                >
                  <a
                    href="#"
                    className="block py-2 px-3 my-1 rounded-md text-green-700 hover:bg-green-50 hover:text-green-900 text-sm transition-colors"
                  >
                    {subsection.title} 
                  </a>
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