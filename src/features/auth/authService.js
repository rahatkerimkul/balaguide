import axios from "axios";
import { authHeader } from "../../utils/authHeader";
const USE_MOCK = process.env.NODE_ENV === "development";
const API_URL = USE_MOCK ? "" : "https://balaguide-clone.netbird.cloud:8081";

export const signIn = async (phoneNumber, password) => {
  console.log("Sending:", { phoneNumber, password });
  const response = await axios.post(
    `${API_URL}/api/v1/auth/sign-in`,
    {
      phoneNumber,
      password,
    },
    { headers: authHeader() }
  );

  return response.data;
};

export const signUp = async (phoneNumber, password, role) => {
  const response = await axios.post(
    `${API_URL}/auth/sign-up`,
    {
      phoneNumber,
      password,
      role,
    },
    { headers: authHeader() }
  );
  return response.data;
};
