import { useSearchParams } from "react-router-dom";
import EntrySectionMain from "./EntrySection";
const AdminCompany = () => {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("id"); // Extract companyId from query params
   console.log("i am trying to render")
  return (
    <div>
      {
        companyId?<EntrySectionMain/>:<p>404 company not-found</p>
      }
    </div>
  );
};

export default AdminCompany;
