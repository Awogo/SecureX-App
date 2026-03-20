// src/api.js

const API_BASE_URL = "https://securex-backend-ikr8.onrender.com";

export const apiCall = async (endpoint, method = "GET", data = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem("token");

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      // Attach token if available (for protected routes)
      ...(token && { "Authorization": `Bearer ${token}` })
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }
    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};