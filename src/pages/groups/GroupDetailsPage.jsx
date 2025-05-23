// src/pages/GroupDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./GroupDetailsPage.css";

const GroupDetailsPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/v1/groups/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroup(res.data);
      } catch (err) {
        console.error("Failed to fetch group details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  if (loading) return <div className="group-details-loading">Loading...</div>;
  if (!group)
    return <div className="group-details-error">Group not found.</div>;

  return (
    <div className="group-details-container">
      <h2 className="group-details-title">{group.name}</h2>
      <p>
        <strong>Language:</strong> {group.language}
      </p>
      <p>
        <strong>Start Date:</strong> {group.startEducationDate?.split("T")[0]}
      </p>
      <p>
        <strong>Participants:</strong> {group.currentParticipants} /{" "}
        {group.maxParticipants}
      </p>
      <p>
        <strong>Teacher:</strong> {group.teacher}
      </p>
      <p>
        <strong>Course:</strong> {group.course}
      </p>

      <div className="group-students-section">
        <h3>Enrolled Students</h3>
        {group.childrenEnrolled?.length > 0 ? (
          <ul className="group-students-list">
            {group.childrenEnrolled.map((student, index) => (
              <li key={index} className="group-student-item">
                {student.name} — {student.age} y.o.
              </li>
            ))}
          </ul>
        ) : (
          <p>No students enrolled.</p>
        )}
      </div>
    </div>
  );
};

export default GroupDetailsPage;
