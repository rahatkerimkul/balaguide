// src/pages/CreateGroupPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateGroupPage.css";

const CreateGroupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    minParticipants: "",
    maxParticipants: "",
    startEducationDate: "",
    language: "EN",
    course: "",
    teacher: "",
  });

  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch courses and teachers (replace URLs with real endpoints)
    axios.get("/api/v1/courses").then((res) => setCourses(res.data));
    axios.get("/api/v1/teachers").then((res) => setTeachers(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      ...formData,
      minParticipants: parseInt(formData.minParticipants),
      maxParticipants: parseInt(formData.maxParticipants),
      currentParticipants: 0,
      groupFull: false,
    };

    try {
      const token = localStorage.getItem("token"); // Adjust if stored differently
      await axios.post("/api/v1/groups/create", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Group created successfully!");
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create group.");
    }
  };

  return (
    <div className="create-group-container">
      <h2 className="create-group-title">Create New Group</h2>
      <form onSubmit={handleSubmit} className="create-group-form">
        <label className="create-group-label">
          Group Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="create-group-input"
            required
          />
        </label>

        <label className="create-group-label">
          Min Participants:
          <input
            type="number"
            name="minParticipants"
            value={formData.minParticipants}
            onChange={handleChange}
            className="create-group-input"
            required
          />
        </label>

        <label className="create-group-label">
          Max Participants:
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            className="create-group-input"
            required
          />
        </label>

        <label className="create-group-label">
          Start Date:
          <input
            type="date"
            name="startEducationDate"
            value={formData.startEducationDate}
            onChange={handleChange}
            className="create-group-input"
            required
          />
        </label>

        <label className="create-group-label">
          Language:
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="create-group-select"
          >
            <option value="EN">English</option>
            <option value="KZ">Kazakh</option>
            <option value="RU">Russian</option>
          </select>
        </label>

        <label className="create-group-label">
          Course:
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="create-group-select"
            required
          >
            <option value="">Select course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </label>

        <label className="create-group-label">
          Teacher:
          <select
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            className="create-group-select"
            required
          >
            <option value="">Select teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="create-group-button">
          Create Group
        </button>
      </form>
    </div>
  );
};

export default CreateGroupPage;
