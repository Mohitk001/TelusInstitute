const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 1. Updated connection (Removed deprecated options to stop warnings)
const mongoUri = process.env.MONGO_URI || "mongodb+srv://telusadmin:80LGVVhsBKGh5WWq@cluster0.bahwf.mongodb.net/certification_db?retryWrites=true&w=majority";

mongoose.connect(mongoUri)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// 2. Certificate model (Matches your JSON keys exactly)
const Certificate = mongoose.model('Certificate', new mongoose.Schema({
  "Student's Name": String,
  "Father's Name": String,
  "Grade": String,
  "Enrollment Number ID": String,
  "Course Name Enrolled in": String,
  "Course Duration": String,
  "Certificate Issue Date": String,
  "Picture": String 
}), 'certificates');

// 3. API endpoint
app.get('/api/certificate/:enrollmentId', async (req, res) => {
  try {
    const id = req.params.enrollmentId.trim();
    const certificate = await Certificate.findOne({ "Enrollment Number ID": id });
    
    if (!certificate) {
      console.log('Not Found:', id);
      return res.status(404).json({ error: 'Certificate not found' });
    }
    
    res.json({
      enrollmentId: certificate["Enrollment Number ID"],
      name: certificate["Student's Name"],
      fatherName: certificate["Father's Name"],
      grade: certificate["Grade"],
      courseName: certificate["Course Name Enrolled in"],
      courseDuration: certificate["Course Duration"],
      certificateIssueDate: certificate["Certificate Issue Date"],
      picture: certificate["Picture"] || '' 
    });
  } catch (err) {
    console.error('Server Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
