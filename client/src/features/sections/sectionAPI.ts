export const sectionfetchAPI = async (companyDesc:{companyID:String}): Promise<Object[]> => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/company/${companyDesc.companyID}/sections`, {
      method: "GET",
      credentials:"include",
      headers: {
        'X-Csrf-Token': sessionStorage.getItem('X-Csrf-Token') || ''
      }
    });
    if (!response.ok) {
      throw new Error("Invalid companyId");
    }
  
    let data= await response.json();
     return data;
  };
  