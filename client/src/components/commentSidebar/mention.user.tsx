import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/use-fetch";
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
  const customFetch = useFetch()
  const [users, setUsers] = useState<User[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [isAddingComment, setIsAddingComment] = useState<boolean>(false);
  const [mentions, setMentions] = useState<MentionItem[]>([]);

  const loadCompanyUsers = async (
    companyId: string | null
  ): Promise<Object | void> => {
    try {
      if (!companyId) throw new Error("Company not found.");


      const res = await customFetch(
        `/company/${companyId}`,
        {
          method: "GET",
        }
      );

      if (res.statusCode > 399 || res.statusCode < 200) throw new Error(res.message);
      return res.data.users;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  async function addComent(
    questionId: string,
    comment: string,
    mentions: string[]
  ) {
    try {
      const res = await customFetch(`/comment`, {
        method: "POST",
        body: {
          questionId,
          data: comment,
          mentions,
        }
      });
      if (res.statusCode < 200 || res.statusCode >= 400) throw new Error(res.message);
      return res.data;
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      throw e;
    }
  }

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

  return (
    <div className="flex flex-col mt-4 ">
      <MentionsInput
        allowSpaceInQuery={true}
        forceSuggestionsAboveCursor={true}
        placeholder="Write a comment..."
        style={{
          "&multiLine": {
            control: {
              fontSize: 14,
            },
            highlighter: {
              padding: 9,
              border: "2px solid green",
              height: "80px",
              borderRadius: "5px",
            },
            input: {
              padding: 9,
              border: "2px solid green",
              borderRadius: "5px",
              height: "80px",
              color: "#2e2e2e",
            },
          },
        }}
        // className="h-[80px] resize-none border border-green-500 rounded-sm focus:ring-green-500 transition-all px-4"
        value={commentText}
        onChange={(_e, newValue, _newTextValue, mentions) => {
          setCommentText(newValue);
          setMentions(mentions);
        }}
        customSuggestionsContainer={(children) => (
          <ul className="focus:border-4">{children}</ul>
        )}
      >
        <Mention
          displayTransform={(_id, display) => `@${display}`}
          appendSpaceOnAdd={true}
          trigger={"@"}
          style={{
            backgroundColor: "rgb(187 247 208)",
            color: "white",
          }}
          data={users.map((user) => ({ id: user.id, display: user.name }))}
          renderSuggestion={(
            _suggestion,
            _search,
            highlightedDisplay,
            _index,
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
          addComent(
            questionId,
            commentText,
            mentions.map((mention) => mention.id)
          )
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
