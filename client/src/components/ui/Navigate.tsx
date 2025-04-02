import React from "react";
import { useNavigate, To } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react"; // Ensure this import is correct

interface BackButtonProps {
  url?: To;
  number?: number;
}

const BackButton: React.FC<BackButtonProps> = ({ url, number }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (url) {
      navigate(url);
    } else if (typeof number === "number") {
      navigate(-1); // Default: Go back one step
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group absolute cursor-pointer top-[5%] right-[5%] w-[50px] h-[50px] transform translate-x-1/2 -translate-y-1/2 z-30"
    >
      <ArrowLeftCircle className="w-[50px] h-[50px] text-green-800 group-hover:text-white group-hover:fill-green-700 transition-all duration-100" />
    </div>
  );
};

export default BackButton;
