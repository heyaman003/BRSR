import { useState } from "react";

const TextQuestionUI = () => {
  const [answer, setAnswer] = useState("");
  return (
    <input
  onChange={(e) => setAnswer(e.target.value)}
  value={answer}
  className={`flex h-10 w-[96%] rounded-md border border-input bg-background px-3 py-2 text-sm 
    ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
    placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 
    outline-none focus:outline-none focus-visible:outline-none hover:outline-none`}
/>
  );
};

export default TextQuestionUI;
