// import SectionCTable2 from "@/components/sectionC/SectionCTable2";
import BooleanInput from "@/components/Question/BooleanInput";
import TableUI from "@/components/Question/Table";
import TextQuestionUI from "@/components/Question/Text";
import { Question, SubSection, Table } from "@/models/models";
import { plainToInstance } from "class-transformer";
import { useEffect, useState } from "react";

const Section = ({ subsectionId }: { subsectionId: string }) => {
  const [subsectionData, setSubsectionData] = useState<SubSection | null>(null);

  useEffect(() => {
    if(subsectionId)
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
                  question.answer_table.map((table: Table, ind: number) => (
                    <TableUI key={ind} table={table} />
                  ))}
                {question.type === "text" && (
                  <TextQuestionUI key={question.id}/>
                )}
                {
                  question.type === "boolean" && (
                    <BooleanInput/>
                  )
                }
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default Section;

const fetchSubsectionData = async (subsectionId: string) => {
  const raw = await fetch(
    `http://localhost:8000/section/subsection/${subsectionId}`
  );
  const res = await raw.json();
  return res.data;
};
