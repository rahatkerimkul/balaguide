// src/features/teacher/teacherService.js
import axios from "axios";
import { authHeader } from "../../utils/authHeader";
const API_URL = "http://balaguide.netbird.cloud:8081/api/v1/teachers";

export const createTeacher = async (teacherData) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${API_URL}/create`, teacherData, {
    headers: authHeader(),
  });

  return response.data;
};
