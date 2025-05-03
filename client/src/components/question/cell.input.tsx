import { updateCellData } from "@/features/activeSubsectionData/activeSubsectionSlice";
import useDebounce from "@/hooks/use-debounce";
import { Operation, SubSection } from "@/models/models";
import { RootState } from "@/store/store";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface CellInputArgs {
  value: string;
  rowIndex: number;
  cellIndex: number;
  operation: Operation | null | undefined;
  operands: string[] | null | undefined;
  tableIndex: number;
  questionIndex: number;
  assignedToId:string | undefined;
}

const CellInput: React.FC<CellInputArgs> = ({
  value,
  rowIndex,
  cellIndex,
  tableIndex,
  questionIndex,
  operation,
  operands,
  assignedToId
}) => {
  const dispatch = useDispatch();

  const subsection: SubSection = useSelector(
    (state: RootState) => state.activeSubsection.data
  );
  const userId: string = useSelector((state: RootState) => state.auth.user?.data.id);
  const role: string = useSelector((state: RootState) => state.auth.user?.data.role);

  useEffect(()=>{
    if(value!==cellData)
      setCellData(value)
  }, [value])

  /**
   * This function is used to get the value of a cell in a table.
   */
  const getCellValue = useCallback(
    (
      questionIndex: number,
      tableIndex: number,
      rowIndex: number,
      cellIndex: number
    ) => {
      const cellData: string | undefined = subsection.questions
        ?.find((question) => question.index === questionIndex)
        ?.answer_table?.[tableIndex]?.rows?.find(
          (row) => row.index === rowIndex
        )
        ?.cells.find((cell) => cell.index === cellIndex)?.data;
 
      if (!cellData) return 0;
      return Number(parseFloat(cellData).toFixed(2));
    },
    [subsection]
  );

  const [cellData, setCellData] = useState<string>(value);



  const calculateCellValue = useDebounce(()=>{
    if (!operation) return;
      const valueOfOperands: number[] | undefined = operands?.map((operand) => {
        if (operand.split("$").length === 1) {
          return Number(parseFloat(operand).toFixed(2));
        } else if (operand.split("$").length === 4) {
          const questionIndex = parseFloat(operand.split("$")[0]);
          const tableIndex = parseFloat(operand.split("$")[1]);
          const rowIndex = parseFloat(operand.split("$")[2]);
          const colIndex = parseFloat(operand.split("$")[3]);

          return getCellValue(questionIndex, tableIndex, rowIndex, colIndex);
        } else {
          const rowIndex = parseFloat(operand.split("$")[0]);
          const colIndex = parseFloat(operand.split("$")[1]);
          return getCellValue(questionIndex, tableIndex, rowIndex, colIndex);
        }
      });
      if (valueOfOperands)
        setCellData("" + performOperation(operation, valueOfOperands));
    }, 200
  )

  useEffect(() => {
    calculateCellValue()
  }, [subsection]);

  useEffect(() => {
    dispatch(
      updateCellData({
        questionIndex: questionIndex,
        tableIndex: tableIndex,
        rowIndex: rowIndex,
        cellIndex: cellIndex,
        value: cellData,
      })
    );
  }, [cellData]);

  return (
    <input
    disabled={!!operation || (role === "CLIENT" && userId !== assignedToId)}

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
      values.forEach(
        (value, ind) => (answer = ind === 0 ? value : answer * value)
      );
      if (Number.isNaN(answer) || !Number.isFinite(answer)) answer = 0;
      break;
    case Operation.DIV:
      values.forEach(
        (value, ind) => (answer = ind === 0 ? value : answer / value)
      );
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
      break;
    case Operation.SUB:
      values.forEach(
        (value, ind) => (answer = ind === 0 ? value : answer - value)
      );
      if (Number.isNaN(answer) || !Number.isFinite(answer)) answer = 0;
      break;
  }
  return Number(answer.toFixed(2))
};
