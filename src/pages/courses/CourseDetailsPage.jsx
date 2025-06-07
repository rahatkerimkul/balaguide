// src/pages/courses/CourseDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { FaDollarSign, FaClock, FaChild, FaTag } from "react-icons/fa";

const CourseDetailsPage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axiosInstance.get(`/api/v1/courses/${courseId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setCourse(res.data);
            } catch (error) {
                console.error("Ошибка при загрузке курса", error);
            }
        };

        fetchCourse();
    }, [courseId]);

    if (!course) return <div className="p-8">Загрузка...</div>;

    return (
        <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
            <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>

            <div className="space-y-2 text-sm text-gray-800">
                <div className="flex items-center gap-2">
                    <FaDollarSign className="text-blue-500" />
                    <span>{course.price} ₸</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaClock className="text-blue-500" />
                    <span>{course.durabilityByWeeks} недель × {course.numberOfLessonsInWeek} в неделю</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaChild className="text-blue-500" />
                    <span>Возраст: {course.ageRange}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaTag className="text-blue-500" />
                    <span>{course.courseCategory}</span>
                </div>
            </div>

            {/* Показываем content если есть */}
            {course.content && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Содержание курса:</h2>
                    <ul className="space-y-2">
                        {Object.entries(course.content).map(([lessonKey, lesson]) => (
                            <li
                                key={lessonKey}
                                className="border rounded-md p-4 bg-gray-50"
                            >
                                <h3 className="font-bold mb-1">{lesson.topic}</h3>
                                <p className="text-sm text-gray-600">{lesson.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CourseDetailsPage;
