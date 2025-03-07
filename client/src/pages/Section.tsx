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
          <h1 className="font-bold text-md bg-yellow-200 w-fit px-4 rounded-lg   my-3 mb-5 ">
            {subsectionData.title}
          </h1>
          {subsectionData.questions &&
            subsectionData.questions.map((question: Question) => (
              <div className="mb-5" key={question.id}>
                <p className="text-sm font-bold   mb-2 ">{question.desc}</p>
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
      <div>
        <button className="bg-yellow-500 text-white font-bold px-8 py-2 rounded-sm">Save</button>
      </div>
    </section>
  );
};

export default Section;

const fetchSubsectionData = async (subsectionId: string) => {
  const raw = await fetch(
    `http://localhost:8000/section/subsection/${subsectionId}`,{credentials:"include"}
  );
  const res = await raw.json();
  console.log('subsection data is ',res.data);
  return res.data;
};
