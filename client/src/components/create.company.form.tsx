import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useFetch } from "@/hooks/use-fetch";

interface Company {
  id: string;
  name: string;
}

interface CreateCompanyFormProps {
  setCompanies: React.Dispatch<React.SetStateAction<Company[]>>;
  addCompanyToLocalState: (companyData: any) => void;
}

const CreateCompanyForm: React.FC<CreateCompanyFormProps> = ({
  addCompanyToLocalState,
}) => {
  const customFetch = useFetch();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      toast.error("Please enter a company name");
      return;
    }
    setLoading(true);
    toast.promise(
      customFetch(`/company`, {
        method: "POST",
        body: { name: companyName.trim() },
      }),
      {
        loading: "Creating company...",
        success: (res) => {
          addCompanyToLocalState(res.data);
          setCompanyName("");
          return `Company "${companyName}" created successfully!`;
        },
        error: (_err) => {
          return _err.message;
        },
        finally: () => {
          setLoading(false);
        },
      }
    );
    // try {
    //   const res = await fetch(`${import.meta.env.VITE_SERVER_URI}/company`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
    //     },
    //     credentials: "include",
    //     body: JSON.stringify({ name: companyName }),
    //   });

    //   if (res.status > 399 || res.status < 200) {
    //     throw new Error("Failed to create company. Please try again.");
    //   }

    //   const data = await res.json();
    //   addCompanyToLocalState(data.data);
    //   setCompanyName("");
    //   toast.success(`Company "${companyName}" created successfully!`);
    // } catch (error) {
    //   toast.error("Failed to create company. Please try again.");
    // } finally {
    //   setLoading(false);
    //   console.log("just 1 time--");
    // }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-green-800">
          Create New Company
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-green-700 mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-100"
              placeholder="Enter company name"
              disabled={loading} // Disable input while loading
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-[10px] px-6 rounded-lg transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Creating..." : "Create Company"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateCompanyForm;

// const createCompanyAPI = async (companyName: string, fetch: Function) => {
//   const res = await fetch(`/company`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
//     },
//     credentials: "include",
//     body: { name: companyName.trim() },
//   });

//   if (res.status > 399 || res.status < 200) {
//     throw new Error("Failed to create company. Please try again.");
//   }
//   return await res.json();
// };
