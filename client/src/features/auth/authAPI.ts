export const loginUserAPI = async (credentials: {
  email: String;
  password: String;
}) => {
  const response = await fetch("http://172.16.16.68:8000/auth/signin", {
    method: "POST",
    credentials:"include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    console.log(credentials)
    console.log(response)
    throw new Error("Invalid credentials");
  }

  let data= await response.json();
  console.log(response,data)
   return data;
};
