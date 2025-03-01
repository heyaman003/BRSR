export const loginUserAPI = async (credentials: {
  email: String;
  password: String;
}) => {
  const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/auth/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-Csrf-Token": localStorage.getItem("X-Csrf-Token") || "",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Invalid credentials");
  }

  let data = await response.json();
  console.log(response, data);
  return data;
};
