// import SectionCTable2 from "@/components/sectionC/SectionCTable2";
import SustainabilityLoader from "@/components/component/SustainabiltyLoader";
import BooleanInput from "@/components/Question/BooleanInput";
import TableUI from "@/components/Question/Table";
import TextQuestionUI from "@/components/Question/Text";
import { Button } from "@/components/ui/button";
import { Question, SubSection, Table } from "@/models/models";
import { plainToInstance } from "class-transformer";
import { Loader2 } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { toast } from "sonner";

interface SectionUiArgs {
  subsectionId: string;
}

const Section: React.FC<SectionUiArgs> = ({ subsectionId }) => {
  const [loaderProgress, setLoaderProgress] = useState<number>(10);
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  const [subsectionData, setSubsectionData] = useState<SubSection | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

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
            subsectionData.questions.map((question: Question) => (
              <div className="mb-5" key={question.id}>
                <p
                  className={`text-sm  font-bold   mb-2  ${
                    question.type === "table" && "text-green-700 font-semibold"
                  }`}
                >
                  {question.desc}
                </p>
                {question.type === "table" &&
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
                {question.type === "text" && (
                  <TextQuestionUI
                    value={question.answer_text}
                    key={question.id}
                    updateTextAnswer={(answer: string) =>
                      updateTextAnswer(question.id, answer)
                    }
                  />
                )}
                {question.type === "boolean" && (
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
    </section>
  );
};

export default memo(Section);

const fetchSubsectionData = async (
  subsectionId: string,
  updateProgress: (value: number) => void
) => {
  updateProgress(10);
  const raw = await fetch(
    `${import.meta.env.VITE_SERVER_URI}/section/subsection/${subsectionId}`,
    { credentials: "include", headers: {'X-Csrf-Token': sessionStorage.getItem('X-Csrf-Token') || ''} }
  );
  updateProgress(50);
  const res = await raw.json();
  await new Promise((res: any, rej: any) =>
    setTimeout(() => {
      updateProgress(90);
      res();
    }, 500)
  );

  return res.data;
};

const updateSubsectionData = async (subsectionData: SubSection) => {
  const raw = await fetch(
    `${import.meta.env.VITE_SERVER_URI}/section/subsection/${subsectionData.id}`,
    {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'X-Csrf-Token': sessionStorage.getItem('X-Csrf-Token') || ''
      },
      body: JSON.stringify(subsectionData),
    }
  );
  const res = await raw.json();
  if (raw.status < 200 || raw.status >= 400) throw new Error(res.message);
  return res;
};
