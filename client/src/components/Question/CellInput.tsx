import { useState } from "react";

const CellInput = () => {
  const [cellData, setCellData] = useState("");
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
