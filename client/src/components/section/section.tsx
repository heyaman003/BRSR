import ChatBox from "@/components/chat/ChatBox";
import CommentSidebar from "../commentSidebar/comment.sidebar";
import SustainabilityLoader from "@/components/component/SustainabiltyLoader";
import BooleanInput from "@/components/question/boolean.input";
import TableUI from "@/components/question/table";
import TextQuestionUI from "@/components/question/text";
import { Button } from "@/components/ui/button";
import { Question, SubSection, Table } from "@/models/models";
import {  Loader2, MessageSquareText } from "lucide-react";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { toast } from "sonner";
import {
  fetchSubsectionData,
  updateSubsectionData,
} from "@/utils/dataFetching";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSubsection, updateTextAnswer } from "@/features/activeSubsectionData/activeSubsectionSlice";
import { RootState } from "@/store/store";



interface SectionUiArgs {
  subsectionId: string;
}

const Section: React.FC<SectionUiArgs> = ({ subsectionId }) => {
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const [loaderProgress, setLoaderProgress] = useState<number>(10);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const subsectionData: SubSection = useSelector((state: RootState)=>state.activeSubsection.data)

  const smoothScrollTo = (targetY: number, duration = 1000) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const animationStep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * progress);
      if (progress < 1) {
        requestAnimationFrame(animationStep);
      }
    };

    requestAnimationFrame(animationStep);
  };

  useEffect(() => {
    if (subsectionData) {
      const hash = window.location.hash.substring(1); // Extract question ID from hash
      if (hash) {
        const questionElement = document.getElementById(hash);
        if (questionElement) {
          const targetY =
            questionElement.getBoundingClientRect().top + window.scrollY;
          smoothScrollTo(targetY, 1000); // Scroll over 1 second
        }
      }
    }
  }, [subsectionData, window.location.hash]);

  const [selectedQuestionForComment, setSelectedQuestionForComment] =
    useState<string>("");


  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (subsectionId) {
      setIsLoaderVisible(true);
      setLoaderProgress(0);
      fetchSubsectionData(subsectionId, setLoaderProgress)
        .then((res: Object) => {
          dispatch(setActiveSubsection(res as SubSection));
        })
        .finally(() => {
          setLoaderProgress(100);
          timer = setTimeout(() => setIsLoaderVisible(false), 300);
        });
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [subsectionId]);

  useLayoutEffect(() => {
    const questionId = searchParams.get("question");
    if (questionId) {
      const questionElement = document.getElementById(questionId);
      questionElement?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams, subsectionData]);

  return isLoaderVisible ? (
    <SustainabilityLoader progress={loaderProgress} />
  ) : (
    <section className="pt-6 relative w-full flex-grow overflow-auto">
      {subsectionData && (
        <div>
          <h1 className="font-bold text-md bg-yellow-200 w-fit px-4 rounded-lg   my-3 mb-5 ">
            {subsectionData.title}
          </h1>
          {subsectionData.questions &&
            subsectionData.questions
              .map((question: Question) => (
                <div className="mb-5 py-3" key={question.id} id={question.id}>
                  <h3 className="text-center font-semibold text-green-500 text-lg mb-4">
                    {question.heading}
                  </h3>
                  <div className="flex gap-3 justify-between w-[96%]">
                    <p
                      className={`text-sm mb-2 text-green-800 font-semibold
                      `}
                    >
                      {question.desc}
                    </p>
                    <button
                      onClick={() => setSelectedQuestionForComment(question.id)}
                      className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition-colors text-sm font-medium"
                    >
                      <MessageSquareText size={18} />
                      <span className="text-base">
                        {question._count.comments}
                      </span>
                    </button>
                  </div>

                  {question.type === "TABLE" &&
                    question.answer_table &&
                    question.answer_table.map((table: Table, tableIndex: number) => (
                      <TableUI
                        key={table.id}
                        tableId={table.id}
                        questionId={question.id}
                        tableIndex={tableIndex}
                        questionIndex={question.index}
                      />
                    ))}
                  {question.type === "TEXT" && (
                    <TextQuestionUI
                      value={question.answer_text}
                      key={question.id}
                      updateTextAnswer={(answer: string) =>
                        dispatch(updateTextAnswer({questionId:question.id, answer}))
                      }
                    />
                  )}
                  {question.type === "BOOLEAN" && (
                    <BooleanInput
                      updateAnswer={(answer: string) =>
                        dispatch(updateTextAnswer({questionId:question.id, answer}))
                      }
                      answer={question.answer_text}
                    />
                  )}
                </div>
              ))}
        </div>
      )}
      {subsectionData && (
        <div>
          <Button
            disabled={isSaving}
            onClick={() => {
              setIsSaving(true);
              toast.promise(updateSubsectionData(subsectionData), {
                success: (res) => {
                  return res.message;
                },
                error: (err) => {
                  return err.message;
                },
                finally: () => setIsSaving(false),
              })
            }}
            className=" bg-yellow-500 hover:bg-yellow-600 w-24 text-white font-bold px-8 py-2 rounded-sm"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      )}
      <ChatBox />
      <CommentSidebar
        setSubsectionData={(subsectionData: SubSection)=>{dispatch(setActiveSubsection(subsectionData))}}
        closeSidebar={() => setSelectedQuestionForComment("")}
        questionId={selectedQuestionForComment}
      />
    </section>
  );
};

export default memo(Section);
