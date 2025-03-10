import { useEffect, useState } from "react";

interface CellInputArgs {
  updateTableCell: (newValue: string) => void
}

const CellInput: React.FC<CellInputArgs> = ({updateTableCell}) => {
  const [cellData, setCellData] = useState("");

  useEffect(()=>{
    updateTableCell(cellData);
  }, [cellData])
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

export default CellInput;
