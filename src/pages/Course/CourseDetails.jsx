import React from "react";
import { useParams, Link } from "react-router-dom";
import { coursedetail } from "../../components/assets/data/data";
import { FaBook, FaClock, FaUserGraduate } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import "./CourseDetails.css";

export const CourseDetails = () => {
  const { id } = useParams();
  const course = coursedetail.find((item) => item.id === parseInt(id));

  if (!course) {
    return <div className="not-found">Course not found</div>;
  }

  return (
    <section className="course-details-container">
      <div className="course-details-wrapper">
        <div className="course-details-card">
          <div className="course-main-grid">
            <div className="course-image-wrapper">
              <img
                src={course.cover}
                alt={course.title}
                className="course-main-image"
              />
            </div>
            <div className="course-info-section">
              <div className="category-tags">
                <span className="category-tag primary-tag">
                  {course.category1}
                </span>
                <span className="category-tag secondary-tag">
                  {course.category2}
                </span>
              </div>
              <h1 className="course-title">{course.title}</h1>
              <p className="course-description">{course.description}</p>
              
              <div className="course-meta-grid">
                <div className="meta-item">
                  <FaUserGraduate className="meta-icon" />
                  <span>{course.students} Students</span>
                </div>
                <div className="meta-item">
                  <FaBook className="meta-icon" />
                  <span>{course.lessons} Lessons</span>
                </div>
                <div className="meta-item">
                  <FaClock className="meta-icon" />
                  <span>{course.duration} hrs</span>
                </div>
              </div>
              
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <span className="rating-value">{course.rating}</span>
                <span className="reviews-count">({course.reviews} reviews)</span>
              </div>
              
              <div className="pricing-section">
                <h3 className="price">₹{course.price.toLocaleString('en-IN')}</h3>
                <Link 
                  to="/contact" 
                  aria-label={`Enroll in ${course.title} course`}
                  className="enroll-button"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
          
          <div className="course-content-section">
            <h2 className="section-title">About This Course</h2>
            <p className="long-description">{course.longDescription}</p>
            
            <h3 className="section-title">What You'll Learn</h3>
            <ul className="learning-outcomes-grid">
              {course.learningOutcomes.map((outcome, index) => (
                <li key={index} className="outcome-item">
                  <span className="check-icon">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            
            <h3 className="section-title">Course Content</h3>
            <div className="curriculum-container">
              {course.curriculum.map((module, index) => (
                <div key={index} className="module-container">
                  <div className="module-header">
                    Module {index + 1}: {module.title}
                  </div>
                  <ul className="lessons-list">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="lesson-item">
                        <span className="lesson-title">{lesson.title}</span>
                        <span className="lesson-duration">{lesson.duration} min</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};