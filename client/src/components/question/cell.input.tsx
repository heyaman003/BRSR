import { Operation } from "@/models/models";
import { Table } from "@/types";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface CellInputArgs {
  updateTableCell: (rowId: string, cellId: string, newValue: string) => void;
  value: string;
  rowId: string;
  cellId: string;
  tableState: Table;
  operation: Operation | null | undefined;
  operands: string[] | null | undefined;
  getTableData: (questionIndex: number, tableIndex: number) => Table | null;
}

const CellInput: React.FC<CellInputArgs> = ({
  value,
  updateTableCell,
  rowId,
  cellId,
  tableState,
  operation,
  operands,
  getTableData,
}) => {
  const [cellData, setCellData] = useState<string>(value);

  const getCellValue = useCallback(
    (rowIndex: number, cellIndex: number, table: Table) => {
      const cellData: string | undefined = table.rows
        .find((row) => row.index === rowIndex)
        ?.cells.find((cell) => cell.index === cellIndex)?.data;
      if (!cellData) return 0;
      return parseFloat(cellData);
    },
    [tableState]
  );

  const debounceInputValueChangeRef = useRef<any>();

  useEffect(() => {
    clearTimeout(debounceInputValueChangeRef.current);

    debounceInputValueChangeRef.current = setTimeout(() => {
      if (!operation) return;
      const valueOfOperands: number[] | undefined = operands?.map((operand) => {
        if (operand.split("$").length === 1) {
          return parseFloat(operand);
        } else if (operand.split("$").length === 4) {
          const questionIndex = parseFloat(operand.split("$")[0]);
          const tableIndex = parseFloat(operand.split("$")[1]);
          const rowIndex = parseFloat(operand.split("$")[2]);
          const colIndex = parseFloat(operand.split("$")[3]);
          const tableData = getTableData(questionIndex, tableIndex);
          if (!tableData) {
            toast.error("Table not found");
            return 0;
          }
          return getCellValue(rowIndex, colIndex, tableData);
        } else {
          const rowIndex = parseFloat(operand.split("$")[0]);
          const colIndex = parseFloat(operand.split("$")[1]);
          return getCellValue(rowIndex, colIndex, tableState);
        }
      });
      if (valueOfOperands)
        setCellData("" + performOperation(operation, valueOfOperands));
    }, 200);

    return () => clearTimeout(debounceInputValueChangeRef.current);
  }, [tableState]);

  useEffect(() => {
    updateTableCell(rowId, cellId, cellData);
  }, [cellData]);

  return (
    <input
      disabled={operation ? true : false}
      onChange={(e) => setCellData(e.target.value)}
      value={cellData}
      className=" disabled:bg-gray-50 border disabled:border-gray-300 hover:bg-white focus:bg-white border-green-400 bg-green-50 text-green-900 px-2 py-1 w-full 
                              focus:outline-none focus:ring-1 focus:ring-green-400
                              rounded-md transition-all"
    />
  );
};

export default memo(CellInput);

const performOperation = (operation: Operation, values: number[]): number => {
  let answer = 0.0;
  switch (operation) {
    case Operation.ADD:
      values.forEach((value) => (answer += value));
      break;
    case Operation.MUL:
      values.forEach((value, ind) => (answer = ind === 0 ? value : answer * value));
      if (Number.isNaN(answer) || !Number.isFinite(answer)) answer = 0;
      break;
    case Operation.DIV:
      values.forEach((value, ind) => (answer = ind === 0 ? value : answer / value));
      if (Number.isNaN(answer) || !Number.isFinite(answer)) answer = 0;
      break;
    case Operation.PERCENTAGE:
      values.forEach(
        (value, ind) => (answer = ind === 0 ? value * 100 : answer / value)
      );
      if (Number.isNaN(answer) || !Number.isFinite(answer)) answer = 0;
      break;
    case Operation.SUMDIVIDE:
      answer = (values[0] + values[1]) / values[2];
      if (Number.isNaN(answer) || !Number.isFinite(answer)) answer = 0;
      break
    case Operation.SUB:
      values.forEach(
        (value, ind) => (answer = ind === 0 ? value : answer - value)
      );
      if (Number.isNaN(answer) || !Number.isFinite(answer)) answer = 0;
      break;
  }
  return answer;
};
