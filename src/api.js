const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

export const apiCall = async (endpoint, method = "GET", data = null) => {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const config = { method, headers, body: data ? JSON.stringify(data) : null };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Request failed");
    }
    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};