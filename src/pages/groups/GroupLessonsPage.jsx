import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { FaDownload, FaUpload, FaCalendarAlt } from "react-icons/fa";
import {toast} from "react-toastify";

const GroupLessonsPage = () => {
  const { groupId } = useParams();
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get(`/api/v1/groups/${groupId}/lessons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLessons(res.data.data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [groupId]);

  const handleDownload = async (lessonId, fileName) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get(`/api/v1/lessons/${lessonId}/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download error:", error);
      toast.error("⚠ Failed to download the file.");
    }
  };

  const handleUpload = async (lessonId, file) => {
    try {
      const token = localStorage.getItem("token");
      const fileBytes = await file.arrayBuffer();
      const uint8Array = new Uint8Array(fileBytes);

      await axiosInstance.post(`/api/v1/lessons/${lessonId}/upload`, uint8Array, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/octet-stream",
        },
        params: { fileName: file.name },
      });

      toast.success("✅ File Uploaded!");
      fetchLessons();
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("⚠ Failed to upload the file.");
    }
  };

  return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Lessons for Group #{groupId}</h2>
          <button
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={() => navigate(-1)}
          >
            ⬅ Back
          </button>
        </div>

        {lessons.length === 0 ? (
            <p>No lessons found for this group.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {lessons.map((lesson) => (
                  <div
                      key={lesson.id}
                      className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
                  >
                    <h3 className="text-lg font-semibold mb-1">
                      Lesson {lesson.lessonNumber}: {lesson.topic}
                    </h3>
                    <p className="mb-1 text-gray-700">{lesson.description}</p>
                    <p className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-1" /> {lesson.date}
                    </p>

                    {lesson.fileUrl ? (
                        <div className="flex flex-col gap-2 mt-3">
                          <button
                              onClick={() => handleDownload(lesson.id, lesson.fileUrl)}
                              className="text-blue-600 hover:underline inline-flex items-center gap-1"
                          >
                            <FaDownload /> Download Materials
                          </button>

                          <label className="text-purple-600 hover:underline cursor-pointer inline-flex items-center gap-1">
                            <FaUpload /> Re-upload
                            <input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) handleUpload(lesson.id, file);
                                }}
                            />
                          </label>
                        </div>
                    ) : (
                        <label className="text-purple-600 hover:underline cursor-pointer inline-flex items-center gap-1 mt-3">
                          <FaUpload /> Upload Materials
                          <input
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) handleUpload(lesson.id, file);
                              }}
                          />
                        </label>
                    )}
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default GroupLessonsPage;
