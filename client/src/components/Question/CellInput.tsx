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
      // type="number"
      value={cellData}
      className="border hover:bg-white focus:bg-white border-green-400 bg-green-50 text-green-900 px-2 py-1 w-full 
                              focus:outline-none focus:ring-1 focus:ring-green-400
                              rounded-md transition-all"
    />
  );
};

export default memo(CellInput);
