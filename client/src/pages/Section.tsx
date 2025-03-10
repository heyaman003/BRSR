// import SectionCTable2 from "@/components/sectionC/SectionCTable2";
import BooleanInput from "@/components/Question/BooleanInput";
import TableUI from "@/components/Question/Table";
import TextQuestionUI from "@/components/Question/Text";
import { Question, SubSection, Table } from "@/models/models";
import { plainToInstance } from "class-transformer";
import React, { memo, useEffect, useState } from "react";
import { toast } from "sonner";

interface SectionUiArgs {
  subsectionId: string;
}

const Section: React.FC<SectionUiArgs> = ({ subsectionId }) => {
  const [subsectionData, setSubsectionData] = useState<SubSection | null>(null);

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
    if (subsectionId)
      fetchSubsectionData(subsectionId).then((res: Object) => {
        setSubsectionData(plainToInstance(SubSection, res));
      });
  }, [subsectionId]);

  return (
    <section className="pt-6">
      {subsectionData && (
        <div>
          <h1 className="font-bold text-2xl text-center mb-5 text-green-700">
            {subsectionData.title}
          </h1>
          {subsectionData.questions &&
            subsectionData.questions.map((question: Question) => (
              <div className="mb-14" key={question.id}>
                <p className="text-sm text-gray-500 mb-4">{question.desc}</p>
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
                {question.type === "boolean" && <BooleanInput />}
              </div>
            ))}
        </div>
      )}
      {subsectionData && (
        <div>
          <button
            onClick={() => updateSubsectionData(subsectionData).then((res)=>toast(res.message)).catch(err=>toast(err.message))}
            className=" bg-yellow-500 text-white font-bold px-8 py-2 rounded-sm"
          >
            Save
          </button>
        </div>
      )}
    </section>
  );
};

export default memo(Section);

const fetchSubsectionData = async (subsectionId: string) => {
  const raw = await fetch(
    `http://localhost:8000/section/subsection/${subsectionId}`,
    { credentials: "include" }
  );
  const res = await raw.json();
  return res.data;
};

const updateSubsectionData = async (subsectionData: SubSection) => {
    const raw = await fetch(
      `http://localhost:8000/section/subsection/${subsectionData.id}`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subsectionData),
      }
    );
    const res = await raw.json();
    if(raw.status<200 || raw.status>=400)
      throw new Error(res.message)
    return res;
};
