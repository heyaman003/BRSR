import React, { useEffect, useState } from "react";

interface TextQuestionUIArgs {
  updateTextAnswer: (answer: string) => void;
  value: string | undefined;
}

const TextQuestionUI: React.FC<TextQuestionUIArgs> = ({ updateTextAnswer, value }) => {
  const [answer, setAnswer] = useState(value || '');

  useEffect(() => {
    updateTextAnswer(answer);
  }, [answer]);

  return (
    <input
  onChange={(e) => setAnswer(e.target.value)}
  value={answer}
  className={`flex h-10  rounded-md border border-input bg-background px-3 py-2 text-sm
              file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground
              hover:bg-blue-50 active:bg-blue-50 focus:bg-blue-50
              disabled:cursor-not-allowed disabled:opacity-50 outline-none w-[97%]`}
/>


  );
};

export default TextQuestionUI;
