// src/features/landing/FeaturesSection.jsx
import React from "react";
import "./landing.css";

const FeaturesSection = () => {
  const features = [
    {
      icon: "🎯",
      title: "Trusted Courses & Teachers",
      text: "Verified programs and experienced instructors.",
    },
    {
      icon: "💬",
      title: "Real Reviews",
      text: "See what other parents think before you decide.",
    },
    {
      icon: "⚙️",
      title: "Many Components",
      text: "A variety of helpful tools for parents and kids.",
    },
    {
      icon: "📝",
      title: "Easy Enrollment",
      text: "Sign up in just a few clicks.",
    },
    {
      icon: "🕓",
      title: "Smart Scheduling",
      text: "Track class schedules and attendance easily.",
    },
    {
      icon: "💸",
      title: "Exclusive Discounts",
      text: "Access to special offers on selected courses.",
    },
  ];

  return (
    <section className="landing-features" id="features">
      <h2 className="landing-features-heading">Why Choose BalaGuide?</h2>
      <div className="landing-features-grid">
        {features.map((item, index) => (
          <div key={index} className="landing-feature-card">
            <div className="landing-feature-icon">{item.icon}</div>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
