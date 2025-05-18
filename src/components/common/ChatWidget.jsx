import React, { useState, useEffect, useRef } from "react";
import "./ChatWidget.css";

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const messagesRef = useRef(null);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const backgrounds = [
    "linear-gradient(to right, #ffecd2, #fcb69f)",
    "linear-gradient(to right, #a1c4fd, #c2e2010",
    "linear-gradient(to right, #f6d365, #fda085)",
    "linear-gradient(to right, #84fab0, #8fd3f4)",
    "linear-gradient(to right, #d4fc79, #96e6a1)"
  ];

  const predefinedResponses = [
    {
      keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
      response: "Hello! 👋 Welcome to our Telus bot. How can I assist you today?"
    },
    {
      keywords: ["bye", "goodbye", "tata", "see you", "good night"],
      response: "Goodbye! 👋 Have a great day! Feel free to come back if you have more questions."
    },
    {
      keywords: ["contact", "location", "address", "where", "place", "located"],
      response: "You can reach us at:\n\n📍 Location: Street No 05, Dagana Road, near Ramgarhia Chowk, Labh Nagar, Subhash Nagar, Hoshiarpur, Punjab 146001\n"
    },
    {
      keywords: ["courses"],
      exactMatch: true,
      response: "We offer a wide range of courses:\n1. Basic Computer Course\n2. 120 hrs Computer Course\n3. DCA(Diploma in Computer Application)\n4. ADCA(Advanced Diploma in Computer Application)\n5. ADCFA(Advanced Diploma in Computer Financial Application)\n6. DCTT(Diploma Computer Teacher Training Course)\n7. D.O.M.A(Diploma in Office Management Application)\n8. Tally with GST\n9. Advance Excel\n10. Typing Course(English and Punjabi)\n11. HTML and DHTML\n12. English Spoken\n13. Data Entry\n14. Internet\n15. Catpro\n\nWhich course would you like more details about?"
    },
    {
      keywords: ["list of courses", "what courses", "available courses"],
      response: "We offer a wide range of courses:\n1. Basic Computer Course\n2. 120 hrs Computer Course\n3. DCA(Diploma in Computer Application)\n4. ADCA(Advanced Diploma in Computer Application)\n5. ADCFA(Advanced Diploma in Computer Financial Application)\n6. DCTT(Diploma Computer Teacher Training Course)\n7. D.O.M.A(Diploma in Office Management Application)\n8. Tally with GST\n9. Advance Excel\n10. Typing Course(English and Punjabi)\n11. HTML and DHTML\n12. English Spoken\n13. Data Entry\n14. Internet\n15. Catpro\n\nWhich course would you like more details about?"
    },
    {
      keywords: ["basic computer course"],
      response: "The Basic Computer Course aims to provide foundational skills in computer usage, including basic software and hardware operations. It is taught by Kamaljit Kaur. The fee is Rs 2699, and the duration is 3 hours."
    },
    {
      keywords: ["fees only", "basic computer course"],
      response: "The fee for the Basic Computer Course is Rs 2699."
    },
    {
      keywords: ["duration only", "basic computer course"],
      response: "The duration of the Basic Computer Course is 3 hours."
    },
    {
      keywords: ["faculty only", "basic computer course"],
      response: "The Basic Computer Course is taught by Kamaljit Kaur."
    },
    {
      keywords: ["120 hrs computer course"],
      response: "The 120 hrs Computer Course aims to offer comprehensive training in computer applications for practical proficiency. It is taught by Gurdarshan Kaur. The fee is Rs 4000, and the duration is 120 hours."
    },
    {
      keywords: ["fees only", "120 hrs computer course"],
      response: "The fee for the 120 hrs Computer Course is Rs 8000."
    },
    {
      keywords: ["duration only", "120 hrs computer course"],
      response: "The duration of the 120 hrs Computer Course is 120 hours."
    },
    {
      keywords: ["faculty only", "120 hrs computer course"],
      response: "The 120 hrs Computer Course is taught by Gurdarshan Kaur."
    },
    {
      keywords: ["dca(diploma in computer application)", "dca"],
      exactOnly: true,
      response: "The DCA (Diploma in Computer Application) aims to equip students with in-depth knowledge of computer applications for professional use. It is taught by Daljit Singh. The fee is Rs 10000, and the duration is 12 hours."
    },
    {
      keywords: ["fees only", "dca(diploma in computer application)", "dca"],
      response: "The fee for the DCA (Diploma in Computer Application) is Rs 10000."
    },
    {
      keywords: ["duration only", "dca(diploma in computer application)", "dca"],
      response: "The duration of the DCA (Diploma in Computer Application) is 12 hours."
    },
    {
      keywords: ["faculty only", "dca(diploma in computer application)", "dca"],
      response: "The DCA (Diploma in Computer Application) is taught by Daljit Singh."
    },
    {
      keywords: ["adca(advanced diploma in computer application)", "adca"],
      exactOnly: true,
      response: "The ADCA (Advanced Diploma in Computer Application) aims to develop advanced skills in computer applications for specialized roles. It is taught by Kamaljit Kaur. The fee is Rs 12400, and the duration is 12 hours."
    },
    {
      keywords: ["fees only", "adca(advanced diploma in computer application)", "adca"],
      response: "The fee for the ADCA (Advanced Diploma in Computer Application) is Rs 12400."
    },
    {
      keywords: ["duration only", "adca(advanced diploma in computer application)", "adca"],
      response: "The duration of the ADCA (Advanced Diploma in Computer Application) is 12 hours."
    },
    {
      keywords: ["faculty only", "adca(advanced diploma in computer application)", "adca"],
      response: "The ADCA (Advanced Diploma in Computer Application) is taught by Kamaljit Kaur."
    },
    {
      keywords: ["adcfa(advanced diploma in computer financial accounting)", "adcfa", "financial"],
      response: "The ADCFA (Advanced Diploma in Computer Financial Accounting) aims to train in financial accounting software for business applications. It is taught by Gurdarshan Kaur. The fee is Rs 15600, and the duration is 12 hours."
    },
    {
      keywords: ["fees only", "adcfa(advanced diploma in computer financial accounting)", "adcfa"],
      response: "The fee for the ADCFA (Advanced Diploma in Computer Financial Accounting) is Rs 15600."
    },
    {
      keywords: ["duration only", "adcfa(advanced diploma in computer financial accounting)", "adcfa"],
      response: "The duration of the ADCFA (Advanced Diploma in Computer Financial Accounting) is 12 hours."
    },
    {
      keywords: ["faculty only", "adcfa(advanced diploma in computer financial accounting)", "adcfa"],
      response: "The ADCFA (Advanced Diploma in Computer Financial Accounting) is taught by Gurdarshan Kaur."
    },
    {
      keywords: ["dctt(diploma computer teacher training course)", "dctt", "teacher", "training"],
      response: "The DCTT (Diploma Computer Teacher Training Course) aims to prepare educators to teach computer skills effectively. It is taught by Kamaljit Kaur. The fee is Rs 15600, and the duration is 12 hours."
    },
    {
      keywords: ["fees only", "dctt(diploma computer teacher training course)", "dctt"],
      response: "The fee for the DCTT (Diploma Computer Teacher Training Course) is Rs 15600."
    },
    {
      keywords: ["duration only", "dctt(diploma computer teacher training course)", "dctt"],
      response: "The duration of the DCTT (Diploma Computer Teacher Training Course) is 12 hours."
    },
    {
      keywords: ["faculty only", "dctt(diploma computer teacher training course)", "dctt"],
      response: "The DCTT (Diploma Computer Teacher Training Course) is taught by Kamaljit Kaur."
    },
    {
      keywords: ["d.o.m.a(diploma in office management application)", "d.o.m.a", "doma", "office management", "office management application"],
      response: "The D.O.M.A (Diploma in Office Management Application) aims to teach office management software for efficient administrative tasks. It is taught by Gurdarshan Kaur. The fee is Rs 8000, and the duration is 6 hours."
    },
    {
      keywords: ["fees only", "d.o.m.a(diploma in office management application)", "d.o.m.a", "doma"],
      response: "The fee for the D.O.M.A (Diploma in Office Management Application) is Rs 8000."
    },
    {
      keywords: ["duration only", "d.o.m.a(diploma in office management application)", "d.o.m.a", "doma"],
      response: "The duration of the D.O.M.A (Diploma in Office Management Application) is 6 hours."
    },
    {
      keywords: ["faculty only", "d.o.m.a(diploma in office management application)", "d.o.m.a", "doma"],
      response: "The D.O.M.A (Diploma in Office Management Application) is taught by Gurdarshan Kaur."
    },
    {
      keywords: ["tally with gst", "tally", "gst"],
      response: "The Tally with GST course aims to enable proficiency in Tally software for accounting and GST compliance. It is taught by Daljit Singh. The fee is Rs 4000, and the duration is 6 hours."
    },
    {
      keywords: ["fees only", "tally with gst", "tally"],
      response: "The fee for the Tally with GST course is Rs 4000."
    },
    {
      keywords: ["duration only", "tally with gst", "tally"],
      response: "The duration of the Tally with GST course is 6 hours."
    },
    {
      keywords: ["faculty only", "tally with gst", "tally"],
      response: "The Tally with GST course is taught by Daljit Singh."
    },
    {
      keywords: ["advance excel", "advanced excel"],
      response: "The Advance Excel course aims to master advanced Excel functions for data analysis and reporting. It is taught by Kamaljit Kaur. The fee is Rs 1500, and the duration is 1-2 months."
    },
    {
      keywords: ["fees only", "advance excel", "advanced excel"],
      response: "The fee for the Advance Excel course is Rs 1500."
    },
    {
      keywords: ["duration only", "advance excel", "advanced excel"],
      response: "The duration of the Advance Excel course is 1-2 months."
    },
    {
      keywords: ["faculty only", "advance excel", "advanced excel"],
      response: "The Advance Excel course is taught by Kamaljit Kaur."
    },
    {
      keywords: ["typing course(english and punjabi)", "typing", "english punjabi typing", "typing course"],
      response: "The Typing Course (English and Punjabi) aims to improve typing speed and accuracy in English and Punjabi. It is taught by Daljit Singh. The fee is Rs 1000, and the duration is 1-2 months."
    },
    {
      keywords: ["fees only", "typing course(english and punjabi)", "typing", "english punjabi typing", "typing course"],
      response: "The fee for the Typing Course (English and Punjabi) is Rs 1000."
    },
    {
      keywords: ["duration only", "typing course(english and punjabi)", "typing", "english punjabi typing", "typing course"],
      response: "The duration of the Typing Course (English and Punjabi) is 1-2 months."
    },
    {
      keywords: ["faculty only", "typing course(english and punjabi)", "typing", "english punjabi typing", "typing course"],
      response: "The Typing Course (English and Punjabi) is taught by Daljit Singh."
    },
    {
      keywords: ["html and dhtml", "html dhtml", "html", "dhtml", "web development"],
      response: "The HTML and DHTML course aims to learn web development fundamentals using HTML and dynamic HTML. It is taught by Gurdarshan Kaur. The fee is Rs 2500, and the duration is 3-6 months."
    },
    {
      keywords: ["fees only", "html and dhtml", "html dhtml"],
      response: "The fee for the HTML and DHTML course is Rs 2500."
    },
    {
      keywords: ["duration only", "html and dhtml", "html dhtml"],
      response: "The duration of the HTML and DHTML course is 3-6 months."
    },
    {
      keywords: ["faculty only", "html and dhtml", "html dhtml"],
      response: "The HTML and DHTML course is taught by Gurdarshan Kaur."
    },
    {
      keywords: ["english spoken"],
      response: "The English Spoken course aims to enhance spoken English skills for effective communication. It is taught by Kamaljit Kaur. The fee is Rs 1200, and the duration is 3-4 months."
    },
    {
      keywords: ["fees only", "english spoken"],
      response: "The fee for the English Spoken course is Rs 1200."
    },
    {
      keywords: ["duration only", "english spoken"],
      response: "The duration of the English Spoken course is 3-4 months."
    },
    {
      keywords: ["faculty only", "english spoken"],
      response: "The English Spoken course is taught by Kamaljit Kaur."
    },
    {
      keywords: ["data entry", "data", "entry"],
      response: "The Data Entry course aims to develop skills for accurate and efficient data entry tasks. It is taught by Daljit Singh. The fee is Rs 8000, and the duration is 6 hours."
    },
    {
      keywords: ["fees only", "data entry"],
      response: "The fee for the Data Entry course is Rs 8000."
    },
    {
      keywords: ["duration only", "data entry"],
      response: "The duration of the Data Entry course is 6 hours."
    },
    {
      keywords: ["faculty only", "data entry"],
      response: "The Data Entry course is taught by Daljit Singh."
    },
    {
      keywords: ["internet"],
      response: "The Internet course aims to gain proficiency in internet navigation and online tools. It is taught by Gurdarshan Kaur. The fee is Rs 500, and the duration is 4 weeks."
    },
    {
      keywords: ["fees only", "internet"],
      response: "The fee for the Internet course is Rs 500."
    },
    {
      keywords: ["duration only", "internet"],
      response: "The duration of the Internet course is 4 weeks."
    },
    {
      keywords: ["faculty only", "internet"],
      response: "The Internet course is taught by Gurdarshan Kaur."
    },
    {
      keywords: ["catpro"],
      response: "The Catpro course aims to train in specialized software for professional applications. It is taught by Kamaljit Kaur. The fee is Rs 1800, and the duration is 1-2 months."
    },
    {
      keywords: ["fees only", "catpro"],
      response: "The fee for the Catpro course is Rs 1800."
    },
    {
      keywords: ["duration only", "catpro"],
      response: "The duration of the Catpro course is 1-2 months."
    },
    {
      keywords: ["faculty only", "catpro"],
      response: "The Catpro course is taught by Kamaljit Kaur."
    },
    {
      keywords: ["duration", "how long", "course length", "course duration"],
      response: "Course durations vary:\n\n- Short courses: 2-4 weeks\n- Comprehensive courses: 6-12 weeks\n\nYou can check the duration of each course on its details page."
    },
    {
      keywords: ["pricing", "fee", "cost", "price", "how much"],
      response: "Our course pricing varies depending on the course and its duration. Please visit our website or contact us for further details."
    },
    {
      keywords: ["enroll", "admission", "join", "register", "how to join"],
      response: "To enroll in a course:\n1. Visit our website and browse the courses.\n2. Select the course you're interested in.\n3. Click 'Enroll Now' and complete the registration process.\n4. Make the payment.\n5. Start learning!\n\nNeed help? Contact us at support@elearningplatform.com."
    },
    {
      keywords: ["certificate", "certificates", "how to get certificate", "enroll certificate"],
      response: "To receive a certificate:\n1. Complete the course requirements (videos, quizzes, assignments).\n2. Pass the final assessment.\n3. Download your certificate from your dashboard.\n\nCertificates are issued for all paid courses upon successful completion."
    },
    {
      keywords: ["free courses", "free", "no cost"],
      response: "We offer a selection of free courses to help you get started:\n\n- Introduction to Programming\n- Basics of Digital Marketing\n- Fundamentals of Graphic Design\n\nVisit our website to explore all free courses!"
    },
    {
      keywords: ["trial", "demo", "free trial"],
      response: "We offer a 7-day free trial for most of our courses. During the trial, you can access course materials and decide if it's right for you. No credit card is required!"
    },
    {
      keywords: ["refund", "cancel", "money back"],
      response: "We offer a 30-day money-back guarantee. If you're not satisfied with a course, contact us at support@elearningplatform.com, and we'll process your refund."
    },
    {
      keywords: ["support", "help", "customer service"],
      response: "Our support team is here to help! You can reach us at:\n📞 7973388650\n📧 support@elearningplatform.com\n\nWe're available Monday to Friday, 9 AM to 6 PM."
    },
    {
      keywords: ["platform", "how it works", "how to use"],
      response: "Our platform is easy to use:\n1. Sign up and create an account.\n2. Browse or search for courses.\n3. Enroll in a course.\n4. Access video lessons, quizzes, and assignments.\n5. Complete the course and earn your certificate.\n\nNeed help? Contact us!"
    },
    {
      keywords: ["mobile app", "app", "download"],
      response: "Yes, we have a mobile app! You can download it from the App Store or Google Play. The app allows you to learn on the go, download lessons, and track your progress."
    },
    {
      keywords: ["instructor", "teachers", "who teaches"],
      response: "Our courses are taught by our esteemed faculty: Daljit Singh, Gurdarshan Kaur, and Kamaljit Kaur. Each course is assigned to one of these experienced instructors."
    },
    {
      keywords: ["lifetime access", "access duration"],
      response: "Once you enroll in a course, you get lifetime access to the course materials. You can learn at your own pace and revisit the content anytime."
    },
    {
      keywords: ["payment", "payment methods", "how to pay"],
      response: "We accept various payment methods:\n- Credit/Debit Cards\n- PayPal\n- Bank Transfer\n\nAll payments are secure and encrypted."
    },
    {
      keywords: ["discount", "offer", "coupon"],
      response: "We frequently run discounts and special offers. Subscribe to our newsletter to stay updated on the latest deals!"
    },
    {
      keywords: ["corporate", "business", "team"],
      response: "We offer corporate training programs tailored to your team's needs. Contact us at corporate@elearningplatform.com for more details."
    },
    {
      keywords: ["timing", "time", "open", "close"],
      response: "Telus Institute is open Monday to Saturday from 9 AM to 6 PM. It is closed on Sundays."
    },
    {
      keywords: ["feedback", "review", "rate"],
      response: "We value your feedback! You can leave a review on the course page or contact us directly at feedback@elearningplatform.com."
    },
    {
      keywords: ["rating", "review", "how good", "basic computer course"],
      response: "The Basic Computer Course has a rating of 4.1 out of 5, appreciated for its foundational approach to computer skills."
    },
    {
      keywords: ["rating", "review", "how good", "120 hrs computer course"],
      response: "The 120 hrs Computer Course is rated 4.3 out of 5, valued for its comprehensive coverage."
    },
    {
      keywords: ["rating", "review", "how good", "dca(diploma in computer application)"],
      response: "The DCA (Diploma in Computer Application) holds a 4.5 out of 5 rating, recognized for its in-depth learning."
    },
    {
      keywords: ["rating", "review", "how good", "adca(advanced diploma in computer application)"],
      response: "The ADCA (Advanced Diploma in Computer Application) is rated 4.4 out of 5, praised for advanced technical training."
    },
    {
      keywords: ["rating", "review", "how good", "adcfa(advanced diploma in computer financial accounting)"],
      response: "The ADCFA (Advanced Diploma in Computer Financial Accounting) has a 4.6 out of 5 rating, popular for its financial expertise."
    },
    {
      keywords: ["rating", "review", "how good", "dctt(diploma computer teacher training course)"],
      response: "The DCTT (Diploma Computer Teacher Training Course) is rated 4.2 out of 5, well-regarded for teacher training."
    },
    {
      keywords: ["rating", "review", "how good", "d.o.m.a(diploma in office management application)", "d.o.m.a", "doma", "office management", "office management application"],
      response: "The D.O.M.A (Diploma in Office Management Application) has a 4.3 out of 5 rating, noted for its practical applications."
    },
    {
      keywords: ["rating", "review", "how good", "tally with gst"],
      response: "The Tally with GST course is rated 4.7 out of 5, highly valued for its accounting software training."
    },
    {
      keywords: ["rating", "review", "how good", "advance excel"],
      response: "The Advance Excel course boasts a perfect 5.0 out of 5 rating, our top-rated course for its exceptional spreadsheet training."
    },
    {
      keywords: ["rating", "review", "how good", "typing course(english and punjabi)", "typing", "english punjabi typing", "typing course"],
      response: "The Typing Course (English and Punjabi) is rated 4.0 out of 5, appreciated for its bilingual approach."
    },
    {
      keywords: ["rating", "review", "how good", "html and dhtml", "html dhtml", "web development"],
      response: "The HTML and DHTML course has a 4.4 out of 5 rating, recognized for its web development focus."
    },
    {
      keywords: ["rating", "review", "how good", "english spoken"],
      response: "The English Spoken course is rated 4.8 out of 5, loved for its effective communication training."
    },
    {
      keywords: ["rating", "review", "how good", "data entry"],
      response: "The Data Entry course has a 4.2 out of 5 rating, valued for its practical data management skills."
    },
    {
      keywords: ["rating", "review", "how good", "internet"],
      response: "The Internet course is rated 4.1 out of 5, popular for its accessible online navigation training."
    },
    {
      keywords: ["rating", "review", "how good", "catpro"],
      response: "The Catpro course has a 4.3 out of 5 rating, noted for its specialized software training."
    },
    {
      keywords: ["best", "recommended", "demanding", "top", "most popular", "highest rated", "best course", "recommended course", "demanding course", "top course", "most popular course", "highest rated course"],
      response: "Our top course is Advance Excel, with a perfect 5.0 out of 5 rating! It's highly recommended for its exceptional training in advanced Excel functions for data analysis and reporting."
    }
  ];

  function getPredefinedResponse(input) {
    // Remove trailing question mark, punctuation, and extra whitespace
    input = input.toLowerCase().trim().replace(/[?!.]+$/, '');
    
    let bestMatch = null;
    let maxMatches = 0;

    // Prioritize specific "fees only", "duration only", "faculty only" queries
    for (let item of predefinedResponses) {
      if (item.keywords.includes("fees only") || item.keywords.includes("duration only") || item.keywords.includes("faculty only")) {
        if (item.keywords.every(keyword => input.includes(keyword))) {
          return item.response;
        }
      }
    }

    // Check for "fees of <course>", "duration of <course>", "faculty of <course>"
    const courseKeywords = [
      "basic computer course",
      "120 hrs computer course",
      "dca(diploma in computer application)", "dca",
      "adca(advanced diploma in computer application)", "adca",
      "adcfa(advanced diploma in computer financial accounting)", "adcfa",
      "dctt(diploma computer teacher training course)", "dctt",
      "d.o.m.a(diploma in office management application)", "d.o.m.a", "doma",
      "tally with gst", "tally",
      "advance excel", "advanced excel",
      "typing course(english and punjabi)", "typing", "english punjabi typing",
      "html and dhtml", "html dhtml",
      "english spoken",
      "data entry",
      "internet",
      "catpro"
    ].filter((keyword, index, self) => self.indexOf(keyword) === index); // Remove duplicates

    for (const course of courseKeywords) {
      if (input === `fees of ${course}` || input === `fee of ${course}`) {
        const feeItem = predefinedResponses.find(item => item.keywords.includes("fees only") && item.keywords.includes(course));
        if (feeItem) return feeItem.response;
      }
      if (input === `duration of ${course}`) {
        const durationItem = predefinedResponses.find(item => item.keywords.includes("duration only") && item.keywords.includes(course));
        if (durationItem) return durationItem.response;
      }
      if (input === `faculty of ${course}` || input === `teacher of ${course}` || input === `instructor of ${course}`) {
        const facultyItem = predefinedResponses.find(item => item.keywords.includes("faculty only") && item.keywords.includes(course));
        if (facultyItem) return facultyItem.response;
      }
    }

    // Check for "best", "recommended", "demanding", etc. queries
    for (let item of predefinedResponses) {
      if (item.keywords.includes("best")) {
        if (item.keywords.some(keyword => input.includes(keyword))) {
          return item.response;
        }
      }
    }

    // Check for exact matches for courses with exactOnly or exactMatch
    for (let item of predefinedResponses) {
      if (item.exactMatch || item.exactOnly) {
        if (item.keywords.includes(input)) {
          return item.response;
        }
      }
    }

    // Check for exact course names "basic computer course" and "120 hrs computer course"
    for (let item of predefinedResponses) {
      if (item.keywords.includes("basic computer course") && input === "basic computer course") {
        return item.response;
      }
      if (item.keywords.includes("120 hrs computer course") && input === "120 hrs computer course") {
        return item.response;
      }
    }

    // Check if input contains "computer" or "compute course" as standalone terms
    if (/\b(computer|compute course)\b/.test(input) && !input.includes("fees only") && !input.includes("duration only") && !input.includes("faculty only")) {
      return "We have numerous computer courses. Which course are you interested in?";
    }

    // Check if input contains "course" or "courses" as a standalone word
    if (/\b(course|courses)\b/.test(input) && !input.includes("fees only") && !input.includes("duration only") && !input.includes("faculty only")) {
      return "We offer a wide range of courses:\n1. Basic Computer Course\n2. 120 hrs Computer Course\n3. DCA(Diploma in Computer Application)\n4. ADCA(Advanced Diploma in Computer Application)\n5. ADCFA(Advanced Diploma in Computer Financial Application)\n6. DCTT(Diploma Computer Teacher Training Course)\n7. D.O.M.A(Diploma in Office Management Application)\n8. Tally with GST\n9. Advance Excel\n10. Typing Course(English and Punjabi)\n11. HTML and DHTML\n12. English Spoken\n13. Data Entry\n14. Internet\n15. Catpro\n\nWhich course would you like more details about?";
    }

    // General keyword matching
    for (let item of predefinedResponses) {
      if (!item.exactMatch && !item.exactOnly) {
        const matches = item.keywords.reduce((count, keyword) => {
          // Check if input contains the keyword or its singular/plural form
          const singular = keyword.endsWith("s") ? keyword.slice(0, -1) : keyword;
          const plural = singular + "s";
          let matchCount = 0;
          if (input.includes(keyword) || input.includes(singular) || input.includes(plural)) {
            matchCount = 1;
            // Boost matches for specific queries (fees, duration, faculty)
            if (["duration", "how long", "time", "length", "course duration", "faculty", "teacher", "instructor", "who teaches", "professor", "trainer", "price", "pricing", "cost", "costing", "fees", "charges", "cost of", "how much", "price of"].includes(keyword)) {
              matchCount += 2; // Stronger boost for specific queries
            }
          }
          // Special handling for complex course names
          if (keyword === "d.o.m.a(diploma in office management application)") {
            if (input.includes("doma") || input.includes("office management") || input.includes("d.o.m.a")) {
              matchCount = 1;
            }
          }
          if (keyword === "typing course(english and punjabi)") {
            if (input.includes("typing course") || input.includes("english punjabi typing") || input.includes("typing")) {
              matchCount = 1;
            }
          }
          if (keyword === "html and dhtml" && input.includes("html dhtml")) {
            matchCount = 1;
          }
          return count + matchCount;
        }, 0);
        // Update best match if matches are higher
        if (matches > maxMatches) {
          maxMatches = matches;
          bestMatch = item.response;
        }
      }
    }
    return maxMatches > 0 ? bestMatch : null;
  }

  async function callGeminiAPI(userQuestion) {
    const apiKey = "YOUR_GEMINI_API_KEY";
    const apiUrl = "https://api.gemini.com/v1/generate";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: userQuestion,
          max_tokens: 100,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from Gemini API");
      }

      const data = await response.json();
      return data.choices[0].text.trim();
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  }

  async function generateAnswer() {
    if (!question.trim()) {
      const botEntry = { sender: "bot", text: "Please enter a question." };
      setChatHistory((prev) => [...prev, botEntry]);
      setQuestion("");
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
      return;
    }

    setLoading(true);
    const newEntry = { sender: "user", text: question };
    setChatHistory((prev) => [...prev, newEntry]);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      let aiResponse = "";

      if (!firstMessageSent) {
        aiResponse = "Hello! 👋 Welcome to our e-learning platform. How can I assist you today?";
        setFirstMessageSent(true);
      } else {
        const predefined = getPredefinedResponse(question);
        if (predefined) {
          aiResponse = predefined;
        } else {
          const geminiResponse = await callGeminiAPI(question);
          aiResponse = geminiResponse.toLowerCase().includes("institute seated") || geminiResponse.toLowerCase().includes("e-learning")
            ? geminiResponse
            : "I am sorry, but I can only answer questions related to our e-learning platform.";
        }
      }

      const botEntry = { sender: "bot", text: aiResponse };
      setChatHistory((prev) => [...prev, botEntry]);
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    } catch (error) {
      console.error("Error in generateAnswer:", error);
      const botEntry = { sender: "bot", text: "I am sorry, but I can only answer questions related to our e-learning platform." };
      setChatHistory((prev) => [...prev, botEntry]);
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory, isOpen, loading]);

  useEffect(() => {
    if (isOpen && !firstMessageSent) {
      const welcomeMessage = "Welcome to our Telus bot! 👋 How can I assist you today?";
      setChatHistory([{ sender: "bot", text: welcomeMessage }]);
      setFirstMessageSent(true);
    }
  }, [isOpen, firstMessageSent]);

  return (
    <div className="chat-widget">
      {isOpen && (
        <div className="chat-window" style={{ background: backgrounds[backgroundIndex] }}>
          <div className="chat-header">
            <h3>Telus Bot 🤖</h3>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
          <div className="chat-messages" ref={messagesRef}>
            {chatHistory.map((entry, index) => (
              <div
                key={index}
                className={`message ${entry.sender === "user" ? "user-message" : "bot-message"}`}
              >
                <strong>{entry.sender === "user" ? "You" : "Bot"}:</strong> {entry.text}
              </div>
            ))}
            {loading && (
              <div className="message bot-message loading-message">
                <strong>Bot:</strong>
                <span className="loading-container">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/414/414927.png"
                    alt="Cloud"
                    className="loading-cloud"
                  />
                  <span className="loading-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </span>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask about courses, pricing, enrollment, or support..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && generateAnswer()}
            />
            <button onClick={generateAnswer} disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        🤖
      </button>
    </div>
  );
};