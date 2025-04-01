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
import { useSearchParams } from "react-router-dom";
import { EventSource } from "eventsource";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import TimeAgo from "react-timeago";

type HorizontalscrollProps = {
  activeSection: string; // Ensures activeSection is a valid key
  setActiveSection: (section: string) => void;
  sections: Section[] | null;
};

const Horizontalscroll = ({
  activeSection,
  sections,
}: HorizontalscrollProps) => {
  const [mentions, setMentions] = useState<Mention[]>([]);
  const userId = useSelector((state: RootState) => state.auth.user?.data?.id);

  // Listening to mention notifications
  useEffect(() => {
    if (userId) {
      const eventSource = new EventSource(
        `${import.meta.env.VITE_SERVER_URI}/notification/mentions/${userId}`,
        {
          withCredentials: true,
          fetch: (input, init) =>
            fetch(input, {
              ...init,
              credentials: "include",
              headers: {
                "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
              },
            }),
        }
      );
      eventSource.onmessage = (event) => {
        const { data } = JSON.parse(event.data);
        setMentions((prevMentions) => [data, ...prevMentions]);
      };
      eventSource.onerror = (error) => {
        console.log("EventSource failed:", error);
        closeNotificationListenerAPI(userId);
        eventSource.close();
      };
      const clearenceFunction = () => {
        eventSource.close();
        closeNotificationListenerAPI(userId);
      }
      window.addEventListener("beforeunload", clearenceFunction);

      return () => {
        window.removeEventListener("beforeunload", clearenceFunction)
        eventSource.close();
        closeNotificationListenerAPI(userId);
      };
    }
  }, [userId]);


  useEffect(() => {
    fetchMentions().then((res) => setMentions(res));
  }, []);
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

      <MentionsDropdown mentions={mentions} />
    </nav>
  );
};

export default Horizontalscroll;

interface MentionsContainerProps {
  mentions: Mention[];
}

const MentionsDropdown: React.FC<MentionsContainerProps> = ({ mentions }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button> */}
        <CircleUser className="text-green-600 cursor-pointer" size={35} />
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" side="left" align="start">
        <DropdownMenuLabel>Your Mentions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {mentions
            .sort((a, b) =>
              (a.createdAt || new Date()) > (b.createdAt || new Date()) ? -1 : 1
            )
            .map((mention) => (
              <a
                key={mention.id}
                target="_blank"
                href={`/brsr-making?section=${mention.sectionId}&subsection=${mention.subsectionId}&question=${mention.questionId}&company=${mention.companyId}`}
              >
                <DropdownMenuItem className="text-sm hover:bg-lime-50 hover:border-0 hover:outline-0 p-2 cursor-pointer">
                  <span className="inline-block w-full text-end text-xs text-gray-500 ">
                    <TimeAgo
                      date={
                        mention.createdAt?.toString() || new Date().toString()
                      }
                    />
                  </span>
                  <span className="text-green-500 font-semibold">
                    {mention.mentionedBy?.name}
                  </span>
                  has mentioned you in a question. Click to visit.
                </DropdownMenuItem>
              </a>
            ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-sm hover:bg-gray-50 hover:border-0 hover:outline-0 p-2 cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const fetchMentions = async () => {
  const raw = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/mentions`, {
    credentials: "include",
    headers: {
      "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
    },
  });
  const res = await raw.json();
  return res.data;
};



const closeNotificationListenerAPI = (userId: string) => {
  fetch(
    `${
      import.meta.env.VITE_SERVER_URI
    }/notification/mentions/${userId}/close`,
    {
      credentials: "include",
      keepalive: true,
      headers: {
        "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
      },
    }
  )
}