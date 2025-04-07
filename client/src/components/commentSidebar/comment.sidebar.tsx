import { MessageSquare, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "../ui/sidebar";
import { Tabs } from "../ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import ViewComments from "./view.comments";
import ViewHistory from "./view.history";
import CommentInput from "./comment.Input";
import { useEffect, useState } from "react";
import { Comment, SubSection } from "@/models/models";
import { toast } from "sonner";
import { plainToInstance } from "class-transformer";

const CommentSidebar = ({
  questionId,
  closeSidebar,
}: {
  questionId: string;
  setSubsectionData: (subsection:SubSection) => void;
  closeSidebar: () => void;
}) => {
  const [comments, setComments] = useState<Comment[]>([]);


  useEffect(() => {
    if (questionId)
      fetchComments(questionId).then((comment) =>
        setComments(plainToInstance(Comment, comment) as Comment[])
      );
  }, [questionId]);


  return (
    <SidebarProvider
      open={questionId !== ""}
      style={
        {
          "--sidebar-width": "25rem",
          "--sidebar-width-mobile": "20rem",
        } as React.CSSProperties
      }
    >
      <Sidebar side="right">
        <SidebarHeader>
          <div className=" flex justify-between m-3">
            <span className="flex gap-3 font-semibold text-lg items-center">
              <MessageSquare className="text-green-600" />
              Comments
            </span>
            <button onClick={closeSidebar}>
              <X className="text-gray-500" size={20} />
            </button>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-2">
          <Tabs defaultValue="comments" defaultChecked={true}>
            <TabsList className="grid sticky top-0 w-full grid-cols-2 gap-4">
              <TabsTrigger
                value="comments"
                className=" bg-[#04b52d] text-sm font-medium text-white rounded-md py-2 px-3 focus:bg-[#1b8f36]"
              >
                View Comments
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="bg-[#04b52d] text-sm font-medium text-white rounded-md py-2 px-3 focus:bg-[#1b8f36]"
              >
                View History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <ViewHistory questionId={questionId} />
            </TabsContent>
            <TabsContent value="comments">
              <ViewComments comments={comments} />
            </TabsContent>
          </Tabs>
        </SidebarContent>

        <SidebarFooter className="relative">
          <CommentInput questionId={questionId} setComments={setComments}/>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default CommentSidebar;




async function fetchComments(questionId: string) {
  try {
    const raw = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/comment?question=${questionId}`,
      {
        credentials: "include",
        headers: {
          "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
        },
      }
    );
    const res = await raw.json();
    if (raw.status < 200 || raw.status >= 400) throw new Error(res.message);
    return res.data;
  } catch (e) {
    if (e instanceof Error) toast.error(e.message);
    throw e;
  }
}