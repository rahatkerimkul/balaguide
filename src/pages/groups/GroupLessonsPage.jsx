// src/pages/GroupLessonsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./GroupLessonsPage.css";
import { QRCodeCanvas } from "qrcode.react";

const GroupLessonsPage = () => {
  const { id: groupId } = useParams();
  const role = localStorage.getItem("role");

  const [lessons, setLessons] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    lessonNumber: "",
    topic: "",
    description: "",
    fileUrl: "",
    date: "",
    scheduleId: "",
  });

  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/v1/lessons/group/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLessons(res.data);
    } catch (err) {
      console.error("Failed to load lessons", err);
    }
  };

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/v1/schedules/group/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchedules(res.data);
    } catch (err) {
      console.error("Failed to load schedules", err);
    }
  };

  useEffect(() => {
    fetchLessons();
    fetchSchedules();
  }, [groupId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/v1/lessons",
        {
          ...formData,
          lessonNumber: formData.lessonNumber
            ? parseInt(formData.lessonNumber)
            : null,
          groupId: groupId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Lesson created!");
      setFormData({ topic: "", date: "", scheduleId: "" });
      fetchLessons(); // refresh list
    } catch (err) {
      console.error("Failed to create lesson", err);
      alert("Error creating lesson.");
    }
  };

  return (
    <div className="group-lessons-container">
      <h2>Lessons for Group #{groupId}</h2>

      {(role === "TEACHER" || role === "EDUCATION_CENTER") && (
        <form onSubmit={handleSubmit} className="lesson-create-form">
          <label>
            Lesson Number:
            <input
              type="number"
              name="lessonNumber"
              value={formData.lessonNumber}
              onChange={handleChange}
              className="lesson-input"
            />
          </label>

          <label>
            Topic:
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="lesson-input"
              required
            />
          </label>

          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="lesson-input"
              rows="3"
            />
          </label>

          <label>
            File URL (optional):
            <input
              type="text"
              name="fileUrl"
              value={formData.fileUrl}
              onChange={handleChange}
              className="lesson-input"
            />
          </label>

          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="lesson-input"
              required
            />
          </label>

          <label>
            Schedule Slot:
            <select
              name="scheduleId"
              value={formData.scheduleId}
              onChange={handleChange}
              className="lesson-input"
              required
            >
              <option value="">-- Select --</option>
              {schedules.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.dayOfWeek} – {s.startTime} to {s.endTime}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="lesson-submit-button">
            ➕ Create Lesson
          </button>
        </form>
      )}

      <div className="lesson-list">
        {lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <h4>{lesson.topic}</h4>
            <p>
              <strong>Date:</strong> {lesson.date?.split("T")[0]}
            </p>
            <p>
              <strong>Lesson #:</strong> {lesson.lessonNumber}
            </p>
            <QRCodeCanvas
              value={`/scan-attendance?lessonId=${lesson.id}&groupId=${groupId}`}
              size={128}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupLessonsPage;
