// src/features/center/educationCenterService.js
import axios from "axios";
import { authHeader } from "../../utils/authHeader";
const API_URL = "http://balaguide.netbird.cloud:8081/api/v1/education-centers";

export const createEducationCenter = async (centerData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${API_URL}/create`, centerData, {
    headers: authHeader(),
  });

  return response.data;
};
