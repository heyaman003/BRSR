import { Operation } from "./models/models";

export class Cell {
    id: string;
    data: string;
    isUpdateable: boolean;
    rowSpan: number;
    colSpan: number;
    index: number;
    operation?: Operation;
    operands?:string[];
    isHeading?: boolean
  
    constructor(
      id: string,
      data: string,
      isUpdateable: boolean,
      rowSpan: number,
      colSpan: number,
      index: number,
    ) {
      (this.id = id), (this.data = data);
      this.isUpdateable = isUpdateable;
      this.rowSpan = rowSpan;
      this.colSpan = colSpan;
      this.index = index;
    }
  }
  
  export class Row {
    cells: Cell[];
    id: string;
    isHeading: boolean;
    index: number
    constructor(id: string, cells: Cell[], isHeading: boolean, index: number) {
      this.isHeading = isHeading;
      this.id = id;
      this.cells = cells;
      this.index = index
    }
  }
  
  export class Table {
    isDynamic: boolean;
    id: string;
    rows: Row[];
    constructor(id: string, rows: Row[], isDynamic: boolean) {
      this.id = id;
      this.rows = rows;
      this.isDynamic = isDynamic
    }
  }