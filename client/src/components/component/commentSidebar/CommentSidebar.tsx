import { Loader2, MessageSquare, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
} from "../../ui/sidebar";
import { Tabs } from "../../ui/tabs";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import ViewComments from "./ViewComments";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaRegPaperPlane } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { plainToInstance } from "class-transformer";
import ViewHistory from "./ViewHistory";
import {  SubSection } from "@/models/models";

const CommentSidebar = ({
  questionId,
  subsectionData,
  closeSidebar,
}: {
  questionId: string;
  subsectionData: SubSection | null;
  closeSidebar: () => void;
}) => {
  const [commentText, setCommentText] = useState<string>("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false);

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

        <SidebarFooter>
          <div className="flex flex-col mt-4 ">
            <Textarea
              placeholder="Write a comment..."
              className="min-h-[80px] resize-none border-green-500 focus:ring-green-500 transition-all"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Button
              disabled={isAddingComment}
              onClick={() => {
                setIsAddingComment(true);
                addComent(questionId, commentText)
                  .then((res) => {
                    setComments((prevComments) => [res, ...prevComments]);
                    
                    setCommentText("");
                  })
                  .finally(() => setIsAddingComment(false));
              }}
              className="bg-green-600 hover:bg-green-500 text-white font-semibold my-3"
            >
              {isAddingComment ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <FaRegPaperPlane />
                  Submit
                </>
              )}
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default CommentSidebar;

async function addComent(questionId: string, comment: string) {
  try {
    const raw = await fetch(`${import.meta.env.VITE_SERVER_URI}/comment`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        questionId,
        data: comment,
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
      },
    });
    const res = await raw.json();
    if (raw.status < 200 || raw.status >= 400) throw new Error(res.message);
    return res.data;
  } catch (e) {
    if (e instanceof Error) toast.error(e.message);
    throw e;
  }
}

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
