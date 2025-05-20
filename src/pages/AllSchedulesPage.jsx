// src/pages/AllSchedulesPage.jsx
import React from "react";
import AllGroupScheduleCalendar from "../components/AllGroupScheduleCalendar";

const AllSchedulesPage = () => {
  return (
    <div>
      <h2 style={{ padding: "1rem 2rem" }}>All Group Schedules</h2>
      <AllGroupScheduleCalendar />
    </div>
  );
};

export default AllSchedulesPage;
