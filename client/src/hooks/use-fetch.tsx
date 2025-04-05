import { useNavigate } from "react-router-dom";

export const useFetch = () => {
  const navigate = useNavigate();
  return async (
    endpoint: string,
    {
      method,
      body
    }: {
      method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
      body?: any;
    }
  ): Promise<any> => {
    const headers = {
      "Content-Type": "application/json",
      "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
    };

    const response = await fetch(`${import.meta.env.VITE_SERVER_URI}${endpoint}`, {
      method,
      headers,
      credentials: "include",
      ...(body && { body: JSON.stringify(body) }),
    });
    if (response.status === 401) {
      navigate("/login");
      throw new Error("Unauthorized: Please login again.");
    }
    const data = await response.json();
    if (response.status > 399 || response.status < 200) {
      throw new Error(data.message);
    }
    return data;
  };
};
