import { memo, useEffect, useState } from "react";

interface CellInputArgs {
  updateTableCell: (rowId: string, cellId: string, newValue: string) => void;
  value: string;
  rowId: string;
  cellId: string;
}

const CellInput: React.FC<CellInputArgs> = ({value, updateTableCell, rowId, cellId}) => {
  const [cellData, setCellData] = useState(value);

  useEffect(()=>{
    updateTableCell(rowId, cellId, cellData);
  }, [cellData]);

  return (
    <input
      onChange={(e) => setCellData(e.target.value)}
      value={cellData}
      className="border border-green-300 bg-green-50 text-green-900 px-2 py-1 w-full 
                              focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-green-100 
                              rounded-md transition-all"
    />
  );
};

export default memo(CellInput);
