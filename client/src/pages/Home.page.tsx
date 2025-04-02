import { useSelector } from "react-redux";
import AdminLandingPage from "./Admin.landing.page.tsx";
import EntrySectionMain from "./entry.section.tsx";
import { RootState } from "@/store/store";
const Homepage = () => {
  const role = useSelector((state: RootState) => state?.auth?.user?.data.role);

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
