import React, { useEffect, useState } from "react";
import CompanyHeader from "@/components/component/CompanyUser/CompanyHeader";
import UserList from "@/components/component/CompanyUser/UserList";

import { useDispatch } from "react-redux";
// import { companyData } from "@/lib/mock-data";
import {
  Leaf,
  Flower,
  Cloud,
} from "@/components/component/SustainabilityElements";
import { Company, User } from "@/lib/types";
import { plainToInstance } from "class-transformer";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { updateCompany} from "@/features/auth/authSlice"

const loadUserData = async (companyId: string | null): Promise<Object | void> => {
  try {
    if(!companyId)
      throw new Error('Company not found.')

    const raw = await fetch(
      `${import.meta.env.VITE_SERVER_URI}/company/${companyId}`,
      { credentials: "include", headers: {'X-Csrf-Token': sessionStorage.getItem('X-Csrf-Token') || ''} },
    );
    const res = await raw.json();

    if (raw.status > 399 || raw.status < 200) throw new Error(res.message);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};


const CompanyUser = () => {
  // Reading the company id from the query string
  const[searchParams, setSearchParams] = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [companyData, setCompanyData] = useState<Company>();
  // Generate random leaves for animation
  const [leaves, setLeaves] = useState<React.ReactNode[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Animate fade in for the entire page
    document.documentElement.style.opacity = "0";
    setTimeout(() => {
      document.documentElement.style.opacity = "1";
      setMounted(true);
    }, 50);

    // Create leaves for animation
    const leafElements = [];
    for (let i = 0; i < 15; i++) {
      const delay = Math.random() * 20;
      const duration = 15 + Math.random() * 30;
      const size = 15 + Math.random() * 15;
      const left = Math.random() * 100;

      leafElements.push(
        <Leaf
          key={i}
          style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      );
    }
    setLeaves(leafElements);

    
    loadUserData(searchParams.get('id')).then((res)=>{
      if(res){
        const company: Company = plainToInstance(Company, res);
        setCompanyData(company);
      }
    })

    return () => {
      document.documentElement.style.opacity = "1";
    };
  }, []);


  const deleteUserFromState = (userId: string) =>{
    setCompanyData((companyData) => {
      if (!companyData) return companyData;
      companyData.users = companyData.users.filter((user: User) => user.id !== userId);
      return { ...companyData };
    });
  }

  const activeCompanyDetails=()=>{
    const companyId =searchParams.get('id');
    if (companyId) {
      dispatch(updateCompany(companyId)); // Dispatch the action with companyId
      navigate(`/admin/brsr/company?id=${companyId}`); // Navigate to the report page
    }
  }

  return (
    <div className="bg-green-100 min-h-screen bg-gradient-to-b from-background to-accent/50 pb-16 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {mounted && leaves}
        <Cloud className="absolute top-[10%] right-[10%] opacity-50 animate-float" />
        <Cloud
          className="absolute top-[25%] left-[5%] opacity-30 animate-float"
          style={{ animationDelay: "1s" }}
        />
        <Flower className="absolute bottom-[10%] left-[7%] opacity-70 animate-pulse-grow" />
        <Flower
          className="absolute bottom-[20%] right-[8%] opacity-60 animate-pulse-grow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Content */}
      <div className="container max-w-5xl mx-auto relative z-10">
        <Button onClick={activeCompanyDetails}  className="absolute right-0 w-[200px] top-[10px] capitalize bg-green-500 hover:bg-green-600">view company data</Button>
        {companyData && <CompanyHeader company={companyData} />}
        {companyData && <UserList companyId={companyData.id} deleteUserFromState={deleteUserFromState} users={companyData.users} />}
      </div>
    </div>
  );
};

export default CompanyUser;


