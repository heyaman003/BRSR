import React, { useState } from "react";
import { User } from "@/lib/types";
import { Trash2 } from "lucide-react";
import ConfirmDialog from "../ConfirmDialog";
import { toast } from "sonner";

interface UserCardProps {
  user: User;
  index: number;
  deleteUserFromState: Function
}

const UserCard: React.FC<UserCardProps> = ({ user, index, deleteUserFromState }) => {
  // Calculate delay for staggered animation
  const delay = `${index * 50}ms`;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="glass bg-card rounded-xl p-6 animate-scale-in hover:shadow-md transition-all duration-300 relative overflow-hidden group"
      style={{ animationDelay: delay }}
    >
      <ConfirmDialog
        agreeTitle="Yes"
        disagreeTitle="No"
        heading="Are you sure?"
        message="This operation can't be undone."
        isOpen={isOpen}
        onAgree={() => {
          deleteUser(user.id).then(()=>deleteUserFromState(user.id))
          setIsOpen(false);
        }}
        onDisagree={() => {
          setIsOpen(false);
        }}
      />
      {/* Delete user button */}
      <button
        onClick={() => setIsOpen(true)}
        className="float-right text-gray-400 hover:text-gray-800 duration-150"
      >
        <Trash2 />
      </button>

      {/* Background pattern - only visible on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Decorative leaf corner - only visible on hover */}
      <div className="absolute -bottom-8 -right-8 w-16 h-16 rotate-45 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex items-start gap-4 relative z-10">
        <div className="flex-shrink-0 transform group-hover:scale-105 transition-transform duration-300">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center text-white font-medium shadow-md">
            <span className="capitalize">{user.name.charAt(0)}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors duration-300">
            {user.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

const deleteUser = async (userId: string) => {
  try {
    const raw = await fetch(`${import.meta.env.VITE_SERVER_URI}/user/${userId}`, {method: 'DELETE', credentials: 'include', headers:{'X-Csrf-Token': localStorage.getItem('X-Csrf-Token') || ''}});
    const res = await raw.json();
    if (raw.status < 200 || raw.status >= 400) throw new Error(res.message);
    toast.success(res.message)
  } catch (e) {
    if(e instanceof Error)
      toast.error('User deletion failed: '+e.message);
    console.log(e);
    throw(e);
  }
};
