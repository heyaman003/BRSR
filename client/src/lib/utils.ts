import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const listSections = async (companyId: string): Promise<Object[]> => {
  const raw = await fetch(
    `http://localhost:8000/company/${companyId}/sections`,{credentials:"include"}
  );
  const res = await raw.json();
  console.log(res.data,"the data is")
  return res.data;
};

