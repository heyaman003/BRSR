<<<<<<< HEAD
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
  isDynamic: boolean;
  rows: Row[];
  constructor(rows: Row[], isDynamic: boolean) {
    this.rows = rows;
    this.isDynamic = isDynamic;
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
              new Table(
                [
                  new Row(
                    [
                      'Description of Main Activity',
                      'Description of Business Activity',
                      '% of Turnover of the entity',
                    ].map((cell) => new Cell(cell, false, 1, 1)),
                    true,
                  ),
                  ...Array.from({ length: 2 }).map(
                    (_) =>
                      new Row(
                        [
                          ...Array.from({ length: 3 }).map(
                            () => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                true,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '2.Products/Services sold by the entity (accounting for 90% of the entity’s Turnover)',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      ...[
                        'Product/Service',
                        'NIC Code',
                        '% of total Turnover contribute',
                      ].map((head) => new Cell(head, false, 1, 1)),
                    ],
                    true,
                  ),
                  ...Array.from({ length: 2 }).map(
                    (_) =>
                      new Row(
                        [
                          ...Array.from({ length: 3 }).map(
                            () => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                true,
              ),
            ],
=======

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
>>>>>>> 969c5c9 (backend changes)
          },
        ],
      },
      {
<<<<<<< HEAD
        title: 'III. Compliance administration ',
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
              new Table(
                [
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
                ],
                false,
              ),
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
              new Table(
                [
                  new Row(
                    ['Location', 'Number'].map(
                      (head) => new Cell(head, false, 1, 1),
                    ),
                    true,
                  ),
                  ...['National', 'International'].map(
                    (firstColData) =>
                      new Row(
                        [
                          new Cell(firstColData, false, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
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
              new Table(
                [
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
                  ...[
                    'Permanent (F)',
                    'Other than Permanent (G)',
                    'Total employees (F + G)',
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
                ],
                false,
              ),
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
              new Table(
                [
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
                ],
                true,
              ),
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
            type: QuestionType.BOOLEAN,
            desc: '24. (i) Whether CSR is applicable as per section 135 of Companies Act, 2013',
          },
          {
            type: QuestionType.TEXT,
            desc: '(ii) Turnover (in Rs.)',
            answer_text: '',
          },
          {
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
              new Table(
                [
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
                ],
                true,
              ),
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
              new Table(
                [
                  new Row(
                    [
                      new Cell('Question', false, 1, 1),
                      ...Array.from({ length: 9 }).map(
                        (_, ind: number) =>
                          new Cell(`P${ind + 1}`, false, 1, 1),
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
                ],
                false,
              ),
              new Table(
                [
                  new Row(
                    [
                      new Cell(
                        'Governance, leadership and oversight',
                        false,
                        1,
                        2,
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell(
                        '7. Statement by director responsible for the business responsibility report, highlighting ESG related challenges, targets and achievements (listed entity has flexibility regarding the placement of this disclosure)',
                        false,
                        1,
                        2,
                      ),
                    ],
                    false,
                  ),
                  new Row(
                    [
                      new Cell(
                        '8. Details of the highest authority responsible for implementation and oversight of the Business Responsibility policy (ies).',
                        false,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                  new Row(
                    [
                      new Cell(
                        '9. Does the entity have a specified Committee of the Board/ Director responsible for decision making on sustainability related issues? (Yes / No). If yes, provide details.',
                        false,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                ],
                false,
              ),
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
              new Table(
                [
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
                        (_, ind: number) =>
                          new Cell(`P${ind + 1}`, false, 1, 1),
                      ),
                      ...Array.from({ length: 9 }).map(
                        (_, ind: number) =>
                          new Cell(`P${ind + 1}`, false, 1, 1),
                      ),
                    ],
                    true,
                  ),
                  ...[
                    `Performance against above policies and follow up action`,
                    `Compliance with statutory requirements of relevance to the principles, and, rectification of any non-compliances`,
                  ].map(
                    (question) =>
                      new Row(
                        [
                          ...Array.from({ length: 19 }).map(
                            (_, ind: number) =>
                              new Cell(
                                ind === 0 ? question : '',
                                ind > 0,
                                1,
                                1,
                              ),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),

              new Table(
                [
                  new Row(
                    [
                      new Cell('Question', false, 1, 1),
                      ...Array.from({ length: 9 }).map(
                        (_, ind: number) =>
                          new Cell(`P${ind + 1}`, false, 1, 1),
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No). If yes, provide name of the agency',
                        false,
                        1,
                        1,
                      ),
                      ...Array.from({ length: 9 }).map(
                        (_) => new Cell(``, true, 1, 1),
                      ),
                    ],
                    false,
                  ),
                ],
                false,
              ),
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
              new Table(
                [
                  new Row(
                    [
                      new Cell('Question', false, 1, 1),
                      ...Array.from({ length: 9 }).map(
                        (_, ind: number) =>
                          new Cell(`P${ind + 1}`, false, 1, 1),
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
                ],
                false,
              ),
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
              new Table(
                [
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
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '2. Details of fines / penalties /punishment/ award/ compounding fees/ settlement amount paid in proceedings (by the entity or by directors / KMPs) with regulators/ law enforcement agencies/ judicial institutions, in the financial year, in the following format (Note: the entity shall make disclosures on the basis of materiality as specified in Regulation 30 of SEBI (Listing Obligations and Disclosure Obligations) Regulations, 2015 and as disclosed on the entity’s website):',
            answer_table: [
              new Table(
                [
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
                ],
                false,
              ),

              new Table(
                [
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
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '3. Of the instances disclosed in Question 2 above, details of the Appeal/ Revision preferred in cases where monetary or non-monetary action has been appealed.',
            answer_table: [
              new Table(
                [
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
                ],
                true,
              ),
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
              new Table(
                [
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
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '6. Details of complaints with regard to conflict of interest:',
            answer_table: [
              new Table(
                [
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
                ],
                false,
              ),
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
              new Table(
                [
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
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '9. Open-ness of business Provide details of concentration of purchases and sales with trading houses, dealers, and related parties along-with loans and advances & investments, with related parties, in the following format:',
            answer_table: [
              new Table(
                [
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
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '1. Awareness programmes conducted for value chain partners on any of the Principles during the financial year:',
            answer_table: [
              new Table(
                [
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
                ],
                true,
              ),
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
              new Table(
                [
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
                ],
                false,
              ),
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
              new Table(
                [
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
                ],
                true,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '2. If there are any significant social or environmental concerns and/or risks arising from production or disposal of your products / services, as identified in the Life Cycle Perspective / Assessments (LCA) or through any other means, briefly describe the same along-with action taken to mitigate the same.',
            answer_table: [
              new Table(
                [
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
                ],
                true,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '3. Percentage of recycled or reused input material to total material (by value) used in production (for manufacturing industry) or providing services (for service industry).',
            answer_table: [
              new Table(
                [
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
                ],
                true,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '4. Of the products and packaging reclaimed at end of life of products, amount (in metric tonnes) reused, recycled, and safely disposed, as per the following format:',
            answer_table: [
              new Table(
                [
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
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '5. Reclaimed products and their packaging materials (as percentage of products sold) for each product category.',
            answer_table: [
              new Table(
                [
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
                ],
                true,
              ),
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
              new Table(
                [
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
                  new Row(
                    [new Cell('Permanent employees', false, 1, 11)],
                    true,
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
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '1. b. Details of measures for the well-being of workers:',
            answer_table: [
              new Table(
                [
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
                  new Row(
                    [new Cell('Permanent employees', false, 1, 11)],
                    true,
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
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '1. c. Spending on measures towards well-being of employees and workers (including permanent and other than permanent) in the following format –',
            answer_table: [
              new Table(
                [
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
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '2. Details of retirement benefits, for Current FY and Previous Financial Year.',
            answer_table: [
              new Table(
                [
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
                ],
                false,
              ),
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
              new Table(
                [
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
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '6. Is there a mechanism available to receive and redress grievances for the following categories of employees and worker? If yes, give details of the mechanism in brief.',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1),
                      new Cell(
                        'Yes/No (If Yes, then give details of the mechanism in brief)',
                        false,
                        1,
                        2,
                      ),
                    ],
                    true,
                  ),
                  ...[
                    'Permanent Workers',
                    'Other than Permanent Workers',
                    'Permanent Employees',
                    'Other than Permanent Employees',
                  ].map(
                    (firstCol: string) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '7. Membership of employees and worker in association(s) or Unions recognised by the listed entity:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Category', false, 2, 1),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        3,
                      ),
                      new Cell(
                        'FY _____ (Previous Financial Year)',
                        false,
                        1,
                        3,
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total employees / workers in respective category (A)',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'No. of employees / workers in respective category, who are part of association(s) or Union (B)',
                        false,
                        1,
                        1,
                      ),
                      new Cell('% (B / A) T', false, 1, 3),
                      new Cell(
                        'Total employees / workers in respective category (C)',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'No. of employees / workers in respective category, who are part of association(s) or Union (D)',
                        false,
                        1,
                        1,
                      ),
                      new Cell('% (D / C) T', false, 1, 3),
                    ],
                    true,
                  ),
                  ...[
                    'Total Permanent Employees',
                    'Male',
                    'Female',
                    'Total Permanent Workers',
                    'Male',
                    'Female',
                  ].map(
                    (firstCol: string) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1),
                          ...Array.from({ length: 5 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '8. Details of training given to employees and workers:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Category', false, 3, 1),
                      new Cell('FY _____ Current Financial Year', false, 1, 5),
                      new Cell('FY _____ Current Previous Year', false, 1, 5),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell('Total (A)', false, 2, 1),
                      ...[
                        'On Health and safety measures',
                        'On Skill upgradation',
                      ].map(
                        (heading: string, colNo: number) =>
                          new Cell(heading, false, 1, 2),
                      ),
                      new Cell('Total (D)', false, 2, 1),
                      ...[
                        'On Health and safety measures',
                        'On Skill upgradation',
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
                        'No. (B)',
                        '% (B / A)',
                        'No. (C)',
                        '% (C / A)',
                        'No. (E)',
                        '% (E / D)',
                        'No. (F)',
                        '% (F / D)',
                      ].map(
                        (heading: string, colNo: number) =>
                          new Cell(heading, false, 1, 1),
                      ),
                    ],
                    true,
                  ),
                  new Row([new Cell('Employees', false, 1, 11)], false),
                  ...['Male', 'Female', 'Total'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1),
                          ...Array.from({ length: 10 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                  new Row([new Cell('Workers', false, 1, 11)], false),
                  ...['Male', 'Female', 'Total'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1),
                          ...Array.from({ length: 10 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },

          {
            type: QuestionType.TABLE,
            desc: '9. Details of performance and career development reviews of employees and worker:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Category', false, 2, 1),
                      new Cell('FY _____ Current Financial Year', false, 1, 3),
                      new Cell('FY _____ Current Previous Year', false, 1, 3),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      ...[
                        'Total (A)',
                        'No. (B)',
                        '% (B / A)',
                        'Total (C)',
                        'No. (D)',
                        '% (D / C)',
                      ].map(
                        (heading: string, colNo: number) =>
                          new Cell(heading, false, 1, 1),
                      ),
                    ],
                    true,
                  ),
                  new Row([new Cell('Employees', false, 1, 7)], false),
                  ...['Male', 'Female', 'Total'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1),
                          ...Array.from({ length: 6 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                  new Row([new Cell('Workers', false, 1, 11)], false),
                  ...['Male', 'Female', 'Total'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1),
                          ...Array.from({ length: 6 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },

          {
            type: QuestionType.BOOLEAN,
            desc: '10. a. Whether an occupational health and safety management system has been implemented by the entity?',
            answer_text: '',
          },
          {
            type: QuestionType.TEXT,
            desc: '10. b. What are the processes used to identify work-related hazards and assess risks on a routine and non-routine basis by the entity? ',
            answer_text: '',
          },
          {
            type: QuestionType.BOOLEAN,
            desc: '10. c. Whether you have processes for workers to report the work related hazards and to remove themselves from such risks.',
            answer_text: '',
          },
          {
            type: QuestionType.BOOLEAN,
            desc: '10. d. Do the employees/ worker of the entity have access to non-occupational medical and healthcare services?',
            answer_text: '',
          },

          {
            type: QuestionType.TABLE,
            desc: '11. Details of safety related incidents, in the following format:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Safety Incident/Number', false, 1, 1),
                      new Cell('Category', false, 1, 1),
                      new Cell('FY _____ Current Financial Year', false, 1, 1),
                      new Cell('FY _____ Previous Financial Year', false, 1, 1),
                    ],
                    true,
                  ),
                  ...[
                    'Lost Time Injury Frequency Rate (LTIFR) (per one million-person hours worked)',
                    '',
                    'Total recordable work-related injuries',
                    '',
                    'No. of fatalities',
                    '',
                    'High consequence work-related injury or ill-health (excluding fatalities)',
                    '',
                  ].map((firstCell: string) =>
                    firstCell
                      ? new Row(
                          [
                            new Cell(firstCell, false, 2, 1),
                            new Cell('Employees', false, 1, 1),
                            new Cell('', true, 1, 1),
                            new Cell('', true, 1, 1),
                          ],
                          false,
                        )
                      : new Row(
                          [
                            new Cell('Workers', false, 1, 1),
                            new Cell('', true, 1, 1),
                            new Cell('', true, 1, 1),
                          ],
                          false,
                        ),
                  ),
                ],
                false,
              ),
            ],
          },

          {
            type: QuestionType.TEXT,
            desc: '12. Describe the measures taken by the entity to ensure a safe and healthy work place. ',
            answer_text: '',
          },
          {
            type: QuestionType.TABLE,
            desc: '13. Number of Complaints on the following made by employees and workers:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 2, 1),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        3,
                      ),
                      new Cell(
                        'FY _____ (Previous Financial Year)',
                        false,
                        1,
                        3,
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell('Filed during the year', false, 1, 1),
                      new Cell(
                        'Pending resolution at the end of year',
                        false,
                        1,
                        1,
                      ),
                      new Cell('Remarks', false, 1, 1),
                      new Cell('Filed during the year', false, 1, 1),
                      new Cell(
                        'Pending resolution at the end of year',
                        false,
                        1,
                        1,
                      ),
                      new Cell('Remarks', false, 1, 1),
                    ],
                    true,
                  ),
                  ...['Working Conditions', 'Health &Safety'].map(
                    (firstCell: string) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          ...Array.from({ length: 6 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },

          {
            type: QuestionType.TABLE,
            desc: '14. Assessments for the year:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1),
                      new Cell(
                        '% of your plants and offices that were assessed (by entity or statutory authorities orthird parties)',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),

                  ...['Health and safety practices', 'Working Conditions'].map(
                    (firstCell: string) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },

          {
            type: QuestionType.TEXT,
            desc: '15. Provide details of any corrective action taken or underway to address safety-related incidents (if any) and on significant risks / concerns arising from assessments of health & safety practices and working conditions.',
            answer_text: '',
          },

          {
            type: QuestionType.BOOLEAN,
            desc: '16. Does the entity extend any life insurance or any compensatory package in the event of death of (A) Employees?',
          },
          {
            type: QuestionType.BOOLEAN,
            desc: '17. Does the entity extend any life insurance or any compensatory package in the event of death of (B) Workers?',
          },

          {
            type: QuestionType.TEXT,
            desc: '18. Provide the measures undertaken by the entity to ensure that statutory dues have been deducted and deposited by the value chain partners.',
          },
          {
            type: QuestionType.TABLE,
            desc: '3. Provide the number of employees / workers having suffered high consequence workrelated injury / ill-health / fatalities (as reported in Q11 of Essential Indicators above), who have been are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employment:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 2, 1),
                      new Cell(
                        'Total no. of affected employees/ workers',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'No. of employees/workers that are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employment',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),

                  new Row(
                    [
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY _____ (Previous Financial Year)',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY _____ (Previous Financial Year)',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell('Employees', false, 1, 1),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                ],
                false,
              ),
            ],
          },

          {
            type: QuestionType.BOOLEAN,
            desc: '20. Does the entity provide transition assistance programs to facilitate continued employability and the management of career endings resulting from retirement or termination of employment?',
          },
          {
            type: QuestionType.TABLE,
            desc: '21. Details on assessment of value chain partners:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1),
                      new Cell(
                        '% of value chain partners (by value of business done with such partners) that were assessed',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell('Health and safety practices', false, 1, 1),
                      new Cell('', true, 1, 1),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell('Working Conditions', false, 1, 1),
                      new Cell('', true, 1, 1),
                    ],
                    true,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '22. Provide details of any corrective actions taken or underway to address significant risks / concerns arising from assessments of health and safety practices and working conditions of value chain partners.',
          },
        ],
      },
      {
        title:
          'PRINCIPLE 4: Businesses should respect the interests of and be responsive to all its stakeholders',
        questions: [
          {
            desc: '1. Describe the processes for identifying key stakeholder groups of the entity',
            type: QuestionType.TEXT,
          },
          {
            desc: '2. List stakeholder groups identified as key for your entity and the frequency of engagement with each stakeholder group.',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Stakeholder Group', false, 1, 1),
                      new Cell(
                        'Whether identified as Vulnerable & Marginalized Group (Yes/No)',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'Channels of communication (Email, SMS, Newspaper, Pamphlets, Advertisement, Community Meetings, Notice Board, Website), Other',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'Frequency of engagement (Annually/ Half yearly/ Quarterly / others – please specify) ',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'Purpose and scope of engagement including key topics and concerns raised during such engagement',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    Array.from({ length: 5 }).map(
                      (_) => new Cell('', true, 1, 1),
                      false,
                    ),
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '3. Provide the processes for consultation between stakeholders and the Board on economic, environmental, and social topics or if consultation is delegated, how is feedback from such consultations provided to the Board.',
          },
          {
            type: QuestionType.TEXT,
            desc: '4. Whether stakeholder consultation is used to support the identification and management of environmental, and social topics (Yes / No). If so, provide details of instances as to how the inputs received from stakeholders on these topics were incorporated into policies and activities of the entity.',
          },
          {
            type: QuestionType.TEXT,
            desc: '5. Provide details of instances of engagement with, and actions taken to, address the concerns of vulnerable/ marginalized stakeholder groups. ',
          },
        ],
      },
      {
        title: 'PRINCIPLE 5 Businesses should respect and promote human rights',
        questions: [
          {
            desc: '1. Employees and workers who have been provided training on human rights issues and policy(ies) of the entity, in the following format: ',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Category', false, 2, 1),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        3,
                      ),
                      new Cell(
                        'FY _____ (Previous Financial Year)',
                        false,
                        1,
                        3,
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell('Total (A)', false, 1, 1),
                      new Cell(
                        'No. of employees / workers covered (B)',
                        false,
                        1,
                        1,
                      ),
                      new Cell('% (B / A)', false, 1, 1),
                      new Cell('Total (C)', false, 1, 1),
                      new Cell(
                        'No. of employees / workers covered (D)',
                        false,
                        1,
                        1,
                      ),
                      new Cell('% (D / C)', false, 1, 1),
                    ],
                    true,
                  ),
                  new Row([new Cell('Employees', false, 1, 7)], false),
                  ...[
                    'Permanent',
                    'Other than permanent',
                    'Total Employees ',
                  ].map(
                    (firstCol: string) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1),
                          ...Array.from({ length: 6 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                  new Row([new Cell('Workers', false, 1, 7)], false),
                  ...[
                    'Permanent',
                    'Other than permanent',
                    'Total Workers ',
                  ].map(
                    (firstCol: string) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1),
                          ...Array.from({ length: 6 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '2. Details of minimum wages paid to employees and workers, in the following format:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Category', false, 3, 1),
                      new Cell('FY _____ Current Financial Year', false, 1, 5),
                      new Cell('FY _____ Current Previous Year', false, 1, 5),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell('Total (A)', false, 2, 1),
                      ...[
                        'Equal to Minimum Wage',
                        'More than Minimum Wage',
                      ].map(
                        (heading: string, colNo: number) =>
                          new Cell(heading, false, 1, 2),
                      ),
                      new Cell('Total (D)', false, 2, 1),
                      ...['Equal to Minimum Wage', 'On Skill upgradation'].map(
                        (heading: string, colNo: number) =>
                          new Cell(heading, false, 1, 2),
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      ...[
                        'No. (B)',
                        '% (B / A)',
                        'No. (C)',
                        '% (C / A)',
                        'No. (E)',
                        '% (E / D)',
                        'No. (F)',
                        '% (F / D)',
                      ].map(
                        (heading: string, colNo: number) =>
                          new Cell(heading, false, 1, 1),
                      ),
                    ],
                    true,
                  ),
                  new Row([new Cell('Employees', false, 1, 11)], false),
                  ...[
                    'Permanent',
                    'Male',
                    'Female',
                    'Other than Permanent',
                    'Male',
                    'Female',
                  ].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1),
                          ...Array.from({ length: 10 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                  new Row([new Cell('Workers', false, 1, 11)], false),
                  ...[
                    'Permanent',
                    'Male',
                    'Female',
                    'Other than Permanent',
                    'Male',
                    'Female',
                  ].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1),
                          ...Array.from({ length: 10 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '3. a. Median remuneration / wages:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 2, 1),
                      new Cell('Male', false, 1, 1),
                      new Cell('Female', false, 1, 1),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell('Number', false, 1, 1),
                      new Cell(
                        'Median remuneration/ salary/ wages of respective category',
                        false,
                        1,
                        1,
                      ),
                      new Cell('Number', false, 1, 1),
                      new Cell(
                        'Median remuneration/ salary/ wages of respective category',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),
                  ...[
                    'Board of Directors (BoD)',
                    'Key Managerial Personnel',
                    'Employees other than BoD and KMP',
                    'Workers',
                  ].map(
                    (firstCell: string) =>
                      new Row(
                        [
                          new Cell(firstCell, true, 1, 1),
                          ...Array.from({ length: 4 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '3. b. Gross wages paid to females as % of total wages paid by the entity, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
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
                        'Gross wages paid to females as % of total wages',
                        false,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '4. Do you have a focal point (Individual/ Committee) responsible for addressing human rights impacts or issues caused or contributed to by the business?',
            type: QuestionType.BOOLEAN,
          },
          {
            desc: '5. Describe the internal mechanisms in place to redress grievances related to human rights issues.',
            type: QuestionType.TEXT,
          },
          {
            desc: '6. Number of Complaints on the following made by employees and workers:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 2, 1),
                      new Cell('FY _____ Current Financial Year', false, 1, 2),
                      new Cell('FY _____ Current Financial Year', false, 1, 2),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      ...[
                        'Filed during the year',
                        'Pending resolution at the end of year',
                        'Remarks',
                      ].map((value) => new Cell(value, false, 1, 1)),
                      ...[
                        'Filed during the year',
                        'Pending resolution at the end of year',
                        'Remarks',
                      ].map((value) => new Cell(value, false, 1, 1)),
                    ],
                    true,
                  ),
                  ...[
                    'Sexual Harassment',
                    'Discrimination at workplace',
                    'Child Labour',
                    'Forced Labour/Involuntary Labour',
                    'Wages',
                    'Other human rights related issues',
                  ].map(
                    (firstCell: string) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          ...Array.from({ length: 6 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '7. Complaints filed under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, in the following format: ',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1),
                      new Cell('FY _____ Current Financial Year', false, 1, 1),
                      new Cell('FY _____ Previous Financial Year', false, 1, 1),
                    ],
                    true,
                  ),

                  ...[
                    'Total Complaints reported under Sexual Harassment on of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH) ',
                    'Complaints on POSH as a % of female employees / workers ',
                    'Complaints on POSH upheld',
                  ].map(
                    (firstCell: string) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '8. Mechanisms to prevent adverse consequences to the complainant in discrimination and harassment cases.',
          },
          {
            type: QuestionType.BOOLEAN,
            desc: '9. Do human rights requirements form part of your business agreements and contracts?',
          },
          {
            desc: '10. Assessments for the year:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1),
                      new Cell(
                        '% of your plants and offices that were assessed (by entity or statutory authorities orthird parties)',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),
                  ...[
                    'Child labour',
                    'Forced/involuntary labour',
                    'Sexual harassment',
                    'Discrimination at workplace',
                    'Wages',
                    'Others – please specify',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '11. Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 10 above. ',
          },
          {
            desc: '12. Details of a business process being modified / introduced as a result of addressing human rights grievances/complaints.',
            type: QuestionType.TEXT,
          },
          {
            desc: '13. Details of the scope and coverage of any Human rights due-diligence conducted.',
            type: QuestionType.TEXT,
          },
          {
            type: QuestionType.TEXT,
            desc: '14. Is the premise/office of the entity accessible to differently abled visitors, as per the requirements of the Rights of Persons with Disabilities Act, 2016?',
          },
          {
            type: QuestionType.TABLE,
            desc: '15. Details on assessment of value chain partners:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1),
                      new Cell(
                        '% of value chain partners (by value of business done with such partners) that were assessed',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),
                  ...[
                    'Sexual Harassment',
                    'Discrimination at workplace',
                    'Child Labour',
                    'Forced Labour/Involuntary Labour',
                    'Wages',
                    'Others – please specify',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '16. Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 4 above. ',
            type: QuestionType.TEXT,
          },
        ],
      },
      {
        title:
          'PRINCIPLE 6: Businesses should respect and make efforts to protect and restore the environment',
        questions: [
          {
            desc: '1. Details of total energy consumption (in Joules or multiples) and energy intensity, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Parameter', false, 1, 1),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY ______(Previous Financial Year)',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),
                  ...[
                    'From renewable sources',
                    'Total electricity consumption (A)',
                    'Total fuel consumption (B)',
                    'Energy consumption through other sources (C)',
                    'Total energy consumed from renewable sources (A+B+C)',
                    'From non-renewable sources',
                    'Total electricity consumption (D)',
                    'Total fuel consumption (E)',
                    'Energy consumption through other sources (F)',
                    'Total energy consumed from nonrenewable sources (D+E+F)',
                    'Total energy consumed (A+B+C+D+E+F)',
                    'Energy intensity per rupee of turnover (Total energy consumed / Revenue from operations)',
                    'Energy intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total energy consumed / Revenue from operations adjusted for PPP)',
                    'Energy intensity in terms of physical output',
                    'Energy intensity (optional) – the relevant metric may be selected by the entity',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '2. a. Does the entity have any sites / facilities identified as designated consumers (DCs) under the Performance, Achieve and Trade (PAT) Scheme of the Government of India?',
            type: QuestionType.BOOLEAN,
          },
          {
            desc: '2. b. If the above is yes, disclose whether targets set under the PAT scheme have been achieved. In case targets have not been achieved, provide the remedial action taken, if any.',
            type: QuestionType.TEXT,
          },
          {
            desc: '3. Provide details of the following disclosures related to water, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Parameter', false, 1, 1),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY ______(Previous Financial Year)',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Water withdrawal by source (in kilolitres)',
                        false,
                        1,
                        3,
                      ),
                    ],
                    true,
                  ),
                  ...[
                    '(i) Surface water',
                    '(ii) Groundwater',
                    '(iii) Third party water',
                    '(iv) Seawater / desalinated water',
                    '(v) Others',
                    'Total volume of water withdrawal (in kilolitres) (i + ii + iii + iv + v)',
                    'Total volume of water consumption (in kilolitres)',
                    'Water intensity per rupee of turnover (Total water consumption / Revenue from operations)',
                    'Water intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total water consumption / Revenue from operations adjusted for PPP)',
                    'Water intensity in terms of physical output',
                    'Water intensity (optional) – the relevant metric may be selected by the entity',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '4. Provide the following details related to water discharged:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Parameter', false, 1, 1),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY ______(Previous Financial Year)',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Water discharge by destination and level of treatment (in kilolitres)',
                        false,
                        1,
                        3,
                      ),
                    ],
                    true,
                  ),
                  ...[
                    '(i) Surface water',
                    ' No treatment',
                    'With treatment – please specify level of treatment',
                    '(ii) To Groundwater',
                    'No treatment',
                    'With treatment – please specify level of treatment',
                    '(iii) To Seawater',
                    'No treatment',
                    'With treatment – please specify level of treatment',
                    '(iv) Sent to third-parties ',
                    'No treatment',
                    'With treatment – please specify level of treatment',
                    '(v) Others',
                    'No treatment',
                    'With treatment – please specify level of treatment',
                    'Total water discharged (in kilolitres) ',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '5. Has the entity implemented a mechanism for Zero Liquid Discharge? If yes, provide details of its coverage and implementation.',
            type: QuestionType.TEXT,
          },
          {
            desc: '6. Please provide details of air emissions (other than GHG emissions) by the entity, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Parameter',
                      'Please specify unit',
                      'FY _____ (Current Financial Year)',
                      'FY ______ (Previous Financial Year)',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  ...[
                    'NOx',
                    'SOx',
                    'Particulate matter (PM)',
                    'Persistent organic pollutants (POP)',
                    'Volatile organic compounds (VOC)',
                    'Hazardous air pollutants (HAP)',
                    'Others – please specify',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '7. Provide details of greenhouse gas emissions (Scope 1 and Scope 2 emissions) & its intensity, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Parameter',
                      'Unit',
                      'FY _____ (Current Financial Year)',
                      'FY ______ (Previous Financial Year)',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  new Row(
                    [
                      'Total Scope 1 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)',
                      'Metric tonnes of CO2 equivalent',
                      '',
                      '',
                    ].map((value) => new Cell(value, value === '', 1, 1)),
                    false,
                  ),
                  new Row(
                    [
                      'Total Scope 2 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)',
                      'Metric tonnes of CO2 equivalent',
                      '',
                      '',
                    ].map((value) => new Cell(value, value === '', 1, 1)),
                    false,
                  ),
                  new Row(
                    [
                      'Total Scope 1 and Scope 2 emission intensity per rupee of turnover (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations)',
                      '',
                      '',
                      '',
                    ].map((value) => new Cell(value, value === '', 1, 1)),
                    false,
                  ),
                  new Row(
                    [
                      'Total Scope 1 and Scope 2 emission intensity per rupee of turnover adjusted',
                      '',
                      '',
                      '',
                    ].map((value) => new Cell(value, value === '', 1, 1)),
                    false,
                  ),
                  new Row(
                    [
                      'for Purchasing Power Parity (PPP) (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations adjusted for PPP)',
                      '',
                      '',
                      '',
                    ].map((value) => new Cell(value, value === '', 1, 1)),
                    false,
                  ),
                  new Row(
                    [
                      'Total Scope 1 and Scope 2 emission intensity in terms of physical output',
                      '',
                      '',
                      '',
                    ].map((value) => new Cell(value, value === '', 1, 1)),
                    false,
                  ),
                  new Row(
                    [
                      'Total Scope 1 and Scope 2 emission intensity (optional) – the relevant metric may be selected by the entity',
                      '',
                      '',
                      '',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    false,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '8. Does the entity have any project related to reducing Green House Gas emission? If Yes, then provide details. ',
          },
          {
            desc: '9. Provide details related to waste management by the entity, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Parameter',
                      'FY _____ (Current Financial Year)',
                      'FY ______ (Previous Financial Year)',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total Waste generated (in metric tonnes)',
                        false,
                        1,
                        3,
                      ),
                    ],
                    false,
                  ),
                  ...[
                    'Plastic waste (A)',
                    'E-waste (B)',
                    'Bio-medical waste (C)',
                    'Construction and demolition waste (D)',
                    'Battery waste (E)',
                    'Radioactive waste (F)',
                    'Other Hazardous waste. Please specify, if any. (G)',
                    'Other Non-hazardous waste generated (H). Please specify, if any. (Break-up by composition i.e. by materials relevant to the sector)',
                    'Total (A+B + C + D + E + F + G + H)',
                    'Waste intensity per rupee of turnover (Total waste generated / Revenue from operations)',
                    'Waste intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total waste generated / Revenue from operations adjusted for PPP)',
                    'Waste intensity in terms of physical output',
                    'Waste intensity (optional) – the relevant metric may be selected by the entity',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                  new Row(
                    [
                      new Cell(
                        'For each category of waste generated, total waste recovered through recycling, re-using or other recovery operations (in metric tonnes)',
                        false,
                        1,
                        3,
                      ),
                    ],
                    false,
                  ),
                  new Row([new Cell('Category of waste', false, 1, 3)], false),
                  ...[
                    '(i) Recycled',
                    '(ii) Re-used',
                    '(iii) Other recovery operations',
                    'Total',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),

                  new Row(
                    [
                      new Cell(
                        'For each category of waste generated, total waste disposed by nature of disposal method (in metric tonnes)',
                        false,
                        1,
                        3,
                      ),
                    ],
                    false,
                  ),
                  ...[
                    'Category of waste',
                    '(i) Incineration',
                    '(ii) Landfilling',
                    '(iii) Other disposal operations',
                    'Total',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '10. Briefly describe the waste management practices adopted in your establishments. Describe the strategy adopted by your company to reduce usage of hazardous and toxic chemicals in your products and processes and the practices adopted to manage such wastes.',
          },
          {
            desc: '11. If the entity has operations/offices in/around ecologically sensitive areas (such as national parks, wildlife sanctuaries, biosphere reserves, wetlands, biodiversity hotspots, forests,  coastal regulation zones etc.) where environmental approvals / clearances are required, please specify details in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Location of operations/offices',
                      'Type of operations',
                      'Whether the conditions of environmental approval / clearance are being complied with? (Y/N) If no, the reasons thereof and corrective action taken, if any.',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  new Row(
                    Array.from({ length: 3 }).map(
                      (value) => new Cell('', true, 1, 1),
                    ),
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            desc: '12. Details of environmental impact assessments of projects undertaken by the entity based on applicable laws, in the current financial year:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Name and brief details of project',
                      'EIA Notification No.',
                      'Date',
                      'Whether conducted by independent external agency (Yes / No)',
                      'Results communicated in public domain (Yes / No)',
                      'Relevant Web link',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  new Row(
                    Array.from({ length: 6 }).map(
                      (_) => new Cell('', true, 1, 1),
                    ),
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            desc: '13. Is the entity compliant with the applicable environmental law/ regulations/ guidelines in India; such as the Water (Prevention and Control of Pollution) Act, Air (Prevention and Control of Pollution) Act, Environment protection act and rules thereunder (Y/N). If not, provide details of all such non-compliances, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Specify the law / regulation / guidelines which was not complied with',
                      'Provide details of the noncompliance',
                      'Any fines / penalties / action taken by regulatory agencies such as pollution control boards or by courts',
                      'Whether conducted by independent external agency (Yes / No)',
                      'Results communicated in public domain (Yes / No)',
                      'Corrective action taken, if any',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  new Row(
                    Array.from({ length: 6 }).map(
                      (_) => new Cell('', true, 1, 1),
                    ),
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            desc: '14. Water withdrawal, consumption and discharge in areas of water stress (in kilolitres): \n For each facility / plant located in areas of water stress, provide the following information: \n(i) Name of the area \n(ii) Nature of operations \n(iii) Water withdrawal, consumption and discharge in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Parameter',
                      'FY _____ (Current Financial Year)',
                      'FY ______ (Previous Financial Year)',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Water withdrawal by source (in kilolitres)',
                        false,
                        1,
                        3,
                      ),
                    ],
                    false,
                  ),
                  ...[
                    '(i) Surface water',
                    '(ii) Groundwater',
                    '(iii) Third party water',
                    '(iv) Seawater / desalinated water',
                    '(v) Others ',
                    'Total volume of water withdrawal (in kilolitres)',
                    'Total volume of water consumption (in kilolitres) ',
                    'Water intensity per rupee of turnover (Water consumed / turnover)',
                    'Water intensity (optional) – the relevant metric may be selected by the entity',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                  new Row(
                    [
                      new Cell(
                        'Water discharge by destination and level of treatment (in kilolitres)',
                        false,
                        1,
                        3,
                      ),
                    ],
                    false,
                  ),
                  ...[
                    '(i) Into Surface water',
                    'No treatment',
                    'With treatment – please specify level of treatment',
                    '(ii) Into Groundwater',
                    'No treatment',
                    'With treatment – please specify level of treatment',
                    '(iii) Into Seawater',
                    'No treatment',
                    'With treatment – please specify level of treatment',
                    '(iv) Sent to third-parties ',
                    'No treatment',
                    'With treatment – please specify level of treatment',
                    '(v) Others',
                    'No treatment',
                    'With treatment – please specify level of treatment',
                    'Total water discharged (in kilolitres)',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),

                  new Row(
                    [
                      new Cell(
                        'For each category of waste generated, total waste disposed by nature of disposal method (in metric tonnes)',
                        false,
                        1,
                        3,
                      ),
                    ],
                    false,
                  ),
                  ...[
                    'Category of waste',
                    '(i) Incineration',
                    '(ii) Landfilling',
                    '(iii) Other disposal operations',
                    'Total',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '15. Please provide details of total Scope 3 emissions & its intensity, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Parameter', false, 1, 1),
                      new Cell('Unit', false, 1, 1),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY ______ (Previous Financial Year)',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total Scope 3 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)',
                        false,
                        1,
                        1,
                      ),
                      new Cell('Metric tonnes of CO2 equivalent', false, 1, 1),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total Scope 3 emissions per rupee of turnover',
                        false,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total Scope 3 emission intensity (optional) – the relevant metric may be selected by the entity',
                        false,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '16. With respect to the ecologically sensitive areas reported at Question 11 of Essential Indicators above, provide details of significant direct & indirect impact of the entity on biodiversity in such areas along-with prevention and remediation activities. ',
            type: QuestionType.TEXT,
          },
          {
            desc: '17. If the entity has undertaken any specific initiatives or used innovative technology or solutions to improve resource efficiency, or reduce impact due to emissions / effluent discharge / waste generated, please provide details of the same as well as outcome of such initiatives, as per the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Initiative undertaken',
                      'Details of the initiative (Web-link, if any, may be provided along-with summary)',
                      'Outcome of the initiative ',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  new Row(
                    Array.from({ length: 3 }).map(
                      (_) => new Cell('', true, 1, 1),
                    ),
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            desc: '18. Does the entity have a business continuity and disaster management plan? Give details in 100 words/ web link.',
            type: QuestionType.TEXT,
          },
          {
            desc: '19. Disclose any significant adverse impact to the environment, arising from the value chain of the entity. What mitigation or adaptation measures have been taken by the entity in this regard.',
            type: QuestionType.TEXT,
          },
          {
            desc: '20. Percentage of value chain partners (by value of business done with such partners) that were assessed for environmental impacts.',
            type: QuestionType.TEXT,
          },
        ],
      },
      {
        title:
          'PRINCIPLE 7 Businesses, when engaging in influencing public and regulatory policy, should do so in a manner that is responsible and transparent',
        questions: [
          {
            desc: '1. a. Number of affiliations with trade and industry chambers/ associations',
            type: QuestionType.TEXT,
          },
          {
            desc: '1. b. List the top 10 trade and industry chambers/ associations (determined based on the total members of such body) the entity is a member of/ affiliated to.',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell(
                        'Name of the trade and industry chambers/ associations',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'Name of the trade and industry chambers/ associations',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [new Cell('', true, 1, 1), new Cell('', true, 1, 1)],
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '2. Provide details of corrective action taken or underway on any issues related to anticompetitive conduct by the entity, based on adverse orders from regulatory authorities. ',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Name of authority B', false, 1, 1),
                      new Cell('Brief of the case', false, 1, 1),
                      new Cell('Corrective action taken', false, 1, 1),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell('', false, 1, 1),
                      new Cell('', false, 1, 1),
                      new Cell('', false, 1, 1),
                    ],
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            type: QuestionType.TABLE,
            desc: '3. Details of public policy positions advocated by the entity:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Public policy advocated', false, 1, 1),
                      new Cell(
                        'Method resorted for such advocacy',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'Whether information available in public domain? (Yes/No)',
                        false,
                        1,
                        1,
                      ),
                      new Cell(
                        'Frequency of Review by Board (Annually/ Half yearly/ Quarterly / Others – please specify)',
                        false,
                        1,
                        1,
                      ),
                      new Cell('Web Link, if available', false, 1, 1),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                ],
                true,
              ),
=======
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
      },
      {},
      {
        heading: "Details of Review of NGRBCs by the Company:",
        questions: [
          `Performance against above policies and follow up action`,
          `Compliance with statutory requirements of relevance to the principles, and, rectification of any non-compliances`,
          `Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No). If yes, provide name of the agency.`,
        ],
      },
      {
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
      },
    ],
    C: {
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
>>>>>>> 969c5c9 (backend changes)
            ],
          },
        ],
      },
<<<<<<< HEAD
      {
        title:
          'PRINCIPLE 8 Businesses should promote inclusive growth and equitable development',
        questions: [
          {
            desc: '1. Details of Social Impact Assessments (SIA) of projects undertaken by the entity based on applicable laws, in the current financial year.',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Name and brief details of project',
                      'SIA Notification No.',
                      'Date of notification',
                      'Whether conducted by independent external agency (Yes / No)',
                      'Results communicated in public domain (Yes / No)',
                      'Relevant Web link',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  new Row(
                    Array.from({ length: 6 }).map(
                      (_) => new Cell('', true, 1, 1),
                    ),
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            desc: '2. Provide information on project(s) for which ongoing Rehabilitation and Resettlement (R&R) is being undertaken by your entity, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Name of Project for which R&R is ongoing',
                      'State',
                      'District',
                      'No. of Project Affected Families (PAFs) ',
                      '% of PAFs covered by R&R',
                      'Amounts paid to PAFsin the FY (In INR)',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  new Row(
                    Array.from({ length: 6 }).map(
                      (_) => new Cell('', true, 1, 1),
                    ),
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            type: QuestionType.TEXT,
            desc: '3. Describe the mechanisms to receive and redress grievances of the community.',
          },
          {
            desc: '4. Percentage of input material (inputs to total inputs by value) sourced from suppliers:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      '',
                      'FY _____ Current Financial Year',
                      'FY _____ Previous Financial Year',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  ...[
                    'Directly sourced from MSMEs/ small producers ',
                    'Directly from within India',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '5. Job creation in smaller towns – Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis) in the following locations, as % of total wage cost',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Location',
                      'FY _____ Current Financial Year',
                      'FY _____ Previous Financial Year',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  ...['Rural', 'Semi-urban', 'Urban', 'Metropolitan'].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          new Cell('', true, 1, 1),
                          new Cell('', true, 1, 1),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '6. Provide details of actions taken to mitigate any negative social impacts identified in the Social Impact Assessments (Reference: Question 1 of Essential Indicators above):',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell(
                        'Details of negative social impact identified',
                        false,
                        1,
                        1,
                      ),
                      new Cell('Corrective action taken', false, 1, 1),
                    ],
                    true,
                  ),
                  new Row(
                    [new Cell('', true, 1, 1), new Cell('', true, 1, 1)],
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            desc: '7. Provide the following information on CSR projects undertaken by your entity in designated aspirational districts as identified by government bodies:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('State', false, 1, 1),
                      new Cell('Aspirational District', false, 1, 1),
                      new Cell('Amount spent (In INR)', false, 1, 1),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            desc: '8. (a) Do you have a preferential procurement policy where you give preference to purchase from suppliers comprising marginalized /vulnerable groups?',
            type: QuestionType.BOOLEAN,
          },
          {
            desc: '8. (b) From which marginalized /vulnerable groups do you procure?',
            type: QuestionType.TEXT,
          },
          {
            desc: '8. (c) What percentage of total procurement (by value) does it constitute? ',
            type: QuestionType.TEXT,
          },
          {
            desc: '9. Details of the benefits derived and shared from the intellectual properties owned or acquired by your entity (in the current financial year), based on traditional knowledge:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Intellectual Property based on traditional knowledge',
                      'Owned/ Acquired (Yes/No)',
                      'Benefit shared (Yes / No)',
                      'Basis of calculating benefit share',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  new Row(
                    Array.from({ length: 4 }).map(
                      (_) => new Cell('', true, 1, 1),
                    ),
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            desc: '10. Details of corrective actions taken or underway, based on any adverse order in intellectual property related disputes wherein usage of traditional knowledge is involved.',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Name of authority',
                      'Brief of the Case',
                      'Corrective action taken',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  new Row(
                    Array.from({ length: 3 }).map(
                      (_) => new Cell('', true, 1, 1),
                    ),
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            desc: '11. Details of beneficiaries of CSR Projects: ',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'CSR Project',
                      'No. of persons benefitted from CSR Projects ',
                      '% of beneficiaries from vulnerable and marginalized groups',
                    ].map((value) => new Cell(value, false, 1, 1)),
                    true,
                  ),
                  new Row(
                    Array.from({ length: 3 }).map(
                      (_) => new Cell('', true, 1, 1),
                    ),
                    false,
                  ),
                ],
                true,
              ),
            ],
          },
        ],
      },
      {
        title:
          'PRINCIPLE 9 Businesses should engage with and provide value to their consumers in a responsible manner',
        questions: [
          {
            desc: '1. Describe the mechanisms in place to receive and respond to consumer complaints and feedback. ',
            type: QuestionType.TEXT,
          },
          {
            desc: '2. Turnover of products and/ services as a percentage of turnover from all products/service that carry information about:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1),
                      new Cell(
                        'As a percentage to total turnover',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Environmental and social parameters relevant to the product',
                        false,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                  new Row(
                    [
                      new Cell('Safe and responsible usage', false, 1, 1),
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                  new Row(
                    [
                      new Cell('Recycling and/or safe disposal', false, 1, 1),
                      new Cell('', true, 1, 1),
                    ],
                    false,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '3. Number of consumer complaints in respect of the following:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 2, 1),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        2,
                      ),
                      new Cell('Remarks', false, 2, 1),
                      new Cell(
                        'FY _____ (Previous Financial Year)',
                        false,
                        1,
                        2,
                      ),
                      new Cell('Remarks', false, 2, 1),
                    ],
                    true,
                  ),
                  new Row(
                    [
                      new Cell('Received during the year', false, 1, 1),
                      new Cell(
                        'Pending resolution at end of year',
                        false,
                        1,
                        1,
                      ),
                      new Cell('Received during the year', false, 1, 1),
                      new Cell(
                        'Pending resolution at end of year',
                        false,
                        1,
                        1,
                      ),
                    ],
                    true,
                  ),

                  ...[
                    'Data privacy',
                    'Advertising',
                    'Cyber-security',
                    'Delivery of essential services',
                    'Restrictive Trade Practices',
                    'Unfair Trade Practices',
                    'Other',
                  ].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          ...Array.from({ length: 6 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '4. Details of instances of product recalls on account of safety issues:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1),
                      new Cell('Number', false, 1, 1),
                      new Cell('Reasons for recall', false, 1, 1),
                    ],
                    true,
                  ),

                  ...['Voluntary recalls', 'Forced recalls'].map(
                    (firstCell) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1),
                          ...Array.from({ length: 2 }).map(
                            (_) => new Cell('', true, 1, 1),
                          ),
                        ],
                        false,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            type: QuestionType.BOOLEAN,
            desc: '5. Does the entity have a framework/ policy on cyber security and risks related to data privacy?',
          },
          {
            type: QuestionType.TEXT,
            desc: '6.  If the above is true, provide a web-link of the policy.',
          },
          {
            type: QuestionType.TEXT,
            desc: '7. Provide details of any corrective actions taken or underway on issues relating to advertising, and delivery of essential services; cyber security and data privacy of customers; re-occurrence of instances of product recalls; penalty / action taken by regulatory authorities on safety of products / services.',
          },
          {
            type: QuestionType.TEXT,
            desc: '8. a. Provide the number of instances of data breaches.',
          },
          {
            type: QuestionType.TEXT,
            desc: '8. b. Provide the percentage of data breaches involving personally identifiable information of customers ',
          },
          {
            type: QuestionType.TEXT,
            desc: '8. c. Provide the impact, if any, of the data breaches',
          },
          {
            type: QuestionType.TEXT,
            desc: '9. Channels / platforms where information on products and services of the entity can be accessed (provide web link, if available). ',
          },
          {
            type: QuestionType.TEXT,
            desc: '10. Steps taken to inform and educate consumers about safe and responsible usage of products and/or services. ',
          },
          {
            type: QuestionType.TEXT,
            desc: '11. Mechanisms in place to inform consumers of any risk of disruption/discontinuation of essential services.',
          },
          {
            desc: '12. Does the entity display product information on the product over and above what is mandated as per local laws?',
            type: QuestionType.BOOLEAN,
          },
          {
            type: QuestionType.BOOLEAN,
            desc: 'If the above is yes, provide details in brief. Did your entity carry out any survey with regard to consumer satisfaction relating to the major products / services of the entity, significant locations of operation of the entity or the entity as a whole?',
          },
        ],
      },
    ],
  },
];
=======
    },
  };
  
  // {
  //   id: "t1",
  //   rows: [
  //     {
  //       id: "t1-r1",
  //       isHeading: true,
  //       cells: [
  //         {
  //           id: "t1-r1-c1",
  //           data: "Category",
  //           isUpdateable: false,
  //           rowSpan: 2,
  //           colSpan: 1,
  //         },
  //         {
  //           id: "t1-r1-c2",
  //           data:"FY _____ Current Financial Year",
  //           isUpdateable: false,
  //           rowSpan: 1,
  //           colSpan: 3,
  //         },
  //         {
  //           id: "t1-r1-c3",
  //           data: "FY _____ Previous Financial Year",
  //           isUpdateable: false,
  //           rowSpan: 1,
  //           colSpan: 3
  //         }
  //       ],
  //     },
  //   ],
  // }
  
  export const tempTable = new Table("t1", [
    new Row(
      "t1-r1",
      [
        new Cell("t1-r1-c1", "Category", false, 2, 1),
        new Cell("t1-r1-c2", "FY _____ Current Financial Year", false, 1, 3),
        new Cell("t1-r1-c3", "FY _____ Current Financial Year", false, 1, 3),
      ],
      true
    ),
    new Row(
      "t1-r2",
      [
        new Cell("t1-r2-c1", "Total (A)", false, 1, 1),
        new Cell(
          "t1-r2-c2",
          "No. of employees / workers covered (B)",
          false,
          1,
          1
        ),
        new Cell("t1-r2-c3", "% (B / A)", false, 1, 1),
        new Cell("t1-r2-c4", "Total (C)", false, 1, 1),
        new Cell(
          "t1-r2-c5",
          "No. of employees / workers covered (D)",
          false,
          1,
          1
        ),
        new Cell("t1-r2-c6", "% (D / C)", false, 1, 1),
      ],
      true
    ),
    new Row("t1-r3", [new Cell("t1-r3-c1", "Employees", false, 1, 7)], false),
    new Row(
      "t1-r4",
      [
        new Cell("t1-r4-c1", "Other than permanent", false, 1, 1),
        new Cell("t1-r4-c2", "", true, 1, 1),
        new Cell("t1-r4-c3", "", true, 1, 1),
        new Cell("t1-r4-c4", "", true, 1, 1),
        new Cell("t1-r4-c5", "", true, 1, 1),
        new Cell("t1-r4-c6", "", true, 1, 1),
        new Cell("t1-r4-c7", "", true, 1, 1),
      ],
      false
    ),
    new Row(
      "t1-r5",
      [
        new Cell("t1-r5-c1", "Total Employees", false, 1, 1),
        new Cell("t1-r5-c2", "", true, 1, 1),
        new Cell("t1-r5-c3", "", true, 1, 1),
        new Cell("t1-r5-c4", "", true, 1, 1),
        new Cell("t1-r5-c5", "", true, 1, 1),
        new Cell("t1-r5-c6", "", true, 1, 1),
        new Cell("t1-r5-c7", "", true, 1, 1),
      ],
      false
    ),
    new Row("t1-r6", [new Cell("t1-r5-c1", "Workers", false, 1, 7)], false),
    new Row(
      "t1-r6",
      [
        new Cell("t1-r4-c1", "Other than permanent", false, 1, 1),
        new Cell("t1-r4-c2", "", true, 1, 1),
        new Cell("t1-r4-c3", "", true, 1, 1),
        new Cell("t1-r4-c4", "", true, 1, 1),
        new Cell("t1-r4-c5", "", true, 1, 1),
        new Cell("t1-r4-c6", "", true, 1, 1),
        new Cell("t1-r4-c7", "", true, 1, 1),
      ],
      false
    ),
    new Row(
      "t1-r7",
      [
        new Cell("t1-r5-c1", "Total Employees", false, 1, 1),
        new Cell("t1-r5-c2", "", true, 1, 1),
        new Cell("t1-r5-c3", "", true, 1, 1),
        new Cell("t1-r5-c4", "", true, 1, 1),
        new Cell("t1-r5-c5", "", true, 1, 1),
        new Cell("t1-r5-c6", "", true, 1, 1),
        new Cell("t1-r5-c7", "", true, 1, 1),
      ],
      false
    ),
  ]);
  
  export const tempTable2 = new Table("t2", [
    new Row(
      "t2-r1",
      [
        new Cell("t2-r1-c1", "Category", false, 3, 1),
        new Cell("t2-r1-c2", "FY _____ Current Financial Year", false, 1, 5),
        new Cell("t2-r1-c3", "FY _____ Previous Financial Year", false, 1, 5),
      ],
      true
    ),
    new Row(
      "t2-r2",
      [
        new Cell("t2-r2-c1", "Total (A)", false, 2, 1),
        new Cell("t2-r2-c2", "Equal To Minimum Wage", false, 1, 2),
        new Cell("t2-r2-c3", "More than Minimum Wage", false, 1, 2),
        new Cell("t2-r2-c4", "Total (D)", false, 2, 1),
        new Cell("t2-r2-c5", "Equal To Minimum Wage", false, 1, 2),
        new Cell("t2-r2-c6", "More than Minimum Wage", false, 1, 2),
      ],
      true
    ),
    new Row(
      "t2-r3",
      [
        new Cell("t2-r3-c1", "No. (B)", false, 1, 1),
        new Cell("t2-r3-c2", "% (B / A)", false, 1, 1),
        new Cell("t2-r3-c3", "No. (C)", false, 1, 1),
        new Cell("t2-r3-c4", "% (C / A)", false, 1, 1),
        new Cell("t2-r3-c5", "No.(E)", false, 1, 1),
        new Cell("t2-r3-c6", "% (E / D)", false, 1, 1),
        new Cell("t2-r3-c7", "No. (F)", false, 1, 1),
        new Cell("t2-r3-c8", "% (F / D)", false, 1, 1),
      ],
      true
    ),
    new Row("t2-r4", [new Cell("t2-r4-c1", "Employee", false, 1, 11)], false),
    new Row(
      "t2-r5",
      [
        new Cell("t2-r5-c1", "Permanent", false, 1, 1),
        ...Array.from({ length: 10 }).map(
          (_, ind: number) => new Cell(`t2-r5-c${ind + 2}`, "", true, 1, 1)
        ),
      ],
      false
    ),
    new Row(
      "t2-r6",
      [
        new Cell("t2-r6-c1", "Male", false, 1, 1),
        ...Array.from({ length: 10 }).map(
          (_, ind: number) => new Cell(`t2-r6-c${ind + 2}`, "", true, 1, 1)
        ),
      ],
      false
    ),
    new Row(
      "t2-r7",
      [
        new Cell("t2-r7-c1", "Female", false, 1, 1),
        ...Array.from({ length: 10 }).map(
          (_, ind: number) => new Cell(`t2-r7-c${ind + 2}`, "", true, 1, 1)
        ),
      ],
      false
    ),
    new Row(
      "t2-r7",
      [
        new Cell("t2-r7-c1", "Other than Permanent", false, 1, 1),
        ...Array.from({ length: 10 }).map(
          (_, ind: number) => new Cell(`t2-r7-c${ind + 2}`, "", true, 1, 1)
        ),
      ],
      false
    ),
  ]);
  
>>>>>>> 969c5c9 (backend changes)
