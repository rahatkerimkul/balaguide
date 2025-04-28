// src/features/auth/authService.js
import axios from "axios";

const BASE_URL = "http://balaguide.netbird.cloud:8081"; // Local server from Swagger

export const signUp = async (phoneNumber, password, role) => {
  const response = await axios.post(`${BASE_URL}/auth/sign-up`, {
    phoneNumber,
    password,
    role,
  });
  return response.data;
};

export const signIn = async (phoneNumber, password) => {
  const response = await axios.post(`${BASE_URL}/auth/sign-in`, {
    phoneNumber,
    password,
  });
  return response.data;
};
