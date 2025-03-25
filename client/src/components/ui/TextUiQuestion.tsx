import React,{useState,useEffect} from 'react';
import CommentSection from './Comment';

interface TextQuestionUIProps {
  value: string|undefined;
  updateTextAnswer: (answer: string) => void;
  comments?: string[];
  updateComments?: (comments: string[]) => void;
}


const TextQuestionUI: React.FC<TextQuestionUIProps> = ({ 
  value, 
  updateTextAnswer,
  comments = [],
  updateComments = () => {}
}) => {
    const [answer, setAnswer] = useState(value || '');

    useEffect(() => {
      updateTextAnswer(answer);
    }, [answer]);
  return (
    <div className="w-full">
     <input
  onChange={(e) => setAnswer(e.target.value)}
  value={answer}
  className={`flex h-10  rounded-md border border-input bg-background px-3 py-2 text-sm
              file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground
              hover:bg-blue-50 active:bg-blue-50 focus:bg-blue-50
              disabled:cursor-not-allowed disabled:opacity-50 outline-none w-[97%]`}
/>

      <CommentSection 
        comments={comments} 
        updateComments={updateComments} 
        commentCount={comments.length}
      />
    </div>
  );
};

export default TextQuestionUI;