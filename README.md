
---

# Telus Institute AI-Driven Educational Platform

Telus Institute is an AI-powered web application designed to revolutionize digital learning. It offers personalized course recommendations, automated assessments, and interactive multimedia content, all enhanced by modern AI techniques to create an engaging educational experience.

## Features

- **Personalized Learning Assistant**: AI-driven recommendations tailored to user progress.
- **Automated Assessments**: Quizzes with instant grading and performance tracking.
- **Interactive Multimedia**: Video lectures, dynamic notes, and practice exercises.
- **Multilingual Support**: Accessible content in multiple languages.
- **Webcam & Screen Recording**: Capture and review learning sessions.
- **API Integration**: Connect with external educational platforms.

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: React.js, Tailwind CSS
- **Database**: MongoDB
- **AI/ML**: TensorFlow / PyTorch
- **Deployment**: Nginx, PM2

## Architecture

- **Backend**: Handles API services and logic via Node.js and Express.
- **Frontend**: Responsive UI built with React.js and styled with Tailwind CSS.
- **Database**: MongoDB stores user data, courses, and assessments.
- **AI**: Machine learning models power recommendations and interactivity.
- **Deployment**: Nginx as a reverse proxy, PM2 for process management.

## Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Mohitk001/TelusInstitute.git
   cd TelusInstitute
   ```

2. **Install Dependencies**
   - Backend:
     ```bash
     cd backend && npm install
     ```
   - Frontend:
     ```bash
     cd Telus_AI && npm install
     ```

3. **Configure Environment Variables**
   - Create a `.env` file in `backend/` with:
     ```
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/telusinstitute
     AI_API_KEY=your-ai-api-key-here
     ```

4. **Start the Application**
   - Backend:
     ```bash
     cd backend && npm start
     ```
   - Frontend:
     ```bash
     cd Telus_AI && npm start
     ```
   - Access at [http://localhost:3000](http://localhost:3000).

5. **Production Setup**
   - Use PM2:
     ```bash
     pm2 start backend/server.js --name "TelusInstitute"
     ```
   - Configure Nginx as a reverse proxy (see [Nginx docs](https://nginx.org)).

## API Endpoints

| Endpoint             | Method | Description               |
|----------------------|--------|---------------------------|
| `/api/certificates`  | POST   | Generate a certificate    |
| `/api/contact`       | POST   | Submit a contact form     |
| `/api/courses`       | GET    | Fetch available courses   |

## Folder Structure

```
TelusInstitute/
├── backend/              # Node.js/Express backend
│   ├── server.js         # Main server file
│   ├── config/           # Database config
│   ├── controllers/      # API logic
│   ├── models/           # MongoDB schemas
│   └── routes/           # API routes
├── Telus_AI/             # React frontend
│   ├── src/              # React source files
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page-specific components
│   │   └── assets/       # Images and static files
│   ├── public/           # Static assets
│   └── build/            # Production build
├── .gitignore
├── README.md
└── package.json
```


## Screenshots

![Home Page](public/images/course-2-1.jpg)  
![Course Page](public/images/course-4-1.jpg)

## Future Enhancements

- AI-driven chatbots for real-time tutoring.
- Enhanced LMS integration for broader reach.
- Improved recommendation algorithms with user feedback.
- Expanded multilingual and accessibility features.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

---
