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
    <div>
      <button
        onClick={() => setValue("true")}
        className={` ${
          value === "true" ? "bg-green-500" : "bg-gray-300"
        } rounded-sm px-8 py-2 hover:bg-green-500 text-white font-bold mr-4 text-sm`}
      >
        Yes
      </button>
      <button
        onClick={() => setValue("false")}
        className={` ${
          value === "false" ? "bg-red-500" : "bg-gray-300"
        } rounded-sm px-8 py-2 hover:bg-red-500 text-white font-bold text-sm`}
      >
        No
      </button>
    </div>
  );
};

export default BooleanInput;
