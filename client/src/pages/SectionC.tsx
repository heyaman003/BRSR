import SectionCTable2 from "@/components/sectionC/SectionCTable2";
import { sections, SubSection } from "@/data/SectionA/GDDATA";
import { Table } from "@/types";
import { plainToClass, plainToInstance } from "class-transformer";
import { useEffect, useState } from "react";

const SectionC = () => {
  const [subsectionData, setSubsectionData] = useState<
    SubSection | SubSection[] | null
  >(null);

  useEffect(() => {
    fetchSubsectionData().then((res) =>
      setSubsectionData(plainToInstance(SubSection, res))
    );
  }, []);

  useEffect(() => {
    console.log(subsectionData);
  }, [subsectionData]);

  return (
    <section>
      {/* {subsectionData && <div key={subsectionData.id}>
        <h1 className="font-bold text-2xl text-center mb-5 text-green-700">
          {subsectionData}
        </h1>
        {(sections.C as Record<string, typeof sections.C.p1>)[
          policy
        ].sections.map((section) => (
          <div key={section.section}>
            <h3 className="font-bold text-xl text-green-500 text-center mb-4">
              {section.section}
            </h3>
            {section &&
              section.questions &&
              section.questions.map(
                (
                  { question, tables }: { question: string; tables?: Table[] },
                  ind: number
                ) => (
                  <div className="mb-20" key={ind}>
                    <p className="text-sm text-gray-500 mb-4">{question}</p>
                    {tables &&
                      tables.map((table: Table, ind: number) => (
                        <SectionCTable2 key={ind} table={table} />
                      ))}
                  </div>
                )
              )}
          </div>
        ))}
      </div>} */}

      {/* {subsectionData && subsectionData.map((subSection: SubSection) => (
        <div key={subSection.id}>
          <h1 className="font-bold text-2xl text-center mb-5 text-green-700">
            {(sections.C as Record<string, typeof sections.C.p1>)[policy].title}
          </h1>
          {(sections.C as Record<string, typeof sections.C.p1>)[
            policy
          ].sections.map((section) => (
            <div key={section.section}>
              <h3 className="font-bold text-xl text-green-500 text-center mb-4">
                {section.section}
              </h3>
              {section && section.questions && section.questions.map(
                (
                  { question, tables }: { question: string; tables?: Table[] },
                  ind: number
                ) => (
                  <div className="mb-20" key={ind}>
                    <p className="text-sm text-gray-500 mb-4">{question}</p>
                    {tables &&
                      tables.map((table: Table, ind: number) => (
                        <SectionCTable2 key={ind} table={table} />
                      ))}
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      ))} */}
    </section>
  );
};

export default SectionC;

const fetchSubsectionData = async () => {
  const raw = await fetch(
    "http://localhost:8000/section/subsection/67c9375ba7afbe5f82514e5e"
  );
  const res = await raw.json();
  return res.data;
};
