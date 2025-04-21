import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

/**
 * Custom hook for fetching API data that bstracts the need of attaching CSRF and security related headers with every request decreasing redundancy in code.
 * @returns a function that can be used to make API calls
 */
export const useFetch = () => {
  const navigate = useNavigate();
  return async (
    endpoint: string,
    {
      method,
      body,
      keepalive = false
    }: {
      method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
      body?: any;
      keepalive?: boolean
    }
  ): Promise<any> => {

    const headers = {
      "Content-Type": "application/json",
      "X-Csrf-Token": sessionStorage.getItem("X-Csrf-Token") || "",
    };

    const response = await fetch(`${import.meta.env.VITE_SERVER_URI}${endpoint}`, {
      method,
      headers,
      credentials: "include", //Attaches the csrf and security related cookie with the request
      ...(body && { body: JSON.stringify(body) }),
      keepalive
    });

    // When not loggedin navigate to /login page
    if (response.status === 401) {
      navigate("/login");
      throw new Error("Unauthorized: Please login again.");
    }

    if(response.status === 404) {
      navigate("/notfound")
    }

    const data = await response.json();
   console.log(data);
    if (response.status > 399 || response.status < 200) {
      toast.error("Something went wrong.")
      throw new Error(data.message);
    }
    return data;
  };
};
