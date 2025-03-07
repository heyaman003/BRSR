import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Cell, Row, Table as TableType } from "@/types";
import CellInput from "./CellInput";
import { useState } from "react";
import * as BSON from "bson";
const generateId = () => new BSON.ObjectId().toString();

const TableUI = ({ table }: { table: TableType }) => {
  const [tableState, setTableState] = useState<TableType>(table);

  const addRow = () => {
    const cellCount = tableState.rows[0].cells.length;
    setTableState((table: TableType) => {
      table.rows = [
        ...table.rows,
        new Row(
          generateId(),
          Array.from({ length: cellCount }).map(
            (_) => new Cell(generateId(), "", true, 1, 1)
          ),
          false
        ),
      ];
      return { ...table };
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          {tableState.rows
            .filter((row: Row) => row.isHeading)
            .map((row: Row) => (
              <TableRow key={row.id}>
                {row.cells.map((cell: Cell) => (
                  <TableHead
                    key={cell.id}
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                    className="text-center"
                  >
                    {cell.data}
                  </TableHead>
                ))}
              </TableRow>
            ))}
        </TableHeader>
        <TableBody>
          {tableState.rows
            .filter((row: Row) => !row.isHeading)
            .map((row: Row) => (
              <TableRow key={row.id}>
                {row.cells.map((cell: Cell) => (
                  <TableCell
                    key={cell.id}
                    colSpan={cell.colSpan}
                    rowSpan={cell.rowSpan}
                  >
                    {!cell.isUpdateable ? cell.data : <CellInput />}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {table.isDynamic && <div className="flex justify-end">
        <button className=" px-8 py-2 text-white bg-green-500 font-bold rounded-sm mr-5 mt-2" onClick={addRow}>Add Row</button>
      </div>}
    </>
  );
};

export default TableUI;
