import React, { useState } from "react";
import axios from "axios";
import "./CreateCoursePage.css";

const CreateCoursePage = () => {
  const [formData, setFormData] = useState({
    educationCenterId: 1, // 👈 Replace with actual EC ID if available dynamically
    name: "",
    description: "",
    courseCategory: "",
    ageRange: "",
    price: "",
    durability: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/v1/courses/create",
        {
          ...formData,
          price: parseFloat(formData.price),
          durability: parseInt(formData.durability),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Course created successfully!");
      setFormData({
        educationCenterId: 1,
        name: "",
        description: "",
        courseCategory: "",
        ageRange: "",
        price: "",
        durability: "",
      });
    } catch (err) {
      console.error("Error creating course", err);
      alert("Failed to create course.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course-container">
      <h2 className="create-course-title">Create New Course</h2>
      <form onSubmit={handleSubmit} className="create-course-form">
        <label className="create-course-label">
          Course Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="create-course-input"
            required
          />
        </label>

        <label className="create-course-label">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="create-course-textarea"
            rows="3"
          />
        </label>

        <label className="create-course-label">
          Course Category:
          <input
            type="text"
            name="courseCategory"
            value={formData.courseCategory}
            onChange={handleChange}
            className="create-course-input"
            required
          />
        </label>

        <label className="create-course-label">
          Age Range (e.g., 7–10):
          <input
            type="text"
            name="ageRange"
            value={formData.ageRange}
            onChange={handleChange}
            className="create-course-input"
            required
          />
        </label>

        <label className="create-course-label">
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="create-course-input"
            required
          />
        </label>

        <label className="create-course-label">
          Durability (in weeks):
          <input
            type="number"
            name="durability"
            value={formData.durability}
            onChange={handleChange}
            className="create-course-input"
            required
          />
        </label>

        <button
          type="submit"
          className="create-course-button"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
};

export default CreateCoursePage;
