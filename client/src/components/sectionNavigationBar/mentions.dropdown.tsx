import { Mention } from "@/models/models";
import { useEffect, useState } from "react";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { EventSource } from "eventsource";
import { CircleUser } from "lucide-react";
import TimeAgo from "react-timeago";

interface MentionsContainerProps {
  userId: string;
}

const MentionsDropdown: React.FC<MentionsContainerProps> = ({ userId }) => {
  // Listening to mention notifications
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [newNewNotificationCount, setNewNotificationCount] =
    useState<number>(0);

  useEffect(() => {
    fetchMentions().then((res) => setMentions(res));
  }, []);

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
      };
      window.addEventListener("beforeunload", clearenceFunction);

      return () => {
        window.removeEventListener("beforeunload", clearenceFunction);
        eventSource.close();
        closeNotificationListenerAPI(userId);
      };
    }
  }, [userId]);

  useEffect(() => {
    let newNewNotificationCount = 0;
    mentions.forEach((mention) => {
      if (!localStorage.getItem(`notification-${mention.id}`))
        newNewNotificationCount++;
    });
    setNewNotificationCount(newNewNotificationCount);
  }, [mentions]);

  const viewNotifications = () => {
    mentions.forEach((mention) =>
      localStorage.setItem(`notification-${mention.id}`, "1")
    );
    setNewNotificationCount(0);
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) viewNotifications();
      }}
    >
      <DropdownMenuTrigger asChild>
        {/* <Button> */}
        <span className="relative">
          <CircleUser className="text-green-600 cursor-pointer" size={35} />
          {newNewNotificationCount ? (
            <span className="flex rounded-full bg-red-500 -top-1 -right-1 absolute text-xs text-white size-4 justify-center items-center font-semibold ">{newNewNotificationCount}</span>
          ) : (
            <></>
          )}
        </span>
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
                <DropdownMenuItem className="text-sm hover:bg-lime-50 hover:border-0 hover:outline-0 p-2 cursor-pointer flex flex-col">
                  <div className="inline-block w-full text-end text-xs text-gray-500 ">
                    <TimeAgo
                      date={
                        mention.createdAt?.toString() || new Date().toString()
                      }
                    />
                  </div>
                  <div>
                    <span className="text-green-500 font-semibold mx-1">
                      {mention.mentionedBy?.name}
                    </span>
                    has mentioned you in a question. Click to visit.
                  </div>
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

export default MentionsDropdown;

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
    `${import.meta.env.VITE_SERVER_URI}/notification/mentions/${userId}/close`,
    {
      credentials: "include",
      keepalive: true,
      headers: {
        "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
      },
    }
  );
};
