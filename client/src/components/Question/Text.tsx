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
      // type={question.type}
      onChange={(e) => setAnswer(e.target.value)}
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
