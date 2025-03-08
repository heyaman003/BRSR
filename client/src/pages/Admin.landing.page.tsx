import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CompanyCard from '@/components/component/Companycard';
import CompanyTabs from '@/components/component/CompanyTabs';
import CreateCompanyForm from '@/components/component/CreateCompanyForm';

interface Company {
  id: number;
  name: string;
}

const testdata = [
  { id: 1, name: "Tata-communication" },
  { id: 2, name: "Colgate" },
  { id: 3, name: "Microsoft" },
  { id: 4, name: "Google" },
  { id: 5, name: "Amazon" },
  { id: 6, name: "Apple" }
];

const fetchAllCompanies = async() => {
  const raw = await fetch(`http://localhost:8000/company/all`, {credentials: 'include'});

  const res = await raw.json();

  return res.data;
}

const Index: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [viewMode,setViewMode]=useState<String>('list');

  const onCompanyCreated=(company:{ id: number; name: string })=>{
    console.log("new company created",company);
    setCompanies((prev) => ([...prev, company])); // ✅ Handles null case
      }
  useEffect(() => {
    fetchAllCompanies().then((companies)=>{
      setCompanies(companies)
      setIsLoading(false)
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
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
        {viewMode==='list' && isLoading ? (
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
        ) :viewMode==='list'&& (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {companies?.map((company) => (
              <CompanyCard 
                key={company.id} 
                id={company.id} 
                name={company.name} 
                className="h-48"
              />
            ))}
          </motion.div>
        )}
        {
          viewMode==='create'&&<CreateCompanyForm onCompanyCreated={onCompanyCreated}/>
        }
      </div>
    </div>
  );
};

export default Index;