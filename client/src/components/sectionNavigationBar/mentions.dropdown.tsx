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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { CircleUser } from "lucide-react";
import TimeAgo from "react-timeago";
import UnitConverter from "../calc/Main.calc";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
import { useNavigate, useSearchParams } from "react-router-dom";
interface MentionsContainerProps {
  userId: string;
}

const MentionsDropdown: React.FC<MentionsContainerProps> = ({ userId }) => {
  const customFetch = useFetch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const fetchMentions = async () => {
    const res = await customFetch(`/user/mentions`, {
      method: "GET",
    });
    return res.data;
  };
  const fetchAssignQuestions = async () => {
    const res = await customFetch(`/user/assigned-questions`, {
      method: "GET",
    });
    return res.data;
  };

  const closeNotificationListenerAPI = (userId: string) => {
    customFetch(`/notification/mentions/${userId}/close`, {
      method: "GET",
      keepalive: true,
    });
  };

  // Listening to mention notifications
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [open, setOpen] = useState(false);

  const [newNewNotificationCount, setNewNotificationCount] =
    useState<number>(0);

  useEffect(() => {
    fetchMentions().then((res) => setMentions(res));
    fetchAssignQuestions().then((res) => console.log(res) );
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
        console.log("Mentions data", data);
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
    <>
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
              <span className="flex rounded-full bg-red-500 -top-1 -right-1 absolute text-xs text-white size-4 justify-center items-center font-semibold ">
                {newNewNotificationCount}
              </span>
            ) : (
              <></>
            )}
          </span>
          {/* </Button> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80" side="left" align="start">
          <DropdownMenuLabel>Your Mentions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="max-h-72 overflow-auto">
            {mentions.length === 0 ? (
              <div className="text-sm text-center text-gray-500">
                No Mentions
              </div>
            ) : (
              mentions
                .sort((a, b) =>
                  (a.createdAt || new Date()) > (b.createdAt || new Date())
                    ? -1
                    : 1
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
                            mention.createdAt?.toString() ||
                            new Date().toString()
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
                ))
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer" onClick={() =>
                navigate(`/company?id=${searchParams.get("company")}`)
              }>
            <button
            >
              Company Details
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-sm hover:bg-gray-50 hover:border-0 hover:outline-0 p-2 cursor-pointer"
          >
            Calculator
          </DropdownMenuItem>

          <DropdownMenuItem className="text-sm hover:bg-gray-50 hover:border-0 hover:outline-0 p-2 cursor-pointer">
            <button
              onClick={() =>
                customFetch(`/auth/logout`, {
                  method: "POST",
                }).then(() => navigate("/login"))
              }
            >
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl overflow-y-auto max-h-screen">
          <DialogHeader>
            <DialogTitle>Unit Converter</DialogTitle>
          </DialogHeader>
          <UnitConverter />
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MentionsDropdown;
