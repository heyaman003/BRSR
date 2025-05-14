import React, { useState } from 'react';
import {  User } from "@/lib/types";
import { useFetch } from "@/hooks/use-fetch";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { updateQuestionData } from '@/features/activeSubsectionData/activeSubsectionSlice';
type MentionInputProps = {
 activeQuestionApproval: { isActive: boolean; id: string };
  question: { id: string };
  users: User[];
  setactiveQuestionApproval: React.Dispatch<React.SetStateAction<{ isActive: boolean; id: string }>>;
};

const ApprovalInput: React.FC<MentionInputProps> = ({ activeQuestionApproval, question, users ,setactiveQuestionApproval}) => {
  const customFetch=useFetch();
  const dispatch=useDispatch();
  const [listUser, setUserList] = useState<User[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    setUserList(filtered);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setInputValue(user.name);
    setUserList([]);
  };
  async function addComent(
    questionId: string,
    userId:String
  ) {
    try {
      const res = await customFetch(`/comment/approve`, {
        method: "POST",
        body: {
          questionId,
          userId
        }
      });
      if (res.statusCode < 200 || res.statusCode >= 400) throw new Error(res.message);
      toast.success(res.message);
      setInputValue('');
      setactiveQuestionApproval({ ...activeQuestionApproval,isActive: false, });
      dispatch(updateQuestionData({questionId, data:{ approveTo:res.data.approveTo,approveToId:res.data.approveToId}}));
      return res.data;
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      throw e;
    }
  }
  const handleSubmit = () => {
    if (selectedUser) {
      console.log('Selected user:', selectedUser,question.id);
      addComent(question.id, selectedUser.id);
    } else {
      alert('Please select a user from the list.');
    }
  };

  return (
    activeQuestionApproval.isActive &&
    activeQuestionApproval.id === question.id && (
      <div className="flex space-x-2">
        <span className="text-base relative">
          <input
            type="text"
            name="username"
            id="mentionuser"
            value={inputValue}
            onChange={handleInputChange}
            className="border p-1 rounded"
            autoComplete="off"
          />

          {listUser.length > 0 && (
            <ul className="absolute bg-white border mt-1 w-full z-10 max-h-40 overflow-y-auto">
              {listUser.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                >
                  {user.name}
                </li>
              ))}
            </ul>
          )}
        </span>
        <button onClick={handleSubmit} className="bg-red-500 text-white px-3 py-1 ">
          S
        </button>
      </div>
    )
  );
};

export default ApprovalInput;
