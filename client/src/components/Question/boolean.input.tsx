import React, { useEffect, useState } from "react";

interface BooleanInputArgs {
  answer: string | undefined;
  updateAnswer: Function;
}

const BooleanInput: React.FC<BooleanInputArgs> = ({ answer, updateAnswer }) => {
  const [value, setValue] = useState<string | undefined>(answer);
  useEffect(() => {
    updateAnswer(value);
  }, [value]);
  return (
    <div className="flex pr-7">
      <button
        onClick={() => setValue("1"+(value?value.substring(1):""))}
        className={` ${
          value?.startsWith('1') ? "bg-green-500" : "bg-gray-300"
        } rounded-sm px-8 py-2 hover:bg-green-500 text-white font-bold mr-4 text-sm`}
      >
        Yes
      </button>
      <button
        onClick={() => setValue("0"+(value?value.substring(1):""))}
        className={` ${
          value?.startsWith('0') ? "bg-red-500" : "bg-gray-300"
        } rounded-sm px-8 py-2 hover:bg-red-500 text-white font-bold text-sm`}
      >
        No
      </button>
      <input placeholder="Reason" className=" flex-grow ml-4 px-3 py-1 rounded-sm border border-gray-300" disabled={!value} value={value?.substring(1) || ''} onChange={(e)=>setValue(value?.substring(0, 1)+e.target.value)}/>
    </div>
  );
};

export default BooleanInput;
