// const sections = [
//   {
//     id: "details",
//     title: "I. Details of the listed entity",
//     questions: [
//       { id: "cin", label: "1. Corporate Identity Number (CIN) of the Listed Entity" },
//       { id: "name", label: "2. Name of the Listed Entity" },
//       { id: "year", label: "3. Year of incorporation" },
//       { id: "registered", label: "4. Registered office address" },
//       { id: "corporate", label: "5. Corporate address" },
//     ],
//   },
//   { id: "products", title: "II. Products/services", questions: [] },
//   { id: "operations", title: "III. Operations", questions: [] },
//   { id: "employees", title: "IV. Employees", questions: [] },
//   {
//     id: "holding",
//     title: "V. Holding, Subsidiary and Associate Companies (including joint ventures)",
//     questions: [],
//   },
//   { id: "csr", title: "VI. CSR Details", questions: [] },
//   {
//     id: "compliance",
//     title: "VII. Transparency and Disclosures Compliances",
//     questions: [],
//   },
//   { id: "other", title: "VIII. Other Details", questions: [] },
// ]
export const sections = [
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
        label:
          "a. Number of locations",
        tabulardata: [
          ["Number", "number"]
        ],
        defaultLength: 3,
      },
      
    ],
  },
  { type: "normal", id: "employees", title: "IV. Employees", questions: [] },
  {
    type: "normal",
    id: "holding",
    title:
      "V. Holding, Subsidiary and Associate Companies (including joint ventures)",
    questions: [],
  },
  { type: "normal", id: "csr", title: "VI. CSR Details", questions: [] },
  {
    type: "normal",
    id: "compliance",
    title: "VII. Transparency and Disclosures Compliances",
    questions: [],
  },
  { type: "normal", id: "other", title: "VIII. Other Details", questions: [] },
];
