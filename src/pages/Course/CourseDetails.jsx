import React from "react";
import { useParams, Link } from "react-router-dom";
import { coursedetail } from "../../components/assets/data/data";
import { FaBook, FaClock, FaUserGraduate } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import "./Courses.css";

export const CourseDetails = () => {
  const { id } = useParams();
  const course = coursedetail.find((item) => item.id === parseInt(id));

  if (!course) {
    return <div className="text-center py-20">Course not found</div>;
  }

  return (
    <section className="course-details bg-[#F3F4F8] py-16">
      <div className="w-4/5 m-auto">
        <div className="bg-white rounded-lg shadow-shadow1 p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={course.cover}
                alt={course.title}
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div>
              <div className="flex gap-4 mb-4">
                <span className="text-sm bg-blue-700 p-1 px-3 text-white rounded-[5px] shadow-md">
                  {course.category1}
                </span>
                <span className="text-sm bg-pink-700 p-1 px-3 text-white rounded-[5px] shadow-md">
                  {course.category2}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <FaUserGraduate className="text-gray-500 mr-2" />
                  <span>{course.students} Students</span>
                </div>
                <div className="flex items-center">
                  <FaBook className="text-gray-500 mr-2" />
                  <span>{course.lessons} Lessons</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-gray-500 mr-2" />
                  <span>{course.duration} hrs</span>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <AiFillStar className="text-orange-500 mr-1" />
                <span className="font-medium">{course.rating}</span>
                <span className="text-gray-500 ml-2">({course.reviews} reviews)</span>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-xl mb-2">₹{course.price.toLocaleString('en-IN')}</h3>
                <Link 
                  to="/enroll" 
                  aria-label={`Enroll in ${course.title} course`}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition inline-block"
                >
                  Enroll Now
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">About This Course</h2>
            <p className="text-gray-600 mb-8">{course.longDescription}</p>
            
            <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
            <ul className="grid sm:grid-cols-2 gap-4 mb-8">
              {course.learningOutcomes.map((outcome, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            
            <h3 className="text-xl font-bold mb-4">Course Content</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {course.curriculum.map((module, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                  <div className="bg-gray-50 p-4 font-medium">
                    Module {index + 1}: {module.title}
                  </div>
                  <ul>
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="p-4 border-t border-gray-200 flex justify-between">
                        <span>{lesson.title}</span>
                        <span className="text-gray-500">{lesson.duration} min</span>
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