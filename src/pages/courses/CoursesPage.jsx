// src/pages/courses/CoursesPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCoursesByCenterId } from "./CoursesPageService";
import { FaDollarSign, FaClock, FaChild, FaTag } from "react-icons/fa";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const centerId = user?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCoursesByCenterId(centerId);
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    fetchCourses();
  }, [centerId]);

  return (
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
              <div
                  key={course.id}
                  onClick={() => navigate(`/courses/${course.id}`)}
                  className="rounded-2xl bg-blue-50 hover:bg-blue-100 transition-shadow shadow-md hover:shadow-xl p-5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-2">
              <span className="bg-yellow-300 text-black text-xs font-semibold px-2 py-1 rounded">
                Hit of sales
              </span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                Course
              </span>
                </div>

                <h3 className="text-lg font-semibold mb-2">{course.courseName}</h3>
                <p className="text-sm text-gray-600 mb-4">{course.description}</p>

                <div className="text-sm text-gray-800 flex flex-col gap-1 mt-auto">
              <span>
                <FaDollarSign className="inline-block mr-1 text-base" />{" "}
                {course.price} ₸
              </span>
                  <span>
                <FaClock className="inline-block mr-1 text-base" />{" "}
                    {course.durabilityByWeeks} нед.
              </span>
                  <span>
                <FaChild className="inline-block mr-1 text-base" /> Возраст:{" "}
                    {course.ageRange}
              </span>
                  <span>
                <FaTag className="inline-block mr-1 text-base" />{" "}
                    {course.courseCategory}
              </span>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};
export default CoursesPage;
