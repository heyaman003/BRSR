import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import CompanyCard from "@/components/component/company.card";
import CompanyTabs from "@/components/component/CompanyTabs";
import CreateCompanyForm from "@/components/create.company.form";
import { ArrowLeftCircle } from "lucide-react";
import { useFetch } from "@/hooks/use-fetch";
interface Company {
  id: string;
  name: string;
}

const Index: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [viewMode, setViewMode] = useState<String>("list");
  const customFetch = useFetch();

  const fetchAllCompanies = async () => {
    const raw = await customFetch(`/company/all`, {
      method: "GET",
    });
  
    const res = await raw.json();
  
    return res.data;
  };

  // const onCompanyCreated=(company:{ id: number; name: string })=>{
  //   console.log("new company created",company);
  //   setCompanies((prev) => ([...prev, company])); // ✅ Handles null case
  //     }
  useEffect(() => {
    fetchAllCompanies().then((companies) => {
      setCompanies(companies);
      setIsLoading(false);
    });
  }, []);

  const removeCompanyFromLocalState = (companyId: string) => {
    setCompanies((companies: Company[]) =>
      companies.filter((company) => company.id !== companyId)
    );
  };

  const addCompanyToLocalState = (companyData: Company) => {
    setCompanies((companies) => [...companies, companyData]);
  };
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div onClick={()=>navigate(-1)} className="group absolute cursor-pointer top-[5%] right-[5%] w-[50px] h-[50px] transform translate-x-1/2 -translate-y-1/2">
          <ArrowLeftCircle className="w-[50px] h-[50px] text-green-800 group-hover:text-white group-hover:fill-green-700 transition-all duration-100" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium tracking-wider mb-3"
          >
            ADMIN DASHBOARD
          </motion.div>

          <h1 className="text-4xl font-bold tracking-tight text-green-900 sm:text-5xl md:text-6xl">
            Registered Companies
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-lg text-green-600">
            View and manage all the companies BRSR data in your system
          </p>

          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"></div>
        </motion.div>
        <CompanyTabs setViewMode={setViewMode} />
        {viewMode === "list" && isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl h-48 animate-pulse overflow-hidden shadow"
              >
                <div className="h-full bg-gradient-to-r from-green-100 to-green-200 animate-shimmer bg-[length:400%_100%]"></div>
              </div>
            ))}
          </div>
        ) : (
          viewMode === "list" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 "
            >
              {companies?.map((company) => (
                <CompanyCard
                  removeCompanyFromLocalState={removeCompanyFromLocalState}
                  key={company.id}
                  id={company.id}
                  name={company.name}
                  className="h-48 hover:bg-white"
                />
              ))}
            </motion.div>
          )
        )}
        {viewMode === "create" && (
          <CreateCompanyForm
            addCompanyToLocalState={addCompanyToLocalState}
            setCompanies={setCompanies}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
