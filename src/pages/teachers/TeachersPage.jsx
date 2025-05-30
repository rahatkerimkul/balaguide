import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TeachersPage.css";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "EDUCATION CENTER") return;
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/v1/teachers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeachers(res.data);
      } catch (err) {
        console.error("Error fetching teachers", err);
      }
    };
    fetchTeachers();
  }, [role]);

  if (role !== "EDUCATION CENTER") {
    return (
      <div className="teachers-page-container">
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="teachers-page-container">
      <h2>All Teachers</h2>

      <div className="teachers-list">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="teacher-card">
            <h3>
              {teacher.firstName} {teacher.lastName}
            </h3>
            <p>Phone: {teacher.phoneNumber}</p>
            <p>Email: {teacher.email}</p>
            <p>Gender: {teacher.gender}</p>
            <p>Birth Date: {teacher.birthDate}</p>
            <p>Salary: ₸{teacher.salary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachersPage;
