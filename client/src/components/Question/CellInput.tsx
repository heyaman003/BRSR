import { Operation } from "@/models/models";
import { Table } from "@/types";
import { memo, useCallback, useEffect, useState } from "react";

interface CellInputArgs {
  updateTableCell: (rowId: string, cellId: string, newValue: string) => void;
  value: string;
  rowId: string;
  cellId: string;
  tableState: Table;
  operation: Operation | null | undefined;
  operands: string[] | null | undefined
}

const CellInput: React.FC<CellInputArgs> = ({
  value,
  updateTableCell,
  rowId,
  cellId,
  tableState,
  operation,
  operands
}) => {
  const [cellData, setCellData] = useState<string>(value);

  const getCellValue = useCallback((rowIndex: number, cellIndex: number)=> {
    const cellData: string | undefined = tableState.rows
      .find((row) => row.index === rowIndex)
      ?.cells.find((cell) => cell.index === cellIndex)?.data;
    if (!cellData) return 0;
    return parseFloat(cellData);
  }, [tableState])

  useEffect(()=>{
    if(!operation)
      return;
    const valueAtIndexes: number[] | undefined = operands?.map(operand=>{
      const rowIndex = parseFloat(operand.split("$")[0])
      const colIndex = parseFloat(operand.split("$")[1])
      return getCellValue(rowIndex, colIndex)
    })
    if(valueAtIndexes)
      setCellData(""+performOperation(operation, valueAtIndexes))
  }, [tableState]);

  useEffect(() => {
    updateTableCell(rowId, cellId, cellData);
  }, [cellData]);

  return (
    <input
      disabled={operation?true:false}
      onChange={(e) => setCellData(e.target.value)}
      // type="number"
      value={cellData}
      className=" disabled:bg-gray-50 border disabled:border-gray-300 hover:bg-white focus:bg-white border-green-400 bg-green-50 text-green-900 px-2 py-1 w-full 
                              focus:outline-none focus:ring-1 focus:ring-green-400
                              rounded-md transition-all"
    />
  );
};

export default memo(CellInput);


const performOperation = (operation: Operation, values: number[]): number =>{
  let answer = 0.0;
  if(operation===Operation.ADD)
      values.forEach(value=>answer+=value)
  else{
      values.forEach((value, ind)=>answer=(ind===0?value:answer/value));
      if(Number.isNaN(answer) || !Number.isFinite(answer))
        answer = 0;
  }
  return answer;
}