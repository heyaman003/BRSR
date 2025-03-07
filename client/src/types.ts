
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