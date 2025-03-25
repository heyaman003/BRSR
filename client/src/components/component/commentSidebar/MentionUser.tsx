import { User } from "@/lib/types";
import { RootState } from "@/store/store";
import { plainToInstance } from "class-transformer";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MentionUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const companyId = useSelector((root: RootState)=>root.auth.user?.data?.companyId);

    useEffect(()=>{
        loadCompanyUsers(companyId).then((users)=>console.log(users))
    }, [companyId])

    useEffect(()=>{

        console.log("======>", users)
    }, [users])
    
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


const loadCompanyUsers = async (companyId: string | null): Promise<Object | void> => {
    try {
      if(!companyId)
        throw new Error('Company not found.')
  
      const raw = await fetch(
        `${import.meta.env.VITE_SERVER_URI}/company/${companyId}`,
        { credentials: "include", headers: {'X-Csrf-Token': sessionStorage.getItem('X-Csrf-Token') || ''} },
      );
      const res = await raw.json();
  
      if (raw.status > 399 || raw.status < 200) throw new Error(res.message);
      return res.data.users;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };