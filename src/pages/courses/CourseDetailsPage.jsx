// src/pages/courses/CourseDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Modal from "react-modal";
import { FaPlus, FaEdit, FaDollarSign, FaClock, FaChild, FaTag } from "react-icons/fa";
import { updateCourse } from "./CoursesPageService";

Modal.setAppElement("#root");

const CourseDetailsPage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editForm, setEditForm] = useState(null);
    const [isEditingContent, setIsEditingContent] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await axiosInstance.get(`/api/v1/courses/${courseId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setCourse(res.data);
                setEditForm(res.data);
            } catch (error) {
                console.error("Ошибка при загрузке курса", error);
            }
        };
        fetchCourse();
    }, [courseId]);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const updated = await updateCourse(course.id, editForm);
            setCourse(updated);
            setIsEditOpen(false);
            alert("Course Updated Successfully!");
        } catch (err) {
            console.error("Ошибка при обновлении курса", err);
            alert("Ошибка при обновлении курса");
        }
    };

    const handleAddLesson = () => {
        const currentLessons = editForm.content || {};
        const lessonCount = Object.keys(currentLessons).length + 1;
        const newKey = `Lesson_${lessonCount}`;
        setEditForm((prev) => ({
            ...prev,
            content: {
                ...currentLessons,
                [newKey]: { topic: "", description: "" },
            },
        }));
    };

    if (!course) return <div className="p-8">Загрузка...</div>;

    return (
        <div className="p-8 max-w-3xl mx-auto bg-white shadow-lg rounded-xl">
            <div className="flex justify-between items-center mt-8 mb-4">
                <h1 className="text-3xl font-bold">{course.name}</h1>
                <button
                    onClick={() => setIsEditOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    <FaEdit className="text-base" />
                </button>
            </div>

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

            {(course.content || editForm?.content) && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-semibold">Содержание курса:</h2>
                        <label className="flex items-center gap-3 text-base font-medium text-gray-800">
                            <input
                                type="checkbox"
                                checked={isEditingContent}
                                onChange={() => setIsEditingContent((prev) => !prev)}
                                className="w-5 h-5 accent-[#5463d6] cursor-pointer"
                            />
                            Edit
                        </label>
                    </div>

                    {!isEditingContent ? (
                        <ul className="space-y-2">
                            {Object.entries(course.content).map(([lessonKey, lesson]) => (
                                <li key={lessonKey} className="border rounded-md p-4 bg-gray-50">
                                    <h3 className="font-bold mb-1">{lesson.topic}</h3>
                                    <p className="text-sm text-gray-600">{lesson.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <>
                            <ul className="space-y-2">
                                {Object.entries(editForm.content).map(([lessonKey, lesson]) => (
                                    <li key={lessonKey} className="border rounded-md p-4 bg-gray-50 space-y-2">
                                        <input
                                            type="text"
                                            className="w-full border p-2 rounded"
                                            placeholder="Тема урока"
                                            value={lesson.topic}
                                            onChange={(e) =>
                                                setEditForm((prev) => ({
                                                    ...prev,
                                                    content: {
                                                        ...prev.content,
                                                        [lessonKey]: {
                                                            ...prev.content[lessonKey],
                                                            topic: e.target.value,
                                                        },
                                                    },
                                                }))
                                            }
                                        />
                                        <textarea
                                            className="w-full border p-2 rounded"
                                            placeholder="Описание урока"
                                            value={lesson.description}
                                            onChange={(e) =>
                                                setEditForm((prev) => ({
                                                    ...prev,
                                                    content: {
                                                        ...prev.content,
                                                        [lessonKey]: {
                                                            ...prev.content[lessonKey],
                                                            description: e.target.value,
                                                        },
                                                    },
                                                }))
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={handleAddLesson}
                                className="mt-4 w-full py-3 text-sm bg-[#5463d6] text-white rounded-xl hover:bg-[#3e4db8] font-semibold flex items-center justify-center gap-2"
                            >
                                <FaPlus className="text-base" />
                                Add Lesson
                            </button>
                        </>
                    )}
                </div>
            )}

            <Modal
                isOpen={isEditOpen}
                onRequestClose={() => setIsEditOpen(false)}
                contentLabel="Редактировать курс"
                className="bg-white p-6 max-w-xl max-h-[90vh] overflow-y-auto mx-auto mt-20 rounded shadow-lg outline-none"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
            >
                <h2 className="text-xl font-bold mb-4">Edit course</h2>

                {editForm && (
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <input
                            name="name"
                            value={editForm.name}
                            onChange={handleEditChange}
                            className="w-full border p-2 rounded"
                            placeholder="Название"
                        />
                        <textarea
                            name="description"
                            value={editForm.description}
                            onChange={handleEditChange}
                            className="w-full border p-2 rounded"
                            placeholder="Описание"
                        />
                        <select
                            name="courseCategory"
                            value={editForm.courseCategory}
                            onChange={handleEditChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="PROGRAMMING">Программирование</option>
                            <option value="SPORT">Спорт</option>
                            <option value="LANGUAGES">Языки</option>
                            <option value="ART">Искусство</option>
                            <option value="MATH">Математика</option>
                        </select>
                        <input
                            name="ageRange"
                            value={editForm.ageRange}
                            onChange={handleEditChange}
                            className="w-full border p-2 rounded"
                            placeholder="Возраст (например, 6-10)"
                        />
                        <input
                            name="price"
                            type="number"
                            value={editForm.price}
                            onChange={handleEditChange}
                            className="w-full border p-2 rounded"
                            placeholder="Цена"
                        />
                        <input
                            name="numberOfLessonsInWeek"
                            type="number"
                            value={editForm.numberOfLessonsInWeek}
                            onChange={handleEditChange}
                            className="w-full border p-2 rounded"
                            placeholder="Уроков в неделю"
                        />
                        <input
                            name="durabilityByWeeks"
                            type="number"
                            value={editForm.durabilityByWeeks}
                            onChange={handleEditChange}
                            className="w-full border p-2 rounded"
                            placeholder="Длительность (в неделях)"
                        />

                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsEditOpen(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default CourseDetailsPage;
