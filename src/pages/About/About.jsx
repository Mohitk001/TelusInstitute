import React, { useEffect, useRef } from "react";
import { FaGraduationCap, FaStar } from "react-icons/fa";
import "./About.css";

export const About = () => {
  return (
    <div className="about">
      <section className="about py-6 sm:py-12 md:py-16 bg-[#F3F4F8]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="heading text-center py-4 sm:py-8 md:py-12">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-black px-2">
              Unlock Your Potential with TelusInstitute
            </h1>
            <span className="text-sm xs:text-base sm:text-lg mt-2 xs:mt-3 sm:mt-4 block text-gray-700 max-w-3xl mx-auto px-2 sm:px-4">
              Transform your future with expert guidance, cutting-edge courses, and a community that empowers you to succeed.
            </span>
          </div>
          
          {/* AboutCard Grid Section */}
          <div className="grid grid-cols-1 gap-4 xs:gap-5 sm:gap-6 md:gap-8 mt-4 sm:mt-6">
            {/* Computer Basic Course */}
            <AboutCard
              icon={<FaGraduationCap className="text-3xl xs:text-4xl sm:text-5xl" />}
              title="Computer Basic Course"
              desc="Master the basics of Computer"
              backgroundImage="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              rating={4.5}
              price={2699}
            />
            
            {/* Tally with GST Course */}
            <AboutCard
              icon={<FaGraduationCap className="text-3xl xs:text-4xl sm:text-5xl" />}
              title="Tally with GST Course"
              desc="Accounting mastery with GST compliance."
              backgroundImage="https://images.unsplash.com/photo-1573855618996-b620af5af078?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              rating={4.8}
              price={8000}
            />
            
            {/* English Speaking Course */}
            <AboutCard
              icon={<FaGraduationCap className="text-3xl xs:text-4xl sm:text-5xl" />}
              title="English Speaking"
              desc="Improve your communication skills in English."
              backgroundImage="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
              rating={4.7}
              price={1500}
            />
            
            {/* Diploma in Computer Teacher training Course */}
            <AboutCard
              icon={<FaGraduationCap className="text-3xl xs:text-4xl sm:text-5xl" />}
              title="Diploma in Computer Teacher Training"
              desc="Train to teach computer skills."
              backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              rating={4.9}
              price={15600}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export const AboutCard = (props) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const cardElement = cardRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardElement) {
      observer.observe(cardElement);
    }

    return () => {
      if (cardElement) {
        observer.unobserve(cardElement);
      }
    };
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-xs xs:text-sm ${i <= rating ? "text-yellow-500" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  return (
    <div
      ref={cardRef}
      className={`about-card box shadow-sm xs:shadow-md sm:shadow-lg p-3 xs:p-4 sm:p-5 py-5 sm:py-8 rounded-lg sm:rounded-xl text-white hidden-card cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-95 relative overflow-hidden min-h-[180px] xs:min-h-[220px] sm:min-h-[280px]`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between items-center">
        <div className="icon">{props.icon}</div>
        <div className="text-center w-full px-1 xs:px-2">
          <h4 className="text-sm xs:text-base sm:text-lg font-semibold mb-1 xs:mb-2 sm:mb-3 leading-tight">
            {props.title}
          </h4>
          <p className="text-xs xs:text-sm mb-2 xs:mb-3 sm:mb-4">
            {props.desc}
          </p>
          <div className="flex justify-center items-center mb-2 xs:mb-3">
            {renderStars(props.rating)}
            <span className="text-xs xs:text-sm ml-1 xs:ml-2">({props.rating})</span>
          </div>
          <div className="text-sm xs:text-base sm:text-lg font-semibold">
            {props.price === 0 ? "Free" : `₹${props.price}`}
          </div>
        </div>
      </div>
    </div>
  );
};