import React, { useEffect, useRef } from "react";
import { FaUsers, FaChalkboardTeacher, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { MdOnlinePrediction } from "react-icons/md";
import { instructors } from "../../components/assets/data/data";
import "./Instructor.css";

export const Instructor = () => {
  return (
    <div className="instructor">
      <section className="instructor py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* What is TelusInstitute? Section */}
          <div className="heading py-8 md:py-12 text-center w-full mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
              Welcome to TelusInstitute
            </h1>
            <span className="text-sm sm:text-base md:text-lg mt-4 block text-gray-600 max-w-3xl mx-auto">
              Empowering learners with cutting-edge courses, expert instructors, and a community-driven approach to education. Your journey to success starts here.
            </span>
          </div>

          {/* Aesthetic Images Section */}
          <div className="content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="image-card rounded-lg overflow-hidden relative h-56 sm:h-64 md:h-72">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="Students studying"
                className="w-full h-full object-cover"
              />
              <div className="overlay absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center px-2">
                  Learn Anytime, Anywhere
                </h2>
              </div>
            </div>
            <div className="image-card rounded-lg overflow-hidden relative h-56 sm:h-64 md:h-72">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Teacher teaching online"
                className="w-full h-full object-cover"
              />
              <div className="overlay absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center px-2">
                  Expert-Led Courses
                </h2>
              </div>
            </div>
            <div className="image-card rounded-lg overflow-hidden relative h-56 sm:h-64 md:h-72">
              <img
                src="https://images.unsplash.com/photo-1584697964358-3e14ca57658b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Online learning"
                className="w-full h-full object-cover"
              />
              <div className="overlay absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center px-2">
                  Join a Global Community
                </h2>
              </div>
            </div>
          </div>

          {/* We Are Proud Section */}
          <div className="content mt-8 md:mt-12">
            <div className="heading py-8 md:py-12 text-center w-full mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
                Why Choose TelusInstitute?
              </h1>
              <span className="text-sm sm:text-base md:text-lg mt-4 block text-gray-600 max-w-3xl mx-auto">
                We are committed to providing world-class education and empowering learners to achieve their dreams.
              </span>
            </div>
            <div className="content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <InstructorCard
                color="text-red-500"
                icon={<FaUsers size={40} />}
                title="500"
                desc="Students Enrolled"
              />
              <InstructorCard
                color="text-orange-500"
                icon={<GiBookshelf size={40} />}
                title="10"
                desc="Total Courses"
              />
              <InstructorCard
                color="text-purple-500"
                icon={<FaChalkboardTeacher size={40} />}
                title="5"
                desc="Expert Instructors"
              />
              <InstructorCard
                color="text-indigo-500"
                icon={<MdOnlinePrediction size={40} />}
                title="97"
                desc="Satisfaction Rate"
              />
            </div>
          </div>

          {/* Instructor Static Grid Section */}
          <div className="content mt-12 md:mt-16">
            <div className="heading py-8 md:py-12 text-center w-full mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black">
                Meet Our Expert Instructors
              </h1>
              <span className="text-sm sm:text-base md:text-lg mt-4 block text-gray-600 max-w-3xl mx-auto">
                Learn from the best in the industry and gain valuable insights to excel in your career.
              </span>
            </div>
            <div className="instructor-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-4">
              {instructors.map((instructor) => (
                <InstructorProfile key={instructor.id} {...instructor} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Instructor Profile Card Component
const InstructorProfile = ({ name, rating, photo, subject, experience, hoursTaught }) => {
  const experienceRef = useRef(null);
  const hoursTaughtRef = useRef(null);

  useEffect(() => {
    if (experienceRef.current && hoursTaughtRef.current) {
      animateNumber(experienceRef.current, experience);
      animateNumber(hoursTaughtRef.current, hoursTaught);
    }
  }, [experience, hoursTaught]);

  const animateNumber = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(interval);
        element.textContent = target + "+";
      } else {
        element.textContent = Math.floor(current) + "+";
      }
    }, 10);
  };

  return (
    <div className="p-2 sm:p-4 w-full">
      <div className="box p-4 sm:p-6 rounded-2xl shadow-lg bg-white text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 hover:glow h-full">
        <img
          src={photo}
          alt={name}
          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full mx-auto mb-3 sm:mb-4 md:mb-6 object-cover"
        />
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black">{name}</h3>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-2">{subject}</p>
        <div className="flex items-center justify-center mt-3 sm:mt-4">
          {Array.from({ length: 5 }).map((_, index) => {
            const starValue = index + 1;
            if (rating >= starValue) {
              return <FaStar key={index} className="text-yellow-500" size={16} />;
            } else if (rating >= starValue - 0.5) {
              return <FaStarHalfAlt key={index} className="text-yellow-500" size={16} />;
            } else {
              return <FaStar key={index} className="text-gray-300" size={16} />;
            }
          })}
        </div>
        <div className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
          <p>
            <span ref={experienceRef}>0</span> years of experience
          </p>
          <p>
            <span ref={hoursTaughtRef}>0</span> hours taught
          </p>
        </div>
      </div>
    </div>
  );
};

// Instructor Card Component
export const InstructorCard = ({ color, icon, title, desc }) => {
  const countRef = useRef(null);

  useEffect(() => {
    const currentRef = countRef.current;

    if (currentRef) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateNumber(currentRef, parseInt(title));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(currentRef);

      return () => {
        observer.unobserve(currentRef);
      };
    }
  }, [title]);

  const animateNumber = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(interval);
        element.textContent = target + (target === 97 ? "%" : "+");
      } else {
        element.textContent = Math.floor(current) + (target === 97 ? "%" : "+");
      }
    }, 10);
  };

  return (
    <div className="box p-4 sm:p-6 rounded-2xl shadow-lg bg-white text-center hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 hover:glow">
      <div className={`${color} mb-3 sm:mb-4`}>{icon}</div>
      <div className="text">
        <h4 ref={countRef} className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
          0
        </h4>
        <p className="text-sm sm:text-base md:text-lg text-gray-600">{desc}</p>
      </div>
    </div>
  );
};