// src/utils/storage.js

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Get role
export const getRole = () => {
  return localStorage.getItem("role");
};

// Get user object
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Clear all auth data
export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
};
