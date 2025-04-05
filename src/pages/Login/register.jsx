/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { motion } from "framer-motion";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Added loading state
  const navigate = useNavigate(); // Initialize navigate

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePasswordStrength = (password) =>
    password.length < 6 ? "weak" : password.length < 10 ? "medium" : "strong";

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordStrength(validatePasswordStrength(e.target.value));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let errors = {};

    if (!username.trim()) errors.username = "Username is required";
    if (!validateEmail(email)) errors.email = "Invalid email format";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (password.length < 6) errors.password = "Password must be at least 6 characters";

    setErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      try {
        // Simulate API call (replace with actual registration logic)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // On successful registration
        navigate("/login"); // Redirect to login page
      } catch (error) {
        console.error("Registration error:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="signup-container">
        <div className="wrapper">
          <form onSubmit={handleFormSubmit}>
            <h1>Sign Up</h1>

            <div className="input-box">
              <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                placeholder=" " 
              />
              <label htmlFor="username">Username</label>
              <FaUserAlt className="icon" />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>

            <div className="input-box">
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder=" " 
              />
              <label htmlFor="email">Email</label>
              <FaEnvelope className="icon" />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="input-box">
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={handlePasswordChange} 
                required 
                placeholder=" " 
              />
              <label htmlFor="password">Password</label>
              <FaLock className="icon" />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            {password && (
              <>
                <div className={`password-strength ${passwordStrength}`}><span></span></div>
                <p className="strength-text">Password Strength: {passwordStrength}</p>
              </>
            )}

            <div className="input-box">
              <input 
                type="password" 
                id="confirm-password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
                placeholder=" " 
              />
              <label htmlFor="confirm-password">Confirm Password</label>
              <FaLock className="icon" />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Sign Up"}
            </button>

            <div className="login-link">
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;