"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { Search, ChevronLeft, ChevronRight, Plus, Calendar, Loader2, Filter } from "lucide-react"

const getWeekRange = (date) => {
    const monday = new Date(date)
    monday.setDate(date.getDate() - ((date.getDay() + 6) % 7))
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)

    const toISO = (d) => d.toISOString().split("T")[0]
    return {
        startDate: toISO(monday),
        endDate: toISO(sunday),
    }
}

const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
}

export default function AllSchedulesPage() {
    const [schedule, setSchedule] = useState([])
    const [groups, setGroups] = useState([])
    const [teachers, setTeachers] = useState([])
    const [selectedGroup, setSelectedGroup] = useState("")
    const [selectedTeacher, setSelectedTeacher] = useState("")
    const [currentWeek, setCurrentWeek] = useState(() => getWeekRange(new Date("2025-01-10")))
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [viewMode, setViewMode] = useState("week")

    const navigate = useNavigate()

    // Get user data from localStorage
    const getUserData = () => {
        if (typeof window !== "undefined") {
            const user = localStorage.getItem("user")
            return user ? JSON.parse(user) : null
        }
        return null
    }

    const educationCenterId = getUserData()?.id

    useEffect(() => {
        if (educationCenterId) {
            fetchGroups()
            fetchTeachers()
        }
    }, [educationCenterId])

    useEffect(() => {
        if (educationCenterId) {
            fetchSchedule()
        }
    }, [currentWeek, selectedGroup, selectedTeacher, educationCenterId])

    const fetchGroups = async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/education-centers/${educationCenterId}/groups`)
            setGroups(res.data.data)
        } catch (error) {
            console.error("Error fetching groups:", error)
        }
    }

    const fetchTeachers = async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/teachers/${educationCenterId}`)
            setTeachers(res.data.data)
        } catch (error) {
            console.error("Error fetching teachers:", error)
        }
    }

    const fetchSchedule = async () => {
        setIsLoading(true)
        try {
            const res = await axiosInstance.get("/api/v1/schedule/filter", {
                params: {
                    educationCenterId,
                    startDate: currentWeek.startDate,
                    endDate: currentWeek.endDate,
                    ...(selectedGroup ? { groupId: selectedGroup } : {}),
                    ...(selectedTeacher ? { teacherId: selectedTeacher } : {}),
                },
            })
            setSchedule(res.data.data)
        } catch (err) {
            console.error("Error loading schedule", err)
        } finally {
            setIsLoading(false)
        }
    }

    const goToPreviousWeek = () => {
        const newStart = new Date(currentWeek.startDate)
        newStart.setDate(newStart.getDate() - 7)
        setCurrentWeek(getWeekRange(newStart))
    }

    const goToNextWeek = () => {
        const newStart = new Date(currentWeek.startDate)
        newStart.setDate(newStart.getDate() + 7)
        setCurrentWeek(getWeekRange(newStart))
    }

    const goToToday = () => {
        setCurrentWeek(getWeekRange(new Date("2025-01-10")))
    }

    // Group schedule by day for better display
    const scheduleByDay = schedule.reduce((acc, lesson) => {
        const day = lesson.date?.split("T")[0] || lesson.startTime?.split("T")[0]
        if (!acc[day]) acc[day] = []
        acc[day].push(lesson)
        return acc
    }, {})

    // Generate array of days in current week
    const daysInWeek = []
    const startDate = new Date(currentWeek.startDate)
    for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate)
        currentDate.setDate(startDate.getDate() + i)
        const dateString = currentDate.toISOString().split("T")[0]
        daysInWeek.push(dateString)
    }

    // Filter schedule based on search query
    const filteredSchedule = schedule.filter(
        (lesson) =>
            searchQuery === "" ||
            lesson.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lesson.teacherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lesson.groupName?.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Schedule Management</h1>
                        <p className="text-lg text-gray-600">Manage and view all programming course schedules</p>
                    </div>
                    <button
                        onClick={() => navigate("/create-schedule")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                        <Plus className="h-5 w-5" />
                        Create Schedule
                    </button>
                </div>

                {/* Filters Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filters & Search
                        </h2>
                        <p className="text-blue-100 mt-1">Filter schedules by group, teacher, or search by name</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search courses or teachers..."
                                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Group Select */}
                            <select
                                value={selectedGroup}
                                onChange={(e) => setSelectedGroup(e.target.value)}
                                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200"
                            >
                                <option value="">All Groups</option>
                                {groups.map((group) => (
                                    <option key={group.id} value={group.id}>
                                        {group.name}
                                    </option>
                                ))}
                            </select>

                            {/* Teacher Select */}
                            <select
                                value={selectedTeacher}
                                onChange={(e) => setSelectedTeacher(e.target.value)}
                                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200"
                            >
                                <option value="">All Teachers</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.firstName} {teacher.lastName}
                                    </option>
                                ))}
                            </select>

                            {/* View Mode Toggle */}
                            <div className="flex bg-gray-100 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode("week")}
                                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                                        viewMode === "week" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-800"
                                    }`}
                                >
                                    Week View
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                                        viewMode === "list" ? "bg-white text-blue-600 shadow-md" : "text-gray-600 hover:text-gray-800"
                                    }`}
                                >
                                    List View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendar Navigation */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-3 rounded-xl">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Schedule Calendar</h3>
                                <p className="text-gray-600">
                                    {formatDate(currentWeek.startDate)} - {formatDate(currentWeek.endDate)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={goToPreviousWeek}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>
                            <button
                                onClick={goToToday}
                                className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                            >
                                Today
                            </button>
                            <button
                                onClick={goToNextWeek}
                                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200"
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Schedule Content */}
                    <div className="border-t border-gray-100 p-6">
                        {isLoading ? (
                            <div className="flex flex-col justify-center items-center py-16">
                                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                                <span className="text-xl font-medium text-gray-700">Loading schedule...</span>
                                <span className="text-gray-500 mt-2">Please wait while we fetch your data</span>
                            </div>
                        ) : filteredSchedule.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                                    <Calendar className="h-12 w-12 text-gray-400" />
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No lessons scheduled</h3>
                                <p className="text-gray-600 text-lg">No lessons found for the selected filters and time period.</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="text-lg font-medium text-gray-700">
                                        {filteredSchedule.length} lessons found for this week
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                        <span className="text-sm text-gray-600">Active lessons</span>
                                    </div>
                                </div>

                                {viewMode === "week" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                                        {daysInWeek.map((day) => (
                                            <div key={day} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                                                <div className="bg-white px-4 py-3 border-b border-gray-200">
                                                    <div className="font-semibold text-center text-gray-900">{formatDate(day)}</div>
                                                </div>
                                                <div className="p-3 space-y-2 min-h-[200px]">
                                                    {scheduleByDay[day]?.map((lesson, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
                                                        >
                                                            <div className="text-xs font-medium text-blue-600 mb-1">
                                                                {lesson.startTime &&
                                                                    new Date(lesson.startTime).toLocaleTimeString([], {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    })}{" "}
                                                                {lesson.endTime &&
                                                                    "- " +
                                                                    new Date(lesson.endTime).toLocaleTimeString([], {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    })}
                                                            </div>
                                                            <div className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                                                                {lesson.courseName || "Unnamed Course"}
                                                            </div>
                                                            <div className="flex flex-wrap gap-1">
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                                  {lesson.groupName || "No Group"}
                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {!scheduleByDay[day]?.length && (
                                                        <div className="text-center text-sm text-gray-500 py-8">No lessons</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {daysInWeek.map((day) => (
                                            <div
                                                key={day}
                                                className={`bg-gray-50 rounded-xl border border-gray-200 overflow-hidden ${
                                                    !scheduleByDay[day]?.length ? "opacity-60" : ""
                                                }`}
                                            >
                                                <div className="bg-white px-6 py-4 border-b border-gray-200">
                                                    <h3 className="text-lg font-semibold text-gray-900">{formatDate(day)}</h3>
                                                </div>
                                                {scheduleByDay[day]?.length ? (
                                                    <div className="p-4 space-y-3">
                                                        {scheduleByDay[day]?.map((lesson, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
                                                            >
                                                                <div className="flex justify-between items-start">
                                                                    <div className="flex-1">
                                                                        <h4 className="font-semibold text-gray-900 text-lg mb-1">
                                                                            {lesson.courseName || "Unnamed Course"}
                                                                        </h4>
                                                                        <p className="text-gray-600 mb-2">
                                                                            {lesson.teacherName || "No Teacher"} • {lesson.groupName || "No Group"}
                                                                        </p>
                                                                    </div>
                                                                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-medium text-sm">
                                                                        {lesson.startTime &&
                                                                            new Date(lesson.startTime).toLocaleTimeString([], {
                                                                                hour: "2-digit",
                                                                                minute: "2-digit",
                                                                            })}{" "}
                                                                        {lesson.endTime &&
                                                                            "- " +
                                                                            new Date(lesson.endTime).toLocaleTimeString([], {
                                                                                hour: "2-digit",
                                                                                minute: "2-digit",
                                                                            })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="p-6 text-center text-gray-500">No lessons scheduled for this day</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
