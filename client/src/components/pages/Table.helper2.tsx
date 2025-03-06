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

export default function TableHelper2({ section }: { section: any }) {
  return (
    <div>
      {section?.questions.map((questionTable: any) => {
        // Initializing rows with fixed first column values from colFirstData
        const [rows, setRows] = useState<(string | number)[][]>(
            questionTable.colFirstData.slice(1).map((colFirstData: string) => [
                colFirstData,
                ...questionTable.tabulardata.map(([, type]: [string, string]) => (type === "number" ? 0 : "")),
            ])
        );

        const addRow = () => {
          setRows((prevRows) => [
            ...prevRows,
            [
              questionTable.colFirstData[prevRows.length + 1] || "", // Ensure it maps correctly
              ...questionTable.tabulardata.map(([, type]: [string, string]) => (type === "number" ? 0 : "")),
            ],
          ]);
        };

        const handleChange = (rowIndex: number, colIndex: number, value: string | number) => {
          setRows((prevRows) =>
            prevRows.map((row, i) =>
              i === rowIndex ? row.map((cell, j) => (j === colIndex ? value : cell)) : row
            )
          );
        };

        return (
          <div key={questionTable.id} className="mb-6">
            <h3 className="text-lg font-semibold">{questionTable.label}</h3>

            <Table>
              <TableHeader>
                <TableRow>
                <TableHead key={'hsggswhws'}>{questionTable.colFirstData[0]}</TableHead>
                  
                  {questionTable.tabulardata.map(([header]: [string], index: number) => (
                    <TableHead key={index}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {rows.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cellData, colIndex) => (
                      <TableCell key={colIndex}>
                        {colIndex === 0 ? (
                          cellData
                        ) : (
                          <input
                            type={
                              questionTable.tabulardata[colIndex - 1][1] === "number" ? "number" : "text"
                            }
                            value={cellData}
                            onChange={(e) =>
                              handleChange(
                                rowIndex,
                                colIndex,
                                questionTable.tabulardata[colIndex - 1][1] === "number"
                                  ? Number(e.target.value)
                                  : e.target.value
                              )
                            }
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

            {!section.isFixedLength && (
              <Button onClick={addRow} className="mt-2 bg-[#16a34a] hover:bg-[#15803d]">
                Add Row
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
