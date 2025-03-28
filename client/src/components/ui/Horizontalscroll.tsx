import { cn } from "@/lib/utils";
import { Mention, Section } from "@/models/models";
import { CircleUser } from "lucide-react";
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";

type HorizontalscrollProps = {
  activeSection: string; // Ensures activeSection is a valid key
  setActiveSection: (section: string) => void;
  sections: Section[] | null;
};

const Horizontalscroll = ({
  activeSection,
  setActiveSection,
  sections,
}: HorizontalscrollProps) => {
  const [mentions, setMentions] = useState<Mention[]>([]);

  useEffect(()=>{
    fetchMentions().then(res=>setMentions(res))
  }, [])

  return (
      <nav className="sticky top-0 w-full flex justify-between items-center py-4 mt-2 bg-[#f2f9fa] z-50">
        <div className="overflow-y-auto flex justify-betwwen gap-10 w-full">
          {sections &&
            sections
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((section: Section) => (
                <button
                  onClick={() => setActiveSection(section.id)}
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

        <MentionsContainer mentions={mentions} />
      </nav>
  );
};

export default Horizontalscroll;


interface MentionsContainerProps {
  mentions: Mention[]
}

const MentionsContainer: React.FC<MentionsContainerProps> = ({mentions}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button> */}
          <CircleUser className="text-green-600 cursor-pointer" size={30} />
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" side="left" align="start">
        <DropdownMenuLabel>Your Mentions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {
            mentions.map(mention=><DropdownMenuItem key={mention.id} className="text-sm hover:bg-lime-50 hover:border-0 hover:outline-0 p-2 cursor-pointer"><span className="text-green-500 font-semibold">{mention.mentionedBy?.name}</span> has mentioned you in a question. Click to visit.</DropdownMenuItem>)
          }
        </DropdownMenuGroup>
        <DropdownMenuSeparator/>
        <DropdownMenuItem className="text-sm hover:bg-gray-50 hover:border-0 hover:outline-0 p-2 cursor-pointer">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};



const fetchMentions = async () => {
  const raw = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/mentions`, {
    credentials: 'include',
    headers: {
      'X-Csrf-Token': sessionStorage.getItem('X-Csrf-Token') || ''
    }
  });
  const res = await raw.json();
  return res.data;
}