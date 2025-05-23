// src/components/AllGroupScheduleCalendar.jsx
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const AllGroupScheduleCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("/api/v1/schedules", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        console.log("📅 Loaded schedule data:", data);

        const currentWeek = getCurrentWeekMonday();

        const weekdayMap = {
          MONDAY: 0,
          TUESDAY: 1,
          WEDNESDAY: 2,
          THURSDAY: 3,
          FRIDAY: 4,
          SATURDAY: 5,
          SUNDAY: 6,
        };

        const events = data
          .map((item, index) => {
            const dayOffset = weekdayMap[item.dayOfWeek?.toUpperCase()];
            if (dayOffset === undefined) {
              console.warn("⚠️ Invalid day:", item.dayOfWeek);
              return null;
            }

            // Calculate actual date of the event this week
            const lessonDate = new Date(currentWeek);
            lessonDate.setDate(currentWeek.getDate() + dayOffset);

            const [startHour, startMin] = item.startTime.split(":");
            const [endHour, endMin] = item.endTime.split(":");

            const start = new Date(lessonDate);
            start.setHours(parseInt(startHour), parseInt(startMin), 0, 0);

            const end = new Date(lessonDate);
            end.setHours(parseInt(endHour), parseInt(endMin), 0, 0);

            return {
              id: index,
              title: `${item.groupName} (${item.teacherName})`,
              start,
              end,
            };
          })
          .filter(Boolean);

        console.log("🧪 Final events:", events);
        setEvents(events);
      } catch (err) {
        console.error("❌ Failed to load schedules:", err);
      }
    };

    fetchSchedules();
  }, []);

  const getCurrentWeekMonday = () => {
    const today = new Date();
    const day = today.getDay(); // 0 (Sun) to 6 (Sat)
    const diffToMonday = (day + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const getNextWeekdayDate = (mondayDate, dayOfWeek) => {
    const days = {
      MONDAY: 0,
      TUESDAY: 1,
      WEDNESDAY: 2,
      THURSDAY: 3,
      FRIDAY: 4,
      SATURDAY: 5,
      SUNDAY: 6,
    };
    const target = new Date(mondayDate);
    target.setDate(mondayDate.getDate() + days[dayOfWeek]);
    return new Date(target);
  };

  return (
    <div style={{ height: "80vh", padding: "2rem" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={["week"]}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default AllGroupScheduleCalendar;
