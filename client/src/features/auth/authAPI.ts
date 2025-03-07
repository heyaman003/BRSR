export const loginUserAPI = async (credentials: {
  email: String;
  password: String;
}) => {
  const response = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    console.log(credentials)
    throw new Error("Invalid credentials");
  }

  let data= await response.json();
  console.log(response,data)
   return data;
};
