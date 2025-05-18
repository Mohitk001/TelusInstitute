import React from "react";
import { courses } from "../../components/assets/data/data";
import { FaBook, FaRegClock } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import './Courses.css';

export const Courses = () => {
  return (
    <section className="courses-container">
      <div className="courses-wrapper">
        <div className="courses-header">
          <h1 className="courses-title">
            Find The Right <span className="title-highlight">Online Course For You</span>
          </h1>
          <p className="courses-subtitle">
            You don't have to struggle alone, you've got our assistance and help.
          </p>
        </div>
        <div className="courses-grid">
          {courses.map((item) => (
            <div key={item.id} className="course-card">
              <div className="course-card-content">
                <div className="course-image-container">
                  <img
                    src={item.cover}
                    alt={`${item.title} course cover`}
                    className="course-image"
                    loading="lazy"
                  />
                  <div className="course-categories">
                    <span className="category-badge category-primary">
                      {item.category1}
                    </span>
                    {item.category2 && (
                      <span className="category-badge category-secondary">
                        {item.category2}
                      </span>
                    )}
                  </div>
                </div>
                <div className="course-details">
                  <div className="course-meta">
                    <div className="meta-item">
                      <FaBook className="meta-icon" />
                      <span className="meta-text">{item.lessons} lessons</span>
                    </div>
                    <div className="meta-item">
                      <FaRegClock className="meta-icon" />
                      <span className="meta-text">{item.duration}</span>
                    </div>
                    <div className="meta-item">
                      <AiFillStar className="meta-icon star-icon" />
                      <span className="meta-text">{item.rating}</span>
                    </div>
                  </div>
                  <h3 className="course-title" title={item.title}>
                    {item.title}
                  </h3>
                  <div className="instructor-info">
                    <img
                      className="instructor-image"
                      src={item.instructorImage}
                      alt={`Instructor ${item.instructorName}`}
                      loading="lazy"
                    />
                    <span className="instructor-name">{item.instructorName}</span>
                  </div>
                </div>
                <div className="course-footer">
                  <span className="course-price">
                    {item.price === 0 ? 'Free' : `₹${new Intl.NumberFormat('en-IN').format(item.price)}`}
                  </span>
                  <NavLink 
                    to={`/courses/${item.id}`} 
                    className="course-link"
                    aria-label={`View details about ${item.title}`}
                  >
                    <span>Know Details</span>
                    <HiOutlineArrowNarrowRight className="link-arrow" />
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};