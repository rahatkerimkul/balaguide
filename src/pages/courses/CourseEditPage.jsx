//src/pages/courses/CourseEditPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getCoursesByCenterId, updateCourse} from "./CoursesPageService";

const CourseEditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        courseCategory: "",
        ageRange: "",
        price: 0,
        numberOfLessonsInWeek: 0,
        durabilityByWeeks: 0,
        // content добавим позже
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCoursesByCenterId(id);
                setForm(data);
            } catch (err) {
                console.error("Ошибка при получении курса", err);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCourse(id, form);
            alert("Курс обновлён!");
            navigate("/courses");
        } catch (err) {
            console.error("Ошибка при обновлении курса", err);
            alert("Ошибка при обновлении курса");
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Редактировать курс</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" value={form.name} onChange={handleChange} className="input w-full" placeholder="Название" />
                <textarea name="description" value={form.description} onChange={handleChange} className="textarea w-full" placeholder="Описание" />

                <select name="courseCategory" value={form.courseCategory} onChange={handleChange} className="select w-full">
                    <option value="">Выберите категорию</option>
                    <option value="PROGRAMMING">Программирование</option>
                    <option value="SPORT">Спорт</option>
                    <option value="LANGUAGES">Языки</option>
                    <option value="ART">Искусство</option>
                    <option value="MATH">Математика</option>
                </select>

                <input name="ageRange" value={form.ageRange} onChange={handleChange} className="input w-full" placeholder="Возраст (например, 6-10)" />
                <input name="price" type="number" value={form.price} onChange={handleChange} className="input w-full" placeholder="Цена" />
                <input name="numberOfLessonsInWeek" type="number" value={form.numberOfLessonsInWeek} onChange={handleChange} className="input w-full" placeholder="Уроков в неделю" />
                <input name="durabilityByWeeks" type="number" value={form.durabilityByWeeks} onChange={handleChange} className="input w-full" placeholder="Длительность (в неделях)" />

                <button type="submit" className="btn btn-primary w-full">Сохранить изменения</button>
            </form>
        </div>
    );
};

export default CourseEditPage;
