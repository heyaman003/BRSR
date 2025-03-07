// import SectionCTable2 from "@/components/sectionC/SectionCTable2";
import SectionCTable2 from "@/components/sectionC/SectionCTable2";
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
                    <SectionCTable2 key={ind} table={table} />
                  ))}
                {question.type === "text" && (
                  <>
                    <input
                      // type={question.type}
                      id={question.id}
                      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                                                  ring-offset-background file:border-0 file:bg-transparent
                                                  file:text-sm file:font-medium placeholder:text-muted-foreground
                                                  focus-visible:outline-none focus-visible:ring-2
                                                  focus-visible:ring-ring focus-visible:ring-offset-2
                                                  disabled:cursor-not-allowed disabled:opacity-50`}
                    />
                  </>
                )}
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
    `http://172.16.16.68:8000/section/subsection/${subsectionId}`
  );
  const res = await raw.json();
  return res.data;
};
