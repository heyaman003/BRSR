import { useSearchParams } from "react-router-dom";
import EntrySectionMain from "./entry.section";
const AdminCompany = () => {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("company"); // Extract companyId from query params
  return (
    <div>
      {
        companyId?<EntrySectionMain/>:<p>404 company not-found</p>
      }
    </div>
  );
};

export default AdminCompany;
