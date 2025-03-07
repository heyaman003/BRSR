import { useState } from "react";


const TextQuestionUI = () => {
    const [answer, setAnswer] = useState('')
  return (
    <input
      // type={question.type}
      onChange={(e)=>setAnswer(e.target.value)}
      value={answer}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                                                  ring-offset-background file:border-0 file:bg-transparent
                                                  file:text-sm file:font-medium placeholder:text-muted-foreground
                                                  focus-visible:outline-none focus-visible:ring-2
                                                  focus-visible:ring-ring focus-visible:ring-offset-2
                                                  disabled:cursor-not-allowed disabled:opacity-50`}
    />
  );
};

export default TextQuestionUI;
