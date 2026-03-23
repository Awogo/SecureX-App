const BASE_URL = "https://securex-backend-ikr8.onrender.com";

export const apiCall = async (endpoint, method = "GET", data = null) => {
  const url = `${BASE_URL}${endpoint}`; // This combines base + endpoint
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