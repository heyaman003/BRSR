export const sectionfetchAPI = async (companyDesc:{companyID:String}): Promise<Object[]> => {
    const response = await fetch(`http://localhost:8000/company/${companyDesc.companyID}/sections`, {
      method: "GET",
      credentials:"include",
    });
    if (!response.ok) {
      console.log(companyDesc.companyID)
      console.log(response)
      throw new Error("Invalid companyId");
    }
  
    let data= await response.json();
    console.log(response,data)
     return data;
  };
  