import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export default function TableHelper3({ section }: { section: any }) {
  return (
    <div>
      {section?.questions.map((questionTable: any) => {
        return (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead rowSpan={2}>Particulars</TableHead>
                  <TableHead rowSpan={2}>Total (A)</TableHead>
                  <TableHead colSpan={2}>Male</TableHead>
                  <TableHead colSpan={2}>Female</TableHead>
                </TableRow>
                <TableRow>
                  <TableHead>No. (B)</TableHead>
                  <TableHead>% (B / A)</TableHead>
                  <TableHead>No. (C)</TableHead>
                  <TableHead>% (C / A)</TableHead>
                </TableRow>
              </TableHeader>
              <SubTable
                head="EMPLOYEE"
                columns={questionTable.employee.colFirstData}
              />
              <SubTable
                head="WORKER"
                columns={questionTable.worker.colFirstData}
              />
            </Table>
          </>
        );
      })}
    </div>
  );
}

const SubTable = ({ head, columns }: { head: string; columns: any }) => {
  const [tableData, setTableData] = useState<string[][]>(
    columns.map((column: string) => [column, ...Array.from({ length: 5 })])
  );

  const updateTableData = (row: number, col: number, value: string) => {
    setTableData((prevData: string[][]) =>
      prevData.map((prevRow: string[], ind: number) =>
        ind === row
          ? prevRow.map((cell: string, ind: number) =>
              ind === col ? value : cell
            )
          : prevRow
      )
    );
  };

  useEffect(()=>{console.log(tableData)}, [tableData])

  // const
  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead align={"center"} className="text-center" colSpan={6}>
            {head}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {tableData.map((cols: string[], rowNo: number) => (
          <TableRow key={rowNo}>
            {cols.map((cell: string, cellNo: number) => (
              <TableCell key={cellNo}>
                {cellNo === 0 ? (
                  cell
                ) : (
                  <input
                  onChange={(e)=>{
                    updateTableData(rowNo, cellNo, e.target.value)
                  }}
                    value={cell}
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
    </>
  );
};
