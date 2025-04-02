import ChatBox from "@/components/chat/ChatBox";
import CommentSidebar from "@/components/component/commentSidebar/comment.sidebar";
import SustainabilityLoader from "@/components/component/SustainabiltyLoader";
import BooleanInput from "@/components/Question/boolean.input";
import TableUI from "@/components/Question/table";
import TextQuestionUI from "@/components/Question/text";
import { Button } from "@/components/ui/button";
import { Question, SubSection, Table } from "@/models/models";
import { plainToInstance } from "class-transformer";
import { Loader2, MessageSquareText } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { toast } from "sonner";
import {fetchSubsectionData,updateSubsectionData} from '@/utils/dataFetching'
interface SectionUiArgs {
  subsectionId: string;
}

const Section: React.FC<SectionUiArgs> = ({ subsectionId }) => {
  const [loaderProgress, setLoaderProgress] = useState<number>(10);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [subsectionData, setSubsectionData] = useState<SubSection | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [selectedQuestionForComment, setSelectedQuestionForComment] = useState<string>("");
  // const [commentLength, setCommentLength] = useState<number>(0);
  const updateTableData = (questionId: string, tableData: Table) => {
    setSubsectionData(
      (subSection: SubSection | null) =>
        subSection && {
          ...subSection,
          questions: subSection.questions.map((question: Question) =>
            question.id === questionId
              ? {
                  ...question,
                  answer_table: question.answer_table?.map((table: Table) =>
                    table.id === tableData.id ? tableData : table
                  ),
                }
              : question
          ),
        }
    );
  };

  const updateTextAnswer = (questionId: string, answer: string) => {
    setSubsectionData(
      (subsectionData: SubSection | null) =>
        subsectionData && {
          ...subsectionData,
          questions: subsectionData.questions.map((question: Question) =>
            question.id === questionId
              ? { ...question, answer_text: answer }
              : question
          ),
        }
    );
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (subsectionId) {
      setIsLoaderVisible(true);
      setLoaderProgress(0);
      fetchSubsectionData(subsectionId, setLoaderProgress)
        .then((res: Object) => {
          setSubsectionData(plainToInstance(SubSection, res));
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

  return isLoaderVisible ? (
    <SustainabilityLoader progress={loaderProgress} />
  ) : (
    <section className="pt-6 relative h-full">
      {subsectionData && (
        <div>
          <h1 className="font-bold text-md bg-yellow-200 w-fit px-4 rounded-lg   my-3 mb-5 ">
            {subsectionData.title}
          </h1>
          {subsectionData.questions &&
            subsectionData.questions
              .sort((a, b) => a.index - b.index)
              .map((question: Question) => (
               
                <div className="mb-5 py-3" key={question.id}>
                  <div className="flex gap-3 justify-between w-[96%]">
                    <p
                      className={`text-sm mb-2 text-green-800 font-semibold
                      `}
                    >
                      {question.desc}
                    </p>
                    <button
                    onClick={()=>setSelectedQuestionForComment(question.id)}
                      className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition-colors text-sm font-medium"
                    >
                      <MessageSquareText size={18} />
                      <span className="text-base">{question._count.comments}</span>
                    </button>
                  </div>

                  {question.type === "TABLE" &&
                    question.answer_table &&
                    question.answer_table.map((table: Table) => (
                      <TableUI
                        updateTableData={(updatedTableData: Table) => {
                          updateTableData(question.id, updatedTableData);
                        }}
                        key={table.id}
                        table={table}
                      />
                    ))}
                  {question.type === "TEXT" && (
                    <TextQuestionUI
                      value={question.answer_text}
                      key={question.id}
                      updateTextAnswer={(answer: string) =>
                        updateTextAnswer(question.id, answer)
                      }
                    />
                  )}
                  {question.type === "BOOLEAN" && (
                    <BooleanInput
                      updateAnswer={(answer: string) =>
                        updateTextAnswer(question.id, answer)
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
              updateSubsectionData(subsectionData)
                .then((res) => toast.success(res.message))
                .catch((err) => toast.error(err.message))
                .finally(() => setIsSaving(false));
            }}
            className=" bg-yellow-500 hover:bg-yellow-600 w-24 text-white font-bold px-8 py-2 rounded-sm"
          >
            {isSaving ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      )}
      <ChatBox />
      <CommentSidebar setSubsectionData={setSubsectionData} closeSidebar={()=>setSelectedQuestionForComment("")} questionId={selectedQuestionForComment}/>
    </section>
  );
};

export default memo(Section);


