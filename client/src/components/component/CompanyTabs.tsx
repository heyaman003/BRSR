import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, FilePlus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompanyTabsProps {
  className?: string;
  setViewMode:(arg0: String)=>void;
}

const CompanyTabs: React.FC<CompanyTabsProps> = ({ className,setViewMode }) => {
  return (
    <Tabs defaultValue="list" className={cn("w-full", className)}>
      <div className="flex justify-center mb-8">
        <TabsList className="grid grid-cols-2 w-full max-w-md bg-green-100 h-[50px]">
          <TabsTrigger onClick={()=>setViewMode('list')} value="list" className="flex items-center gap-2 py-3">
            <Building className="w-4 h-4" />
            <span>List Companies</span>
          </TabsTrigger>
          <TabsTrigger onClick={()=>setViewMode('create')} value="create" className="flex items-center gap-2 py-3">
            <FilePlus className="w-4 h-4" />
            <span>Create Company</span>
          </TabsTrigger>
        </TabsList>
      </div>
    </Tabs>
  );
};

export default CompanyTabs;