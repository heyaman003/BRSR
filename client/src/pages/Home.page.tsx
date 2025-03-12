import { useSelector } from "react-redux";
import AdminLandingPage from "./Admin.landing.page";
import EntrySectionMain from "./EntrySection";
import { RootState } from "@/store/store";
const Homepage = () => {
  
  const role =useSelector((state: RootState) => state?.auth?.user?.data.role);
  
  return (
<<<<<<< HEAD
    <div className="h-[100vh]">
      {role==='SUPERADMIN'||role==='ADMIN'?<AdminLandingPage/>
      :<EntrySectionMain  />}
=======
    <div className="w-[95vw] m-auto ">
      <FormPage />
      {/* <SectionB/> */}
>>>>>>> d475055 (added button  and change in data)
    </div>
  );
};

export default Homepage;
