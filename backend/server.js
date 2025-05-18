const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoUri = "mongodb+srv://telusinstitute:Telus&0960@cluster0.tfp7ddw.mongodb.net/certification_db?retryWrites=true&w=majority";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Certificate model - updated to include Picture as URL
const Certificate = mongoose.model('Certificate', new mongoose.Schema({
  "Student's Name": String,
  "Father's Name": String,
  "Grade": String,
  "Enrollment Number ID": String,
  "Course Name Enrolled in": String,
  "Course Duration": String,
  "Certificate Issue Date": String,
  Picture: String // Now stores URL of the image
}), 'certificates');

// API endpoint to fetch certificate
app.get('/api/certificate/:enrollmentId', async (req, res) => {
  try {
    // Search by "Enrollment Number ID" field with exact match
    const certificate = await Certificate.findOne({ 
      "Enrollment Number ID": req.params.enrollmentId.trim() 
    });
    
    if (!certificate) {
      console.log('No certificate found for:', req.params.enrollmentId);
      return res.status(404).json({ error: 'Certificate not found' });
    }
    
    // Transform to frontend-friendly format
    const transformedCertificate = {
      enrollmentId: certificate["Enrollment Number ID"],
      name: certificate["Student's Name"],
      fatherName: certificate["Father's Name"],
      grade: certificate["Grade"],
      courseName: certificate["Course Name Enrolled in"],
      courseDuration: certificate["Course Duration"],
      certificateIssueDate: certificate["Certificate Issue Date"],
      picture: certificate.Picture || '' // Return URL of the image
    };
    
    res.json(transformedCertificate);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));