import React, { useState } from 'react';
import axios from 'axios';

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
        `http://localhost:5000/api/certificate/${enrollmentId.trim()}`
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
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Certificate Verification</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            value={enrollmentId}
            onChange={(e) => setEnrollmentId(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Enrollment ID (e.g., TELUSHSP001)"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <button
            onClick={fetchCertificate}
            disabled={loading || !enrollmentId.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:opacity-50 transition duration-200 w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
            ) : 'Verify'}
          </button>
        </div>

        {error && (
          <div className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {certificate && (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {certificate.picture ? (
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-100">
                    <img
                      src={certificate.picture}
                      alt="Student"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Failed to load image for:', certificate.enrollmentId);
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="md:w-1/3 flex justify-center items-center">
                  <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                </div>
              )}

              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{certificate.name}</h2>
                <p className="text-gray-600 mb-1">Father's Name: {certificate.fatherName}</p>
                <p className="text-gray-600 mb-1">Enrollment ID: {certificate.enrollmentId}</p>
                <p className="text-gray-600 mb-1">Grade: <span className="font-semibold">{certificate.grade}</span></p>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">Course Details</h3>
                  <p className="text-gray-700 mb-1">Course Name: {certificate.courseName}</p>
                  <p className="text-gray-700 mb-1">Duration: {certificate.courseDuration}</p>
                  <p className="text-gray-700">Certificate Issued: {certificate.certificateIssueDate || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-500">This certificate is digitally verified and authentic</p>
              {certificate.enrollmentId && (
                <p className="text-xs text-gray-400 mt-2">Verification ID: {certificate.enrollmentId}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Certificate;
