import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "../ui/button";
import { RootState } from "@/store/store";
import {useFetch} from "@/hooks/use-fetch";
import { useSearchParams } from "react-router-dom";
import { Question } from "@/models/models";
import { toast } from "sonner";
import { updateQuestionApproval } from "@/features/activeSubsectionData/activeSubsectionSlice";

interface TextQuestionUIArgs {
  updateTextAnswer: (answer: string) => void;
  value: string | undefined;
  assignedToId: string | undefined;
  approveToId: string | undefined;
  question:Question ;
}

const TextQuestionUI: React.FC<TextQuestionUIArgs> = ({
  updateTextAnswer,
  value,
  assignedToId,
  approveToId,
  question

}) => {
  const [answer, setAnswer] = useState(value || "");
  const dispatch=useDispatch();
  const role: string = useSelector(
    (state: RootState) => state.auth.user?.data.role
  );
  const userId: string = useSelector(
    (state: RootState) => state.auth.user?.data.id
  );
  const customFetch=useFetch();
// inside your component
const [searchParams] = useSearchParams();
const subsectionId = searchParams.get("subsection"); // NOT section
const company = searchParams.get("company");
 
  const handleApprove = async () => {
    console.log(subsectionId, company);
    const res = await customFetch(`/section/${company}/subsection/${subsectionId}/question/${question.id}`, { method: "PATCH", body:question } );
  console.log(res);
   if (res.statusCode > 399 || res.statusCode < 200)
   toast.error("Error approving question");
   dispatch(updateQuestionApproval({questionId:question.id}));
   toast.success("Question approved successfully");
   return res.data;
  };

  useEffect(() => {
    updateTextAnswer(answer);
  }, [answer]);

  useEffect(() => {
    if (value !== answer && value) setAnswer(value);
  }, [value]);

  return (
    <>
      <TextareaAutosize
        minRows={1}
        maxRows={5}
        disabled={role === "CLIENT" && userId !== assignedToId}
        onChange={(e) => setAnswer(e.target.value)}
        value={answer}
        className={`resize-none ml-1 flex  rounded-md border border-input bg-background px-3 py-2 text-sm
              file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground
              hover:bg-blue-50 active:bg-blue-50 focus:bg-blue-50
              disabled:cursor-not-allowed disabled:opacity-50 outline-none w-[97%]`}
      />
      {!question.isApproved&& userId === approveToId  && answer.length > 1 && (
        <Button variant="destructive" onClick={handleApprove}>
          Approve
        </Button>
      )}
    </>
  );
};

export default TextQuestionUI;
