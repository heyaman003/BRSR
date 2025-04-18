import { RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TextareaAutosize from 'react-textarea-autosize';

interface TextQuestionUIArgs {
  updateTextAnswer: (answer: string) => void;
  value: string | undefined;
  assignedToId:string | undefined
}

const TextQuestionUI: React.FC<TextQuestionUIArgs> = ({ updateTextAnswer, value ,assignedToId}) => {
  const [answer, setAnswer] = useState(value || '');
  const role: string = useSelector((state: RootState) => state.auth.user?.data.role);
  const userId: string = useSelector((state: RootState) => state.auth.user?.data.id);
   console.log("the value is-----",role,userId,assignedToId)
  useEffect(() => {
    updateTextAnswer(answer);
  }, [answer]);

  useEffect(()=>{
    if(value!==answer && value)
      setAnswer(value)
  }, [value])

  return (
    <TextareaAutosize
    minRows={1}
    maxRows={5}
    disabled={role === "CLIENT" && userId !== assignedToId}
  onChange={(e) =>setAnswer(e.target.value)}
  value={answer}
  className={`resize-none ml-1 flex  rounded-md border border-input bg-background px-3 py-2 text-sm
              file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground
              hover:bg-blue-50 active:bg-blue-50 focus:bg-blue-50
              disabled:cursor-not-allowed disabled:opacity-50 outline-none w-[97%]`}
/>


  );
};

export default TextQuestionUI;
