import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "./ConfirmDialog";

interface CompanyCardProps {
  id: string;
  name: string;
  className?: string;
  removeCompanyFromLocalState: (companyId: string) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  id,
  name,
  className,
  removeCompanyFromLocalState,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const navigate = useNavigate();


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={cn(
        "card-container border p-6 flex flex-col items-center justify-center transition-all duration-500 bg-green-50 cursor-pointer rounded-md relative",
        isHovered ? "transform -trangreen-y-2" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate("/company?id=" + id)}
    >
      <ConfirmDialog
        agreeTitle="Yes"
        disagreeTitle="No"
        heading="Are you sure?"
        message="All company details will be lost."
        isOpen={showConfirm}
        onAgree={(e) => {
          e.stopPropagation();
          deleteCompany(id)
            .then((message) => {
              removeCompanyFromLocalState(id);
              toast.success(message);
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setShowConfirm(false));
        }}
        onDisagree={(e) => {
          e.stopPropagation();
          setShowConfirm(false);
        }}
      />
      {/* Delete company button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowConfirm(true);
        }}
        className=" absolute top-2 right-2 text-gray-400 transition-none hover:text-red-500 rounded-full p-2"
      >
        <Trash2 className="transition-none" />
      </button>

      <div className="relative w-full">
        {/* <IconAnimation id={id} /> */}

        <div className="mt-6 text-center">
          <div className="text-xs font-medium text-green-500 mb-1 opacity-80">
            Company
          </div>
          <h3 className="text-xl font-semibold tracking-tight mb-2">{name}</h3>

          <div
            className={cn(
              "w-12 h-0.5 mx-auto mt-3 mb-4 transition-all duration-300",
              isHovered ? "w-24 bg-green-800" : "bg-green-300"
            )}
          ></div>

          <div className="flex justify-center space-x-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-500",
                  isHovered ? "bg-green-800" : "bg-green-300",
                  isHovered && i === 2 ? "w-3" : ""
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyCard;

const deleteCompany = async (companyId: string) => {
  const raw = await fetch(`http://localhost:8000/company/${companyId}`, {
    method: "DELETE",
    credentials: "include",
  });
  const res = await raw.json();
  if (raw.status < 200 || raw.status >= 400) throw new Error(res.message);
  return res.message;
};
