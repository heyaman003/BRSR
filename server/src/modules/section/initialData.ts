import { QuestionType, Operation } from '@prisma/client';

export class Cell {
  data: string;
  isUpdateable: boolean;
  rowSpan: number;
  colSpan: number;
  index: number;
  operation?: Operation | null;
  operands?: string[];
  isHeading: boolean | null | undefined;

  constructor(
    data: string,
    isUpdateable: boolean,
    rowSpan: number,
    colSpan: number,
    index: number,
    operation?: Operation,
    operands?: string[],
    isHeading?: boolean | null | undefined,
  ) {
    this.isHeading = isHeading ? true : false;
    this.data = data;
    this.isUpdateable = isUpdateable;
    this.rowSpan = rowSpan;
    this.colSpan = colSpan;
    this.index = index;
    if (operation) this.operation = operation;
    if (operands) this.operands = operands;
  }
}

export class Row {
  cells: Cell[];
  isHeading: boolean;
  index: number;
  constructor(cells: Cell[], isHeading: boolean, index: number) {
    this.isHeading = isHeading;
    this.cells = cells;
    this.index = index;
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
  answer_table?: Table[] | null;
  answer_text?: string | null;
  index: number;
  heading?: string | null; // Used for rendering 'Leadership Indicators', 'Essential Indicators'
}

export class SubSection {
  title: string;
  questions: Question[];
}

export class Section {
  title: string;
  subsections: SubSection[];
}

export const companySectionsTemplate: Section[] = [
  {
    title: 'Section A',
    subsections: [
      {
        title: 'I. Details of the listed entity',
        // type: 'normal',
        // progress: [37, 178],
        // inProgress: true,
        questions: [
          {
            desc: '1. Corporate Identity Number (CIN) of the Listed Entity',
            type: QuestionType.TEXT,
            index: 0,
          },
          {
            desc: '2. Name of the Listed Entity',
            type: QuestionType.TEXT,
            index: 1,
          },
          {
            desc: '3. Year of incorporation',
            type: QuestionType.TEXT,
            index: 2,
          },
          {
            desc: '4. Registered office address',
            type: QuestionType.TEXT,
            index: 3,
          },
          { desc: '5. Corporate address', type: QuestionType.TEXT, index: 4 },
          { desc: '6. E-mail', type: QuestionType.TEXT, index: 5 },
          { desc: '7. Telephone', type: QuestionType.TEXT, index: 6 },
          { desc: '8. website', type: QuestionType.TEXT, index: 7 },
          {
            desc: '9. Financial year for which reporting is being done',
            type: QuestionType.TEXT,
            index: 8,
          },
          {
            desc: '10. Name of the Stock Exchange(s) where shares are listed',
            type: QuestionType.TEXT,
            index: 9,
          },
          {
            desc: '11. Paid-up Capital (In Rs)',
            type: QuestionType.TEXT,
            index: 10,
          },
          {
            desc: '12. Name and contact details (telephone, email address) of the person who may be contacted in case of any queries on the BRSR report',
            type: QuestionType.TEXT,
            index: 11,
          },
          {
            desc: '13.Reporting boundary - Are the disclosures under this report made on a standalone basis (i.e. only for the entity) or on a consolidated basis (i.e. for the entity and all the entities which form a part of its consolidated financial statements, taken together).',
            type: QuestionType.TEXT,
            index: 12,
          },
          {
            desc: '14. Name of assurance provider.',
            type: QuestionType.TEXT,
            index: 13,
          },
          {
            desc: '15. Type of assurance obtained',
            type: QuestionType.TEXT,
            index: 14,
          },
        ],
      },
      {
        title: 'II. Products / services',
        questions: [
          {
            index: 0,
            type: QuestionType.TABLE,
            desc: '16.Details of business activities (accounting for 90% of the turnover):',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Description of Main Activity',
                      'Description of Business Activity',
                      '% of Turnover of the entity',
                    ].map(
                      (cell, ind: number) =>
                        new Cell(cell, false, 1, 1, ind + 1),
                    ),
                    true,
                    0,
                  ),
                  ...Array.from({ length: 2 }).map(
                    (_, rowNo: number) =>
                      new Row(
                        [
                          ...Array.from({ length: 3 }).map(
                            (_, ind: number) => new Cell('', true, 1, 1, ind),
                          ),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 1,
            type: QuestionType.TABLE,
            desc: '17.Products/Services sold by the entity (accounting for 90% of the entity’s Turnover)',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      ...[
                        'Product/Service',
                        'NIC Code',
                        '% of total Turnover contribute',
                      ].map(
                        (head, ind: number) => new Cell(head, false, 1, 1, ind),
                      ),
                    ],
                    true,
                    0,
                  ),
                  ...Array.from({ length: 2 }).map(
                    (_, rowNo: number) =>
                      new Row(
                        [
                          ...Array.from({ length: 3 }).map(
                            (_, ind: number) => new Cell('', true, 1, 1, ind),
                          ),
                        ],
                        false,
                        rowNo + 1,
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
        title: 'III. Operations ',
        // id: 'ComplianceAdmistration ',
        // type: 'tabular',
        // isFixedLength: true,
        // progress: [37, 178],
        // inProgress: true,
        // tabletype: 3,
        questions: [
          {
            index: 0,
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
                    ].map(
                      (head, ind: number) => new Cell(head, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  ...['National', 'International'].map(
                    (firstColData, rowNo: number) =>
                      new Row(
                        [
                          ...Array.from({ length: 4 }).map(
                            (_, cellNo: number) =>
                              new Cell(
                                cellNo ? '' : firstColData,
                                cellNo > 0,
                                1,
                                1,
                                cellNo,
                              ),
                          ),
                          new Cell('', true, 1, 1, 4, Operation.ADD, [
                            `${rowNo + 1}$1`,
                            `${rowNo + 1}$2`,
                            `${rowNo + 1}$3`,
                          ]),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                false,
              ),
            ],
            // colFirstData: ['Location', 'National', 'International'],
            desc: '18. Number of locations where plants and/or operations/offices of the entity are situated',
            // tabulardata: [
            //   ['Number of plants', 'number'],
            //   ['Number of offices', 'text'],
            //   ['Description of Business Activity', 'text'],
            //   ['Total', 'number'],
            // ],
            // defaultLength: 3,
          },
          {
            index: 1,
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    ['Location', 'Number'].map(
                      (head, ind: number) => new Cell(head, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  ...['National', 'International'].map(
                    (firstColData, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstColData, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                false,
              ),
            ],
            // colFirstData: ['Location', 'National', 'International'],
            desc: '19. a. Number of locations',
            // tabulardata: [['Number', 'number']],
            // defaultLength: 3,
          },
          {
            desc: '19. b. What is the contribution of exports as a percentage of the total turnover of the entity? ',
            index: 2,
            type: QuestionType.TEXT,
          },
          {
            desc: '19. c. A brief on types of customers ',
            index: 3,
            type: QuestionType.TEXT,
          },
        ],
      },

      {
        title: 'IV. Employees',
        questions: [
          {
            index: 0,
            type: QuestionType.TABLE,
            desc: '20. Details as at the end of Financial Year:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Particulars', false, 2, 1, 0),
                      new Cell('Total (A)', false, 2, 1, 1),
                      new Cell('Male', false, 1, 2, 2),
                      new Cell('Female', false, 1, 2, 2),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('No. (B)', false, 1, 1, 0),
                      new Cell('% (B / A)', false, 1, 1, 1),
                      new Cell('No. (C)', false, 1, 1, 2),
                      new Cell('% (C / A)', false, 1, 2, 3),
                    ],
                    true,
                    1,
                  ),
                  new Row(
                    [
                      {
                        data: 'EMPLOYEES',
                        isHeading: true,
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 6,
                        index: 0,
                      },
                    ],
                    false,
                    2,
                  ),
                  ...['Permanent (D)', 'Other than Permanent (E)'].map(
                    (firstCol, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 3}$2`,
                            `${rowNo + 3}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 3}$4`,
                            `${rowNo + 3}$1`,
                          ]),
                        ],
                        false,
                        rowNo + 3,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total employees (D + E)', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['3$1', '4$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['3$2', '4$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', ['5$2', '5$1']),
                      new Cell('', true, 1, 1, 4, 'ADD', ['3$4', '4$4']),
                      new Cell('', true, 1, 1, 5, 'PERCENTAGE', ['5$4', '5$1']),
                    ],
                    false,
                    5,
                  ),
                  new Row(
                    [
                      {
                        data: 'WORKERS',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 6,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    6,
                  ),
                  ...['Permanent (F)', 'Other than Permanent (G)'].map(
                    (firstCol, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 7}$2`,
                            `${rowNo + 7}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 7}$4`,
                            `${rowNo + 7}$1`,
                          ]),
                        ],
                        false,
                        rowNo + 7,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total employees (F + G)', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['7$1', '8$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['7$2', '8$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', ['9$2', '9$1']),
                      new Cell('', true, 1, 1, 4, 'ADD', ['7$4', '8$4']),
                      new Cell('', true, 1, 1, 5, 'PERCENTAGE', ['9$4', '9$1']),
                    ],
                    false,
                    9,
                  ),
                ],
                false,
              ),

              new Table(
                [
                  new Row(
                    [
                      new Cell('Particulars', false, 2, 1, 0),
                      new Cell('Total (A)', false, 2, 1, 1),
                      new Cell('Male', false, 1, 2, 2),
                      new Cell('Female', false, 1, 2, 3),
                    ],
                    true,
                    10,
                  ),
                  new Row(
                    [
                      new Cell('No. (B)', false, 2, 1, 0),
                      new Cell('% (B / A)', false, 2, 1, 1),
                      new Cell('No. (C)', false, 1, 1, 2),
                      new Cell('% (C / A)', false, 1, 2, 3),
                    ],
                    true,
                    11,
                  ),
                  new Row(
                    [
                      {
                        data: 'DIFFERENTLY ABLED EMPLOYEES',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 6,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    12,
                  ),
                  ...['Permanent (D)', 'Other than Permanent (E)'].map(
                    (firstCol, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 3}$2`,
                            `${rowNo + 3}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 3}$4`,
                            `${rowNo + 3}$1`,
                          ]),
                        ],
                        false,
                        rowNo + 13,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total employees (D + E)', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['3$1', '4$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['3$2', '4$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', ['5$2', '5$1']),
                      new Cell('', true, 1, 1, 4, 'ADD', ['3$4', '4$4']),
                      new Cell('', true, 1, 1, 5, 'PERCENTAGE', ['5$4', '5$1']),
                    ],
                    false,
                    15,
                  ),
                  new Row(
                    [
                      {
                        data: 'DIFFERENTLY ABLED WORKERS',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 6,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    16,
                  ),
                  ...['Permanent (F)', 'Other than Permanent (G)'].map(
                    (firstCol, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 7}$2`,
                            `${rowNo + 7}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 7}$4`,
                            `${rowNo + 7}$1`,
                          ]),
                        ],
                        false,
                        rowNo + 17,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total employees (F + G)', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['7$1', '8$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['7$2', '8$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', ['9$2', '9$1']),
                      new Cell('', true, 1, 1, 4, 'ADD', ['7$4', '8$4']),
                      new Cell('', true, 1, 1, 5, 'PERCENTAGE', ['9$4', '9$1']),
                    ],
                    false,
                    19,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '21. Participation/Inclusion/Representation of Women',
            index: 1,
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell('No. and precentage of women', false, 1, 4, 1),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell('Total (A)', false, 1, 1, 1),
                      new Cell('No. (B)', false, 1, 1, 2),
                      new Cell('% (B / A)', false, 1, 1, 3),
                    ],
                    true,
                    1,
                  ),
                  ...['Board of Directors', 'Key Management Personnel'].map(
                    (firstCell, ind) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          ...Array.from({ length: 2 }).map(
                            (_, cellNo: number) =>
                              new Cell('', true, 1, 1, cellNo + 1),
                          ),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${ind + 2}$2`,
                            `${ind + 2}$1`,
                          ]),
                        ],
                        false,
                        ind + 2,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '22. Turnover rate for permanent employees and workers (Disclose trends for past 3 years)',
            index: 2,
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell('Current financial year', false, 1, 3, 1),
                      new Cell('Previous financial year', false, 1, 3, 2),
                      new Cell(
                        'Previous to previous financial year',
                        false,
                        1,
                        3,
                        3,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell('Male', false, 1, 1, 1),
                      new Cell('Female', false, 1, 1, 2),
                      new Cell('Total', false, 1, 1, 3),
                      new Cell('Male', false, 1, 1, 4),
                      new Cell('Female', false, 1, 1, 5),
                      new Cell('Total', false, 1, 1, 6),
                      new Cell('Male', false, 1, 1, 7),
                      new Cell('Female', false, 1, 1, 8),
                      new Cell('Total', false, 1, 1, 9),
                    ],
                    true,
                    1,
                  ),
                  ...['Permanent Employees', 'Permanent Workers'].map(
                    (firstCell, ind) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          ...Array.from({ length: 2 }).map(
                            (_, cellNo: number) =>
                              new Cell('', true, 1, 1, cellNo + 1),
                          ),
                          new Cell('', true, 1, 1, 3),
                          ...Array.from({ length: 2 }).map(
                            (_, cellNo: number) =>
                              new Cell('', true, 1, 1, cellNo + 4),
                          ),
                          new Cell('', true, 1, 1, 6),
                          ...Array.from({ length: 2 }).map(
                            (_, cellNo: number) =>
                              new Cell('', true, 1, 1, cellNo + 7),
                          ),
                          new Cell('', true, 1, 1, 9),
                        ],
                        false,
                        ind + 2,
                      ),
                  ),
                ],
                false,
              ),
            ],
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
            index: 0,
            // id: 'q1',
            desc: '23. (a) Names of holding / subsidiary / associate companies / joint ventures',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Name of the holding / subsidiary / associate / companies / joint ventures (A)',
                      'Indicate whether holding / Subsidiary / Associate / Join Venture',
                      '% of share held by listed entity',
                      'Does the entity indicate at column A, participate at column A, participate in the Business Responsibility initiatives of the listed entity? (Yes/No)',
                    ].map(
                      (heading, ind: number) =>
                        new Cell(heading, true, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  ...Array.from({ length: 3 }).map(
                    (_, rowNo: number) =>
                      new Row(
                        Array.from({ length: 4 }).map(
                          (_, ind: number) => new Cell('', true, 1, 1, ind),
                        ),
                        false,
                        rowNo,
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
            index: 0,
            type: QuestionType.BOOLEAN,
            desc: '24. (i) Whether CSR is applicable as per section 135 of Companies Act, 2013',
          },
          {
            index: 1,
            type: QuestionType.TEXT,
            desc: '(ii) Turnover (in Rs.)',
            answer_text: '',
          },
          {
            index: 2,
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
            desc: '25. Complaints/Grievances on any of the principles (Principles 1 to 9) under the National Guidelines on Responsible Business Conduct:',
            type: QuestionType.TABLE,
            index: 0,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell(
                        'Stakeholder group from whom complaint is received',
                        false,
                        2,
                        1,
                        0,
                      ),
                      new Cell(
                        'Grievance Redressal Mechanism in Place (Yes/No) (If Yes, then provide web-link for grievance redress policy) ',
                        false,
                        2,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY _____ Current Financial Year',
                        true,
                        1,
                        2,
                        2,
                      ),
                      new Cell(
                        'FY _____ Previous Financial Year',
                        true,
                        1,
                        2,
                        3,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      'Number of complaints filed during the year',
                      'Number of complaints pending resolution at close of the year',
                      'Remarks',
                      'Number of complaints filed during the year',
                      'Number of complaints pending resolution at close of the year',
                      'Remarks',
                    ].map(
                      (value, cellNo: number) =>
                        new Cell(value, false, 1, 1, cellNo),
                    ),
                    true,
                    1,
                  ),
                  ...[
                    'Communities',
                    'Investors (other than shareholders)',
                    'Shareholders',
                    'Employees and workers',
                    'Customers',
                    'Value Chain Partners',
                    'Other (please specify)',
                  ].map(
                    (firstCell, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          ...Array.from({ length: 7 }).map(
                            (_, cellNo: number) =>
                              new Cell('', true, 1, 1, cellNo + 1),
                          ),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            desc: '26. Overview of the entity’s material responsible business conduct issues. Please indicate material responsible business conduct and sustainability issues pertaining to. environmental and social matters that present a risk or an opportunity to your business,. rationale for identifying the same, approach to adapt or mitigate the risk along-with its. financial implications, as per the following format',
            type: 'TABLE',
            index: 1,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Material issue identified',
                      'Indicate whether risk or opportunity (R/O)',
                      'Rationale for identifying the risk / opportunity',
                      'In case of risk, approach to adapt or mitigate',
                      'Financial implications of the risk or opportunity (Indicate positive or negative implications)',
                    ].map(
                      (value, cellNo: number) =>
                        new Cell(value, false, 1, 1, cellNo),
                    ),
                    true,
                    0,
                  ),
                ],
                true,
              ),
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Section B',
    subsections: [
      {
        title: 'I. Policy and process',
        questions: [
          {
            index: 0,
            desc: 'This section is aimed at helping businesses demonstrate the structures, policies and processes put in place towards adopting the NGRBC Principles and Core Elements.',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Question', false, 1, 1, 0),
                      ...Array.from({ length: 9 }).map(
                        (_, ind: number) =>
                          new Cell(`P${ind + 1}`, false, 1, 1, ind + 1),
                      ),
                    ],
                    true,
                    0,
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
                    (question: string, rowNo: number) =>
                      new Row(
                        Array.from({ length: 10 }).map(
                          (_, ind: number) =>
                            new Cell(
                              ind === 0 ? question : '',
                              ind > 0,
                              1,
                              1,
                              ind,
                            ),
                        ),
                        false,
                        rowNo + 1,
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
                        0,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Statement by director responsible for the business responsibility report, highlighting ESG related challenges, targets and achievements (listed entity has flexibility regarding the placement of this disclosure)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 0),
                    ],
                    false,
                    1,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Details of the highest authority responsible for implementation and oversight of the Business Responsibility policy (ies).',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                    ],
                    false,
                    2,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Does the entity have a specified Committee of the Board/ Director responsible for decision making on sustainability related issues? (Yes / No). If yes, provide details.',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                    ],
                    false,
                    3,
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
            index: 0,
            desc: 'Details of Review of NGRBCs by the Company:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Question', false, 1, 1, 0),
                      new Cell(
                        'Indicate whether review was undertaken by Director / Committee of the Board/ Any other Committee',
                        false,
                        1,
                        9,
                        1,
                      ),
                      new Cell(
                        'Frequency (Annually/ Half yearly/ Quarterly/ Any other – please specify)',
                        false,
                        1,
                        9,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      ...Array.from({ length: 9 }).map(
                        (_, ind: number) =>
                          new Cell(`P${ind + 1}`, false, 1, 1, 1),
                      ),
                      ...Array.from({ length: 9 }).map(
                        (_, ind: number) =>
                          new Cell(`P${ind + 1}`, false, 1, 1, 2),
                      ),
                    ],
                    true,
                    1,
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
                                ind,
                              ),
                          ),
                        ],
                        false,
                        2,
                      ),
                  ),
                ],
                false,
              ),

              new Table(
                [
                  new Row(
                    [
                      new Cell('Question', false, 1, 1, 0),
                      ...Array.from({ length: 9 }).map(
                        (_, ind: number) =>
                          new Cell(`P${ind + 1}`, false, 1, 1, 1),
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Has the entity carried out independent assessment/ evaluation of the working of its policies by an external agency? (Yes/No). If yes, provide name of the agency',
                        false,
                        1,
                        1,
                        0,
                      ),
                      ...Array.from({ length: 9 }).map(
                        (_, ind: number) => new Cell(``, true, 1, 1, ind),
                      ),
                    ],
                    false,
                    1,
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
            index: 0,
            desc: '12. If answer to question (1) above is “No” i.e. not all Principles are covered by a policy, reasons to be stated:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Question', false, 1, 1, 0),
                      ...Array.from({ length: 9 }).map(
                        (_, ind: number) =>
                          new Cell(`P${ind + 1}`, false, 1, 1, ind + 1),
                      ),
                    ],
                    true,
                    0,
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
                            new Cell(
                              ind === 0 ? question : '',
                              ind > 0,
                              1,
                              1,
                              ind,
                            ),
                        ),
                        false,
                        1,
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
    subsections: [
      {
        title:
          'PRINCIPLE 1 Businesses should conduct and govern themselves with integrity, and in a manner that is Ethical, Transparent and Accountable.',
        questions: [
          {
            heading: 'Essential Indicators',
            index: 0,
            type: QuestionType.TABLE,
            desc: '1. Percentage coverage by training and awareness programmes on any of the Principles during the financial year:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Segment', false, 1, 1, 0),
                      new Cell(
                        'Total number of training and awareness programmes held',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell(
                        'Topics / principles covered under the training and its impact',
                        false,
                        1,
                        1,
                        2,
                      ),
                      new Cell(
                        '%age of persons in respective category covered by the awareness programmes',
                        false,
                        1,
                        1,
                        3,
                      ),
                    ],
                    true,
                    0,
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
                          new Cell(segment, false, 1, 1, 0),
                          ...Array.from({ length: 3 }).map(
                            (_, colNo: number) =>
                              new Cell('', true, 1, 1, colNo + 1),
                          ),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 1,
            type: QuestionType.TABLE,
            desc: '2. Details of fines / penalties /punishment/ award/ compounding fees/ settlement amount paid in proceedings (by the entity or by directors / KMPs) with regulators/ law enforcement agencies/ judicial institutions, in the financial year, in the following format (Note: the entity shall make disclosures on the basis of materiality as specified in Regulation 30 of SEBI (Listing Obligations and Disclosure Obligations) Regulations, 2015 and as disclosed on the entity’s website):',
            answer_table: [
              new Table(
                [
                  new Row([new Cell('Monetary', true, 1, 6, 0)], true, 0),
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
                          new Cell(heading, false, 1, 1, ind),
                      ),
                    ],
                    true,
                    1,
                  ),
                  ...['Penalty/ Fine', 'Settlement', 'Compounding fee'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          ...Array.from({ length: 5 }).map(
                            (_, colNo: number) =>
                              new Cell('', true, 1, 1, colNo + 1),
                          ),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                ],
                false,
              ),

              new Table(
                [
                  new Row([new Cell('Non-Monetary', true, 1, 5, 0)], true, 0),
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
                          new Cell(heading, false, 1, 1, ind + 1),
                      ),
                    ],
                    true,
                    1,
                  ),
                  ...['Imprisonment', 'Punishment'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          ...Array.from({ length: 4 }).map(
                            (_, colNo: number) =>
                              new Cell('', true, 1, 1, colNo + 1),
                          ),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 2,
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
                          new Cell(heading, false, 1, 1, ind),
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [new Cell('', true, 1, 1, 0), new Cell('', true, 1, 1, 1)],
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 3,
            type: QuestionType.TEXT,
            desc: '4. Does the entity have an anti-corruption or anti-bribery policy? If yes, provide details in brief and if available, provide a web-link to the policy. ',
          },
          {
            index: 4,
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
                          new Cell(heading, false, 1, 1, ind),
                      ),
                    ],
                    true,
                    0,
                  ),
                  ...['Directors', 'KMPs', 'Employees', 'Workers'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          ...Array.from({ length: 2 }).map(
                            (_, colNo: number) =>
                              new Cell('', true, 1, 1, colNo + 1),
                          ),
                        ],
                        false,
                        0,
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
            index: 5,
            type: QuestionType.TABLE,
            desc: '6. Details of complaints with regard to conflict of interest:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      ...[
                        'FY _____(Current Financial Year)',
                        'FY _____ (Previous Financial Year)',
                      ].map(
                        (heading: string, ind: number) =>
                          new Cell(heading, false, 1, 2, ind + 1),
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      ...['', 'Number', 'Remarks', 'Number', 'Remarks'].map(
                        (heading: string, ind: number) =>
                          new Cell(heading, false, 1, 1, ind),
                      ),
                    ],
                    true,
                    1,
                  ),
                  ...[
                    'Number of complaints received in relation to issues of Conflict of Interest of the Directors',
                    'Number of complaints received in relation to issues of Conflict of Interes of the KMPs',
                  ].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          ...Array.from({ length: 4 }).map(
                            (_, colNo: number) =>
                              new Cell('', true, 1, 1, colNo + 1),
                          ),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 6,
            type: QuestionType.TEXT,
            desc: '7. Provide details of any corrective action taken or underway on issues related to fines / penalties / action taken by regulators/ law enforcement agencies/ judicial institutions, on cases of corruption and conflicts of interest.',
          },
          {
            index: 7,
            type: QuestionType.TABLE,
            desc: '8. Number of days of accounts payables ((Accounts payable *365) / Cost of goods/services procured) in the following format:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      ...[
                        'FY _____(Current Financial Year)',
                        'FY _____ (Previous Financial Year)',
                      ].map(
                        (heading: string, ind: number) =>
                          new Cell(heading, false, 1, 1, ind + 1),
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell(
                        'i) Accounts payable * 365 days',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    1,
                  ),
                  new Row(
                    [
                      new Cell(
                        'ii) Cost of goods or services procured',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    2,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Number of days of accounts payables',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'DIV', ['1$1', '2$1']),
                      new Cell('', true, 1, 1, 2, 'DIV', ['1$2', '2$2']),
                    ],
                    false,
                    3,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 8,
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
                          new Cell(heading, false, 1, 1, ind),
                      ),
                    ],
                    true,
                    0,
                  ),

                  new Row(
                    [
                      new Cell('Concentration of Purchases', false, 7, 1, 0),
                      new Cell(
                        'a. i) Purchases from trading houses',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    1,
                  ),

                  new Row(
                    [
                      new Cell('a. ii) Total purchases', false, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    2,
                  ),

                  new Row(
                    [
                      new Cell(
                        'a. iii) Purchases from trading houses as % of total purchases',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2, 'DIV', ['1$2', '2$2']),
                      new Cell('', true, 1, 1, 3, 'DIV', ['1$3', '2$3']),
                    ],
                    false,
                    3,
                  ),

                  new Row(
                    [
                      new Cell(
                        'b. Number of trading houses where purchases are made from ',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    4,
                  ),

                  new Row(
                    [
                      new Cell(
                        'c. i) Sales to top 10 dealers / distributors',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    5,
                  ),

                  new Row(
                    [
                      new Cell(
                        'c. ii) Total Sales to dealer / distributors',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    6,
                  ),

                  new Row(
                    [
                      new Cell(
                        'c. iii) Sales to top 10 dealers / distributors as % of total sales to dealer / distributors',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2, 'DIV', ['5$2', '6$2']),
                      new Cell('', true, 1, 1, 3, 'DIV', ['5$3', '6$3']),
                    ],
                    false,
                    7,
                  ),

                  new Row(
                    [
                      new Cell('Concentration of Sales', false, 7, 1, 0),
                      new Cell(
                        'a. i) Sales to dealer / distributors',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    8,
                  ),

                  new Row(
                    [
                      new Cell('a. ii) Total Sales', false, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    9,
                  ),

                  new Row(
                    [
                      new Cell(
                        'a. iii) Sales to dealer / distributors as % of total sales',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2, 'DIV', ['8$2', '9$2']),
                      new Cell('', true, 1, 1, 3, 'DIV', ['8$3', '9$3']),
                    ],
                    false,
                    10,
                  ),

                  new Row(
                    [
                      new Cell(
                        'b. Number of dealers / distributors to whom sales are made',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    11,
                  ),

                  new Row(
                    [
                      new Cell(
                        'c. i) Sales to top 10 dealers / distributors',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    12,
                  ),

                  new Row(
                    [
                      new Cell(
                        'c. ii) Total Sales to dealer / distributors',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    13,
                  ),

                  new Row(
                    [
                      new Cell(
                        'c. iii) Sales to top 10 dealers / distributors as % of total sales to dealer / distributors',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2, 'DIV', ['12$2', '13$2']),
                      new Cell('', true, 1, 1, 3, 'DIV', ['12$3', '13$3']),
                    ],
                    false,
                    14,
                  ),
                  new Row(
                    [
                      new Cell('Share of RPTs in', false, 12, 1, 0),
                      new Cell(
                        'a. i) Purchases (Purchases with related parties)',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    15,
                  ),
                  new Row(
                    [
                      new Cell('a. ii) Total Purchases)', false, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    16,
                  ),
                  new Row(
                    [
                      new Cell(
                        'a. iii) Purchases (Purchases with related parties as % of Total Purchases)',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2, 'DIV', ['15$2', '16$2']),
                      new Cell('', true, 1, 1, 3, 'DIV', ['15$3', '16$3']),
                    ],
                    false,
                    17,
                  ),
                  new Row(
                    [
                      new Cell(
                        'b. i) Sales (Sales to related parties)',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    18,
                  ),
                  new Row(
                    [
                      new Cell('b. ii) Total Sales', false, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    19,
                  ),
                  new Row(
                    [
                      new Cell(
                        'b. iii) Sales (Sales to related parties as % of Total Sales)',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2, 'DIV', ['18$2', '19$2']),
                      new Cell('', true, 1, 1, 3, 'DIV', ['18$3', '19$3']),
                    ],
                    false,
                    20,
                  ),

                  new Row(
                    [
                      new Cell(
                        'c. i) Loans & advances given to related parties',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    21,
                  ),
                  new Row(
                    [
                      new Cell('c. ii) Total loans & advances', false, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    22,
                  ),
                  new Row(
                    [
                      new Cell(
                        'c. iii) Loans & advances given to related parties as % of Total loans & advances',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2, 'DIV', ['21$2', '22$2']),
                      new Cell('', true, 1, 1, 3, 'DIV', ['21$3', '22$3']),
                    ],
                    false,
                    23,
                  ),

                  new Row(
                    [
                      new Cell(
                        'd. i) Investments in related parties',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    24,
                  ),
                  new Row(
                    [
                      new Cell('d. ii) Total Investments made', false, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    25,
                  ),
                  new Row(
                    [
                      new Cell(
                        'd. iii) Investments in related parties as % of Total Investments made',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2, 'DIV', ['24$2', '25$2']),
                      new Cell('', true, 1, 1, 3, 'DIV', ['24$3', '25$3']),
                    ],
                    false,
                    26,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            heading: 'Leadership Indicators',
            index: 9,
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
                          new Cell(heading, false, 1, 1, cellNo),
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      ...Array.from({ length: 3 }).map(
                        (_, cellNo: number) => new Cell('', true, 1, 1, cellNo),
                      ),
                    ],
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 10,
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
            heading: 'Essential Indicators',
            index: 0,
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
                          new Cell(heading, false, 1, 1, cellNo),
                      ),
                    ],
                    true,
                    0,
                  ),
                  ...['R&D', 'Capex'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          ...Array.from({ length: 3 }).map(
                            (_, cellNo: number) =>
                              new Cell('', true, 1, 1, cellNo + 1),
                          ),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 1,
            type: QuestionType.TEXT,
            desc: '2. a. Does the entity have procedures in place for sustainable sourcing? (Yes/No) b. If yes, what percentage of inputs were sourced sustainably? ',
          },
          {
            index: 2,
            type: QuestionType.TEXT,
            desc: '3. a. Describe the processes in place to safely reclaim your products for reusing, recycling and disposing at the end of life, for Plastics (including packaging)',
          },
          {
            index: 3,
            type: QuestionType.TEXT,
            desc: '3. b. Describe the processes in place to safely reclaim your products for reusing, recycling and disposing at the end of life, for E-waste',
          },
          {
            index: 4,
            type: QuestionType.TEXT,
            desc: '3. c. Describe the processes in place to safely reclaim your products for reusing, recycling and disposing at the end of life, for Hazardous waste.',
          },
          {
            index: 5,
            type: QuestionType.TEXT,
            desc: '3. d. Describe the processes in place to safely reclaim your products for reusing, recycling and disposing at the end of life, for other waste.',
          },
          {
            index: 6,
            type: QuestionType.TEXT,
            desc: '4. Whether Extended Producer Responsibility (EPR) is applicable to the entity’s activities (Yes / No). If yes, whether the waste collection plan is in line with the Extended Producer Responsibility (EPR) plan submitted to Pollution Control Boards? If not, provide steps taken to address the same.',
          },
          {
            heading: 'Leadership Indicators',
            index: 7,
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
                          new Cell(heading, false, 1, 1, cellNo),
                      ),
                    ],
                    true,
                    0,
                  ),
                  ...[''].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          ...Array.from({ length: 6 }).map(
                            (_, cellNo: number) =>
                              new Cell('', true, 1, 1, cellNo),
                          ),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 7,
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
                          new Cell(heading, false, 1, 1, cellNo),
                      ),
                    ],
                    true,
                    0,
                  ),
                  ...Array.from({ length: 3 }).map(
                    (_, rowNo: number) =>
                      new Row(
                        [
                          ...Array.from({ length: 3 }).map(
                            (_, cellNo: number) =>
                              new Cell('', true, 1, 1, cellNo),
                          ),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 8,
            type: QuestionType.TABLE,
            desc: '3. Percentage of recycled or reused input material to total material (by value) used in production (for manufacturing industry) or providing services (for service industry).',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Indicate input material ', false, 2, 1, 0),
                      new Cell(
                        'Recycled or re-used input material to total material ',
                        false,
                        1,
                        2,
                        1,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell(
                        'FY _____ Current Financial Year',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell(
                        'FY _____ Previous Financial Year',
                        false,
                        1,
                        1,
                        1,
                      ),
                    ],
                    true,
                    1,
                  ),
                  ...Array.from({ length: 3 }).map(
                    (_, rowNo: number) =>
                      new Row(
                        [
                          ...Array.from({ length: 3 }).map(
                            (_, colNo: number) =>
                              new Cell('', true, 1, 1, colNo),
                          ),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 9,
            type: QuestionType.TABLE,
            desc: '4. Of the products and packaging reclaimed at end of life of products, amount (in metric tonnes) reused, recycled, and safely disposed, as per the following format:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Indicate input material ', false, 2, 1, 0),
                      new Cell(
                        'FY _____ Current Financial Year',
                        false,
                        1,
                        3,
                        1,
                      ),
                      new Cell(
                        'FY _____ Previous Financial Year',
                        false,
                        1,
                        3,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('Re-Used', false, 1, 1, 0),
                      new Cell('Recycled', false, 1, 1, 1),
                      new Cell('Safely Disposed', true, 1, 1, 2),
                      new Cell('Re-Used', false, 1, 1, 3),
                      new Cell('Recycled', false, 1, 1, 4),
                      new Cell('Safely Disposed', true, 1, 1, 5),
                    ],
                    true,
                    1,
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
                          new Cell(firstCol, false, 1, 1, 0),
                          ...Array.from({ length: 6 }).map(
                            (_, colNo: number) => new Cell('', true, 1, 1, 1),
                          ),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 10,
            type: QuestionType.TABLE,
            desc: '5. Reclaimed products and their packaging materials (as percentage of products sold) for each product category.',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Indicate product category', false, 1, 1, 0),
                      new Cell(
                        'Reclaimed products and their packaging materials as % of total products sold in respective category',
                        false,
                        1,
                        1,
                        1,
                      ),
                    ],
                    true,
                    0,
                  ),
                  ...Array.from({ length: 3 }).map(
                    (_, rowNo: number) =>
                      new Row(
                        [
                          ...Array.from({ length: 2 }).map(
                            (_, colNo: number) =>
                              new Cell('', true, 1, 1, colNo),
                          ),
                        ],
                        false,
                        rowNo + 1,
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
            heading: 'Essential Indicators',
            index: 0,
            type: QuestionType.TABLE,
            desc: '1. a. Details of measures for the well-being of employees:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Category', false, 3, 1, 0),
                      new Cell('% of employees covered by', false, 1, 11, 1),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('Total (A)', false, 2, 1, 0),
                      ...[
                        'Health insurance',
                        'Accident insurance',
                        'Maternity benefits',
                        'Paternity Benefits',
                        'Day Care facilities',
                      ].map(
                        (heading: string, colNo: number) =>
                          new Cell(heading, false, 1, 2, colNo),
                      ),
                    ],
                    true,
                    1,
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
                          new Cell(heading, false, 1, 1, colNo),
                      ),
                    ],
                    true,
                    2,
                  ),
                  new Row(
                    [
                      {
                        data: 'Permanent employees',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 11,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    3,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 4}$2`,
                            `${rowNo + 4}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 4}$4`,
                            `${rowNo + 4}$1`,
                          ]),
                          new Cell('', true, 1, 1, 6),
                          new Cell('', true, 1, 1, 7, Operation.PERCENTAGE, [
                            `${rowNo + 4}$6`,
                            `${rowNo + 4}$1`,
                          ]),
                          new Cell('', true, 1, 1, 8),
                          new Cell('', true, 1, 1, 9, Operation.PERCENTAGE, [
                            `${rowNo + 4}$8`,
                            `${rowNo + 4}$1`,
                          ]),
                          new Cell('', true, 1, 1, 10),
                          new Cell('', true, 1, 1, 11, Operation.PERCENTAGE, [
                            `${rowNo + 4}$10`,
                            `${rowNo + 4}$1`,
                          ]),
                        ],
                        false,
                        rowNo + 4,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['4$1', '5$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['4$2', '5$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', ['6$2', '6$1']),
                      new Cell('', true, 1, 1, 4, 'ADD', ['4$4', '5$4']),
                      new Cell('', true, 1, 1, 5, 'PERCENTAGE', ['6$4', '6$1']),
                      new Cell('', true, 1, 1, 6, 'ADD', ['4$6', '5$6']),
                      new Cell('', true, 1, 1, 7, 'PERCENTAGE', ['6$6', '6$1']),
                      new Cell('', true, 1, 1, 8, 'ADD', ['4$8', '5$8']),
                      new Cell('', true, 1, 1, 9, 'PERCENTAGE', ['6$8', '6$1']),
                      new Cell('', true, 1, 1, 10, 'ADD', ['4$10', '5$10']),
                      new Cell('', true, 1, 1, 11, 'PERCENTAGE', [
                        '6$10',
                        '6$1',
                      ]),
                    ],
                    false,
                    6,
                  ),
                  new Row(
                    [
                      {
                        data: 'Other than Permanent employees',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 11,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    7,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 8}$2`,
                            `${rowNo + 8}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 8}$4`,
                            `${rowNo + 8}$1`,
                          ]),
                          new Cell('', true, 1, 1, 6),
                          new Cell('', true, 1, 1, 7, Operation.PERCENTAGE, [
                            `${rowNo + 8}$6`,
                            `${rowNo + 8}$1`,
                          ]),
                          new Cell('', true, 1, 1, 8),
                          new Cell('', true, 1, 1, 9, Operation.PERCENTAGE, [
                            `${rowNo + 8}$8`,
                            `${rowNo + 8}$1`,
                          ]),
                          new Cell('', true, 1, 1, 10),
                          new Cell('', true, 1, 1, 11, Operation.PERCENTAGE, [
                            `${rowNo + 8}$10`,
                            `${rowNo + 8}$1`,
                          ]),
                        ],
                        false,
                        rowNo + 8,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['8$1', '9$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['8$2', '9$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', [
                        '10$2',
                        '10$1',
                      ]),
                      new Cell('', true, 1, 1, 4, 'ADD', ['8$4', '9$4']),
                      new Cell('', true, 1, 1, 5, 'PERCENTAGE', [
                        '10$4',
                        '10$1',
                      ]),
                      new Cell('', true, 1, 1, 6, 'ADD', ['8$6', '9$6']),
                      new Cell('', true, 1, 1, 7, 'PERCENTAGE', [
                        '10$6',
                        '10$1',
                      ]),
                      new Cell('', true, 1, 1, 8, 'ADD', ['8$8', '9$8']),
                      new Cell('', true, 1, 1, 9, 'PERCENTAGE', [
                        '10$8',
                        '10$1',
                      ]),
                      new Cell('', true, 1, 1, 10, 'ADD', ['8$10', '9$10']),
                      new Cell('', true, 1, 1, 11, 'PERCENTAGE', [
                        '10$10',
                        '10$1',
                      ]),
                    ],
                    false,
                    10,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 1,
            type: QuestionType.TABLE,
            desc: '1. b. Details of measures for the well-being of workers:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Category', false, 3, 1, 0),
                      new Cell('% of workers covered by', false, 1, 11, 1),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('Total (A)', false, 2, 1, 0),
                      ...[
                        'Health insurance',
                        'Accident insurance',
                        'Maternity benefits',
                        'Paternity Benefits',
                        'Day Care facilities',
                      ].map(
                        (heading: string, colNo: number) =>
                          new Cell(heading, false, 1, 2, colNo + 1),
                      ),
                    ],
                    true,
                    1,
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
                          new Cell(heading, false, 1, 1, colNo),
                      ),
                    ],
                    true,
                    2,
                  ),
                  new Row(
                    [
                      {
                        data: 'Permanent workers',
                        isUpdateable: false,
                        isHeading: true,
                        rowSpan: 1,
                        colSpan: 11,
                        index: 0,
                      },
                    ],
                    false,
                    3,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 4}$2`,
                            `${rowNo + 4}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 4}$4`,
                            `${rowNo + 4}$1`,
                          ]),
                          new Cell('', true, 1, 1, 6),
                          new Cell('', true, 1, 1, 7, Operation.PERCENTAGE, [
                            `${rowNo + 4}$6`,
                            `${rowNo + 4}$1`,
                          ]),
                          new Cell('', true, 1, 1, 8),
                          new Cell('', true, 1, 1, 9, Operation.PERCENTAGE, [
                            `${rowNo + 4}$8`,
                            `${rowNo + 4}$1`,
                          ]),
                          new Cell('', true, 1, 1, 10),
                          new Cell('', true, 1, 1, 11, Operation.PERCENTAGE, [
                            `${rowNo + 4}$10`,
                            `${rowNo + 4}$1`,
                          ]),
                        ],
                        false,
                        rowNo + 4,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['4$1', '5$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['4$2', '5$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', ['6$2', '6$1']),
                      new Cell('', true, 1, 1, 4, 'ADD', ['4$4', '5$4']),
                      new Cell('', true, 1, 1, 5, 'PERCENTAGE', ['6$4', '6$1']),
                      new Cell('', true, 1, 1, 6, 'ADD', ['4$6', '5$6']),
                      new Cell('', true, 1, 1, 7, 'PERCENTAGE', ['6$6', '6$1']),
                      new Cell('', true, 1, 1, 8, 'ADD', ['4$8', '5$8']),
                      new Cell('', true, 1, 1, 9, 'PERCENTAGE', ['6$8', '6$1']),
                      new Cell('', true, 1, 1, 10, 'ADD', ['4$10', '5$10']),
                      new Cell('', true, 1, 1, 11, 'PERCENTAGE', [
                        '6$10',
                        '6$1',
                      ]),
                    ],
                    false,
                    6,
                  ),
                  new Row(
                    [new Cell('Other than Permanent workers', false, 1, 11, 0)],
                    false,
                    7,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 8}$2`,
                            `${rowNo + 8}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 8}$4`,
                            `${rowNo + 8}$1`,
                          ]),
                          new Cell('', true, 1, 1, 6),
                          new Cell('', true, 1, 1, 7, Operation.PERCENTAGE, [
                            `${rowNo + 8}$6`,
                            `${rowNo + 8}$1`,
                          ]),
                          new Cell('', true, 1, 1, 8),
                          new Cell('', true, 1, 1, 9, Operation.DIV, [
                            `${rowNo + 8}$8`,
                            `${rowNo + 8}$1`,
                          ]),
                          new Cell('', true, 1, 1, 10),
                          new Cell('', true, 1, 1, 11, Operation.PERCENTAGE, [
                            `${rowNo + 8}$10`,
                            `${rowNo + 8}$1`,
                          ]),
                        ],
                        false,
                        rowNo + 8,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['8$1', '9$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['8$2', '9$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', [
                        '10$2',
                        '10$1',
                      ]),
                      new Cell('', true, 1, 1, 4, 'ADD', ['8$4', '9$4']),
                      new Cell('', true, 1, 1, 5, 'PERCENTAGE', [
                        '10$4',
                        '10$1',
                      ]),
                      new Cell('', true, 1, 1, 6, 'ADD', ['8$6', '9$6']),
                      new Cell('', true, 1, 1, 7, 'PERCENTAGE', [
                        '10$6',
                        '10$1',
                      ]),
                      new Cell('', true, 1, 1, 8, 'ADD', ['8$8', '9$8']),
                      new Cell('', true, 1, 1, 9, 'PERCENTAGE', [
                        '10$8',
                        '10$1',
                      ]),
                      new Cell('', true, 1, 1, 10, 'ADD', ['8$10', '9$10']),
                      new Cell('', true, 1, 1, 11, 'PERCENTAGE', [
                        '10$10',
                        '10$1',
                      ]),
                    ],
                    false,
                    10,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 2,
            type: QuestionType.TABLE,
            desc: '1. c. Spending on measures towards well-being of employees and workers (including permanent and other than permanent) in the following format –',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell(
                        'FY _____ Current Financial Year',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY _____ Previous Financial Year',
                        false,
                        1,
                        1,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell(
                        'i) Cost incurred on wellbeing measures (well-being measures means well-being of employees and workers (including male, female, permanent and other than permanent employees and workers)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    1,
                  ),
                  new Row(
                    [
                      new Cell(
                        'ii) Total revenue of the company',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    2,
                  ),

                  new Row(
                    [
                      new Cell(
                        'Cost incurred on wellbeing measures as a % of total revenue of the company',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, Operation.DIV, [
                        `1$1`,
                        `2$1`,
                      ]),
                      new Cell('', true, 1, 1, 2, Operation.DIV, [
                        `1$2`,
                        `2$2`,
                      ]),
                    ],
                    false,
                    3,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 4,
            type: QuestionType.TABLE,
            desc: '2. Details of retirement benefits, for Current FY and Previous Financial Year.',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Benefits', false, 2, 1, 0),
                      new Cell(
                        'FY _____ Current Financial Year',
                        false,
                        1,
                        3,
                        1,
                      ),
                      new Cell(
                        'FY _____ Previous Financial Year',
                        false,
                        1,
                        3,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell(
                        'No. of employees covered as a % of total employees',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell(
                        'No. of workers covered as a % of total workers',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell(
                        'Deducted and deposited with the authority (Y/N/N.A.)',
                        false,
                        1,
                        1,
                        2,
                      ),
                      new Cell(
                        'No. of employees covered as a % of total employees',
                        false,
                        1,
                        1,
                        3,
                      ),
                      new Cell(
                        'No. of workers covered as a % of total workers',
                        false,
                        1,
                        1,
                        4,
                      ),
                      new Cell(
                        'Deducted and deposited with the authority (Y/N/N.A.)',
                        false,
                        1,
                        1,
                        5,
                      ),
                    ],
                    true,
                    1,
                  ),
                  ...['PF', 'Gratuity', 'ESI', 'Others – pleasespecify'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          ...Array.from({ length: 6 }).map(
                            (_, colNo: number) =>
                              new Cell('', true, 1, 1, colNo + 1),
                          ),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 5,
            type: QuestionType.TEXT,
            desc: '3. Accessibility of workplaces Are the premises / offices of the entity accessible to differently abled employees and workers, as per the requirements of the Rights of Persons with Disabilities Act, 2016? If not, whether any steps are being taken by the entity in this regard.',
          },
          {
            index: 6,
            type: QuestionType.TEXT,
            desc: '4. Does the entity have an equal opportunity policy as per the Rights of Persons with Disabilities Act, 2016? If so, provide a web-link to the policy. ',
          },
          {
            index: 7,
            type: QuestionType.TABLE,
            desc: '5. Return to work and Retention rates of permanent employees and workers that took parental leave.',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell('Permanent employees', false, 1, 2, 1),
                      new Cell('Permanent workers', false, 1, 2, 2),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('Gender', false, 1, 1, 0),
                      new Cell('Return to work rate', false, 1, 1, 1),
                      new Cell('Retention rate', false, 1, 1, 2),
                      new Cell('Return to work rate', false, 1, 1, 3),
                      new Cell('Retention rate', false, 1, 1, 4),
                    ],
                    true,
                    1,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          ...Array.from({ length: 4 }).map(
                            (_, colNo: number) =>
                              new Cell('', true, 1, 1, colNo),
                          ),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, Operation.ADD, [
                        '3$1',
                        '2$1',
                      ]),
                      new Cell('', true, 1, 1, 2, Operation.ADD, [
                        '3$2',
                        '2$2',
                      ]),
                      new Cell('', true, 1, 1, 3, Operation.ADD, [
                        '3$3',
                        '2$3',
                      ]),
                      new Cell('', true, 1, 1, 4, Operation.ADD, [
                        '3$4',
                        '2$4',
                      ]),
                    ],
                    false,
                    4,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 8,
            type: QuestionType.TABLE,
            desc: '6. Is there a mechanism available to receive and redress grievances for the following categories of employees and worker? If yes, give details of the mechanism in brief.',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell(
                        'Yes/No (If Yes, then give details of the mechanism in brief)',
                        false,
                        1,
                        2,
                        1,
                      ),
                    ],
                    true,
                    0,
                  ),
                  ...[
                    'Permanent Workers',
                    'Other than Permanent Workers',
                    'Permanent Employees',
                    'Other than Permanent Employees',
                  ].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 9,
            type: QuestionType.TABLE,
            desc: '7. Membership of employees and worker in association(s) or Unions recognised by the listed entity:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Category', false, 2, 1, 0),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        3,
                        1,
                      ),
                      new Cell(
                        'FY _____ (Previous Financial Year)',
                        false,
                        1,
                        3,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total employees / workers in respective category (A)',
                        false,
                        1,
                        1,
                        3,
                      ),
                      new Cell(
                        'No. of employees / workers in respective category, who are part of association(s) or Union (B)',
                        false,
                        1,
                        1,
                        4,
                      ),
                      new Cell('% (B / A) T', false, 1, 1, 5),
                      new Cell(
                        'Total employees / workers in respective category (C)',
                        false,
                        1,
                        1,
                        6,
                      ),
                      new Cell(
                        'No. of employees / workers in respective category, who are part of association(s) or Union (D)',
                        false,
                        1,
                        1,
                        7,
                      ),
                      new Cell('% (D / C) T', false, 1, 1, 7),
                    ],
                    true,
                    1,
                  ),
                  new Row(
                    [
                      new Cell('Total Permanent Employee', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['3$1', '4$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['3$2', '4$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', ['2$2', '2$1']),
                      new Cell('', true, 1, 1, 4, 'PERCENTAGE', ['3$4', '4$4']),
                      new Cell('', true, 1, 1, 5, 'ADD', ['3$5', '4$5']),
                      new Cell('', true, 1, 1, 6, 'PERCENTAGE', ['2$5', '2$4']),
                    ],
                    false,
                    2,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 3}$2`,
                            `${rowNo + 3}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5),
                          new Cell('', true, 1, 1, 6, Operation.PERCENTAGE, [
                            `${rowNo + 3}$4`,
                            `${rowNo + 3}$3`,
                          ]),
                        ],
                        false,
                        rowNo + 3,
                      ),
                  ),

                  new Row(
                    [
                      new Cell('Total Permanent Employee', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['6$1', '7$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['6$2', '7$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', ['5$2', '5$1']),
                      new Cell('', true, 1, 1, 4, 'ADD', ['6$4', '7$4']),
                      new Cell('', true, 1, 1, 5, 'ADD', ['6$5', '7$5']),
                      new Cell('', true, 1, 1, 6, 'PERCENTAGE', ['5$5', '5$4']),
                    ],
                    false,
                    5,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 3}$2`,
                            `${rowNo + 3}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5),
                          new Cell('', true, 1, 1, 6, Operation.PERCENTAGE, [
                            `${rowNo + 3}$4`,
                            `${rowNo + 3}$3`,
                          ]),
                        ],
                        false,
                        rowNo + 6,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 10,
            type: QuestionType.TABLE,
            desc: '8. Details of training given to employees and workers:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Category', false, 3, 1, 0),
                      new Cell(
                        'FY _____ Current Financial Year',
                        false,
                        1,
                        5,
                        1,
                      ),
                      new Cell(
                        'FY _____ Current Previous Year',
                        false,
                        1,
                        5,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('Total (A)', false, 2, 1, 0),
                      ...[
                        'On Health and safety measures',
                        'On Skill upgradation',
                      ].map(
                        (heading: string, colNo: number) =>
                          new Cell(heading, false, 1, 2, colNo + 1),
                      ),
                      new Cell('Total (D)', false, 2, 1, 3),
                      ...[
                        'On Health and safety measures',
                        'On Skill upgradation',
                      ].map(
                        (heading: string, colNo: number) =>
                          new Cell(heading, false, 1, 2, colNo + 4),
                      ),
                    ],
                    true,
                    1,
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
                          new Cell(heading, false, 1, 1, colNo),
                      ),
                    ],
                    true,
                    2,
                  ),
                  new Row(
                    [
                      {
                        data: 'Employees',
                        isUpdateable: false,
                        isHeading: true,
                        rowSpan: 1,
                        colSpan: 11,
                        index: 0,
                      },
                    ],
                    false,
                    3,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 4}$2`,
                            `${rowNo + 4}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 4}$4`,
                            `${rowNo + 4}$1`,
                          ]),
                          new Cell('', true, 1, 1, 6),
                          new Cell('', true, 1, 1, 7),
                          new Cell('', true, 1, 1, 8, Operation.PERCENTAGE, [
                            `${rowNo + 4}$7`,
                            `${rowNo + 4}$6`,
                          ]),
                          new Cell('', true, 1, 1, 9),
                          new Cell('', true, 1, 1, 10, Operation.PERCENTAGE, [
                            `${rowNo + 4}$9`,
                            `${rowNo + 4}$6`,
                          ]),
                        ],
                        false,
                        rowNo + 4,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['4$1', '5$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['4$2', '5$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', ['6$2', '6$1']),
                      new Cell('', true, 1, 1, 4, 'ADD', ['4$4', '5$4']),
                      new Cell('', true, 1, 1, 5, 'PERCENTAGE', ['6$4', '6$1']),
                      new Cell('', true, 1, 1, 6, 'ADD', ['4$6', '5$6']),
                      new Cell('', true, 1, 1, 7, 'ADD', ['4$7', '5$7']),
                      new Cell('', true, 1, 1, 8, 'PERCENTAGE', ['6$7', '6$6']),
                      new Cell('', true, 1, 1, 9, 'ADD', ['4$9', '5$9']),
                      new Cell('', true, 1, 1, 10, 'PERCENTAGE', [
                        '6$9',
                        '6$6',
                      ]),
                    ],
                    false,
                    6,
                  ),

                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 7}$2`,
                            `${rowNo + 7}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 7}$4`,
                            `${rowNo + 7}$1`,
                          ]),
                          new Cell('', true, 1, 1, 6),
                          new Cell('', true, 1, 1, 7),
                          new Cell('', true, 1, 1, 8, Operation.PERCENTAGE, [
                            `${rowNo + 7}$7`,
                            `${rowNo + 7}$6`,
                          ]),
                          new Cell('', true, 1, 1, 9),
                          new Cell('', true, 1, 1, 10, Operation.PERCENTAGE, [
                            `${rowNo + 7}$9`,
                            `${rowNo + 7}$6`,
                          ]),
                        ],
                        false,
                        rowNo + 7,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['8$1', '7$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['8$2', '7$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', ['9$2', '9$1']),
                      new Cell('', true, 1, 1, 4, 'ADD', ['8$4', '7$4']),
                      new Cell('', true, 1, 1, 5, 'PERCENTAGE', ['9$4', '9$1']),
                      new Cell('', true, 1, 1, 6, 'ADD', ['8$6', '7$6']),
                      new Cell('', true, 1, 1, 7, 'ADD', ['8$7', '7$7']),
                      new Cell('', true, 1, 1, 8, 'PERCENTAGE', ['9$7', '9$6']),
                      new Cell('', true, 1, 1, 9, 'ADD', ['8$9', '7$9']),
                      new Cell('', true, 1, 1, 10, 'PERCENTAGE', [
                        '9$9',
                        '9$6',
                      ]),
                    ],
                    false,
                    9,
                  ),
                ],
                false,
              ),
            ],
          },

          {
            index: 11,
            type: QuestionType.TABLE,
            desc: '9. Details of performance and career development reviews of employees and worker:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Category', false, 2, 1, 0),
                      new Cell(
                        'FY _____ Current Financial Year',
                        false,
                        1,
                        3,
                        1,
                      ),
                      new Cell(
                        'FY _____ Current Previous Year',
                        false,
                        1,
                        3,
                        2,
                      ),
                    ],
                    true,
                    0,
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
                          new Cell(heading, false, 1, 1, colNo),
                      ),
                    ],
                    true,
                    1,
                  ),
                  new Row(
                    [
                      {
                        data: 'Employees',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 7,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    2,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 3}$2`,
                            `${rowNo + 3}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5),
                          new Cell('', true, 1, 1, 6, Operation.PERCENTAGE, [
                            `${rowNo + 3}$5`,
                            `${rowNo + 3}$4`,
                          ]),
                        ],
                        false,
                        rowNo + 3,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['4$1', '3$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['4$2', '3$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', ['5$2', '5$1']),
                      new Cell('', true, 1, 1, 4, 'ADD', ['4$4', '3$4']),
                      new Cell('', true, 1, 1, 5, 'ADD', ['4$5', '3$5']),
                      new Cell('', true, 1, 1, 6, 'PERCENTAGE', ['5$5', '5$4']),
                    ],
                    false,
                    5,
                  ),
                  new Row(
                    [
                      {
                        data: 'Workers',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 11,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    6,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 7}$2`,
                            `${rowNo + 7}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5),
                          new Cell('', true, 1, 1, 6, Operation.PERCENTAGE, [
                            `${rowNo + 7}$5`,
                            `${rowNo + 7}$4`,
                          ]),
                        ],
                        false,
                        rowNo + 7,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['8$1', '7$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['8$2', '7$2']),
                      new Cell('', true, 1, 1, 3, 'PERCENTAGE', ['9$2', '9$1']),
                      new Cell('', true, 1, 1, 4, 'ADD', ['8$4', '7$4']),
                      new Cell('', true, 1, 1, 5, 'ADD', ['8$5', '7$5']),
                      new Cell('', true, 1, 1, 6, 'PERCENTAGE', ['9$5', '9$4']),
                    ],
                    false,
                    9,
                  ),
                ],
                false,
              ),
            ],
          },

          {
            index: 12,
            type: QuestionType.BOOLEAN,
            desc: '10. a. Whether an occupational health and safety management system has been implemented by the entity?',
            answer_text: '',
          },
          {
            index: 13,
            type: QuestionType.TEXT,
            desc: '10. b. What are the processes used to identify work-related hazards and assess risks on a routine and non-routine basis by the entity? ',
            answer_text: '',
          },
          {
            index: 14,
            type: QuestionType.BOOLEAN,
            desc: '10. c. Whether you have processes for workers to report the work related hazards and to remove themselves from such risks.',
            answer_text: '',
          },
          {
            index: 15,
            type: QuestionType.BOOLEAN,
            desc: '10. d. Do the employees/ worker of the entity have access to non-occupational medical and healthcare services?',
            answer_text: '',
          },

          {
            index: 16,
            type: QuestionType.TABLE,
            desc: '11. Details of safety related incidents, in the following format:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Safety Incident/Number', false, 1, 1, 0),
                      new Cell('Category', false, 1, 1, 1),
                      new Cell(
                        'FY _____ Current Financial Year',
                        false,
                        1,
                        1,
                        2,
                      ),
                      new Cell(
                        'FY _____ Previous Financial Year',
                        false,
                        1,
                        1,
                        3,
                      ),
                    ],
                    true,
                    0,
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
                  ].map((firstCell: string, rowNo: number) =>
                    firstCell
                      ? new Row(
                          [
                            new Cell(firstCell, false, 2, 1, 0),
                            new Cell('Employees', false, 1, 1, 1),
                            new Cell('', true, 1, 1, 2),
                            new Cell('', true, 1, 1, 3),
                          ],
                          false,
                          rowNo + 1,
                        )
                      : new Row(
                          [
                            new Cell('Workers', false, 1, 1, 0),
                            new Cell('', true, 1, 1, 1),
                            new Cell('', true, 1, 1, 2),
                          ],
                          false,
                          rowNo + 1,
                        ),
                  ),
                ],
                false,
              ),
            ],
          },

          {
            index: 17,
            type: QuestionType.TEXT,
            desc: '12. Describe the measures taken by the entity to ensure a safe and healthy work place. ',
            answer_text: '',
          },
          {
            index: 18,
            type: QuestionType.TABLE,
            desc: '13. Number of Complaints on the following made by employees and workers:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 2, 1, 0),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        3,
                        1,
                      ),
                      new Cell(
                        'FY _____ (Previous Financial Year)',
                        false,
                        1,
                        3,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('Filed during the year', false, 1, 1, 0),
                      new Cell(
                        'Pending resolution at the end of year',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('Remarks', false, 1, 1, 2),
                      new Cell('Filed during the year', false, 1, 1, 3),
                      new Cell(
                        'Pending resolution at the end of year',
                        false,
                        1,
                        1,
                        4,
                      ),
                      new Cell('Remarks', false, 1, 1, 5),
                    ],
                    true,
                    1,
                  ),
                  ...['Working Conditions', 'Health &Safety'].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          ...Array.from({ length: 6 }).map(
                            (_, ind: number) =>
                              new Cell('', true, 1, 1, ind + 1),
                          ),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },

          {
            index: 18,
            type: QuestionType.TABLE,
            desc: '14. Assessments for the year:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell(
                        '% of your plants and offices that were assessed (by entity or statutory authorities orthird parties)',
                        false,
                        1,
                        1,
                        1,
                      ),
                    ],
                    true,
                    0,
                  ),

                  ...['Health and safety practices', 'Working Conditions'].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },

          {
            index: 19,
            type: QuestionType.TEXT,
            desc: '15. Provide details of any corrective action taken or underway to address safety-related incidents (if any) and on significant risks / concerns arising from assessments of health & safety practices and working conditions.',
            answer_text: '',
          },

          {
            heading: 'Leadership Indicators',
            index: 20,
            type: QuestionType.BOOLEAN,
            desc: '1. Does the entity extend any life insurance or any compensatory package in the event of death of (A) Employees?',
          },
          {
            index: 21,
            type: QuestionType.BOOLEAN,
            desc: '2. Does the entity extend any life insurance or any compensatory package in the event of death of (B) Workers?',
          },
          {
            index: 22,
            type: QuestionType.TEXT,
            desc: '3. Provide the measures undertaken by the entity to ensure that statutory dues have been deducted and deposited by the value chain partners.',
          },
          {
            index: 23,
            type: QuestionType.TABLE,
            desc: '4. Provide the number of employees / workers having suffered high consequence workrelated injury / ill-health / fatalities (as reported in Q11 of Essential Indicators above), who have been are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employment:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 2, 1, 0),
                      new Cell(
                        'Total no. of affected employees/ workers',
                        false,
                        1,
                        2,
                        1,
                      ),
                      new Cell(
                        'No. of employees/workers that are rehabilitated and placed in suitable employment or whose family members have been placed in suitable employment',
                        false,
                        1,
                        2,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),

                  new Row(
                    [
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell(
                        'FY _____ (Previous Financial Year)',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        1,
                        2,
                      ),
                      new Cell(
                        'FY _____ (Previous Financial Year)',
                        false,
                        1,
                        1,
                        3,
                      ),
                    ],
                    true,
                    1,
                  ),
                  new Row(
                    [
                      new Cell('Employees', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                      new Cell('', true, 1, 1, 4),
                    ],
                    false,
                    2,
                  ),
                  new Row(
                    [
                      new Cell('Workers', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                      new Cell('', true, 1, 1, 4),
                    ],
                    false,
                    3,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 24,
            type: QuestionType.BOOLEAN,
            desc: '5. Does the entity provide transition assistance programs to facilitate continued employability and the management of career endings resulting from retirement or termination of employment?',
          },
          {
            index: 25,
            type: QuestionType.TABLE,
            desc: '6. Details on assessment of value chain partners:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell(
                        '% of value chain partners (by value of business done with such partners) that were assessed',
                        false,
                        1,
                        1,
                        1,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('Health and safety practices', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                    ],
                    false,
                    1,
                  ),
                  new Row(
                    [
                      new Cell('Working Conditions', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                    ],
                    false,
                    2,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 26,
            type: QuestionType.TEXT,
            desc: '7. Provide details of any corrective actions taken or underway to address significant risks / concerns arising from assessments of health and safety practices and working conditions of value chain partners.',
          },
        ],
      },
      {
        title:
          'PRINCIPLE 4: Businesses should respect the interests of and be responsive to all its stakeholders',
        questions: [
          {
            heading: 'Essential Indicators',
            index: 0,
            desc: '1. Describe the processes for identifying key stakeholder groups of the entity',
            type: QuestionType.TEXT,
          },
          {
            index: 1,
            desc: '2. List stakeholder groups identified as key for your entity and the frequency of engagement with each stakeholder group.',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Stakeholder Group', false, 1, 1, 0),
                      new Cell(
                        'Whether identified as Vulnerable & Marginalized Group (Yes/No)',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell(
                        'Channels of communication (Email, SMS, Newspaper, Pamphlets, Advertisement, Community Meetings, Notice Board, Website), Other',
                        false,
                        1,
                        1,
                        2,
                      ),
                      new Cell(
                        'Frequency of engagement (Annually/ Half yearly/ Quarterly / others – please specify) ',
                        false,
                        1,
                        1,
                        3,
                      ),
                      new Cell(
                        'Purpose and scope of engagement including key topics and concerns raised during such engagement',
                        false,
                        1,
                        1,
                        4,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    Array.from({ length: 5 }).map(
                      (_, ind: number) => new Cell('', true, 1, 1, ind),
                      false,
                    ),
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            heading: 'Leadership Indicators',
            index: 2,
            type: QuestionType.TEXT,
            desc: '1. Provide the processes for consultation between stakeholders and the Board on economic, environmental, and social topics or if consultation is delegated, how is feedback from such consultations provided to the Board.',
          },
          {
            index: 3,
            type: QuestionType.TEXT,
            desc: '2. Whether stakeholder consultation is used to support the identification and management of environmental, and social topics (Yes / No). If so, provide details of instances as to how the inputs received from stakeholders on these topics were incorporated into policies and activities of the entity.',
          },
          {
            index: 4,
            type: QuestionType.TEXT,
            desc: '3. Provide details of instances of engagement with, and actions taken to, address the concerns of vulnerable/ marginalized stakeholder groups. ',
          },
        ],
      },
      {
        title: 'PRINCIPLE 5 Businesses should respect and promote human rights',
        questions: [
          {
            heading: 'Essential Indicators',
            index: 0,
            desc: '1. Employees and workers who have been provided training on human rights issues and policy(ies) of the entity, in the following format: ',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Category', false, 2, 1, 0),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        3,
                        1,
                      ),
                      new Cell(
                        'FY _____ (Previous Financial Year)',
                        false,
                        1,
                        3,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('Total (A)', false, 1, 1, 0),
                      new Cell(
                        'No. of employees / workers covered (B)',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('% (B / A)', false, 1, 1, 2),
                      new Cell('Total (C)', false, 1, 1, 3),
                      new Cell(
                        'No. of employees / workers covered (D)',
                        false,
                        1,
                        1,
                        4,
                      ),
                      new Cell('% (D / C)', false, 1, 1, 5),
                    ],
                    true,
                    1,
                  ),
                  new Row(
                    [
                      {
                        data: 'Employees',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 7,
                        index: 6,
                        isHeading: true,
                      },
                    ],
                    false,
                    2,
                  ),
                  ...['Permanent', 'Other than permanent'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 3}$2`,
                            `${rowNo + 3}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5),
                          new Cell('', true, 1, 1, 6, Operation.PERCENTAGE, [
                            `${rowNo + 3}$5`,
                            `${rowNo + 3}$4`,
                          ]),
                        ],
                        false,
                        rowNo + 3,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total Employees	', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, Operation.ADD, [
                        `4$${1}`,
                        `3$${1}`,
                      ]),
                      new Cell('', true, 1, 1, 2, Operation.ADD, [
                        `4$${2}`,
                        `3$${2}`,
                      ]),
                      new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                        `5$${2}`,
                        `5$${1}`,
                      ]),
                      new Cell('', true, 1, 1, 4, Operation.ADD, [
                        `4$${4}`,
                        `3$${4}`,
                      ]),
                      new Cell('', true, 1, 1, 5, Operation.ADD, [
                        `4$${5}`,
                        `3$${5}`,
                      ]),
                      new Cell('', true, 1, 1, 6, Operation.PERCENTAGE, [
                        `5$${5}`,
                        `5$${4}`,
                      ]),
                    ],
                    false,
                    5,
                  ),
                  new Row(
                    [
                      {
                        data: 'Workers',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 7,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    6,
                  ),
                  ...['Permanent', 'Other than permanent'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 7}$2`,
                            `${rowNo + 7}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5),
                          new Cell('', true, 1, 1, 6, Operation.PERCENTAGE, [
                            `${rowNo + 7}$5`,
                            `${rowNo + 7}$4`,
                          ]),
                        ],
                        false,
                        rowNo + 7,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total Employees	', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, Operation.ADD, [
                        `8$${1}`,
                        `7$${1}`,
                      ]),
                      new Cell('', true, 1, 1, 2, Operation.ADD, [
                        `8$${2}`,
                        `7$${2}`,
                      ]),
                      new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                        `9$${2}`,
                        `9$${1}`,
                      ]),
                      new Cell('', true, 1, 1, 4, Operation.ADD, [
                        `8$${4}`,
                        `7$${4}`,
                      ]),
                      new Cell('', true, 1, 1, 5, Operation.ADD, [
                        `8$${5}`,
                        `7$${5}`,
                      ]),
                      new Cell('', true, 1, 1, 6, Operation.PERCENTAGE, [
                        `9$${5}`,
                        `9$${4}`,
                      ]),
                    ],
                    false,
                    9,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 1,
            type: QuestionType.TABLE,
            desc: '2. Details of minimum wages paid to employees and workers, in the following format:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Category', false, 3, 1, 0),
                      new Cell(
                        'FY _____ Current Financial Year',
                        false,
                        1,
                        5,
                        1,
                      ),
                      new Cell(
                        'FY _____ Current Previous Year',
                        false,
                        1,
                        5,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('Total (A)', false, 2, 1, 0),
                      ...[
                        'Equal to Minimum Wage',
                        'More than Minimum Wage',
                      ].map(
                        (heading: string, colNo: number) =>
                          new Cell(heading, false, 1, 2, 1),
                      ),
                      new Cell('Total (D)', false, 2, 1, 2),
                      ...['Equal to Minimum Wage', 'On Skill upgradation'].map(
                        (heading: string, colNo: number) =>
                          new Cell(heading, false, 1, 2, 3),
                      ),
                    ],
                    true,
                    1,
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
                          new Cell(heading, false, 1, 1, colNo),
                      ),
                    ],
                    true,
                    2,
                  ),
                  new Row(
                    [
                      {
                        data: 'Employees',
                        isUpdateable: false,
                        isHeading: true,
                        rowSpan: 1,
                        colSpan: 1,
                        index: 11,
                      },
                    ],
                    false,
                    3,
                  ),
                  new Row(
                    [
                      new Cell('Permanent', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['5$1', '6$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['5$2', '6$2']),
                      new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                        `4$2`,
                        `4$1`,
                      ]),
                      new Cell('', true, 1, 1, 4, 'ADD', ['5$4', '6$4']),
                      new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                        `4$4`,
                        `4$1`,
                      ]),
                      new Cell('', true, 1, 1, 6, 'ADD', ['5$6', '6$6']),
                      new Cell('', true, 1, 1, 7, 'ADD', ['5$7', '6$7']),
                      new Cell('', true, 1, 1, 8, Operation.PERCENTAGE, [
                        `4$7`,
                        `4$6`,
                      ]),
                      new Cell('', true, 1, 1, 9, 'ADD', ['5$9', '6$9']),
                      new Cell('', true, 1, 1, 10, Operation.PERCENTAGE, [
                        `4$9`,
                        `4$6`,
                      ]),
                    ],
                    false,
                    4,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 5}$2`,
                            `${rowNo + 5}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 5}$4`,
                            `${rowNo + 5}$1`,
                          ]),
                          new Cell('', true, 1, 1, 6),
                          new Cell('', true, 1, 1, 7),
                          new Cell('', true, 1, 1, 8, Operation.PERCENTAGE, [
                            `${rowNo + 5}$7`,
                            `${rowNo + 5}$6`,
                          ]),
                          new Cell('', true, 1, 1, 9),
                          new Cell('', true, 1, 1, 10, Operation.PERCENTAGE, [
                            `${rowNo + 5}$9`,
                            `${rowNo + 5}$6`,
                          ]),
                        ],
                        false,
                        rowNo + 5,
                      ),
                  ),

                  new Row(
                    [
                      new Cell('Permanent', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['8$1', '9$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['8$2', '9$2']),
                      new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                        `7$2`,
                        `7$1`,
                      ]),
                      new Cell('', true, 1, 1, 4, 'ADD', ['8$4', '9$4']),
                      new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                        `7$4`,
                        `7$1`,
                      ]),
                      new Cell('', true, 1, 1, 6, 'ADD', ['8$6', '9$6']),
                      new Cell('', true, 1, 1, 7, 'ADD', ['8$7', '9$7']),
                      new Cell('', true, 1, 1, 8, Operation.PERCENTAGE, [
                        `7$7`,
                        `7$6`,
                      ]),
                      new Cell('', true, 1, 1, 9, 'ADD', ['8$9', '9$9']),
                      new Cell('', true, 1, 1, 10, Operation.PERCENTAGE, [
                        `7$9`,
                        `7$6`,
                      ]),
                    ],
                    false,
                    7,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 8}$2`,
                            `${rowNo + 8}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 8}$4`,
                            `${rowNo + 8}$1`,
                          ]),
                          new Cell('', true, 1, 1, 6),
                          new Cell('', true, 1, 1, 7),
                          new Cell('', true, 1, 1, 8, Operation.PERCENTAGE, [
                            `${rowNo + 8}$7`,
                            `${rowNo + 8}$6`,
                          ]),
                          new Cell('', true, 1, 1, 9),
                          new Cell('', true, 1, 1, 10, Operation.PERCENTAGE, [
                            `${rowNo + 8}$9`,
                            `${rowNo + 8}$6`,
                          ]),
                        ],
                        false,
                        rowNo + 8,
                      ),
                  ),
                  new Row(
                    [
                      {
                        data: 'Workers',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 11,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    10,
                  ),
                  new Row(
                    [
                      new Cell('Permanent', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['12$1', '13$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['12$2', '13$2']),
                      new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                        `11$2`,
                        `11$1`,
                      ]),
                      new Cell('', true, 1, 1, 4, 'ADD', ['12$4', '13$4']),
                      new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                        `11$4`,
                        `11$1`,
                      ]),
                      new Cell('', true, 1, 1, 6, 'ADD', ['12$6', '13$6']),
                      new Cell('', true, 1, 1, 7, 'ADD', ['12$7', '13$7']),
                      new Cell('', true, 1, 1, 8, Operation.PERCENTAGE, [
                        `11$7`,
                        `11$6`,
                      ]),
                      new Cell('', true, 1, 1, 9, 'ADD', ['12$9', '13$9']),
                      new Cell('', true, 1, 1, 10, Operation.PERCENTAGE, [
                        `11$9`,
                        `11$6`,
                      ]),
                    ],
                    false,
                    11,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 12}$2`,
                            `${rowNo + 12}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 12}$4`,
                            `${rowNo + 12}$1`,
                          ]),
                          new Cell('', true, 1, 1, 6),
                          new Cell('', true, 1, 1, 7),
                          new Cell('', true, 1, 1, 8, Operation.PERCENTAGE, [
                            `${rowNo + 12}$7`,
                            `${rowNo + 12}$6`,
                          ]),
                          new Cell('', true, 1, 1, 9),
                          new Cell('', true, 1, 1, 10, Operation.PERCENTAGE, [
                            `${rowNo + 12}$9`,
                            `${rowNo + 12}$6`,
                          ]),
                        ],
                        false,
                        rowNo + 12,
                      ),
                  ),

                  new Row(
                    [
                      new Cell('Other than Permanent', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['15$1', '16$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['15$2', '16$2']),
                      new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                        `14$2`,
                        `14$1`,
                      ]),
                      new Cell('', true, 1, 1, 4, 'ADD', ['15$4', '16$4']),
                      new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                        `14$4`,
                        `14$1`,
                      ]),
                      new Cell('', true, 1, 1, 6, 'ADD', ['15$6', '16$6']),
                      new Cell('', true, 1, 1, 7, 'ADD', ['15$7', '16$7']),
                      new Cell('', true, 1, 1, 8, Operation.PERCENTAGE, [
                        `14$7`,
                        `14$6`,
                      ]),
                      new Cell('', true, 1, 1, 9, 'ADD', ['15$9', '16$9']),
                      new Cell('', true, 1, 1, 10, Operation.PERCENTAGE, [
                        `14$9`,
                        `14$6`,
                      ]),
                    ],
                    false,
                    14,
                  ),
                  ...['Male', 'Female'].map(
                    (firstCol: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCol, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3, Operation.PERCENTAGE, [
                            `${rowNo + 15}$2`,
                            `${rowNo + 15}$1`,
                          ]),
                          new Cell('', true, 1, 1, 4),
                          new Cell('', true, 1, 1, 5, Operation.PERCENTAGE, [
                            `${rowNo + 15}$4`,
                            `${rowNo + 15}$1`,
                          ]),
                          new Cell('', true, 1, 1, 6),
                          new Cell('', true, 1, 1, 7),
                          new Cell('', true, 1, 1, 8, Operation.PERCENTAGE, [
                            `${rowNo + 15}$7`,
                            `${rowNo + 15}$6`,
                          ]),
                          new Cell('', true, 1, 1, 9),
                          new Cell('', true, 1, 1, 10, Operation.PERCENTAGE, [
                            `${rowNo + 15}$9`,
                            `${rowNo + 15}$6`,
                          ]),
                        ],
                        false,
                        rowNo + 15,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 2,
            desc: '3. a. Median remuneration / wages:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 2, 1, 0),
                      new Cell('Male', false, 1, 2, 1),
                      new Cell('Female', false, 1, 2, 2),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('Number', false, 1, 1, 0),
                      new Cell(
                        'Median remuneration/ salary/ wages of respective category',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('Number', false, 1, 1, 2),
                      new Cell(
                        'Median remuneration/ salary/ wages of respective category',
                        false,
                        1,
                        1,
                        3,
                      ),
                    ],
                    true,
                    1,
                  ),
                  ...[
                    'Board of Directors (BoD)',
                    'Key Managerial Personnel',
                    'Employees other than BoD and KMP',
                    'Workers',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          ...Array.from({ length: 4 }).map(
                            (_, ind: number) =>
                              new Cell('', true, 1, 1, ind + 1),
                          ),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 3,
            desc: '3. b. Gross wages paid to females as % of total wages paid by the entity, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell(
                        'FY _____ Current Financial Year',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY _____ Previous Financial Year',
                        false,
                        1,
                        1,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('Gross wages paid to females', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    1,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total wages paid to all the employees',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    2,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Gross wages paid to females as % of total wages',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, Operation.DIV, [
                        '1$1',
                        '2$1',
                      ]),
                      new Cell('', true, 1, 1, 2, Operation.DIV, [
                        '1$2',
                        '2$2',
                      ]),
                    ],
                    false,
                    3,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 4,
            desc: '4. Do you have a focal point (Individual/ Committee) responsible for addressing human rights impacts or issues caused or contributed to by the business?',
            type: QuestionType.BOOLEAN,
          },
          {
            index: 5,
            desc: '5. Describe the internal mechanisms in place to redress grievances related to human rights issues.',
            type: QuestionType.TEXT,
          },
          {
            index: 6,
            desc: '6. Number of Complaints on the following made by employees and workers:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 2, 1, 0),
                      new Cell(
                        'FY _____ Current Financial Year',
                        false,
                        1,
                        3,
                        1,
                      ),
                      new Cell(
                        'FY _____ Current Financial Year',
                        false,
                        1,
                        3,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      ...[
                        'Filed during the year',
                        'Pending resolution at the end of year',
                        'Remarks',
                      ].map(
                        (value, ind: number) =>
                          new Cell(value, false, 1, 1, ind),
                      ),
                      ...[
                        'Filed during the year',
                        'Pending resolution at the end of year',
                        'Remarks',
                      ].map(
                        (value, ind: number) =>
                          new Cell(value, false, 1, 1, ind + 3),
                      ),
                    ],
                    true,
                    1,
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
                          new Cell(firstCell, false, 1, 1, 0),
                          ...Array.from({ length: 6 }).map(
                            (_, ind: number) =>
                              new Cell('', true, 1, 1, ind + 1),
                          ),
                        ],
                        false,
                        2,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 7,
            desc: '7. Complaints filed under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013, in the following format: ',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell(
                        'FY _____ Current Financial Year',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY _____ Previous Financial Year',
                        false,
                        1,
                        1,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),

                  ...[
                    'Total Complaints reported under Sexual Harassment on of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 (POSH) ',
                    'Female employees / workers',
                  ].map(
                    (firstCell: string, ind: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        ind + 1,
                      ),
                  ),
                  new Row(
                    [
                      new Cell(
                        'Complaints on POSH as a % of female employees / workers',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'PERCENTAGE', ['1$1', '2$1']),
                      new Cell('', true, 1, 1, 2, 'PERCENTAGE', ['1$2', '2$2']),
                    ],
                    false,
                    3,
                  ),
                  new Row(
                    [
                      new Cell('Complaints on POSH upheld', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    4,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 8,
            type: QuestionType.TEXT,
            desc: '8. Mechanisms to prevent adverse consequences to the complainant in discrimination and harassment cases.',
          },
          {
            index: 9,
            type: QuestionType.BOOLEAN,
            desc: '9. Do human rights requirements form part of your business agreements and contracts?',
          },
          {
            index: 10,
            desc: '10. Assessments for the year:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell(
                        '% of your plants and offices that were assessed (by entity or statutory authorities orthird parties)',
                        false,
                        1,
                        1,
                        1,
                      ),
                    ],
                    true,
                    0,
                  ),
                  ...[
                    'Child labour',
                    'Forced/involuntary labour',
                    'Sexual harassment',
                    'Discrimination at workplace',
                    'Wages',
                    'Others – please specify',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 11,
            type: QuestionType.TEXT,
            desc: '11. Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 10 above. ',
          },
          {
            heading: 'Leadership Indicators',
            index: 12,
            desc: '1. Details of a business process being modified / introduced as a result of addressing human rights grievances/complaints.',
            type: QuestionType.TEXT,
          },
          {
            index: 13,
            desc: '2. Details of the scope and coverage of any Human rights due-diligence conducted.',
            type: QuestionType.TEXT,
          },
          {
            index: 14,
            type: QuestionType.TEXT,
            desc: '3. Is the premise/office of the entity accessible to differently abled visitors, as per the requirements of the Rights of Persons with Disabilities Act, 2016?',
          },
          {
            index: 15,
            type: QuestionType.TABLE,
            desc: '4. Details on assessment of value chain partners:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell(
                        '% of value chain partners (by value of business done with such partners) that were assessed',
                        false,
                        1,
                        1,
                        1,
                      ),
                    ],
                    true,
                    0,
                  ),
                  ...[
                    'Sexual Harassment',
                    'Discrimination at workplace',
                    'Child Labour',
                    'Forced Labour/Involuntary Labour',
                    'Wages',
                    'Others – please specify',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 16,
            desc: '5. Provide details of any corrective actions taken or underway to address significant risks / concerns arising from the assessments at Question 4 above. ',
            type: QuestionType.TEXT,
          },
        ],
      },
      {
        title:
          'PRINCIPLE 6: Businesses should respect and make efforts to protect and restore the environment',
        questions: [
          {
            heading: 'Essential Indicators',
            index: 0,
            desc: 'Revenue from operations (in Rs.)',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('FY __', false, 1, 1, 0),
                      new Cell('PY __', false, 1, 1, 0),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [new Cell('', true, 1, 1, 0), new Cell('', true, 1, 1, 1)],
                    false,
                    1,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 1,
            desc: 'Physical Output (KL/MT/Number)',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('FY __', false, 1, 1, 0),
                      new Cell('PY __', false, 1, 1, 0),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [new Cell('', true, 1, 1, 0), new Cell('', true, 1, 1, 1)],
                    false,
                    1,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 2,
            desc: '1. Details of total energy consumption (in Joules or multiples) and energy intensity, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Parameter', false, 1, 1, 0),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY ______(Previous Financial Year)',
                        false,
                        1,
                        1,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      {
                        data: 'From renewable sources',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 3,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    1,
                  ),
                  ...[
                    'Total electricity consumption (A)',
                    'Total fuel consumption (B)',
                    'Energy consumption through other sources (C)',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total energy consumed from renewable sources (A+B+C)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, Operation.ADD, [
                        '2$1',
                        '3$1',
                        '4$1',
                      ]),
                      new Cell('', true, 1, 1, 2, Operation.ADD, [
                        '2$2',
                        '3$2',
                        '4$2',
                      ]),
                    ],
                    false,
                    5,
                  ),
                  new Row(
                    [
                      {
                        data: 'From non-renewable sources',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 3,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    6,
                  ),
                  ...[
                    'Total electricity consumption (D)',
                    'Total fuel consumption (E)',
                    'Energy consumption through other sources (F)',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        rowNo + 7,
                      ),
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total energy consumed from nonrenewable sources (D+E+F)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, Operation.ADD, [
                        '7$1',
                        '8$1',
                        '9$1',
                      ]),
                      new Cell('', true, 1, 1, 2, Operation.ADD, [
                        '7$2',
                        '8$2',
                        '9$2',
                      ]),
                    ],
                    false,
                    10,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total energy consumed (A+B+C+D+E+F)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, Operation.ADD, [
                        '2$1',
                        '3$1',
                        '4$1',
                        '7$1',
                        '8$1',
                        '9$1',
                      ]),
                      new Cell('', true, 1, 1, 2, Operation.ADD, [
                        '2$2',
                        '3$2',
                        '4$2',
                        '7$2',
                        '8$2',
                        '9$2',
                      ]),
                    ],
                    false,
                    11,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Energy intensity per rupee of turnover (Total energy consumed / Revenue from operations)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, Operation.DIV, [
                        '11$1',
                        '0$0$1$0',
                      ]),
                      new Cell('', true, 1, 1, 2, Operation.DIV, [
                        '11$2',
                        '0$0$1$1',
                      ]),
                    ],
                    false,
                    12,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Energy intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total energy consumed / Revenue from operations adjusted for PPP)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, Operation.MUL, [
                        '12$1',
                        '22.4',
                      ]),
                      new Cell('', true, 1, 1, 2, Operation.MUL, [
                        '12$2',
                        '22.4',
                      ]),
                    ],
                    false,
                    13,
                  ),
                  ...[
                    'Energy intensity in terms of physical output',
                    'Energy intensity (optional) – the relevant metric may be selected by the entity',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        rowNo + 14,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 3,
            desc: '2. a. Does the entity have any sites / facilities identified as designated consumers (DCs) under the Performance, Achieve and Trade (PAT) Scheme of the Government of India?',
            type: QuestionType.BOOLEAN,
          },
          {
            index: 4,
            desc: '2. b. If the above is yes, disclose whether targets set under the PAT scheme have been achieved. In case targets have not been achieved, provide the remedial action taken, if any.',
            type: QuestionType.TEXT,
          },
          {
            index: 5,
            desc: '3. Provide details of the following disclosures related to water, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Parameter', false, 1, 1, 0),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY ______(Previous Financial Year)',
                        false,
                        1,
                        1,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Water withdrawal by source (in kilolitres)',
                        false,
                        1,
                        3,
                        0,
                      ),
                    ],
                    true,
                    1,
                  ),
                  ...[
                    '(i) Surface water',
                    '(ii) Groundwater',
                    '(iii) Third party water',
                    '(iv) Seawater / desalinated water',
                    '(v) Others',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total volume of water withdrawal (in kilolitres) (i + ii + iii + iv + v)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, Operation.ADD, [
                        '2$1',
                        '3$1',
                        '4$1',
                        '5$1',
                        '6$1',
                      ]),
                      new Cell('', true, 1, 1, 2, Operation.ADD, [
                        '2$2',
                        '3$2',
                        '4$2',
                        '5$2',
                        '6$2',
                      ]),
                    ],
                    false,
                    7,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total volume of water consumption (in kilolitres)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'SUB', ['7$1', '6$0$17$1']),
                      new Cell('', true, 1, 1, 2, 'SUB', ['7$2', '6$0$17$2']),
                    ],
                    false,
                    8,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Water intensity per rupee of turnover (Total water consumption / Revenue from operations)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'DIV', ['8$1', '0$0$1$0']),
                      new Cell('', true, 1, 1, 2, 'DIV', ['8$2', '0$0$1$1']),
                    ],
                    false,
                    9,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Water intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total water consumption / Revenue from operations adjusted for PPP)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'MUL', ['9$1', '22.4']),
                      new Cell('', true, 1, 1, 2, 'MUL', ['9$2', '22.4']),
                    ],
                    false,
                    10,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Water intensity in terms of physical output',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'DIV', ['10$1', '1$0$1$0']),
                      new Cell('', true, 1, 1, 2, 'DIV', ['10$2', '1$0$1$1']),
                    ],
                    false,
                    11,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Water intensity (optional) – the relevant metric may be selected by the entity',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    12,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 6,
            desc: '4. Provide the following details related to water discharged:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Parameter', false, 1, 1, 0),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell(
                        'FY ______(Previous Financial Year)',
                        false,
                        1,
                        1,
                        2,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Water discharge by destination and level of treatment (in kilolitres)',
                        false,
                        1,
                        3,
                        0,
                      ),
                    ],
                    true,
                    1,
                  ),
                  new Row(
                    [
                      new Cell('(i) Surface water', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['4$1', '3$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['4$2', '3$2']),
                    ],
                    false,
                    2,
                  ),
                  ...[
                    ' No treatment',
                    'With treatment – please specify level of treatment',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        3 + rowNo,
                      ),
                  ),

                  new Row(
                    [
                      new Cell('(ii) To Groundwater', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['6$1', '7$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['6$2', '7$2']),
                    ],
                    false,
                    5,
                  ),
                  ...[
                    'No treatment',
                    'With treatment – please specify level of treatment',
                    // '(iii) To Seawater',
                    // 'No treatment',
                    // 'With treatment – please specify level of treatment',
                    // '(iv) Sent to third-parties ',
                    // 'No treatment',
                    // 'With treatment – please specify level of treatment',
                    // '(v) Others',
                    // 'No treatment',
                    // 'With treatment – please specify level of treatment',
                    // 'Total water discharged (in kilolitres) ',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        6 + rowNo,
                      ),
                  ),

                  new Row(
                    [
                      new Cell('(iii) To Seawater', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['9$1', '10$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['9$2', '10$2']),
                    ],
                    false,
                    8,
                  ),
                  ...[
                    'No treatment',
                    'With treatment – please specify level of treatment',
                    // '(iv) Sent to third-parties ',
                    // 'No treatment',
                    // 'With treatment – please specify level of treatment',
                    // '(v) Others',
                    // 'No treatment',
                    // 'With treatment – please specify level of treatment',
                    // 'Total water discharged (in kilolitres) ',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        9 + rowNo,
                      ),
                  ),

                  new Row(
                    [
                      new Cell('(iv) Sent to third-parties', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['12$1', '13$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['12$2', '13$2']),
                    ],
                    false,
                    11,
                  ),
                  ...[
                    'No treatment',
                    'With treatment – please specify level of treatment',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        12 + rowNo,
                      ),
                  ),

                  new Row(
                    [
                      new Cell('(v) Others', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', ['15$1', '16$1']),
                      new Cell('', true, 1, 1, 2, 'ADD', ['15$2', '16$2']),
                    ],
                    false,
                    14,
                  ),
                  ...[
                    'No treatment',
                    'With treatment – please specify level of treatment',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        15 + rowNo,
                      ),
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total water discharged (in kilolitres',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'ADD', [
                        '14$1',
                        '11$1',
                        '8$1',
                        '5$1',
                        '2$1',
                      ]),
                      new Cell('', true, 1, 1, 2, 'ADD', [
                        '14$2',
                        '11$2',
                        '8$2',
                        '5$2',
                        '2$2',
                      ]),
                    ],
                    false,
                    17,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 7,
            desc: '5. Has the entity implemented a mechanism for Zero Liquid Discharge? If yes, provide details of its coverage and implementation.',
            type: QuestionType.TEXT,
          },
          {
            index: 8,
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
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
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
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                          new Cell('', true, 1, 1, 3),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 9,
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
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  new Row(
                    [
                      'Total Scope 1 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)',
                      'Metric tonnes of CO2 equivalent',
                      '',
                      '',
                    ].map(
                      (value, ind: number) =>
                        new Cell(value, value === '', 1, 1, ind),
                    ),
                    false,
                    1,
                  ),
                  new Row(
                    [
                      'Total Scope 2 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)',
                      'Metric tonnes of CO2 equivalent',
                      '',
                      '',
                    ].map(
                      (value, ind: number) =>
                        new Cell(value, value === '', 1, 1, ind),
                    ),
                    false,
                    2,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total Scope 1 and Scope 2 emission intensity per rupee of turnover (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2, 'SUMDIVIDE', [
                        '1$2',
                        '2$2',
                        '0$0$1$0',
                      ]),
                      new Cell('', true, 1, 1, 3, 'SUMDIVIDE', [
                        '1$3',
                        '2$3',
                        '0$0$1$1',
                      ]),
                    ],
                    false,
                    3,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total Scope 1 and Scope 2 emission intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total Scope 1 and Scope 2 GHG emissions / Revenue from operations)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2, 'MUL', ['3$2', '22.4']),
                      new Cell('', true, 1, 1, 3, 'MUL', ['3$3', '22.4']),
                    ],
                    false,
                    4,
                  ),
                  new Row(
                    [
                      'Total Scope 1 and Scope 2 emission intensity in terms of physical output',
                      '',
                      '',
                      '',
                    ].map(
                      (value, ind: number) =>
                        new Cell(value, value === '', 1, 1, ind),
                    ),
                    false,
                    5,
                  ),
                  new Row(
                    [
                      'Total Scope 1 and Scope 2 emission intensity (optional) – the relevant metric may be selected by the entity',
                      '',
                      '',
                      '',
                    ].map(
                      (value, ind: number) =>
                        new Cell(value, !value, 1, 1, ind),
                    ),
                    false,
                    6,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 10,
            type: QuestionType.TEXT,
            desc: '8. Does the entity have any project related to reducing Green House Gas emission? If Yes, then provide details. ',
          },
          {
            index: 11,
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
                    ].map((value) => new Cell(value, false, 1, 1, 0)),
                    true,
                    0,
                  ),
                  new Row(
                    [
                      {
                        data: 'Total Waste generated (in metric tonnes)',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 3,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    1,
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
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),

                  new Row(
                    [
                      new Cell(
                        'Total (A+B + C + D + E + F + G + H)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, Operation.ADD, [
                        '2$1',
                        '3$1',
                        '4$1',
                        '5$1',
                        '6$1',
                        '7$1',
                        '8$1',
                        '9$1',
                      ]),
                      new Cell('', true, 1, 1, 2, Operation.ADD, [
                        '2$2',
                        '3$2',
                        '4$2',
                        '5$2',
                        '6$2',
                        '7$2',
                        '8$2',
                        '9$2',
                      ]),
                    ],
                    false,
                    10,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Waste intensity per rupee of turnover (Total waste generated / Revenue from operations)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'DIV', ['10$1', '0$0$1$0']),
                      new Cell('', true, 1, 1, 2, 'DIV', ['10$2', '0$0$1$1']),
                    ],
                    false,
                    11,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Waste intensity per rupee of turnover adjusted for Purchasing Power Parity (PPP) (Total waste generated / Revenue from operations adjusted for PPP)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'MUL', ['11$1', '22.4']),
                      new Cell('', true, 1, 1, 2, 'MUL', ['11$2', '22.4 ']),
                    ],
                    false,
                    12,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Waste intensity in terms of physical output',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'DIV', ['10$1', '1$0$1$0']),
                      new Cell('', true, 1, 1, 2, 'DIV', ['10$2', '1$0$1$1']),
                    ],
                    false,
                    13,
                  ),
                  ...[
                    'Waste intensity (optional) – the relevant metric may be selected by the entity',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        rowNo + 13,
                      ),
                  ),

                  new Row(
                    [
                      {
                        data: 'For each category of waste generated, total waste recovered through recycling, re-using or other recovery operations (in metric tonnes)',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 3,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    15,
                  ),
                  new Row(
                    [
                      {
                        data: 'Category of waste',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 3,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    16,
                  ),
                  ...[
                    '(i) Recycled',
                    '(ii) Re-used',
                    '(iii) Other recovery operations',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        rowNo + 17,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', [
                        '17$1',
                        '18$1',
                        '19$1',
                      ]),
                      new Cell('', true, 1, 1, 2, 'ADD', [
                        '17$2',
                        '18$2',
                        '19$2',
                      ]),
                    ],
                    false,
                    20,
                  ),

                  new Row(
                    [
                      {
                        data: 'For each category of waste generated, total waste disposed by nature of disposal method (in metric tonnes)',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 3,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    21,
                  ),
                  ...[
                    'Category of waste',
                    '(i) Incineration',
                    '(ii) Landfilling',
                    '(iii) Other disposal operations',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        22 + rowNo,
                      ),
                  ),
                  new Row(
                    [
                      new Cell('Total', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1, 'ADD', [
                        '25$1',
                        '24$1',
                        '23$1',
                      ]),
                      new Cell('', true, 1, 1, 2, 'ADD', [
                        '25$2',
                        '24$2',
                        '23$2',
                      ]),
                    ],
                    false,
                    26,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 12,
            type: QuestionType.TEXT,
            desc: '10. Briefly describe the waste management practices adopted in your establishments. Describe the strategy adopted by your company to reduce usage of hazardous and toxic chemicals in your products and processes and the practices adopted to manage such wastes.',
          },
          {
            index: 13,
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
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  new Row(
                    Array.from({ length: 3 }).map(
                      (value, ind: number) => new Cell('', true, 1, 1, ind),
                    ),
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 14,
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
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  new Row(
                    Array.from({ length: 6 }).map(
                      (_, ind: number) => new Cell('', true, 1, 1, ind),
                    ),
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 15,
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
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  new Row(
                    Array.from({ length: 6 }).map(
                      (_, ind: number) => new Cell('', true, 1, 1, ind),
                    ),
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            heading: 'Leadership Indicators',
            index: 16,
            desc: '1. Water withdrawal, consumption and discharge in areas of water stress (in kilolitres): \n For each facility / plant located in areas of water stress, provide the following information: \n(i) Name of the area \n(ii) Nature of operations \n(iii) Water withdrawal, consumption and discharge in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Parameter',
                      'FY _____ (Current Financial Year)',
                      'FY ______ (Previous Financial Year)',
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  new Row(
                    [
                      {
                        data: 'Water withdrawal by source (in kilolitres)',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 3,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    1,
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
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                  new Row(
                    [
                      {
                        data: 'Water discharge by destination and level of treatment (in kilolitres)',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 3,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    11,
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
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        rowNo + 11,
                      ),
                  ),

                  new Row(
                    [
                      {
                        data: 'For each category of waste generated, total waste disposed by nature of disposal method (in metric tonnes)',
                        isUpdateable: false,
                        rowSpan: 1,
                        colSpan: 3,
                        index: 0,
                        isHeading: true,
                      },
                    ],
                    false,
                    28,
                  ),
                  ...[
                    'Category of waste',
                    '(i) Incineration',
                    '(ii) Landfilling',
                    '(iii) Other disposal operations',
                    'Total',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        rowNo + 29,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 17,
            desc: '2. Please provide details of total Scope 3 emissions & its intensity, in the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Parameter', false, 1, 1, 0),
                      new Cell('Unit', false, 1, 1, 1),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        1,
                        2,
                      ),
                      new Cell(
                        'FY ______ (Previous Financial Year)',
                        false,
                        1,
                        1,
                        3,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total Scope 3 emissions (Break-up of the GHG into CO2, CH4, N2O, HFCs, PFCs, SF6, NF3, if available)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell(
                        'Metric tonnes of CO2 equivalent',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    1,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total Scope 3 emissions per rupee of turnover',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2, 'DIV', ['1$2', '0$0$1$0']),
                      new Cell('', true, 1, 1, 3, 'DIV', ['1$3', '0$0$1$1']),
                    ],
                    false,
                    2,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Total Scope 3 emission intensity (optional) – the relevant metric may be selected by the entity',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                    ],
                    false,
                    3,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 18,
            desc: '3. With respect to the ecologically sensitive areas reported at Question 11 of Essential Indicators above, provide details of significant direct & indirect impact of the entity on biodiversity in such areas along-with prevention and remediation activities. ',
            type: QuestionType.TEXT,
          },
          {
            index: 19,
            desc: '4. If the entity has undertaken any specific initiatives or used innovative technology or solutions to improve resource efficiency, or reduce impact due to emissions / effluent discharge / waste generated, please provide details of the same as well as outcome of such initiatives, as per the following format:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Initiative undertaken',
                      'Details of the initiative (Web-link, if any, may be provided along-with summary)',
                      'Outcome of the initiative ',
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  new Row(
                    Array.from({ length: 3 }).map(
                      (_, ind: number) => new Cell('', true, 1, 1, ind),
                    ),
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 20,
            desc: '5. Does the entity have a business continuity and disaster management plan? Give details in 100 words/ web link.',
            type: QuestionType.TEXT,
          },
          {
            index: 21,
            desc: '6. Disclose any significant adverse impact to the environment, arising from the value chain of the entity. What mitigation or adaptation measures have been taken by the entity in this regard.',
            type: QuestionType.TEXT,
          },
          {
            index: 22,
            desc: '7. Percentage of value chain partners (by value of business done with such partners) that were assessed for environmental impacts.',
            type: QuestionType.TEXT,
          },
        ],
      },
      {
        title:
          'PRINCIPLE 7 Businesses, when engaging in influencing public and regulatory policy, should do so in a manner that is responsible and transparent',
        questions: [
          {
            heading: 'Essential Indicators',
            desc: '1. a. Number of affiliations with trade and industry chambers/ associations',
            type: QuestionType.TEXT,
            index: 0,
          },
          {
            index: 1,
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
                        0,
                      ),
                      new Cell(
                        'Name of the trade and industry chambers/ associations',
                        false,
                        1,
                        1,
                        1,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [new Cell('', true, 1, 1, 0), new Cell('', true, 1, 1, 1)],
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 2,
            type: QuestionType.TABLE,
            desc: '2. Provide details of corrective action taken or underway on any issues related to anticompetitive conduct by the entity, based on adverse orders from regulatory authorities. ',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Name of authority B', false, 1, 1, 0),
                      new Cell('Brief of the case', false, 1, 1, 1),
                      new Cell('Corrective action taken', false, 1, 1, 2),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell('', false, 1, 1, 1),
                      new Cell('', false, 1, 1, 2),
                    ],
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            heading: 'Leadership Indicators',
            index: 3,
            type: QuestionType.TABLE,
            desc: '1. Details of public policy positions advocated by the entity:',
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('Public policy advocated', false, 1, 1, 0),
                      new Cell(
                        'Method resorted for such advocacy',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell(
                        'Whether information available in public domain? (Yes/No)',
                        false,
                        1,
                        1,
                        2,
                      ),
                      new Cell(
                        'Frequency of Review by Board (Annually/ Half yearly/ Quarterly / Others – please specify)',
                        false,
                        1,
                        1,
                        3,
                      ),
                      new Cell('Web Link, if available', false, 1, 1, 4),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('', true, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                      new Cell('', true, 1, 1, 3),
                      new Cell('', true, 1, 1, 4),
                    ],
                    false,
                    1,
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
          'PRINCIPLE 8 Businesses should promote inclusive growth and equitable development',
        questions: [
          {
            heading: 'Essential Indicators',
            index: 0,
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
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  new Row(
                    Array.from({ length: 6 }).map(
                      (_, ind: number) => new Cell('', true, 1, 1, ind),
                    ),
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 1,
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
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  new Row(
                    Array.from({ length: 6 }).map(
                      (_, ind: number) => new Cell('', true, 1, 1, ind),
                    ),
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 2,
            type: QuestionType.TEXT,
            desc: '3. Describe the mechanisms to receive and redress grievances of the community.',
          },
          {
            index: 3,
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
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  ...[
                    'Directly sourced from MSMEs/ small producers ',
                    'Directly from within India',
                  ].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          new Cell('', true, 1, 1, 1),
                          new Cell('', true, 1, 1, 2),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 4,
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
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  new Row([new Cell('Rural', false, 1, 3, 0)], false, 1),
                  new Row(
                    [
                      new Cell(
                        'Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    2,
                  ),
                  new Row(
                    [
                      new Cell('Total Wage Cost', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    3,
                  ),
                  new Row(
                    [
                      new Cell(
                        '% of Job creation in Rural areas',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'PERCENTAGE', ['2$1', '3$1']),
                      new Cell('', true, 1, 1, 2, 'PERCENTAGE', ['2$2', '3$2']),
                    ],
                    false,
                    4,
                  ),

                  new Row([new Cell('Semi-Urban', false, 1, 3, 0)], false, 5),
                  new Row(
                    [
                      new Cell(
                        'Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    6,
                  ),
                  new Row(
                    [
                      new Cell('Total Wage Cost', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    7,
                  ),
                  new Row(
                    [
                      new Cell(
                        '% of Job creation in Rural areas',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'PERCENTAGE', ['6$1', '7$1']),
                      new Cell('', true, 1, 1, 2, 'PERCENTAGE', ['6$2', '7$2']),
                    ],
                    false,
                    8,
                  ),

                  new Row([new Cell('Urban', false, 1, 3, 0)], false, 9),
                  new Row(
                    [
                      new Cell(
                        'Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    10,
                  ),
                  new Row(
                    [
                      new Cell('Total Wage Cost', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    11,
                  ),
                  new Row(
                    [
                      new Cell(
                        '% of Job creation in Rural areas',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'PERCENTAGE', [
                        '10$1',
                        '11$1',
                      ]),
                      new Cell('', true, 1, 1, 2, 'PERCENTAGE', [
                        '10$2',
                        '11$2',
                      ]),
                    ],
                    false,
                    12,
                  ),

                  new Row(
                    [new Cell('Metropolitan', false, 1, 3, 0)],
                    false,
                    13,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Disclose wages paid to persons employed (including employees or workers employed on a permanent or non-permanent / on contract basis)',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    14,
                  ),
                  new Row(
                    [
                      new Cell('Total Wage Cost', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    15,
                  ),
                  new Row(
                    [
                      new Cell(
                        '% of Job creation in Rural areas',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1, 'PERCENTAGE', [
                        '14$1',
                        '15$1',
                      ]),
                      new Cell('', true, 1, 1, 2, 'PERCENTAGE', [
                        '14$2',
                        '15$2',
                      ]),
                    ],
                    false,
                    16,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            heading: 'Leadership Indicators',
            index: 5,
            desc: '1. Provide details of actions taken to mitigate any negative social impacts identified in the Social Impact Assessments (Reference: Question 1 of Essential Indicators above):',
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
                        0,
                      ),
                      new Cell('Corrective action taken', false, 1, 1, 1),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [new Cell('', true, 1, 1, 0), new Cell('', true, 1, 1, 1)],
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 6,
            desc: '2. Provide the following information on CSR projects undertaken by your entity in designated aspirational districts as identified by government bodies:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('State', false, 1, 1, 0),
                      new Cell('Aspirational District', false, 1, 1, 1),
                      new Cell('Amount spent (In INR)', false, 1, 1, 2),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('', true, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                      new Cell('', true, 1, 1, 2),
                    ],
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 7,
            desc: '3. (a) Do you have a preferential procurement policy where you give preference to purchase from suppliers comprising marginalized /vulnerable groups?',
            type: QuestionType.TEXT,
          },
          {
            index: 8,
            desc: '3. (b) From which marginalized /vulnerable groups do you procure?',
            type: QuestionType.TEXT,
          },
          {
            index: 9,
            desc: '3. (c) What percentage of total procurement (by value) does it constitute? ',
            type: QuestionType.TEXT,
          },
          {
            index: 10,
            desc: '4. Details of the benefits derived and shared from the intellectual properties owned or acquired by your entity (in the current financial year), based on traditional knowledge:',
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
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  new Row(
                    Array.from({ length: 4 }).map(
                      (_, ind: number) => new Cell('', true, 1, 1, ind),
                    ),
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 11,
            desc: '5. Details of corrective actions taken or underway, based on any adverse order in intellectual property related disputes wherein usage of traditional knowledge is involved.',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'Name of authority',
                      'Brief of the Case',
                      'Corrective action taken',
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  new Row(
                    Array.from({ length: 3 }).map(
                      (_, ind: number) => new Cell('', true, 1, 1, ind),
                    ),
                    false,
                    1,
                  ),
                ],
                true,
              ),
            ],
          },
          {
            index: 12,
            desc: '6. Details of beneficiaries of CSR Projects: ',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      'CSR Project',
                      'No. of persons benefitted from CSR Projects ',
                      '% of beneficiaries from vulnerable and marginalized groups',
                    ].map(
                      (value, ind: number) => new Cell(value, false, 1, 1, ind),
                    ),
                    true,
                    0,
                  ),
                  new Row(
                    Array.from({ length: 3 }).map(
                      (_, ind: number) => new Cell('', true, 1, 1, ind),
                    ),
                    false,
                    1,
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
            heading: 'Essential Indicators',
            index: 0,
            desc: '1. Describe the mechanisms in place to receive and respond to consumer complaints and feedback. ',
            type: QuestionType.TEXT,
          },
          {
            index: 1,
            desc: '2. Turnover of products and/ services as a percentage of turnover from all products/service that carry information about:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell(
                        'As a percentage to total turnover',
                        false,
                        1,
                        1,
                        1,
                      ),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Environmental and social parameters relevant to the product',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                    ],
                    false,
                    1,
                  ),
                  new Row(
                    [
                      new Cell('Safe and responsible usage', false, 1, 1, 0),
                      new Cell('', true, 1, 1, 1),
                    ],
                    false,
                    2,
                  ),
                  new Row(
                    [
                      new Cell(
                        'Recycling and/or safe disposal',
                        false,
                        1,
                        1,
                        0,
                      ),
                      new Cell('', true, 1, 1, 1),
                    ],
                    false,
                    3,
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 2,
            desc: '3. Number of consumer complaints in respect of the following:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 2, 1, 0),
                      new Cell(
                        'FY _____ (Current Financial Year)',
                        false,
                        1,
                        2,
                        1,
                      ),
                      new Cell('Remarks', false, 2, 1, 2),
                      new Cell(
                        'FY _____ (Previous Financial Year)',
                        false,
                        1,
                        2,
                        3,
                      ),
                      new Cell('Remarks', false, 2, 1, 4),
                    ],
                    true,
                    0,
                  ),
                  new Row(
                    [
                      new Cell('Received during the year', false, 1, 1, 0),
                      new Cell(
                        'Pending resolution at end of year',
                        false,
                        1,
                        1,
                        1,
                      ),
                      new Cell('Received during the year', false, 1, 1, 2),
                      new Cell(
                        'Pending resolution at end of year',
                        false,
                        1,
                        1,
                        3,
                      ),
                    ],
                    true,
                    1,
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
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          ...Array.from({ length: 6 }).map(
                            (_, ind: number) => new Cell('', true, 1, 1, ind),
                          ),
                        ],
                        false,
                        rowNo + 2,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 3,
            desc: '4. Details of instances of product recalls on account of safety issues:',
            type: QuestionType.TABLE,
            answer_table: [
              new Table(
                [
                  new Row(
                    [
                      new Cell('', false, 1, 1, 0),
                      new Cell('Number', false, 1, 1, 1),
                      new Cell('Reasons for recall', false, 1, 1, 2),
                    ],
                    true,
                    0,
                  ),

                  ...['Voluntary recalls', 'Forced recalls'].map(
                    (firstCell: string, rowNo: number) =>
                      new Row(
                        [
                          new Cell(firstCell, false, 1, 1, 0),
                          ...Array.from({ length: 2 }).map(
                            (_, ind: number) => new Cell('', true, 1, 1, ind),
                          ),
                        ],
                        false,
                        rowNo + 1,
                      ),
                  ),
                ],
                false,
              ),
            ],
          },
          {
            index: 4,
            type: QuestionType.TEXT,
            desc: '5. Does the entity have a framework/ policy on cyber security and risks related to data privacy?',
          },
          {
            index: 5,
            type: QuestionType.TEXT,
            desc: '6. Provide details of any corrective actions taken or underway on issues relating to advertising, and delivery of essential services; cyber security and data privacy of customers; re-occurrence of instances of product recalls; penalty / action taken by regulatory authorities on safety of products / services.',
          },
          {
            index: 6,
            type: QuestionType.TEXT,
            desc: '7. a. Provide the number of instances of data breaches.',
          },
          {
            index: 7,
            type: QuestionType.TEXT,
            desc: '7. b. Provide the percentage of data breaches involving personally identifiable information of customers ',
          },
          {
            index: 8,
            type: QuestionType.TEXT,
            desc: '7. c. Provide the impact, if any, of the data breaches',
          },
          {
            heading: 'Leadership Indicators',
            index: 9,
            type: QuestionType.TEXT,
            desc: '1. Channels / platforms where information on products and services of the entity can be accessed (provide web link, if available). ',
          },
          {
            index: 10,
            type: QuestionType.TEXT,
            desc: '2. Steps taken to inform and educate consumers about safe and responsible usage of products and/or services. ',
          },
          {
            index: 11,
            type: QuestionType.TEXT,
            desc: '3. Mechanisms in place to inform consumers of any risk of disruption/discontinuation of essential services.',
          },
          {
            index: 12,
            desc: '4. a. Does the entity display product information on the product over and above what is mandated as per local laws? If yes, provide details in brief.',
            type: QuestionType.BOOLEAN,
          },
          {
            index: 13,
            desc: '4. b. Did your entity carry out any survey with regard to consumer satisfaction relating to the major products / services of the entity, significant locations of operation of the entity or the entity as a whole? (Yes/No)',
            type: 'BOOLEAN',
          },
        ],
      },
    ],
  },
];
