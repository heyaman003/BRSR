import { useSelector } from "react-redux";
import AdminLandingPage from "./admin.landing.page";
import EntrySectionMain from "./entry.section.tsx";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const role = useSelector((state: RootState) => state?.auth?.user?.data.role);
  const companyId = useSelector((state: RootState) => state?.auth?.user?.data.companyId);
  const navigate = useNavigate();

  // In case client is admin then he should be redirected to his own company page
  useEffect(()=>{
    if(role==='ADMIN' && companyId)
      navigate(`../company?id=${companyId}`)
  }, [companyId, role])
  return (
    <div>
      {role === "SUPERADMIN" ? (
        <AdminLandingPage />
      ) : (
        <EntrySectionMain />
      )}
    </div>
  );
};

export default Homepage;
