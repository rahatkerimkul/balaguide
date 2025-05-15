// src/features/landing/CoursesSection.jsx
import React from "react";
import "./landing.css";
import roboticsImg from "../../assets/robotics.png";
import artImg from "../../assets/art.jpg";
import englishImg from "../../assets/english.jpg";
const CoursesSection = () => {
  const courses = [
    {
      title: "Robotics & Coding",
      age: "Ages 10–14",
      description: "Build and program your first robot in just 4 weeks!",
      image: roboticsImg,
    },
    {
      title: "Art & Creativity",
      age: "Ages 6–10",
      description: "Explore painting, sketching and imagination!",
      image: artImg,
    },
    {
      title: "English for Kids",
      age: "Ages 7–12",
      description: "Fun and interactive English lessons for real progress.",
      image: englishImg,
    },
  ];

  return (
    <section className="landing-courses" id="courses">
      <h2 className="landing-section-title">Popular Courses for Your Child</h2>
      <div className="landing-courses-grid">
        {courses.map((course, index) => (
          <div key={index} className="landing-course-card">
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p className="landing-course-age">{course.age}</p>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesSection;
