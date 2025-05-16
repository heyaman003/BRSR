import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { AtSign } from 'lucide-react'; // assuming you’re using Lucide icons
import { Question } from '@/models/models';
import { User } from "@/lib/types";
import ApprovalInput from '../user.approve';
import MentionInput from '../user.mentioned';

interface ActiveQuestionState {
    id: string;
    isActive: boolean;
  }
interface QuestionComponentProps {
    question:Question,
    listUser:User[],
    role:string,
    setUserToMention: (questionId: string) => void,
    setUserApproval: (questionId: string) => void,
    activeQuestionMention: ActiveQuestionState,
    setactiveQuestionMention: Dispatch<SetStateAction<ActiveQuestionState>>; 
    activeQuestionApproval: ActiveQuestionState;
    setactiveQuestionApproval:  Dispatch<SetStateAction<ActiveQuestionState>>; 
  
}
const QuestionComponent: React.FC<QuestionComponentProps> = ({
    question, listUser, role, setUserToMention, setUserApproval, activeQuestionMention, setactiveQuestionMention, activeQuestionApproval, setactiveQuestionApproval }) => {
  const [activeTab, setActiveTab] = useState('assign'); // 'assign' or 'approval'
  return (
    <div className="space-y-2">
      {role === "SUPERADMIN" && (
        <div className="flex items-center gap-3">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="assign">Assign</option>
            <option value="approval">Approval</option>
          </select>

          {activeTab === 'assign' && (
            <button
              onClick={() => setUserToMention(question.id)}
              className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition-colors text-sm font-medium"
            >
              <AtSign size={14} />
              <span className="text-[13px] text-wrap">
                {listUser.find(user => user?.id === question?.assignedToId)?.name || 'assign'}
              </span>
            </button>
          )}

          {activeTab === 'approval' && (
            <button
              onClick={() => setUserApproval(question.id)}
              className="flex items-center gap-1 text-red-600 hover:text-yellow-700 transition-colors text-sm font-medium"
            >
              <AtSign size={14} />
              <span className="text-[13px] text-wrap">
                {listUser.find(user => user?.id === question?.approveToId)?.name || 'approval'}
              </span>
            </button>
          )}
        </div>
      )}

      {/* Conditionally render input fields */}
      {activeTab === 'assign' && (
        <MentionInput
          question={question}
          activeQuestionMention={activeQuestionMention}
          setactiveQuestionMention={setactiveQuestionMention}
          users={listUser}
        />
      )}

      {activeTab === 'approval' && (
        <ApprovalInput
          question={question}
          activeQuestionApproval={activeQuestionApproval}
          setactiveQuestionApproval={setactiveQuestionApproval}
          users={listUser}
        />
      )}
    </div>
  );
};

export default QuestionComponent;
