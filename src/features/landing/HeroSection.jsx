// src/features/landing/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import phoneImg from "../../assets/hero-phone.png";
const HeroSection = () => {
  return (
    <header className="landing-hero">
      <nav className="landing-navbar">
        <div className="landing-navbar-logo">BalaGuide</div>
        <ul className="landing-navbar-links">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#news">News</a>
          </li>
          <li>
            <a href="#about">About us</a>
          </li>
          <li>
            <a href="#courses">Find courses</a>
          </li>
        </ul>
        <div className="landing-navbar-auth">
          <Link to="/signin" className="landing-signin-btn">
            Sign In
          </Link>
          <Link to="/signup" className="landing-signup-btn">
            Sign Up
          </Link>
        </div>
      </nav>

      <div className="landing-hero-content">
        <div className="landing-hero-text">
          <h1>
            The Best Way to Find{" "}
            <span className="landing-highlight">Courses</span> for Your Child!
          </h1>
          <p>
            Helping parents connect their children with the right
            extracurricular activities. Explore, enroll, and track progress –
            all in one place.
          </p>
          <ul className="landing-hero-benefits">
            <li>✅ Trusted Courses & Teachers</li>
            <li>✅ Easy Enrollment</li>
            <li>✅ Exclusive Discounts</li>
            <li>✅ Smart Scheduling</li>
          </ul>
        </div>
        <div className="landing-hero-image">
          <img src={phoneImg} alt="BalaGuide App" />
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
