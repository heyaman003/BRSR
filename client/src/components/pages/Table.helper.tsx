import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function TableHelper({ section }: { section: any }) {
  console.log(section);

  return (
    <div>
      {section?.questions.map(
        (questionTable: { id: string; label: string; tabulardata: any[]; defaultLength: number }) => {
          type RowType = (number | ""); // Ensuring type consistency

          const [rows, setRows] = useState<(number | "")[][]>(
            Array.from({ length: questionTable.defaultLength }, (_, index) => [
              index + 1, // S. No. column (fixed)
              ...questionTable.tabulardata.slice(1).map(([, type]) =>
                type === "number" ? 0 : ("" as RowType)
              ),
            ])
          );

          const addRow = () => {
            setRows((prevRows) => [
              ...prevRows,
              [
                prevRows.length + 1, // Ensuring S. No. increments
                ...questionTable.tabulardata.slice(1).map(([, type]) =>
                  type === "number" ? 0 : ("" as RowType)
                ),
              ],
            ]);
          };

          const handleChange = (rowIndex: number, colIndex: number, value: number | "") => {
            setRows((prevRows) =>
              prevRows.map((row, i) =>
                i === rowIndex
                  ? row.map((cell, j) => (j === colIndex ? value : cell))
                  : row
              )
            );
          };

          return (
            <div key={questionTable.id} className="mb-6">
              <h3 className="text-lg font-semibold">{questionTable.label}</h3>

              <Table>
                <TableHeader>
                  <TableRow>
                    {questionTable.tabulardata.map(([header]: [string, string], index: number) => (
                      <TableHead key={index}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cellData, colIndex) => (
                        <TableCell key={colIndex}>
                          {colIndex === 0 ? ( // Fixed S. No. column
                            cellData
                          ) : (
                            <input
                              type={questionTable.tabulardata[colIndex][1] === "number" ? "number" : "text"}
                              value={cellData}
                              onChange={(e) =>
                                handleChange(
                                  rowIndex,
                                  colIndex,
                                  questionTable.tabulardata[colIndex][1] === "number"
                                    ? Number(e.target.value)
                                    : (e.target.value as RowType)
                                )
                              }
                              className="border border-green-300 bg-green-50 text-green-900 px-2 py-1 w-full 
                              focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-green-100 
                              rounded-md transition-all"                            />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button onClick={addRow} className="mt-2 bg-[#16a34a] hover:bg-[#15803d]">
                Add Row
              </Button>
            </div>
          );
        }
      )}
    </div>
  );
}
