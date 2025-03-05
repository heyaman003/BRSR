
export class Cell {
  id: string;
  data: string;
  isUpdateable: boolean;
  rowSpan: number;
  colSpan: number;

  constructor(
    id: string,
    data: string,
    isUpdateable: boolean,
    rowSpan: number,
    colSpan: number
  ) {
    (this.id = id), (this.data = data);
    this.isUpdateable = isUpdateable;
    this.rowSpan = rowSpan;
    this.colSpan = colSpan;
  }
}

export class Row {
  cells: Cell[];
  id: string;
  isHeading: boolean;
  constructor(id: string, cells: Cell[], isHeading: boolean) {
    this.isHeading = isHeading;
    this.id = id;
    this.cells = cells;
  }
}

export class Table {
  id: string;
  rows: Row[];
  constructor(id: string, rows: Row[]) {
    this.id = id;
    this.rows = rows;
  }
}

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
};
export const sectionC_data= {
  p1: {
    title:
      "PRINCIPLE 1 Businesses should conduct and govern themselves with integrity, and in a manner that is Ethical, Transparent and Accountable.",
    sections: [
      {
        section: "Essential Indicators",
        questions: [
          {
            question:
              "1. Percentage coverage by training and awareness programmes on any of the Principles during the financial year:",
            tables: [
              new Table("sC-p1-s1-q1", [
                new Row(
                  "sC-p1-s1-q1-r1",
                  [
                    new Cell("sC-p1-s1-q1-r1-c1", "Segment", false, 1, 1),
                    new Cell(
                      "sC-p1-s1-q1-r1-c2",
                      "Total number of training and awareness programmes held",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p1-s1-q1-r1-c3",
                      "Topics / principles covered under the training and its impact",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p1-s1-q1-r1-c4",
                      "%age of persons in respective category covered by the awareness programmes",
                      false,
                      1,
                      1
                    ),
                  ],
                  true
                ),
                ...[
                  "Board of Diretors",
                  "Key Managerial Personnel",
                  "Employees other than BoD and KMPs",
                  "Workers",
                ].map(
                  (segment: string, rowNo: number) =>
                    new Row(
                      `sC-p1-s1-q1-r${rowNo + 2}`,
                      [
                        new Cell(
                          `sC-p1-s1-q1-r${rowNo + 2}-1`,
                          segment,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 3 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p1-s1-q1-r${rowNo + 2}-${colNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
          {
            question:
              "2. Details of fines / penalties /punishment/ award/ compounding fees/ settlement amount paid in proceedings (by the entity or by directors / KMPs) with regulators/ law enforcement agencies/ judicial institutions, in the financial year, in the following format (Note: the entity shall make disclosures on the basis of materiality as specified in Regulation 30 of SEBI (Listing Obligations and Disclosure Obligations) Regulations, 2015 and as disclosed on the entity’s website):",
            tables: [
              new Table("sC-p1-s1-q2", [
                new Row(
                  "sC-p1-s1-q2-r1",
                  [new Cell("sC-p1-s1-q2-r1-c1", "Monetary", true, 1, 6)],
                  true
                ),
                new Row(
                  "sC-p1-s1-q2-r2",
                  [
                    ...[
                      "",
                      "NGRBC Principle",
                      "Name of the regulatory/ enforcement agencies/ judicial institutions",
                      "Amount (In INR)",
                      "Brief of the Case",
                      "Has an appeal been preferred? (Yes/No)",
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(
                          `sC-p1-s1-q2-r2-c${ind + 1}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),
                ...["Penalty/ Fine", "Settlement", "Compounding fee"].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p1-s1-q2-r${rowNo + 3}`,
                      [
                        new Cell(
                          `sC-p1-s1-q2-r${rowNo + 3}-c1`,
                          firstCol,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 5 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p1-s1-q2-r${rowNo + 3}-${colNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),

              new Table("sC-p1-s1-q2-t2", [
                new Row(
                  "sC-p1-s1-q2-t2-r1",
                  [
                    new Cell(
                      "sC-p1-s1-q2-t2-r1-c1",
                      "Non-Monetary",
                      true,
                      1,
                      5
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p1-s1-q2-t2-r2",
                  [
                    ...[
                      "",
                      "NGRBC Principl",
                      "Name of the regulatory/ enforcement agencies/ judicial institutions",
                      "Brief of the Case",
                      "Has an appeal been preferred? (Yes/No)",
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(
                          `sC-p1-s1-q2-t2-r2-c${ind + 1}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),
                ...["Imprisonment", "Punishment"].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p1-s1-q2-t2-r${rowNo + 3}`,
                      [
                        new Cell(
                          `sC-p1-s1-q2-t2-r${rowNo + 3}-c1`,
                          firstCol,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 4 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p1-s1-q2-t2-r${rowNo + 3}-c${colNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
          {
            question:
              "3. Of the instances disclosed in Question 2 above, details of the Appeal/ Revision preferred in cases where monetary or non-monetary action has been appealed.",
            tables: [
              new Table("sC-p1-s1-q3", [
                new Row(
                  "sC-p1-s1-q3-r1",
                  [
                    ...[
                      "Case Details",
                      "Name of the regulatory/ enforcement agencies/ judicial institutions",
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(
                          `sC-p1-s1-q3-r1-c${ind + 1}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),
                new Row(
                  `sC-p1-s1-q3-r2`,
                  [
                    new Cell(`sC-p1-s1-q3-r2-c1`, "", true, 1, 1),
                    new Cell(`sC-p1-s1-q3-r2-c2`, "", true, 1, 1),
                  ],
                  false
                ),
              ]),
            ],
          },
          {
            question:
              "4. Does the entity have an anti-corruption or anti-bribery policy? If yes, provide details in brief and if available, provide a web-link to the policy. ",
          },
          {
            question:
              "5. Number of Directors/KMPs/employees/workers against whom disciplinary action was taken by any law enforcement agency for the charges of bribery/ corruption:",
            tables: [
              new Table("sC-p1-s1-q5", [
                new Row(
                  "sC-p1-s1-q5-r1",
                  [
                    ...[
                      "",
                      "FY _____(Current Financial Year)",
                      "FY _____ (Previous Financial Year)",
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(
                          `sC-p1-s1-q5-r1-c${ind + 1}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),
                ...["Directors", "KMPs", "Employees", "Workers"].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p1-s1-q5-r${rowNo + 2}`,
                      [
                        new Cell(
                          `sC-p1-s1-q5-r${rowNo + 2}-c1`,
                          firstCol,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 2 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p1-s1-q5-r${rowNo + 2}-c${colNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
                // new Row(
                //   `sC-p1-s1-q3-r2`,
                //   [
                //     new Cell(`sC-p1-s1-q5-r2-c1`, "", true, 1, 1),
                //     new Cell(`sC-p1-s1-q5-r2-c2`, "", true, 1, 1),
                //   ],
                //   false
                // ),
              ]),
            ],
          },
          {
            question:
              "6. Details of complaints with regard to conflict of interest:",
            tables: [
              new Table("sC-p1-s1-q6", [
                new Row(
                  "sC-p1-s1-q6-r1",
                  [
                    new Cell("sC-p1-s1-q6-r1-c1", "", false, 1, 1),
                    ...[
                      "FY _____(Current Financial Year)",
                      "FY _____ (Previous Financial Year)",
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(
                          `sC-p1-s1-q6-r1-c${ind + 2}`,
                          heading,
                          false,
                          1,
                          2
                        )
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p1-s1-q6-r2",
                  [
                    ...["", "Number", "Remarks", "Number", "Remarks"].map(
                      (heading: string, ind: number) =>
                        new Cell(
                          `sC-p1-s1-q6-r2-c${ind + 1}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),
                ...[
                  "Number of complaints received in relation to issues of Conflict of Interest of the Directors",
                  "Number of complaints received in relation to issues of Conflict of Interes of the KMPs",
                ].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p1-s1-q6-r${rowNo + 3}`,
                      [
                        new Cell(
                          `sC-p1-s1-q6-r${rowNo + 3}-c1`,
                          firstCol,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 4 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p1-s1-q6-r${rowNo + 3}-c${colNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
          {
            question:
              "7. Provide details of any corrective action taken or underway on issues related to fines / penalties / action taken by regulators/ law enforcement agencies/ judicial institutions, on cases of corruption and conflicts of interest.",
          },
          {
            question:
              "8. Number of days of accounts payables ((Accounts payable *365) / Cost of goods/services procured) in the following format:",
            tables: [
              new Table("sC-p1-s1-q8", [
                new Row(
                  "sC-p1-s1-q8-r1",
                  [
                    new Cell("sC-p1-s1-q8-r1-c1", "", false, 1, 1),
                    ...[
                      "FY _____(Current Financial Year)",
                      "FY _____ (Previous Financial Year)",
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(
                          `sC-p1-s1-q8-r1-c${ind + 2}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),
                ...["Number of days of accounts payables"].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p1-s1-8-r${rowNo + 2}`,
                      [
                        new Cell(
                          `sC-p1-s1-q8-r${rowNo + 2}-c1`,
                          firstCol,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 2 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p1-s1-q8-r${rowNo + 2}-c${colNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
          {
            question:
              "9. Open-ness of business Provide details of concentration of purchases and sales with trading houses, dealers, and related parties along-with loans and advances & investments, with related parties, in the following format:",
            tables: [
              new Table("sC-p1-s1-q9", [
                new Row(
                  "sC-p1-s1-q9-r1",
                  [
                    ...[
                      "Parameter",
                      "Metrics",
                      "FY _____(Current Financial Year)",
                      "FY _____ (Previous Financial Year)",
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(
                          `sC-p1-s1-q9-r1-c${ind + 1}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),

                new Row(
                  "sC-p1-s1-q9-r2",
                  [
                    new Cell(
                      "sC-p1-s1-q9-r2-c1",
                      "Concentration of Purchases",
                      false,
                      3,
                      1
                    ),
                    new Cell(
                      "sC-p1-s1-q9-r2-c2",
                      "a. Purchases from trading houses as % of total purchases ",
                      false,
                      1,
                      1
                    ),
                    new Cell("sC-p1-s1-q9-r2-c3", "", true, 1, 1),
                    new Cell("sC-p1-s1-q9-r2-c4", "", true, 1, 1),
                  ],
                  false
                ),
                new Row(
                  "sC-p1-s1-q9-r3",
                  [
                    // new Cell("sC-p1-s1-q9-r3-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      "sC-p1-s1-q9-r3-c1",
                      "b. Number of trading houses where purchases are made from ",
                      false,
                      1,
                      1
                    ),
                    new Cell("sC-p1-s1-q9-r3-c2", "", true, 1, 1),
                    new Cell("sC-p1-s1-q9-r3-c3", "", true, 1, 1),
                  ],
                  false
                ),
                new Row(
                  "sC-p1-s1-q9-r4",
                  [
                    // new Cell("sC-p1-s1-q9-r4-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      "sC-p1-s1-q9-r4-c1",
                      "c. Purchases from top 10 trading houses as % of total purchases from trading houses ",
                      false,
                      1,
                      1
                    ),
                    new Cell("sC-p1-s1-q9-r4-c2", "", true, 1, 1),
                    new Cell("sC-p1-s1-q9-r4-c3", "", true, 1, 1),
                  ],
                  false
                ),
                new Row(
                  "sC-p1-s1-q9-r5",
                  [
                    new Cell(
                      "sC-p1-s1-q9-r5-c1",
                      "Concentration of Sales",
                      false,
                      3,
                      1
                    ),
                    new Cell(
                      "sC-p1-s1-q9-r5-c2",
                      "a. Sales to dealers / distributors as % of total sales",
                      false,
                      1,
                      1
                    ),
                    new Cell("sC-p1-s1-q9-r5-c3", "", true, 1, 1),
                    new Cell("sC-p1-s1-q9-r5-c4", "", true, 1, 1),
                  ],
                  false
                ),
                new Row(
                  "sC-p1-s1-q9-r6",
                  [
                    // new Cell("sC-p1-s1-q9-r3-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      "sC-p1-s1-q9-r6-c1",
                      "b. Number of dealers / distributors to whom sales are made",
                      false,
                      1,
                      1
                    ),
                    new Cell("sC-p1-s1-q9-r6-c2", "", true, 1, 1),
                    new Cell("sC-p1-s1-q9-r6-c3", "", true, 1, 1),
                  ],
                  false
                ),
                new Row(
                  "sC-p1-s1-q9-r7",
                  [
                    // new Cell("sC-p1-s1-q9-r4-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      "sC-p1-s1-q9-r7-c1",
                      "c. Sales to top 10 dealers / distributors as % of total sales to dealers / distributors",
                      false,
                      1,
                      1
                    ),
                    new Cell("sC-p1-s1-q9-r7-c2", "", true, 1, 1),
                    new Cell("sC-p1-s1-q9-r7-c3", "", true, 1, 1),
                  ],
                  false
                ),
                new Row(
                  "sC-p1-s1-q9-r8",
                  [
                    new Cell(
                      "sC-p1-s1-q9-r8-c1",
                      "Share of RPTs in",
                      false,
                      4,
                      1
                    ),
                    new Cell(
                      "sC-p1-s1-q9-r8-c2",
                      "a. Purchases (Purchaseswith related parties / Total Purchases)",
                      false,
                      1,
                      1
                    ),
                    new Cell("sC-p1-s1-q9-r8-c3", "", true, 1, 1),
                    new Cell("sC-p1-s1-q9-r8-c4", "", true, 1, 1),
                  ],
                  false
                ),
                new Row(
                  "sC-p1-s1-q9-r9",
                  [
                    // new Cell("sC-p1-s1-q9-r3-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      "sC-p1-s1-q9-r9-c1",
                      "b. Sales (Sales to related parties / Total Sales)",
                      false,
                      1,
                      1
                    ),
                    new Cell("sC-p1-s1-q9-r9-c2", "", true, 1, 1),
                    new Cell("sC-p1-s1-q9-r9-c3", "", true, 1, 1),
                  ],
                  false
                ),
                new Row(
                  "sC-p1-s1-q9-r10",
                  [
                    // new Cell("sC-p1-s1-q9-r4-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      "sC-p1-s1-q9-r10-c1",
                      "c. Loans & advances (Loans & advances given to related parties / Total loans & advances)",
                      false,
                      1,
                      1
                    ),
                    new Cell("sC-p1-s1-q9-r10-c2", "", true, 1, 1),
                    new Cell("sC-p1-s1-q9-r10-c3", "", true, 1, 1),
                  ],
                  false
                ),

                new Row(
                  "sC-p1-s1-q9-r11",
                  [
                    // new Cell("sC-p1-s1-q9-r4-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      "sC-p1-s1-q9-r11-c1",
                      "d. Investments ( Investments in related parties / Total Investments made)",
                      false,
                      1,
                      1
                    ),
                    new Cell("sC-p1-s1-q9-r11-c2", "", true, 1, 1),
                    new Cell("sC-p1-s1-q9-r11-c3", "", true, 1, 1),
                  ],
                  false
                ),
              ]),
            ],
          },
        ],
      },
      {
        section: "Leadership Indicators",
        questions: [
          {
            question:
              "1. Awareness programmes conducted for value chain partners on any of the Principles during the financial year:",
            tables: [
              new Table("sC-p1-s2-q1", [
                new Row(
                  "sC-p1-s2-q1-r1",
                  [
                    ...[
                      "Total number of awareness programmes held",
                      "Topics / principles covered under the training",
                      "%age of value chain partners covered (by value of business done with such partners) under the awareness programmes",
                    ].map(
                      (heading: string, cellNo: number) =>
                        new Cell(
                          `sC-p1-s2-q1-r1-${cellNo}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p1-s2-q1-r2",
                  [
                    ...Array.from({ length: 3 }).map(
                      (_, cellNo: number) =>
                        new Cell(`sC-p1-s2-q1-r2-${cellNo}`, "", true, 1, 1)
                    ),
                  ],
                  false
                ),
              ]),
            ],
          },
          {
            question:
              "2. Does the entity have processes in place to avoid/ manage conflict of interests involving members of the Board? (Yes/No) If Yes, provide details of the same.",
          },
        ],
      },
    ],
  },
  p2: {
    title:
      "PRINCIPLE 2 Businesses should provide goods and services in a manner that is sustainable and safe",
    sections: [
      {
        section: "Essential Indicators",
        questions: [
          {
            question:
              "1. Percentage of R&D and capital expenditure (capex) investments in specific technologies to improve the environmental and social impacts of product and processes to total R&D and capex investments made by the entity, respectively",
            tables: [
              new Table("sC-p2-s1-q1", [
                new Row(
                  "sC-p2-s1-q1-r1",
                  [
                    ...[
                      "",
                      "Current Financial Year",
                      "Previous Financial Year",
                      "Details of improvements in environmental and social impacts",
                    ].map(
                      (heading: string, cellNo: number) =>
                        new Cell(
                          `sC-p2-s1-q1-r1-${cellNo + 1}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),
                ...["R&D", "Capex"].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p2-s1-q1-r${rowNo + 2}`,
                      [
                        new Cell(
                          `sC-p2-s1-q1-r${rowNo + 2}-c1`,
                          firstCol,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 3 }).map(
                          (_, cellNo: number) =>
                            new Cell(
                              `sC-p2-s1-q1-r${rowNo + 2}-c${cellNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
          {
            question:
              "2. a. Does the entity have procedures in place for sustainable sourcing? (Yes/No) b. If yes, what percentage of inputs were sourced sustainably? ",
          },
          {
            question:
              "3. Describe the processes in place to safely reclaim your products for reusing, recycling and disposing at the end of life, for (a) Plastics (including packaging) (b) E-waste (c) Hazardous waste and (d) other waste.",
          },
          {
            question:
              "4. Whether Extended Producer Responsibility (EPR) is applicable to the entity’s activities (Yes / No). If yes, whether the waste collection plan is in line with the Extended Producer Responsibility (EPR) plan submitted to Pollution Control Boards? If not, provide steps taken to address the same.",
          },
        ],
      },
      {
        section: "Leadership Indicators",
        questions: [
          {
            question:
              "1. Has the entity conducted Life Cycle Perspective / Assessments (LCA) for any of its products (for manufacturing industry) or for its services (for service industry)? If yes, provide details in the following format?",
            tables: [
              new Table("sC-p2-s2-q1", [
                new Row(
                  "sC-p2-s2-q1-r1",
                  [
                    ...[
                      "NIC Code",
                      "Name of Product /Service",
                      "% of total Turnover contributed",
                      "Boundary for which the LifeCycle Perspective / Assessment was conducted",
                      "Whether conducted by independent external agency (Yes/No)",
                      "Results communicated in public domain (Yes/No) If yes, provide the web-link.",
                    ].map(
                      (heading: string, cellNo: number) =>
                        new Cell(
                          `sC-p2-s2-q1-r1-${cellNo + 1}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),
                ...[""].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p2-s2-q1-r${rowNo + 2}`,
                      [
                        ...Array.from({ length: 6 }).map(
                          (_, cellNo: number) =>
                            new Cell(
                              `sC-p2-s1-q1-r${rowNo + 2}-c${cellNo + 1}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
          {
            question:
              "2. If there are any significant social or environmental concerns and/or risks arising from production or disposal of your products / services, as identified in the Life Cycle Perspective / Assessments (LCA) or through any other means, briefly describe the same along-with action taken to mitigate the same.",
            tables: [
              new Table("sC-p2-s2-q2", [
                new Row(
                  "sC-p2-s2-q2-r1",
                  [
                    ...[
                      "Name of Product / Service",
                      "Description of the risk / concern",
                      "Action Taken",
                    ].map(
                      (heading: string, cellNo: number) =>
                        new Cell(
                          `sC-p2-s2-q2-r1-${cellNo + 1}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),
                ...Array.from({ length: 3 }).map(
                  (_, rowNo: number) =>
                    new Row(
                      `sC-p2-s2-q2-r${rowNo + 2}`,
                      [
                        ...Array.from({ length: 3 }).map(
                          (_, cellNo: number) =>
                            new Cell(
                              `sC-p2-s2-q2-r${rowNo + 2}-c${cellNo + 1}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
          {
            question:
              "3. Percentage of recycled or reused input material to total material (by value) used in production (for manufacturing industry) or providing services (for service industry).",
            tables: [
              new Table("sC-p2-s2-q3", [
                new Row(
                  "sC-p2-s2-q3-r1",
                  [
                    new Cell(
                      "sC-p2-s2-q3-r1-c1",
                      "Indicate input material ",
                      false,
                      2,
                      1
                    ),
                    new Cell(
                      "sC-p2-s2-q3-r1-c2",
                      "Recycled or re-used input material to total material ",
                      false,
                      1,
                      2
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p2-s2-q3-r2",
                  [
                    new Cell(
                      "sC-p2-s2-q3-r2-c1",
                      "FY _____ Current Financial Year",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p2-s2-q3-r2-c2",
                      "FY _____ Previous Financial Year",
                      false,
                      1,
                      1
                    ),
                  ],
                  true
                ),
                ...Array.from({ length: 3 }).map(
                  (_, rowNo: number) =>
                    new Row(
                      `sC-p2-s2-q3-r${rowNo + 3}`,
                      [
                        ...Array.from({ length: 3 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p2-s2-q3-r${rowNo + 3}-c${colNo + 1}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
          {
            question:
              "4. Of the products and packaging reclaimed at end of life of products, amount (in metric tonnes) reused, recycled, and safely disposed, as per the following format:",
            tables: [
              new Table("sC-p2-s2-q4", [
                new Row(
                  "sC-p2-s2-q4-r1",
                  [
                    new Cell(
                      "sC-p2-s2-q4-r1-c1",
                      "Indicate input material ",
                      false,
                      2,
                      1
                    ),
                    new Cell(
                      "sC-p2-s2-q4-r1-c2",
                      "FY _____ Current Financial Year",
                      false,
                      1,
                      3
                    ),
                    new Cell(
                      "sC-p2-s2-q4-r1-c3",
                      "FY _____ Previous Financial Year",
                      false,
                      1,
                      3
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p2-s2-q4-r2",
                  [
                    new Cell("sC-p2-s2-q4-r2-c1", "Re-Used", false, 1, 1),
                    new Cell("sC-p2-s2-q4-r2-c2", "Recycled", false, 1, 1),
                    new Cell(
                      "sC-p2-s2-q4-r2-c3",
                      "Safely Disposed",
                      true,
                      1,
                      1
                    ),
                    new Cell("sC-p2-s2-q4-r2-c4", "Re-Used", false, 1, 1),
                    new Cell("sC-p2-s2-q4-r2-c5", "Recycled", false, 1, 1),
                    new Cell(
                      "sC-p2-s2-q4-r2-c6",
                      "Safely Disposed",
                      true,
                      1,
                      1
                    ),
                  ],
                  true
                ),
                ...[
                  "Plastics (including packaging)",
                  "E-waste",
                  "Hazardous waste",
                  "Other waste",
                ].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p2-s2-q3-r${rowNo + 3}`,
                      [
                        new Cell(
                          `sC-p2-s2-q3-r${rowNo + 3}`,
                          firstCol,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 6 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p2-s2-q3-r${rowNo + 3}-c${colNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
          {
            question:
              "5. Reclaimed products and their packaging materials (as percentage of products sold) for each product category.",
            tables: [
              new Table("sC-p2-s2-q5", [
                new Row(
                  "sC-p2-s2-q5-r1",
                  [
                    new Cell(
                      "sC-p2-s2-q5-r1-c1",
                      "Indicate product category",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p2-s2-q5-r1-c2",
                      "Reclaimed products and their packaging materials as % of total products sold in respective category",
                      false,
                      1,
                      1
                    ),
                  ],
                  true
                ),
                ...Array.from({ length: 3 }).map(
                  (_, rowNo: number) =>
                    new Row(
                      `sC-p2-s2-q5-r${rowNo + 2}`,
                      [
                        ...Array.from({ length: 2 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p2-s2-q5-r${rowNo + 2}-c${colNo + 1}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
        ],
      },
    ],
  },
  p3: {
    title:
      "PRINCIPLE 3 Businesses should respect and promote the well-being of all employees, including those in their value chains",
    sections: [
      {
        section: "Essential Indicators",
        questions: [
          {
            question:
              "1. a. Details of measures for the well-being of employees:",
            tables: [
              new Table("sC-p3-s1-q1a", [
                new Row(
                  "sC-p3-s1-q1a-r1",
                  [
                    new Cell("sC-p3-s1-q1a-r1-c1", "Category", false, 3, 1),
                    new Cell(
                      "sC-p3-s1-q1a-r1-c2",
                      "% of employees covered by",
                      false,
                      1,
                      11
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p3-s1-q1a-r2",
                  [
                    new Cell("sC-p3-s1-q1a-r2-c1", "Total (A)", false, 2, 1),
                    ...[
                      "Health insurance",
                      "Accident insurance",
                      "Maternity benefits",
                      "Paternity Benefits",
                      "Day Care facilities",
                    ].map(
                      (heading: string, colNo: number) =>
                        new Cell(
                          `sC-p3-s1-q1a-r2-c${colNo + 2}`,
                          heading,
                          false,
                          1,
                          2
                        )
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p3-s1-q1a-r3",
                  [
                    ...[
                      "Number (B)",
                      "% (B / A)",
                      "Number (C)",
                      "% (C / A)",
                      "Number (D)",
                      "% (D / A)",
                      "Number (E)",
                      "% (E / A)",
                      "Number (F)",
                      "% (F / A)",
                    ].map(
                      (heading: string, colNo: number) =>
                        new Cell(
                          `sC-p3-s1-q1a-r3-c${colNo + 2}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p3-s1-q1a-r4",
                  [
                    new Cell(
                      `sC-p3-s1-q1a-r4-c1`,
                      "Permanent employees",
                      false,
                      1,
                      11
                    ),
                  ],
                  true
                ),
                ...["Male", "Female", "Total"].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p3-s1-q1a-r${rowNo + 5}`,
                      [
                        new Cell(
                          `sC-p3-s1-q1a-r${rowNo + 5}-c1`,
                          firstCol,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 11 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p3-s1-q1a-r${rowNo + 5}-c${colNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
                new Row(
                  "sC-p3-s1-q1a-r8",
                  [
                    new Cell(
                      `sC-p3-s1-q1a-r4-c1`,
                      "Other than Permanent workers",
                      false,
                      1,
                      11
                    ),
                  ],
                  false
                ),
                ...["Male", "Female", "Total"].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p3-s1-q1a-r${rowNo + 9}`,
                      [
                        new Cell(
                          `sC-p3-s1-q1a-r${rowNo + 9}-c1`,
                          firstCol,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 11 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p3-s1-q1a-r${rowNo + 9}-c${colNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
          {
            question:
              "1. b. Details of measures for the well-being of workers:",
            tables: [
              new Table("sC-p3-s1-q1b", [
                new Row(
                  "sC-p3-s1-q1b-r1",
                  [
                    new Cell("sC-p3-s1-q1b-r1-c1", "Category", false, 3, 1),
                    new Cell(
                      "sC-p3-s1-q1b-r1-c2",
                      "% of workers covered by",
                      false,
                      1,
                      11
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p3-s1-q1b-r2",
                  [
                    new Cell("sC-p3-s1-q1b-r2-c1", "Total (A)", false, 2, 1),
                    ...[
                      "Health insurance",
                      "Accident insurance",
                      "Maternity benefits",
                      "Paternity Benefits",
                      "Day Care facilities",
                    ].map(
                      (heading: string, colNo: number) =>
                        new Cell(
                          `sC-p3-s1-q1b-r2-c${colNo + 2}`,
                          heading,
                          false,
                          1,
                          2
                        )
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p3-s1-q1b-r3",
                  [
                    ...[
                      "Number (B)",
                      "% (B / A)",
                      "Number (C)",
                      "% (C / A)",
                      "Number (D)",
                      "% (D / A)",
                      "Number (E)",
                      "% (E / A)",
                      "Number (F)",
                      "% (F / A)",
                    ].map(
                      (heading: string, colNo: number) =>
                        new Cell(
                          `sC-p3-s1-q1b-r3-c${colNo + 2}`,
                          heading,
                          false,
                          1,
                          1
                        )
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p3-s1-q1b-r4",
                  [
                    new Cell(
                      `sC-p3-s1-q1b-r4-c1`,
                      "Permanent employees",
                      false,
                      1,
                      11
                    ),
                  ],
                  true
                ),
                ...["Male", "Female", "Total"].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p3-s1-q1b-r${rowNo + 5}`,
                      [
                        new Cell(
                          `sC-p3-s1-q1b-r${rowNo + 5}-c1`,
                          firstCol,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 11 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p3-s1-q1b-r${rowNo + 5}-c${colNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
                new Row(
                  "sC-p3-s1-q1b-r8",
                  [
                    new Cell(
                      `sC-p3-s1-q1b-r4-c1`,
                      "Other than Permanent employees",
                      false,
                      1,
                      11
                    ),
                  ],
                  false
                ),
                ...["Male", "Female", "Total"].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p3-s1-q1b-r${rowNo + 9}`,
                      [
                        new Cell(
                          `sC-p3-s1-q1b-r${rowNo + 9}-c1`,
                          firstCol,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 11 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p3-s1-q1b-r${rowNo + 9}-c${colNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
          {
            question:
              "1. c. Spending on measures towards well-being of employees and workers (including permanent and other than permanent) in the following format –",
            tables: [
              new Table("sC-p3-s1-q1c", [
                new Row(
                  "sC-p3-s1-q1c-r1",
                  [
                    new Cell("sC-p3-s1-q1c-r1-c1", "", false, 1, 1),
                    new Cell(
                      "sC-p3-s1-q1c-r1-c2",
                      "FY _____ Current Financial Year",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p3-s1-q1c-r1-c3",
                      "FY _____ Previous Financial Year",
                      false,
                      1,
                      1
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p3-s1-q1c-r2",
                  [
                    new Cell(
                      "sC-p3-s1-q1c-r2-c1",
                      "Cost incurred on wellbeing measures as a % of total revenue of the company",
                      false,
                      1,
                      1
                    ),
                    new Cell("sC-p3-s1-q1c-r2-c2", "", true, 1, 1),
                    new Cell("sC-p3-s1-q1c-r2-c3", "", true, 1, 1),
                  ],
                  false
                ),
              ]),
            ],
          },
          {
            question:
              "2. Details of retirement benefits, for Current FY and Previous Financial Year.",
            tables: [
              new Table("sC-p3-s1-q2", [
                new Row(
                  "sC-p3-s1-q2-r1",
                  [
                    new Cell("sC-p3-s1-q2-r1-c1", "Benefits", false, 2, 1),
                    new Cell(
                      "sC-p3-s1-q2-r1-c2",
                      "FY _____ Current Financial Year",
                      false,
                      1,
                      3
                    ),
                    new Cell(
                      "sC-p3-s1-q2-r1-c3",
                      "FY _____ Previous Financial Year",
                      false,
                      1,
                      3
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p3-s1-q2-r2",
                  [
                    new Cell(
                      "sC-p3-s1-q2-r2-c1",
                      "No. of employees covered as a % of total employees",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p3-s1-q2-r2-c2",
                      "No. of workers covered as a % of total workers",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p3-s1-q2-r2-c3",
                      "Deducted and deposited with the authority (Y/N/N.A.)",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p3-s1-q2-r2-c4",
                      "No. of employees covered as a % of total employees",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p3-s1-q2-r2-c5",
                      "No. of workers covered as a % of total workers",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p3-s1-q2-r2-c6",
                      "Deducted and deposited with the authority (Y/N/N.A.)",
                      false,
                      1,
                      1
                    ),
                  ],
                  true
                ),
                ...["PF", "Gratuity", "ESI", "Others – pleasespecify"].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      `sC-p3-s1-q2-r${rowNo + 3}`,
                      [
                        new Cell(
                          `sC-p3-s1-q2-r${rowNo + 3}-c1`,
                          firstCol,
                          false,
                          1,
                          1
                        ),
                        ...Array.from({ length: 6 }).map(
                          (_, colNo: number) =>
                            new Cell(
                              `sC-p3-s1-q2-r${rowNo + 3}-c${colNo + 2}`,
                              "",
                              true,
                              1,
                              1
                            )
                        ),
                      ],
                      false
                    )
                ),
              ]),
            ],
          },
          {
            question:
              "3. Accessibility of workplaces Are the premises / offices of the entity accessible to differently abled employees and workers, as per the requirements of the Rights of Persons with Disabilities Act, 2016? If not, whether any steps are being taken by the entity in this regard.",
          },
          {
            question:
              "4. Does the entity have an equal opportunity policy as per the Rights of Persons with Disabilities Act, 2016? If so, provide a web-link to the policy. ",
          },
          {
            question:
              "5. Return to work and Retention rates of permanent employees and workers that took parental leave.",
            tables: [
              new Table("sC-p3-s1-q5", [
                new Row(
                  "sC-p3-s1-q5-r1",
                  [
                    new Cell("sC-p3-s1-q5-r1-c1", "", false, 1, 1),
                    new Cell(
                      "sC-p3-s1-q5-r1-c2",
                      "Permanent employees",
                      false,
                      1,
                      2
                    ),
                    new Cell(
                      "sC-p3-s1-q5-r1-c3",
                      "Permanent workers",
                      false,
                      1,
                      2
                    ),
                  ],
                  true
                ),
                new Row(
                  "sC-p3-s1-q5-r2",
                  [
                    new Cell("sC-p3-s1-q5-r2-c1", "Gender", false, 1, 1),
                    new Cell(
                      "sC-p3-s1-q5-r2-c2",
                      "Return to work rate",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p3-s1-q5-r2-c3",
                      "Retention rate",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p3-s1-q5-r2-c5",
                      "Return to work rate",
                      false,
                      1,
                      1
                    ),
                    new Cell(
                      "sC-p3-s1-q5-r2-c6",
                      "Retention rate",
                      false,
                      1,
                      1
                    ),
                  ],
                  true
                ),
                ...["Male", "Female", "Total"].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(`sC-p3-s1-q5-r${rowNo + 3}`, [
                      new Cell(`sC-p3-s1-q5-r${rowNo + 3}-c${1}`, firstCol, false, 1, 1),
                      ...Array.from({length: 4}).map((_, colNo: number)=>new Cell(`sC-p3-s1-q5-r${rowNo + 3}-c${colNo+2}`, "", true, 1, 1))
                    ], false)
                ),
              ]),
            ],
          },
        ],
      },
    ],
  },
}
