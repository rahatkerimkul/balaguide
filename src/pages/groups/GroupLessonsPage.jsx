import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const GroupLessonsPage = () => {
  const { groupId } = useParams();
  const [lessons, setLessons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(`/api/v1/groups/${groupId}/lessons`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLessons(res.data.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, [groupId]);

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
                  <div key={lesson.id} className="bg-white p-4 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-1">
                      Lesson {lesson.lessonNumber}: {lesson.topic}
                    </h3>
                    <p className="mb-1 text-gray-700">{lesson.description}</p>
                    <p className="text-sm text-gray-500">📅 {lesson.date}</p>

                    {lesson.fileUrl && (
                        <a
                            href={lesson.fileUrl}
                            className="block mt-2 text-blue-600 hover:underline"
                            target="_blank" rel="noopener noreferrer"
                        >
                          📥 Download File
                        </a>
                    )}
                  </div>
              ))}
            </div>
        )}
      </div>
  );
};

export default GroupLessonsPage;
