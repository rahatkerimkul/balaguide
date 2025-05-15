// src/features/landing/InstructorsSection.jsx
import React from "react";
import "./landing.css";
import aminaImg from "../../assets/amina.jpg";
import saltanatImg from "../../assets/saltanat.jpg";
import dauletImg from "../../assets/daulet.jpg";
const InstructorsSection = () => {
  const instructors = [
    {
      name: "Amina S.",
      specialty: "Robotics & Coding",
      image: aminaImg,
    },
    {
      name: "Daulet B.",
      specialty: "Creative Arts",
      image: dauletImg, //dsadsadasdasdasdassddasdasdasdadasdsadas
    },
    {
      name: "Saltanat T.",
      specialty: "English Language",
      image: saltanatImg,
    },
  ];

  return (
    <section className="landing-instructors" id="instructors">
      <h2 className="landing-section-title">Meet Our Instructors</h2>
      <div className="landing-instructors-grid">
        {instructors.map((instructor, index) => (
          <div key={index} className="landing-instructor-card">
            <img src={instructor.image} alt={instructor.name} />
            <h4>{instructor.name}</h4>
            <p>{instructor.specialty}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstructorsSection;
