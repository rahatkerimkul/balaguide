// src/pages/AllSchedulesPage.jsx
import React from "react";
import AllGroupScheduleCalendar from "../../components/AllGroupScheduleCalendar";
import { useNavigate } from "react-router-dom";
const AllSchedulesPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 style={{ padding: "1rem 2rem" }}>All Group Schedules</h2>
      <button
        className="create-schedule-button"
        onClick={() => navigate(`/create-schedule`)}
      >
        Create schedule
      </button>
      <AllGroupScheduleCalendar />
    </div>
  );
};

export default AllSchedulesPage;
