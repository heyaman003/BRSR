import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const Table4 = ({
  heading,
  numberOfPolicies,
  questions,
}: {
  heading: string;
  numberOfPolicies: number;
  questions: string[];
}) => {
  const [tableData, setTableData] = useState<string[][]>(
    questions.map((question: string) => [
      question,
      ...Array.from({ length: numberOfPolicies }).map(() => ""),
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
    <>
      <h5 className="mb-6">{heading}</h5>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Questions</TableHead>
            {Array.from({ length: numberOfPolicies }).map((_, ind) => (
              <TableCell key={ind}>P{ind + 1}</TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((cells: string[], rowNo: number) => (
            <TableRow key={rowNo}>
              {cells.map((cellData: string, colNo: number) =>
                colNo === 0 ? (
                  <TableCell className="max-w-[800px]" key={colNo}>
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

export default Table4;
