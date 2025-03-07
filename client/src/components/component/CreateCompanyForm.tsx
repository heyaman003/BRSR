import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface CreateCompanyFormProps {
  onCompanyCreated: (company: { id: number; name: string }) => void;
}

const CreateCompanyForm: React.FC<CreateCompanyFormProps> = ({ onCompanyCreated }) => {
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("i am being called");
    if (!companyName.trim()) {
      toast.error('Please enter a company name');
      return;
    }
    
    // Create a new company with a random ID (in a real app, this would come from the server)
    const newCompany = {
      id: Date.now(),
      name: companyName
    };
    
    // Call the callback to update the parent component
    onCompanyCreated(newCompany);
    
    // Reset the form
    setCompanyName('');
    
    // Show success message
    toast.success(`Company "${companyName}" created successfully!`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-slate-800">Create New Company</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label 
              htmlFor="companyName" 
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
              placeholder="Enter company name"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Create Company
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateCompanyForm;