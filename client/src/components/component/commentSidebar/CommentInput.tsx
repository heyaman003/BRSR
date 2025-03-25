import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { Comment } from "@/models/models";
import { RootState } from "@/store/store";
import { plainToInstance } from "class-transformer";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import { Mention, MentionItem, MentionsInput } from "react-mentions";
import { useSelector } from "react-redux";
import { toast } from "sonner";

interface CommentInputProps {
  setComments: Dispatch<SetStateAction<Comment[]>>;
  questionId: string;
}

const CommentInput: React.FC<CommentInputProps> = ({
  setComments,
  questionId,
}) => {
  const companyId = useSelector(
    (root: RootState) => root.auth.user?.data?.companyId
  );
  const [users, setUsers] = useState<User[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false);
  const [mentions, setMentions] = useState<MentionItem[]>([]);

  useEffect(() => {
    if (companyId)
      loadCompanyUsers(companyId).then((users) => {
        if (Array.isArray(users)) {
          setUsers(plainToInstance(User, users) as User[]);
        } else {
          console.error("Expected an array of users but received:", users);
        }
      });
  }, [companyId]);

  useEffect(()=>{console.log(mentions)}, [mentions])

  return (
    <div className="flex flex-col mt-4 ">
      <MentionsInput
        allowSpaceInQuery={true}
        forceSuggestionsAboveCursor={true}
        placeholder="Write a comment..."
        style={{
          "&multiLine": {
            control: {
                fontSize: 14
            },
            highlighter: {
              padding: 9,
              border: "2px solid green",
              height: '80px',
              borderRadius: '5px',
            },
            input: {
              padding: 9,
              border: "2px solid green",
              borderRadius: '5px',
              height: '80px',
              color: '#2e2e2e'
            },
          },
        }}
        // className="h-[80px] resize-none border border-green-500 rounded-sm focus:ring-green-500 transition-all px-4"
        value={commentText}
        onChange={(e, newValue, newTextValue, mentions) => {
          setCommentText(newValue);
          setMentions(mentions)
        }}
        customSuggestionsContainer={(children) => (
          <ul className="focus:border-4">{children}</ul>
        )}
      >
        <Mention
          displayTransform={(id, display) => `@${display}`}
          appendSpaceOnAdd={true}
          trigger={"@"}
          style={{
            backgroundColor: 'rgb(187 247 208)',
            color: "white"
          }}
          data={users.map((user) => ({ id: user.id, display: user.name }))}
          renderSuggestion={(
            suggestion,
            search,
            highlightedDisplay,
            index,
            focused
          ) => (
            <li
              className={`py-2 px-3 inline-block w-32 hover:bg-green-200 ${
                focused ? "bg-green-200" : "bg-green-100"
              } text-gray-600`}
            >
              {highlightedDisplay}
            </li>
          )}
        />
      </MentionsInput>

      <Button
        disabled={isAddingComment}
        onClick={() => {
          setIsAddingComment(true);
          addComent(questionId, commentText, mentions.map(mention=>mention.id))
            .then((res) => {
              setComments((prevComments: Comment[]) => [res, ...prevComments]);
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
  );
};

export default CommentInput;

const loadCompanyUsers = async (
  companyId: string | null
): Promise<Object | void> => {
  try {
    if (!companyId) throw new Error("Company not found.");

    const raw = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/company/${companyId}`,
      {
        credentials: "include",
        headers: {
          "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
        },
      }
    );
    const res = await raw.json();

    if (raw.status > 399 || raw.status < 200) throw new Error(res.message);
    return res.data.users;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

async function addComent(questionId: string, comment: string, mentions: string[]) {
  try {
    const raw = await fetch(`${import.meta.env.VITE_SERVER_URI}/comment`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        questionId,
        data: comment,
        mentions
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
