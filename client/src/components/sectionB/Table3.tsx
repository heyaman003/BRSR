import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const Table3 = ({
  heading,
  questions,
}: {
  heading: string;
  questions: string[];
}) => {
  const [tableData, setTableData] = useState<string[][]>(
    questions.map((question: string, ind: number) => ind<2?[
      question,
      ...Array.from({ length: 18 }).map(() => ""),
    ]:[question, ...Array.from({ length: 9 }).map(() => "")])
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
    <>
      <h5 className="mb-6">{heading}</h5>
      <Table className="mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Subject for Review </TableHead>
            <TableHead colSpan={9}>
              Indicate whether review was undertaken by Director / Committee of
              the Board/ Any other Committee
            </TableHead>
            <TableHead colSpan={9}>
              Frequency (Annually/ Half yearly/ Quarterly/ Any other – please
              specify){" "}
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead></TableHead>
            {Array.from({ length: 9 }).map((_: any, ind: number) => (
              <TableHead key={ind}>p{ind+1}</TableHead>
            ))}
            {Array.from({ length: 9 }).map((_: any, ind: number) => (
              <TableHead key={ind}>p{ind+1}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((cells: string[], rowNo: number) => (
            <TableRow key={rowNo}>
              {cells.map((cellData: string, colNo: number) =>
                colNo === 0 ? (
                  <TableCell className="max-w-[800px]" key={colNo} colSpan={rowNo===2?10:1}>
                    {cellData}
                  </TableCell>
                ) : (
                  <TableCell key={colNo}>
                    <input
                      onChange={(e) => updateData(rowNo, colNo, e.target.value)}
                      value={cellData}
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
    </>
  );
};

export default Table3;
