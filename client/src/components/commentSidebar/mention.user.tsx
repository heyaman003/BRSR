import { useFetch } from "@/hooks/use-fetch";
import { RootState } from "@/store/store";
import { Mail } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MentionUser = () => {
  const customFetch = useFetch();
  
    const companyId = useSelector((root: RootState)=>root.auth.user?.data?.companyId);

    const loadCompanyUsers = async (companyId: string | null): Promise<Object | void> => {
      try {
        if(!companyId)
          throw new Error('Company not found.')
    
        const res = await customFetch(
          `/company/${companyId}`,
          { method: 'GET' },
        );
    
        if (res.statusCode > 399 || res.statusCode < 200) throw new Error(res.message);
        return res.data.users;
      } catch (e) {
        console.log(e);
        throw e;
      }
    };

    useEffect(()=>{
        loadCompanyUsers(companyId);
    }, [companyId])

   
  return (
    <ul className="w-full absolute bottom-full">
      <li className="w-full my-1 px-5 py-2 bg-gray-100 hover:bg-gray-200 cursor-pointer">
        <span className="flex flex-col gap-1">
          <span className="font-semibold">Sumit</span>
          <span className="flex text-xs text-gray-500 items-center gap-1">
            <Mail size={12} />
            Sumit@gmail.com
          </span>
        </span>
      </li>
      <li className="w-full p-5 bg-gray-100 hover:bg-gray-200 "></li>
      <li className="w-full p-5 bg-gray-100 hover:bg-gray-200 "></li>
      <li className="w-full p-5 bg-gray-100 hover:bg-gray-200 "></li>
    </ul>
  );
};

export default MentionUser;


