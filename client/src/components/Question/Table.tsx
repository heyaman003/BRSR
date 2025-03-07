
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

const TableUI = ({ table }: { table: TableType }) => {


  return (
    <Table>
      <TableHeader>
        {table.rows
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
        {table.rows
          .filter((row: Row) => !row.isHeading)
          .map((row: Row) => (
            <TableRow key={row.id}>
              {row.cells.map((cell: Cell) => (
                <TableCell
                  key={cell.id}
                  colSpan={cell.colSpan}
                  rowSpan={cell.rowSpan}
                >
                  {!cell.isUpdateable ? (
                    cell.data
                  ) : (
                    <CellInput/>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default TableUI;