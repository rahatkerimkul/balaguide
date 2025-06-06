// src/pages/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

const DashboardHome = () => {
    const [totalRevenue, setTotalRevenue] = useState(null);
    const [topCourses, setTopCourses] = useState([]);
    const [childrenPerCourse, setChildrenPerCourse] = useState([]);
    const [revenueByMonth, setRevenueByMonth] = useState([]);
    const [childrenGrowth, setChildrenGrowth] = useState([]);
    const [avgDuration, setAvgDuration] = useState(null);
    const [avgFillPercent, setAvgFillPercent] = useState(null);
    const [returningParentsCount, setReturningParentsCount] = useState(null);
    const [loading, setLoading] = useState(false);

    const centerId = 1;

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const endpoints = [
                ["total-revenue", setTotalRevenue],
                ["top-courses-by-revenue", setTopCourses],
                ["children-per-course", setChildrenPerCourse],
                ["revenue-by-month", setRevenueByMonth],
                ["children-growth-by-month", setChildrenGrowth],
                ["average-course-duration", setAvgDuration],
                ["average-group-fill-percent", setAvgFillPercent],
                ["returning-parents-count", setReturningParentsCount],
            ];

            await Promise.all(
                endpoints.map(async ([path, setter]) => {
                    const res = await axiosInstance.get(`/api/v1/education-centers/${centerId}/dashboard/${path}`);
                    setter(res.data.data);
                })
            );
        } catch (err) {
            console.error("❌ Ошибка загрузки данных дашборда:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">📊 Обзор центра</h2>
                <button
                    onClick={fetchDashboard}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    🔄 Обновить
                </button>
            </div>

            {/* 💰 Общая выручка */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg">💰 Общая выручка</h3>
                <p className="text-2xl">{totalRevenue?.toLocaleString("ru-RU")} ₸</p>
            </div>

            {/* 📈 График: Выручка по месяцам */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg mb-2">📈 Выручка по месяцам</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueByMonth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" name="₸ Выручка" stroke="#4F46E5" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* 👶 График: Рост детей по месяцам */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg mb-2">👶 Рост количества детей</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={childrenGrowth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="childrenCount" name="Дети" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* 🏆 Топ курсы */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg">🏆 Топ курсы по выручке</h3>
                <ul>
                    {topCourses.map((course, i) => (
                        <li key={i}>
                            {course.courseName} — {course.revenue.toLocaleString("ru-RU")} ₸
                        </li>
                    ))}
                </ul>
            </div>

            {/* 👥 Дети по курсам */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg">👥 Дети по курсам</h3>
                <ul>
                    {childrenPerCourse.map((c, i) => (
                        <li key={i}>
                            {c.courseName}: {c.childrenCount} детей
                        </li>
                    ))}
                </ul>
            </div>

            {/* 📚 Длительность курса */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg">📚 Средняя длительность курса</h3>
                <p>{avgDuration} недель</p>
            </div>

            {/* 📊 Заполняемость групп */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg">📊 Средняя заполняемость групп</h3>
                <p>{avgFillPercent?.toFixed(1)}%</p>
            </div>

            {/* 🔁 Повторные родители */}
            <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold text-lg">🔁 Повторно оплатившие родители</h3>
                <p>{returningParentsCount}</p>
            </div>
        </div>
    );
};

export default DashboardHome;
