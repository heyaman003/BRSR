
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Cell, Row, Table as TableType } from "@/types";

const SectionCTable2 = ({ table }: { table: TableType }) => {


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
                    <input
                      className="border border-green-300 bg-green-50 text-green-900 px-2 py-1 w-full 
                              focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-green-100 
                              rounded-md transition-all"
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default SectionCTable2;