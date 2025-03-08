import { useSelector } from "react-redux";
import AdminLandingPage from "./Admin.landing.page";
import EntrySectionMain from "./EntrySection";
import { RootState } from "@/store/store";
const Homepage = () => {
  
  const role =useSelector((state: RootState) => state?.auth?.user?.data.role);

  console.log(role,"the role is")
  return (
    <div className="h-[100vh]">
      {role==='SUPERADMIN'||role==='ADMIN'?<AdminLandingPage/>
      :<EntrySectionMain  />}
    </div>
  );
};

export default Homepage;
