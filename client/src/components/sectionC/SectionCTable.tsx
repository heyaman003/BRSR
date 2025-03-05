import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const SectionCTable = ({
  heading,
  rows,
  columns,
  subColumns,
}: {
  heading: string;
  rows: string[];
  columns: string[];
  subColumns: string[] | null | undefined;
}) => {
  const [tableData, setTableData] = useState<string[][]>(
    rows.map((row: string) => [
      row,
      ...Array.from({
        length: (columns.length - 1) * (subColumns?.length || 1),
      }).map(() => ""),
    ])
  );

  const updateData = (rowNo: number, colNo: number, value: string) => {
    setTableData((prevData: string[][]) =>
      prevData.map((row: string[], ind: number) =>
        ind === rowNo
          ? row.map((col: string, ind: number) => (ind === colNo ? value : col))
          : row
      )
    );
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {heading ? (
            <TableHead
              colSpan={columns.length}
              className="text-center text-green-600 font-bold"
            >
              {heading}
            </TableHead>
          ) : (
            <div className="h-6"></div>
          )}
        </TableRow>
        <TableRow>
          {columns.map((col: string, ind: number) => (
            <TableHead
              className="text-center"
              colSpan={(ind && subColumns?.length) || 1}
              key={col}
            >
              {col}
            </TableHead>
          ))}
        </TableRow>
        {subColumns && (
          <TableRow>
            {columns.map((col, ind: number) =>
              ind ? (
                subColumns.map((col: string) => (
                  <TableHead className="text-center" key={col}>
                    {col}
                  </TableHead>
                ))
              ) : (
                <TableHead></TableHead>
              )
            )}
          </TableRow>
        )}
      </TableHeader>
      <TableBody>
        {tableData.map((row: string[], rowNo: number) => (
          <TableRow key={rowNo}>
            {row.map((data: string, colNo: number) =>
              data ? (
                <TableCell key={colNo}>{data}</TableCell>
              ) : (
                <TableCell key={colNo}>
                  <input
                    onChange={(e) => updateData(rowNo, colNo, e.target.value)}
                    value={data}
                    className="border border-green-300 bg-green-50 text-green-900 px-2 py-1 w-full 
                              focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-green-100 
                              rounded-md transition-all"
                  />
                </TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SectionCTable;
