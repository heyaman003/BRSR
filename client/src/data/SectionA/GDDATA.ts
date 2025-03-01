export const sections = {
  A: [
    {
      title: "I. Collective input required ",
      id: "Collectiveinput",
      type: "normal",
      progress: [37, 178],
      inProgress: true,
      questions: [
        {
          id: "cin",
          label: "1. Corporate Identity Number (CIN) of the Listed Entity",
          type: "text",
        },
        { id: "name", label: "2. Name of the Listed Entity", type: "text" },
        { id: "yoi", label: "3. Year of incorporation", type: "Date" },
        { id: "roa", label: "4. Registered office address", type: "text" },
        { id: "coradd", label: "5. Corporate address", type: "text" },
        { id: "email", label: "6. E-mail", type: "email" },
        { id: "telephone", label: "7. Telephone", type: "text" },
        { id: "website", label: "8. website", type: "text" },
        {
          id: "foyr",
          label: "9. Financial year for which reporting is being done",
          type: "text",
        },
        {
          id: "stockexchange",
          label: "10. Name of the Stock Exchange(s) where shares are listed",
          type: "text",
        },
        { id: "puc", label: "11. Paid-up Capital (In Rs)", type: "text" },
        {
          id: "ncd",
          label:
            "12. Name and contact details (telephone, email address) of the person who may be contacted in case of any queries on the BRSR report",
          type: "text",
        },
        { id: "nap", label: "14. Name of assurance provider.", type: "text" },
        { id: "tao", label: "15. Type of assurance obtained", type: "text" },
      ],
    },
    {
      title: "II. Finance",
      id: "Finance",
      type: "tabular",
      isFixedLength: false,
      progress: [37, 178],
      inProgress: true,
      tabletype: 1,
      questions: [
        {
          id: "doba",
          label:
            "1.Details of business activities (accounting for 90% of the turnover):",
          tabulardata: [
            ["S. No.", "number"],
            ["Description of Main Activity", "text"],
            ["Description of Business Activity", "text"],
            ["% of Turnover of the entity", "number"],
          ],
          defaultLength: 7,
        },
        {
          id: "productServiceSold",
          label:
            "2.Products/Services sold by the entity (accounting for 90% of the entity’s Turnover)",
          tabulardata: [
            ["S. No.", "number"],
            ["Product/Service", "text"],
            ["NIC Code", "number"],
            ["% of total Turnover contribute", "number"],
          ],
          defaultLength: 7,
        },
      ],
    },
    {
      title: "III. Compliance admistration ",
      id: "ComplianceAdmistration ",
      type: "tabular",
      isFixedLength: true,
      progress: [37, 178],
      inProgress: true,
      tabletype: 3,
      questions: [
        {
          id: "doba1",
          colFirstData: ["Location", "National", "International"],
          label:
            "1.Details of business activities (accounting for 90% of the turnover):",
          tabulardata: [
            ["Number of plants", "number"],
            ["Number of offices", "text"],
            ["Description of Business Activity", "text"],
            ["Total", "number"],
          ],
          defaultLength: 3,
        },
        {
          id: "doba111",
          colFirstData: ["Location", "National", "International"],
          label: "a. Number of locations",
          tabulardata: [["Number", "number"]],
          defaultLength: 3,
        },
      ],
    },
    {
      type: "tabular",
      id: "employees",
      title: "IV. Employees",
      questions: [
        {
          id: "q1",
          label: "20. Details as at the end of Financial Year:",
          employee: {
            colFirstData: [
              "Permanent (D)",
              "Other than Permanent (E)",
              "Total employees (D + E)",
            ],
          },
          worker: {
            colFirstData: [
              "Permanent (F)",
              "Other than Permanent (G)",
              "Total employees (F + G)",
            ],
          },
        },
      ],
      tabletype: 4,
    },
    {
      inProgress: true,
      progress: [30, 100],
      type: "tabular",
      tabletype: 1,
      id: "holding",
      isFixedLength: true,
      title:
        "V. Holding, Subsidiary and Associate Companies (including joint ventures)",
      questions: [
        {
          id: "q1",
          label:
            "23. (a) Names of holding / subsidiary / associate companies / joint ventures",
          tabulardata: [
            ["Sr. No.", "number"],
            ["a", "text"],
            ["b", "text"],
            ["c", "text"],
            ["d", "text"],
          ],
          defaultLength: 3,
        },
      ],
    },
    {
      type: "normal",
      id: "csr",
      title: "VI. CSR Details",
      progress: [30, 100],
      inPropgress: true,
      questions: [
        {
          id: "1",
          type: "confirm",
          label:
            "24. (i) Whether CSR is applicable as per section 135 of Companies Act, 2013",
        },
        {
          id: "1",
          label: "(ii) Turnover (in Rs.)",
          type: "text",
        },
        {
          id: "2",
          label: "(iii) Net worth (in Rs.)",
          type: "text",
        },
      ],
    },
    {
      inProgress: true,
      progress: [30, 100],
      type: "tabular",
      id: "compliance",
      title: "VII. Transparency and Disclosures Compliances",
      tabletype: 1,
      questions: [
        {
          id: "q1",
          label:
            "23. Complaints/Grievances on any of the principles (Principles 1 to 9) under the National Guidelines on Responsible Business Conduct:",
          tabulardata: [
            ["Sr. No.", "number"],
            ["a", "text"],
            ["b", "text"],
            ["c", "text"],
            ["d", "text"],
          ],
          defaultLength: 7,
        },
      ],
    },
    {
      type: "normal",
      id: "other",
      title: "VIII. Other Details",
      questions: [],
    },
  ],
  B: [
    {
      id:"B1",
      title:"I. Policy and Process",
      heading:
        "This section is aimed at helping businesses demonstrate the structures, policies and processes put in place towards adopting the NGRBC Principles and Core Elements.",
      questions: [
        `Whether your entity’s policy/policies cover each principle and its core elements of the NGRBCs. (Yes/No)`,
        `Has the policy been approved by the Board? (Yes/No)`,
        `Web Link of the Policies, if available`,
        `Whether the entity has translated the policy into procedures. (Yes / No)`,
        `Do the enlisted policies extend to your value chain partners? (Yes/No)`,
        `Name of the national and international codes/certifications/labels/ standards (e.g. Forest Stewardship Council, Fairtrade, Rainforest Alliance, Trustea) standards (e.g. SA 8000, OHSAS, ISO, BIS) adopted by your entity and mapped to each principle.`,
        `Specific commitments, goals and targets set by the entity with defined timelines, if any.`,
        `Performance of the entity against the specific commitments, goals and targets along-with reasons in case the same are not met.`,
      ],
      numberOfPolicies: 9,
      type:"tabular",
      tabletype:1
    },
    { id:"B2",title:"II. Implementation and Monitoring",type:"normal",tabletype:1, questions: []},
    {
      id:"B3",
      heading: "Details of Review of NGRBCs by the Company:",
      title:"III. Review",
      questions: [
        `Performance against above policies and follow up action`,
        `Compliance with statutory requirements of relevance to the principles, and, rectification of any non-compliances`,
        `Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No). If yes, provide name of the agency.`,
      ],
      type:"tabular",
      tabletype:1,
    },
    {
      id:"B4",
      title:"IV. Reporting",
      heading:
        "If answer to question (1) above is “No” i.e. not all Principles are covered by a policy, reasons to be stated: ",
      numberOfPolicies: 9,
      questions: [
        `The entity does not consider the Principles material to its business (Yes/No) `,
        `The entity is not at a stage where it is in a position to formulate and implement the
policies on specified principles (Yes/No) `,
        `The entity does not have the financial or/human and technical resources available for the task (Yes/No) `,
        `It is planned to be done in the next financial year (Yes/No) `,
        `Any other reason (please specify) `,
      ],
      type:"tabular",
      tabletype:1,
    },
  ],
  C:[
    { id:"c1",  type:"tabular",tabletype:1, title:"I. Policy and Process", questions: [
      `The entity does not consider the Principles material to its business (Yes/No) `,
      `The entity is not at a stage where it is in a position to formulate and implement the
policies on specified principles (Yes/No) `,
      `The entity does not have the financial or/human and technical resources available for the task (Yes/No) `,
      `It is planned to be done in the next financial year (Yes/No) `,
      `Any other reason (please specify) `,
    ],},
  ]
};
