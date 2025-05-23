// src/pages/GroupsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GroupsPage.css";
import { useNavigate } from "react-router-dom";

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/v1/groups", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroups(res.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="groups-page-container">
      <h2 className="groups-page-title">All Groups</h2>
      <div className="groups-page-actions">
        <button
          className="groups-create-button"
          onClick={() => navigate("/create-group")}
        >
          ➕ Create Group
        </button>
      </div>

      <div className="groups-list">
        {groups.map((group) => (
          <div key={group.id} className="group-card">
            <h3 className="group-name">{group.name}</h3>
            <p>Language: {group.language}</p>
            <p>
              Participants: {group.currentParticipants} /{" "}
              {group.maxParticipants}
            </p>
            <p>Start Date: {group.startEducationDate?.split("T")[0]}</p>
            <p>Course ID: {group.course}</p>
            <p>Teacher ID: {group.teacher}</p>
            {group.groupFull && (
              <p className="group-full-flag">⚠ Group is full</p>
            )}
            <button
              className="group-lessons-button"
              onClick={() => navigate(`/groups/${group.id}/lessons`)}
            >
              📚 View Lessons
            </button>
            <button
              className="group-details-button"
              onClick={() => navigate(`/groups/${group.id}`)}
            >
              Group Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupsPage;
