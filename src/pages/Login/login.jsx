/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./login.css";

export const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const validateUsername = (e) => setUsername(e.target.value);

  const handleBlurUsername = () => setShowAlert(!username.includes("@") && username);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(!username.includes("@"));
    if (username.includes("@")) console.log("Logging in with", { username, password });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>Login</motion.h1>

          <motion.div className="input-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <input 
              type="text" 
              id="username" 
              required 
              placeholder=" " 
              value={username} 
              onChange={validateUsername} 
              onBlur={handleBlurUsername} 
            />
            <label htmlFor="username">Username</label>
            <FaUserAlt className="icon" />
            {showAlert && <p className="alert">Username must contain @</p>}
          </motion.div>

          <motion.div className="input-box" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <input 
              type="password" 
              id="password" 
              required 
              placeholder=" " 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <label htmlFor="password">Password</label>
            <FaLock className="icon" />
          </motion.div>

          <motion.div className="remember-forgot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <label><input type="checkbox" /> Remember me</label>
            <br />
            <Link to="/forgot-password" className="forgot">Forgot password?</Link>
          </motion.div>

          <motion.button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Login</motion.button>

          <motion.div className="register-link" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;