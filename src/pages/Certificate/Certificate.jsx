import React, { useState } from 'react';
import axios from 'axios';
import './Certificate.css';

export function Certificate() {
  const [enrollmentId, setEnrollmentId] = useState('');
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCertificate = async () => {
    if (!enrollmentId.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://telusinstitute.onrender.com/api/certificate/${enrollmentId.trim()}`
      );
      setCertificate(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Certificate not found or server error');
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchCertificate();
    }
  };

  return (
    <div className="certificate-page">
      <div className="verification-section">
        <h1 className="page-title">Certificate Verification</h1>
        
        <div className="search-container">
          <div className="search-group">
            <input
              type="text"
              value={enrollmentId}
              onChange={(e) => setEnrollmentId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter Enrollment ID (e.g., TELUSHSP001)"
              className="search-input"
            />
            <button
              onClick={fetchCertificate}
              disabled={loading || !enrollmentId.trim()}
              className="verify-button"
            >
              {loading ? (
                <span className="button-loading">
                  <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : 'Verify'}
            </button>
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>
      </div>

      {certificate && (
        <div className="certificate-display">
          <div className="certificate-content">
            <div className="student-profile">
              {certificate.picture ? (
                <div className="student-image-container">
                  <img 
                    src={certificate.picture} 
                    alt="Student" 
                    className="student-image"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/150';
                    }}
                  />
                </div>
              ) : (
                <div className="image-placeholder">
                  <span>No image available</span>
                </div>
              )}
            </div>
            
            <div className="student-details">
              <h2 className="student-name">{certificate.name}</h2>
              <div className="detail-row">
                <span className="detail-label">Father's Name:</span>
                <span className="detail-value">{certificate.fatherName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Enrollment ID:</span>
                <span className="detail-value">{certificate.enrollmentId}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Grade:</span>
                <span className="detail-value highlight">{certificate.grade}</span>
              </div>
              
              <div className="course-section">
                <h3 className="section-title">Course Details</h3>
                <div className="detail-row">
                  <span className="detail-label">Course Name:</span>
                  <span className="detail-value">{certificate.courseName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{certificate.courseDuration}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Issued:</span>
                  <span className="detail-value">{certificate.certificateIssueDate || 'Not specified'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="certificate-footer">
            <p className="verification-text">This certificate is digitally verified and authentic</p>
            {certificate.enrollmentId && (
              <p className="verification-id">Verification ID: {certificate.enrollmentId}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Certificate;
