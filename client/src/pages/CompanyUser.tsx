import React, { useEffect, useState } from "react";
import CompanyHeader from "@/components/component/CompanyUser/CompanyHeader";
import UserList from "@/components/component/CompanyUser/UserList";
// import { companyData } from "@/lib/mock-data";
import {
  Leaf,
  Flower,
  Cloud,
} from "@/components/component/SustainabilityElements";
import { Company, User } from "@/lib/types";
import { plainToInstance } from "class-transformer";
import { useSearchParams } from "react-router-dom";

const CompanyUser = () => {
  // Reading the company id from the query string
  const[searchParams, setSearchParams] = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [companyData, setCompanyData] = useState<Company>();
  // Generate random leaves for animation
  const [leaves, setLeaves] = useState<React.ReactNode[]>([]);

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
        {companyData && <CompanyHeader company={companyData} />}
        {companyData && <UserList companyId={companyData.id} deleteUserFromState={deleteUserFromState} users={companyData.users} />}
      </div>
    </div>
  );
};

export default CompanyUser;

const loadUserData = async (companyId: string | null): Promise<Object | void> => {
  try {
    if(!companyId)
      throw new Error('Company not found.')

    const raw = await fetch(
      `http://localhost:8000/company/${companyId}`,
      { credentials: "include" }
    );
    const res = await raw.json();

    if (raw.status > 399 || raw.status < 200) throw new Error(res.message);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
