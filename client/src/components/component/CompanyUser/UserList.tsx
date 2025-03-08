import React, { useState } from "react";
import { User } from "@/lib/types";
import UserCard from "./UserCard";
import CreateUserForm from "./CreateUserForm";

interface UserListProps {
  users: User[];
  deleteUserFromState: Function;
  companyId: string;
}

const UserList: React.FC<UserListProps> = ({
  companyId,
  users,
  deleteUserFromState,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 px-4 py-2 pl-10 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ease-in-out"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <p className="mt-2 mb-10 text-sm text-muted-foreground relative">
          Showing {filteredUsers.length} of {users.length} users

          {<span className="absolute right-0"><CreateUserForm companyId={companyId} /></span>}
        </p>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredUsers.map((user, index) => (
            <UserCard
              key={user.id}
              user={user}
              index={index}
              deleteUserFromState={deleteUserFromState}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No users found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
};

export default UserList;
