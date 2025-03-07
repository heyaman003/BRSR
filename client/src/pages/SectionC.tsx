import SectionCTable2 from "@/components/sectionC/SectionCTable2";
import { sections } from "@/data/SectionA/GDDATA";
import { Table } from "@/types";

const SectionC = () => {
  return (
    <section>
      {Object.keys(sections.C).map((policy) => (
        <div key={policy}>
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
      ))}
    </section>
  );
};

export default SectionC;
