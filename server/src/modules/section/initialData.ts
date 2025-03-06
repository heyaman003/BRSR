import { QuestionType } from './section.schemas';

export class Cell {
  data: string;
  isUpdateable: boolean;
  rowSpan: number;
  colSpan: number;

  constructor(
    data: string,
    isUpdateable: boolean,
    rowSpan: number,
    colSpan: number,
  ) {
    this.data = data;
    this.isUpdateable = isUpdateable;
    this.rowSpan = rowSpan;
    this.colSpan = colSpan;
  }
}

export class Row {
  cells: Cell[];
  isHeading: boolean;
  constructor(cells: Cell[], isHeading: boolean) {
    this.isHeading = isHeading;
    this.cells = cells;
  }
}

export class Table {
  rows: Row[];
  constructor(rows: Row[]) {
    this.rows = rows;
  }
}

export class Question {
  type: QuestionType;
  desc: string;
  answer_table?: Table[];
  answer_text?: string;
}

export class SubSection {
  title: string;
  questions: Question[];
}

export class Section {
  title: string;
  subSections: SubSection[];
}

export const companySectionsTemplate: Section[] = [
  {
    title: 'Section A',
    subSections: [
      {
        title: 'I. Collective input required ',
        // type: 'normal',
        // progress: [37, 178],
        // inProgress: true,
        questions: [
          {
            desc: '1. Corporate Identity Number (CIN) of the Listed Entity',
            type: QuestionType.TEXT,
          },
          { desc: '2. Name of the Listed Entity', type: QuestionType.TEXT },
          { desc: '3. Year of incorporation', type: QuestionType.TEXT },
          { desc: '4. Registered office address', type: QuestionType.TEXT },
          { desc: '5. Corporate address', type: QuestionType.TEXT },
          { desc: '6. E-mail', type: QuestionType.TEXT },
          { desc: '7. Telephone', type: QuestionType.TEXT },
          { desc: '8. website', type: QuestionType.TEXT },
          {
            desc: '9. Financial year for which reporting is being done',
            type: QuestionType.TEXT,
          },
          {
            desc: '10. Name of the Stock Exchange(s) where shares are listed',
            type: QuestionType.TEXT,
          },
          { desc: '11. Paid-up Capital (In Rs)', type: QuestionType.TEXT },
          {
            desc: '12. Name and contact details (telephone, email address) of the person who may be contacted in case of any queries on the BRSR report',
            type: QuestionType.TEXT,
          },
          { desc: '14. Name of assurance provider.', type: QuestionType.TEXT },
          { desc: '15. Type of assurance obtained', type: QuestionType.TEXT },
        ],
      },
      {
        title: 'II. Finance',
        // id: 'Finance',
        // type: 'tabular',
        // isFixedLength: false,
        // progress: [37, 178],
        // inProgress: true,
        // tabletype: 1,
        questions: [
          {
            type: QuestionType.TABLE,
            desc: '1.Details of business activities (accounting for 90% of the turnover):',
            // tabulardata: [
            //   ['S. No.', 'number'],
            //   ['Description of Main Activity', 'text'],
            //   ['Description of Business Activity', 'text'],
            //   ['% of Turnover of the entity', 'number'],
            // ],
            // defaultLength: 7,
            answer_table: [
              new Table([
                new Row(
                  [
                    'Sr. No.',
                    'Description of Main Activity',
                    'Description of Business Activity',
                    '% of Turnover of the entity',
                  ].map((cell) => new Cell(cell, false, 1, 1)),
                  true,
                ),
                ...Array.from({ length: 7 }).map(
                  (_) =>
                    new Row(
                      [
                        ...Array.from({ length: 4 }).map(
                          () => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '2.Products/Services sold by the entity (accounting for 90% of the entity’s Turnover)',
            answer_table: [
              new Table([
                new Row(
                  [
                    ...[
                      'Sr. No.',
                      'Product/Service',
                      'NIC Code',
                      '% of total Turnover contribute',
                    ].map((head) => new Cell(head, false, 1, 1)),
                  ],
                  true,
                ),
                ...Array.from({ length: 7 }).map(
                  (_) =>
                    new Row(
                      [
                        ...Array.from({ length: 4 }).map(
                          () => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
        ],
      },
      {
        title: 'III. Compliance admistration ',
        // id: 'ComplianceAdmistration ',
        // type: 'tabular',
        // isFixedLength: true,
        // progress: [37, 178],
        // inProgress: true,
        // tabletype: 3,
        questions: [
          {
            type: QuestionType.TABLE,
            answer_table: [
              new Table([
                new Row(
                  [
                    'Location',
                    'Number of plants',
                    'Number of offices',
                    'Description of Business Activity',
                    'Total',
                  ].map((head) => new Cell(head, false, 1, 1)),
                  true,
                ),
                ...['National', 'International'].map(
                  (firstColData) =>
                    new Row(
                      Array.from({ length: 5 }).map(
                        (_, ind: number) =>
                          new Cell(ind ? '' : firstColData, ind > 0, 1, 1),
                      ),
                      false,
                    ),
                ),
              ]),
            ],
            // colFirstData: ['Location', 'National', 'International'],
            desc: '1.Details of business activities (accounting for 90% of the turnover):',
            // tabulardata: [
            //   ['Number of plants', 'number'],
            //   ['Number of offices', 'text'],
            //   ['Description of Business Activity', 'text'],
            //   ['Total', 'number'],
            // ],
            // defaultLength: 3,
          },
          {
            type: QuestionType.TABLE,
            answer_table: [
              new Table([
                new Row(
                  ['Location', 'Number'].map(
                    (head) => new Cell(head, false, 1, 1),
                  ),
                  true,
                ),
                ...['National', 'International'].map(
                  (firstColData) =>
                    new Row(
                      Array.from({ length: 5 }).map(
                        (_, ind: number) =>
                          new Cell(ind ? '' : firstColData, ind > 0, 1, 1),
                      ),
                      false,
                    ),
                ),
              ]),
            ],
            // colFirstData: ['Location', 'National', 'International'],
            desc: 'a. Number of locations',
            // tabulardata: [['Number', 'number']],
            // defaultLength: 3,
          },
        ],
      },

      {
        title: 'IV. Employees',
        questions: [
          {
            type: QuestionType.TABLE,
            desc: '20. Details as at the end of Financial Year:',
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('Particulars', false, 2, 1),
                    new Cell('Total (A)', false, 2, 1),
                    new Cell('Male', false, 1, 2),
                    new Cell('Female', false, 1, 2),
                  ],
                  true,
                ),
                new Row(
                  [
                    new Cell('No. (B)', false, 2, 1),
                    new Cell('% (B / A)', false, 2, 1),
                    new Cell('No. (C)', false, 1, 2),
                    new Cell('% (C / A)', false, 1, 2),
                  ],
                  true,
                ),
                new Row([new Cell('EMPLOYEES', false, 1, 6)], false),
                ...[
                  'Permanent (D)',
                  'Other than Permanent (E)',
                  'Total employees (D + E)',
                ].map(
                  (firstCol) =>
                    new Row(
                      Array.from({ length: 6 }).map(
                        (_, ind: number) =>
                          new Cell(ind === 0 ? firstCol : '', ind > 0, 1, 1),
                      ),
                      false,
                    ),
                ),
                new Row([new Cell('WORKERS', false, 1, 6)], false),
              ]),
            ],
            // employee: {
            //   colFirstData: [
            //     'Permanent (D)',
            //     'Other than Permanent (E)',
            //     'Total employees (D + E)',
            //   ],
            // },
            // worker: {
            //   colFirstData: [
            //     'Permanent (F)',
            //     'Other than Permanent (G)',
            //     'Total employees (F + G)',
            //   ],
            // },
          },
        ],
      },

      {
        // inProgress: true,
        // progress: [30, 100],
        // type: 'tabular',
        // tabletype: 1,
        // id: 'holding',
        // isFixedLength: true,
        title:
          'V. Holding, Subsidiary and Associate Companies (including joint ventures)',
        questions: [
          {
            // id: 'q1',
            desc: '23. (a) Names of holding / subsidiary / associate companies / joint ventures',
            type: QuestionType.TABLE,
            answer_table: [
              new Table([
                new Row(
                  ['a', 'b', 'c', 'd'].map(
                    (heading) => new Cell(heading, true, 1, 1),
                  ),
                  true,
                ),
                ...Array.from({ length: 3 }).map(
                  (_) =>
                    new Row(
                      Array.from({ length: 4 }).map(
                        (_) => new Cell('', true, 1, 1),
                      ),
                      false,
                    ),
                ),
              ]),
            ],
            // tabulardata: [
            //   ['Sr. No.', 'number'],
            //   ['a', 'text'],
            //   ['b', 'text'],
            //   ['c', 'text'],
            //   ['d', 'text'],
            // ],
            // defaultLength: 3,
          },
        ],
      },

      {
        // type: 'normal',
        // id: 'csr',
        title: 'VI. CSR Details',
        // progress: [30, 100],
        // inPropgress: true,
        questions: [
          {
            // id: '1',
            type: QuestionType.TEXT,
            desc: '24. (i) Whether CSR is applicable as per section 135 of Companies Act, 2013',
          },
          {
            // id: '1',
            type: QuestionType.TEXT,
            desc: '(ii) Turnover (in Rs.)',
            answer_text: '',
          },
          {
            // id: '2',
            type: QuestionType.TEXT,
            desc: '(iii) Net worth (in Rs.)',
            answer_text: '',
          },
        ],
      },

      {
        //   inProgress: true,
        //   progress: [30, 100],
        //   type: 'tabular',
        //   id: 'compliance',
        title: 'VII. Transparency and Disclosures Compliances',
        // tabletype: 1,
        questions: [
          {
            type: QuestionType.TABLE,
            // id: 'q1',
            desc: '23. Complaints/Grievances on any of the principles (Principles 1 to 9) under the National Guidelines on Responsible Business Conduct:',

            answer_table: [
              new Table([
                new Row(
                  ['a', 'b', 'c', 'd'].map(
                    (heading) => new Cell(heading, true, 1, 1),
                  ),
                  true,
                ),
                ...Array.from({ length: 3 }).map(
                  (_) =>
                    new Row(
                      Array.from({ length: 4 }).map(
                        (_) => new Cell('', true, 1, 1),
                      ),
                      false,
                    ),
                ),
              ]),
            ],
            // tabulardata: [
            //   ['Sr. No.', 'number'],
            //   ['a', 'text'],
            //   ['b', 'text'],
            //   ['c', 'text'],
            //   ['d', 'text'],
            // ],
            // defaultLength: 7,
          },
        ],
      },

      {
        // type: 'normal',
        // id: 'other',
        title: 'VIII. Other Details',
        questions: [],
      },
    ],
  },
  {
    title: 'Section B',
    subSections: [
      {
        title: 'I. Policy and process',
        questions: [
          {
            desc: 'This section is aimed at helping businesses demonstrate the structures, policies and processes put in place towards adopting the NGRBC Principles and Core Elements.',
            type: QuestionType.TABLE,
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('Question', false, 1, 1),
                    ...Array.from({ length: 9 }).map(
                      (_, ind: number) => new Cell(`P${ind + 1}`, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                ...[
                  `Whether your entity’s policy/policies cover each principle and its core elements of the NGRBCs. (Yes/No)`,
                  `Has the policy been approved by the Board? (Yes/No)`,
                  `Web Link of the Policies, if available`,
                  `Whether the entity has translated the policy into procedures. (Yes / No)`,
                  `Do the enlisted policies extend to your value chain partners? (Yes/No)`,
                  `Name of the national and international codes/certifications/labels/ standards (e.g. Forest Stewardship Council, Fairtrade, Rainforest Alliance, Trustea) standards (e.g. SA 8000, OHSAS, ISO, BIS) adopted by your entity and mapped to each principle.`,
                  `Specific commitments, goals and targets set by the entity with defined timelines, if any.`,
                  `Performance of the entity against the specific commitments, goals and targets along-with reasons in case the same are not met.`,
                ].map(
                  (question) =>
                    new Row(
                      Array.from({ length: 10 }).map(
                        (_, ind: number) =>
                          new Cell(ind === 0 ? question : '', ind > 0, 1, 1),
                      ),
                      false,
                    ),
                ),
              ]),
              new Table([
                new Row([new Cell('Governance, leadership and oversight', false, 1, 2)], true),
                new Row([new Cell('7. Statement by director responsible for the business responsibility report, highlighting ESG related challenges, targets and achievements (listed entity has flexibility regarding the placement of this disclosure)', false, 1, 2)], false),
                new Row([new Cell('8. Details of the highest authority responsible for implementation and oversight of the Business Responsibility policy (ies).', false, 1, 1), new Cell('', true, 1, 1)], false),
                new Row([new Cell('9. Does the entity have a specified Committee of the Board/ Director responsible for decision making on sustainability related issues? (Yes / No). If yes, provide details.', false, 1, 1), new Cell('', true, 1, 1)], false)
              ])
            ],
          },
        ],
      },
      {
        title: 'II. Review',
        questions: [
          {
            desc: 'Details of Review of NGRBCs by the Company:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('Question', false, 1, 1),
                    new Cell(
                      'Indicate whether review was undertaken by Director / Committee of the Board/ Any other Committee',
                      false,
                      1,
                      9,
                    ),
                    new Cell(
                      'Frequency (Annually/ Half yearly/ Quarterly/ Any other – please specify)',
                      false,
                      1,
                      9,
                    ),
                  ],
                  true,
                ),
                new Row(
                  [
                    new Cell('', false, 1, 1),
                    ...Array.from({ length: 9 }).map(
                      (_, ind: number) => new Cell(`P${ind + 1}`, false, 1, 1),
                    ),
                    ...Array.from({ length: 9 }).map(
                      (_, ind: number) => new Cell(`P${ind + 1}`, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                ...[
                  `Performance against above policies and follow up action`,
                  `Compliance with statutory requirements of relevance to the principles, and, rectification of any non-compliances`,
                ].map(
                  (question) =>
                    new Row([
                      ...Array.from({ length: 19 }).map(
                        (_, ind: number) =>
                          new Cell(ind === 0 ? question : '', ind > 0, 1, 1),
                      )
                    ], true),
                ),
              ]),


              new Table([
                new Row([
                  new Cell("Question", false, 1, 1),
                  ...Array.from({ length: 9 }).map(
                    (_, ind: number) => new Cell(`P${ind + 1}`, false, 1, 1),
                  ),
                ], true),
                new Row([
                  new Cell("Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No). If yes, provide name of the agency", false, 1, 1),
                  ...Array.from({ length: 9 }).map(
                    (_) => new Cell(``, true, 1, 1),
                  ),
                ], true),
              ])
            ],
          },
        ],
      },
      {
        title: 'III. Reporting',
        questions: [
          {
            desc: 'This section is aimed at helping businesses demonstrate the structures, policies and processes put in place towards adopting the NGRBC Principles and Core Elements.',
            type: QuestionType.TABLE,
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('Question', false, 1, 1),
                    ...Array.from({ length: 9 }).map(
                      (_, ind: number) => new Cell(`P${ind + 1}`, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                ...[
                  `The entity does not consider the Principles material to its business (Yes/No) `,
                  `The entity is not at a stage where it is in a position to formulate and implement the policies on specified principles (Yes/No) `,
                  `The entity does not have the financial or/human and technical resources available for the task (Yes/No) `,
                  'It is planned to be done in the next financial year (Yes/No)',
                  'Any other reason (please specify)',
                ].map(
                  (question) =>
                    new Row(
                      Array.from({ length: 10 }).map(
                        (_, ind: number) =>
                          new Cell(ind === 0 ? question : '', ind > 0, 1, 1),
                      ),
                      false,
                    ),
                ),
              ]),
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Section C',
    subSections: [
      {
        title:
          'PRINCIPLE 1 Businesses should conduct and govern themselves with integrity, and in a manner that is Ethical, Transparent and Accountable.',
        questions: [
          {
            type: QuestionType.TABLE,
            desc: '1. Percentage coverage by training and awareness programmes on any of the Principles during the financial year:',
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('Segment', false, 1, 1),
                    new Cell(
                      'Total number of training and awareness programmes held',
                      false,
                      1,
                      1,
                    ),
                    new Cell(
                      'Topics / principles covered under the training and its impact',
                      false,
                      1,
                      1,
                    ),
                    new Cell(
                      '%age of persons in respective category covered by the awareness programmes',
                      false,
                      1,
                      1,
                    ),
                  ],
                  true,
                ),
                ...[
                  'Board of Diretors',
                  'Key Managerial Personnel',
                  'Employees other than BoD and KMPs',
                  'Workers',
                ].map(
                  (segment: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(segment, false, 1, 1),
                        ...Array.from({ length: 3 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '2. Details of fines / penalties /punishment/ award/ compounding fees/ settlement amount paid in proceedings (by the entity or by directors / KMPs) with regulators/ law enforcement agencies/ judicial institutions, in the financial year, in the following format (Note: the entity shall make disclosures on the basis of materiality as specified in Regulation 30 of SEBI (Listing Obligations and Disclosure Obligations) Regulations, 2015 and as disclosed on the entity’s website):',
            answer_table: [
              new Table([
                new Row([new Cell('Monetary', true, 1, 6)], true),
                new Row(
                  [
                    ...[
                      '',
                      'NGRBC Principle',
                      'Name of the regulatory/ enforcement agencies/ judicial institutions',
                      'Amount (In INR)',
                      'Brief of the Case',
                      'Has an appeal been preferred? (Yes/No)',
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                ...['Penalty/ Fine', 'Settlement', 'Compounding fee'].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 5 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),

              new Table([
                new Row([new Cell('Non-Monetary', true, 1, 5)], true),
                new Row(
                  [
                    ...[
                      '',
                      'NGRBC Principl',
                      'Name of the regulatory/ enforcement agencies/ judicial institutions',
                      'Brief of the Case',
                      'Has an appeal been preferred? (Yes/No)',
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                ...['Imprisonment', 'Punishment'].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 4 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '3. Of the instances disclosed in Question 2 above, details of the Appeal/ Revision preferred in cases where monetary or non-monetary action has been appealed.',
            answer_table: [
              new Table([
                new Row(
                  [
                    ...[
                      'Case Details',
                      'Name of the regulatory/ enforcement agencies/ judicial institutions',
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                new Row(
                  [new Cell('', true, 1, 1), new Cell('', true, 1, 1)],
                  false,
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '4. Does the entity have an anti-corruption or anti-bribery policy? If yes, provide details in brief and if available, provide a web-link to the policy. ',
          },
          {
            type: QuestionType.TABLE,
            desc: '5. Number of Directors/KMPs/employees/workers against whom disciplinary action was taken by any law enforcement agency for the charges of bribery/ corruption:',
            answer_table: [
              new Table([
                new Row(
                  [
                    ...[
                      '',
                      'FY _____(Current Financial Year)',
                      'FY _____ (Previous Financial Year)',
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                ...['Directors', 'KMPs', 'Employees', 'Workers'].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 2 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
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
            type: QuestionType.TABLE,
            desc: '6. Details of complaints with regard to conflict of interest:',
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('', false, 1, 1),
                    ...[
                      'FY _____(Current Financial Year)',
                      'FY _____ (Previous Financial Year)',
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(heading, false, 1, 2),
                    ),
                  ],
                  true,
                ),
                new Row(
                  [
                    ...['', 'Number', 'Remarks', 'Number', 'Remarks'].map(
                      (heading: string, ind: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                ...[
                  'Number of complaints received in relation to issues of Conflict of Interest of the Directors',
                  'Number of complaints received in relation to issues of Conflict of Interes of the KMPs',
                ].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 4 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '7. Provide details of any corrective action taken or underway on issues related to fines / penalties / action taken by regulators/ law enforcement agencies/ judicial institutions, on cases of corruption and conflicts of interest.',
          },
          {
            type: QuestionType.TABLE,
            desc: '8. Number of days of accounts payables ((Accounts payable *365) / Cost of goods/services procured) in the following format:',
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('', false, 1, 1),
                    ...[
                      'FY _____(Current Financial Year)',
                      'FY _____ (Previous Financial Year)',
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                ...['Number of days of accounts payables'].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 2 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '9. Open-ness of business Provide details of concentration of purchases and sales with trading houses, dealers, and related parties along-with loans and advances & investments, with related parties, in the following format:',
            answer_table: [
              new Table([
                new Row(
                  [
                    ...[
                      'Parameter',
                      'Metrics',
                      'FY _____(Current Financial Year)',
                      'FY _____ (Previous Financial Year)',
                    ].map(
                      (heading: string, ind: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),

                new Row(
                  [
                    new Cell('Concentration of Purchases', false, 3, 1),
                    new Cell(
                      'a. Purchases from trading houses as % of total purchases ',
                      false,
                      1,
                      1,
                    ),
                    new Cell('', true, 1, 1),
                    new Cell('', true, 1, 1),
                  ],
                  false,
                ),
                new Row(
                  [
                    // new Cell("sC-p1-s1-q9-r3-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      'b. Number of trading houses where purchases are made from ',
                      false,
                      1,
                      1,
                    ),
                    new Cell('', true, 1, 1),
                    new Cell('', true, 1, 1),
                  ],
                  false,
                ),
                new Row(
                  [
                    // new Cell("sC-p1-s1-q9-r4-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      'c. Purchases from top 10 trading houses as % of total purchases from trading houses ',
                      false,
                      1,
                      1,
                    ),
                    new Cell('', true, 1, 1),
                    new Cell('', true, 1, 1),
                  ],
                  false,
                ),
                new Row(
                  [
                    new Cell('Concentration of Sales', false, 3, 1),
                    new Cell(
                      'a. Sales to dealers / distributors as % of total sales',
                      false,
                      1,
                      1,
                    ),
                    new Cell('', true, 1, 1),
                    new Cell('', true, 1, 1),
                  ],
                  false,
                ),
                new Row(
                  [
                    // new Cell("sC-p1-s1-q9-r3-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      'b. Number of dealers / distributors to whom sales are made',
                      false,
                      1,
                      1,
                    ),
                    new Cell('', true, 1, 1),
                    new Cell('', true, 1, 1),
                  ],
                  false,
                ),
                new Row(
                  [
                    // new Cell("sC-p1-s1-q9-r4-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      'c. Sales to top 10 dealers / distributors as % of total sales to dealers / distributors',
                      false,
                      1,
                      1,
                    ),
                    new Cell('', true, 1, 1),
                    new Cell('', true, 1, 1),
                  ],
                  false,
                ),
                new Row(
                  [
                    new Cell('Share of RPTs in', false, 4, 1),
                    new Cell(
                      'a. Purchases (Purchaseswith related parties / Total Purchases)',
                      false,
                      1,
                      1,
                    ),
                    new Cell('', true, 1, 1),
                    new Cell('', true, 1, 1),
                  ],
                  false,
                ),
                new Row(
                  [
                    // new Cell("sC-p1-s1-q9-r3-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      'b. Sales (Sales to related parties / Total Sales)',
                      false,
                      1,
                      1,
                    ),
                    new Cell('', true, 1, 1),
                    new Cell('', true, 1, 1),
                  ],
                  false,
                ),
                new Row(
                  [
                    // new Cell("sC-p1-s1-q9-r4-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      'c. Loans & advances (Loans & advances given to related parties / Total loans & advances)',
                      false,
                      1,
                      1,
                    ),
                    new Cell('', true, 1, 1),
                    new Cell('', true, 1, 1),
                  ],
                  false,
                ),

                new Row(
                  [
                    // new Cell("sC-p1-s1-q9-r4-c1", 'Concentration of Purchases', false, 3, 1),
                    new Cell(
                      'd. Investments ( Investments in related parties / Total Investments made)',
                      false,
                      1,
                      1,
                    ),
                    new Cell('', true, 1, 1),
                    new Cell('', true, 1, 1),
                  ],
                  false,
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '1. Awareness programmes conducted for value chain partners on any of the Principles during the financial year:',
            answer_table: [
              new Table([
                new Row(
                  [
                    ...[
                      'Total number of awareness programmes held',
                      'Topics / principles covered under the training',
                      '%age of value chain partners covered (by value of business done with such partners) under the awareness programmes',
                    ].map(
                      (heading: string, cellNo: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                new Row(
                  [
                    ...Array.from({ length: 3 }).map(
                      (_, cellNo: number) => new Cell('', true, 1, 1),
                    ),
                  ],
                  false,
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '2. Does the entity have processes in place to avoid/ manage conflict of interests involving members of the Board? (Yes/No) If Yes, provide details of the same.',
          },
        ],
      },
      {
        title:
          'PRINCIPLE 2 Businesses should provide goods and services in a manner that is sustainable and safe',
        questions: [
          {
            type: QuestionType.TABLE,
            desc: '1. Percentage of R&D and capital expenditure (capex) investments in specific technologies to improve the environmental and social impacts of product and processes to total R&D and capex investments made by the entity, respectively',
            answer_table: [
              new Table([
                new Row(
                  [
                    ...[
                      '',
                      'Current Financial Year',
                      'Previous Financial Year',
                      'Details of improvements in environmental and social impacts',
                    ].map(
                      (heading: string, cellNo: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                ...['R&D', 'Capex'].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 3 }).map(
                          (_, cellNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '2. a. Does the entity have procedures in place for sustainable sourcing? (Yes/No) b. If yes, what percentage of inputs were sourced sustainably? ',
          },
          {
            type: QuestionType.TEXT,
            desc: '3. Describe the processes in place to safely reclaim your products for reusing, recycling and disposing at the end of life, for (a) Plastics (including packaging) (b) E-waste (c) Hazardous waste and (d) other waste.',
          },
          {
            type: QuestionType.TEXT,
            desc: '4. Whether Extended Producer Responsibility (EPR) is applicable to the entity’s activities (Yes / No). If yes, whether the waste collection plan is in line with the Extended Producer Responsibility (EPR) plan submitted to Pollution Control Boards? If not, provide steps taken to address the same.',
          },
          {
            type: QuestionType.TABLE,
            desc: '1. Has the entity conducted Life Cycle Perspective / Assessments (LCA) for any of its products (for manufacturing industry) or for its services (for service industry)? If yes, provide details in the following format?',
            answer_table: [
              new Table([
                new Row(
                  [
                    ...[
                      'NIC Code',
                      'Name of Product /Service',
                      '% of total Turnover contributed',
                      'Boundary for which the LifeCycle Perspective / Assessment was conducted',
                      'Whether conducted by independent external agency (Yes/No)',
                      'Results communicated in public domain (Yes/No) If yes, provide the web-link.',
                    ].map(
                      (heading: string, cellNo: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                ...[''].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        ...Array.from({ length: 6 }).map(
                          (_, cellNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '2. If there are any significant social or environmental concerns and/or risks arising from production or disposal of your products / services, as identified in the Life Cycle Perspective / Assessments (LCA) or through any other means, briefly describe the same along-with action taken to mitigate the same.',
            answer_table: [
              new Table([
                new Row(
                  [
                    ...[
                      'Name of Product / Service',
                      'Description of the risk / concern',
                      'Action Taken',
                    ].map(
                      (heading: string, cellNo: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                ...Array.from({ length: 3 }).map(
                  (_, rowNo: number) =>
                    new Row(
                      [
                        ...Array.from({ length: 3 }).map(
                          (_, cellNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '3. Percentage of recycled or reused input material to total material (by value) used in production (for manufacturing industry) or providing services (for service industry).',
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('Indicate input material ', false, 2, 1),
                    new Cell(
                      'Recycled or re-used input material to total material ',
                      false,
                      1,
                      2,
                    ),
                  ],
                  true,
                ),
                new Row(
                  [
                    new Cell('FY _____ Current Financial Year', false, 1, 1),
                    new Cell('FY _____ Previous Financial Year', false, 1, 1),
                  ],
                  true,
                ),
                ...Array.from({ length: 3 }).map(
                  (_, rowNo: number) =>
                    new Row(
                      [
                        ...Array.from({ length: 3 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '4. Of the products and packaging reclaimed at end of life of products, amount (in metric tonnes) reused, recycled, and safely disposed, as per the following format:',
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('Indicate input material ', false, 2, 1),
                    new Cell('FY _____ Current Financial Year', false, 1, 3),
                    new Cell('FY _____ Previous Financial Year', false, 1, 3),
                  ],
                  true,
                ),
                new Row(
                  [
                    new Cell('Re-Used', false, 1, 1),
                    new Cell('Recycled', false, 1, 1),
                    new Cell('Safely Disposed', true, 1, 1),
                    new Cell('Re-Used', false, 1, 1),
                    new Cell('Recycled', false, 1, 1),
                    new Cell('Safely Disposed', true, 1, 1),
                  ],
                  true,
                ),
                ...[
                  'Plastics (including packaging)',
                  'E-waste',
                  'Hazardous waste',
                  'Other waste',
                ].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 6 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '5. Reclaimed products and their packaging materials (as percentage of products sold) for each product category.',
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('Indicate product category', false, 1, 1),
                    new Cell(
                      'Reclaimed products and their packaging materials as % of total products sold in respective category',
                      false,
                      1,
                      1,
                    ),
                  ],
                  true,
                ),
                ...Array.from({ length: 3 }).map(
                  (_, rowNo: number) =>
                    new Row(
                      [
                        ...Array.from({ length: 2 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
        ],
      },
      {
        title:
          'PRINCIPLE 3 Businesses should respect and promote the well-being of all employees, including those in their value chains',

        questions: [
          {
            type: QuestionType.TABLE,
            desc: '1. a. Details of measures for the well-being of employees:',
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('Category', false, 3, 1),
                    new Cell('% of employees covered by', false, 1, 11),
                  ],
                  true,
                ),
                new Row(
                  [
                    new Cell('Total (A)', false, 2, 1),
                    ...[
                      'Health insurance',
                      'Accident insurance',
                      'Maternity benefits',
                      'Paternity Benefits',
                      'Day Care facilities',
                    ].map(
                      (heading: string, colNo: number) =>
                        new Cell(heading, false, 1, 2),
                    ),
                  ],
                  true,
                ),
                new Row(
                  [
                    ...[
                      'Number (B)',
                      '% (B / A)',
                      'Number (C)',
                      '% (C / A)',
                      'Number (D)',
                      '% (D / A)',
                      'Number (E)',
                      '% (E / A)',
                      'Number (F)',
                      '% (F / A)',
                    ].map(
                      (heading: string, colNo: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                new Row([new Cell('Permanent employees', false, 1, 11)], true),
                ...['Male', 'Female', 'Total'].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 11 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
                new Row(
                  [new Cell('Other than Permanent workers', false, 1, 11)],
                  false,
                ),
                ...['Male', 'Female', 'Total'].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 11 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '1. b. Details of measures for the well-being of workers:',
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('Category', false, 3, 1),
                    new Cell('% of workers covered by', false, 1, 11),
                  ],
                  true,
                ),
                new Row(
                  [
                    new Cell('Total (A)', false, 2, 1),
                    ...[
                      'Health insurance',
                      'Accident insurance',
                      'Maternity benefits',
                      'Paternity Benefits',
                      'Day Care facilities',
                    ].map(
                      (heading: string, colNo: number) =>
                        new Cell(heading, false, 1, 2),
                    ),
                  ],
                  true,
                ),
                new Row(
                  [
                    ...[
                      'Number (B)',
                      '% (B / A)',
                      'Number (C)',
                      '% (C / A)',
                      'Number (D)',
                      '% (D / A)',
                      'Number (E)',
                      '% (E / A)',
                      'Number (F)',
                      '% (F / A)',
                    ].map(
                      (heading: string, colNo: number) =>
                        new Cell(heading, false, 1, 1),
                    ),
                  ],
                  true,
                ),
                new Row([new Cell('Permanent employees', false, 1, 11)], true),
                ...['Male', 'Female', 'Total'].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 11 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
                new Row(
                  [new Cell('Other than Permanent employees', false, 1, 11)],
                  false,
                ),
                ...['Male', 'Female', 'Total'].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 11 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '1. c. Spending on measures towards well-being of employees and workers (including permanent and other than permanent) in the following format –',
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('', false, 1, 1),
                    new Cell('FY _____ Current Financial Year', false, 1, 1),
                    new Cell('FY _____ Previous Financial Year', false, 1, 1),
                  ],
                  true,
                ),
                new Row(
                  [
                    new Cell(
                      'Cost incurred on wellbeing measures as a % of total revenue of the company',
                      false,
                      1,
                      1,
                    ),
                    new Cell('', true, 1, 1),
                    new Cell('', false, 1, 1),
                  ],
                  false,
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '2. Details of retirement benefits, for Current FY and Previous Financial Year.',
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('Benefits', false, 2, 1),
                    new Cell('FY _____ Current Financial Year', false, 1, 3),
                    new Cell('FY _____ Previous Financial Year', false, 1, 3),
                  ],
                  true,
                ),
                new Row(
                  [
                    new Cell(
                      'No. of employees covered as a % of total employees',
                      false,
                      1,
                      1,
                    ),
                    new Cell(
                      'No. of workers covered as a % of total workers',
                      false,
                      1,
                      1,
                    ),
                    new Cell(
                      'Deducted and deposited with the authority (Y/N/N.A.)',
                      false,
                      1,
                      1,
                    ),
                    new Cell(
                      'No. of employees covered as a % of total employees',
                      false,
                      1,
                      1,
                    ),
                    new Cell(
                      'No. of workers covered as a % of total workers',
                      false,
                      1,
                      1,
                    ),
                    new Cell(
                      'Deducted and deposited with the authority (Y/N/N.A.)',
                      false,
                      1,
                      1,
                    ),
                  ],
                  true,
                ),
                ...['PF', 'Gratuity', 'ESI', 'Others – pleasespecify'].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 6 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '3. Accessibility of workplaces Are the premises / offices of the entity accessible to differently abled employees and workers, as per the requirements of the Rights of Persons with Disabilities Act, 2016? If not, whether any steps are being taken by the entity in this regard.',
          },
          {
            type: QuestionType.TEXT,
            desc: '4. Does the entity have an equal opportunity policy as per the Rights of Persons with Disabilities Act, 2016? If so, provide a web-link to the policy. ',
          },
          {
            type: QuestionType.TABLE,
            desc: '5. Return to work and Retention rates of permanent employees and workers that took parental leave.',
            answer_table: [
              new Table([
                new Row(
                  [
                    new Cell('', false, 1, 1),
                    new Cell('Permanent employees', false, 1, 2),
                    new Cell('Permanent workers', false, 1, 2),
                  ],
                  true,
                ),
                new Row(
                  [
                    new Cell('Gender', false, 1, 1),
                    new Cell('Return to work rate', false, 1, 1),
                    new Cell('Retention rate', false, 1, 1),
                    new Cell('Return to work rate', false, 1, 1),
                    new Cell('Retention rate', false, 1, 1),
                  ],
                  true,
                ),
                ...['Male', 'Female', 'Total'].map(
                  (firstCol: string, rowNo: number) =>
                    new Row(
                      [
                        new Cell(firstCol, false, 1, 1),
                        ...Array.from({ length: 4 }).map(
                          (_, colNo: number) => new Cell('', true, 1, 1),
                        ),
                      ],
                      false,
                    ),
                ),
              ]),
            ],
          },
        ],
      },
    ],
  },
];
