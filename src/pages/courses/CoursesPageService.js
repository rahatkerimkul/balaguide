// src/services/CoursesPageService.js
import axiosInstance from "../../utils/axiosInstance";

const API_URL = "/api/v1";

export const getCoursesByCenterId = async (centerId) => {
    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(
        `${API_URL}/education-centers/${centerId}/courses`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
