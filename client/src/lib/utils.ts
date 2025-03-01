import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const listSections = async (companyId: string): Promise<Object[]> => {
  const raw = await fetch(
    `${import.meta.env.VITE_SERVER_URI}/company/${companyId}/sections`,{credentials:"include", headers: {'X-Csrf-Token': localStorage.getItem('X-Csrf-Token') || ''}}
  );
  const res = await raw.json();
  console.log(res.data,"the data is")
  return res.data;
};

