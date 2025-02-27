import PolicyAndManagementTable from "@/components/sectionB/Table1";
import GovernanceTable from "@/components/sectionB/Table2";
import Table3 from "@/components/sectionB/Table3";
import Table4 from "@/components/sectionB/Table4";
import { sections } from "@/data/SectionA/GDDATA";

const SectionB = () => {
  return (
    <div>
      <PolicyAndManagementTable {...sections.B[0]} />
      <GovernanceTable {...sections.B[1]} />
      <Table3
        {...sections.B[2]}
        heading="Details of Review of NGRBCs by the Company: "
        questions={[
          `Performance against above policies and follow up action`,
          `Compliance with statutory requirements of relevance to the principles, and, rectification of any non-compliances`,
          `Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No). If yes, provide name of the agency.`,
        ]}
      />
      <Table4
        {...sections.B[3]}
        heading="If answer to question (1) above is “No” i.e. not all Principles are covered by a policy,
reasons to be stated: "
        numberOfPolicies={9}
        questions={[
          `The entity does not consider the Principles material to its business (Yes/No) `,
          `The entity is not at a stage where it is in a position to formulate and implement the
policies on specified principles (Yes/No) `,
          `The entity does not have the financial or/human and technical resources available for the task (Yes/No) `,
          `It is planned to be done in the next financial year (Yes/No) `,
          `Any other reason (please specify) `,
        ]}
      />
    </div>
  );
};

export default SectionB;
