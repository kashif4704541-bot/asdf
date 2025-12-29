// Footer.jsx
import React, { useState, useEffect } from "react";

const Footer = ({ totalTasks = 20, pendingTasks = 5 }) => {
  const quotes = [
    "Believe you can and you're halfway there.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Don't watch the clock; do what it does. Keep going.",
    "Strive for progress, not perfection.",
    "Your limitation—it's only your imagination.",
    "Dream big, work hard, stay focused.",
    "Consistency is key to success."
  ];

  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <footer className="bg-[#001F5C] text-white p-6 mt-24">
      <div className="text-center mb-4">
        <span className="text-gray-300 text-lg font-serif font-semibold">{quote}</span>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex-shrink-0">
          <span className="font-semibold">© 2025 YourCompany. All rights reserved.</span>
        </div>

        <div className="flex gap-6">
          <a href="#" className="hover:text-blue-400 text-lg">Help</a>
          <a href="#" className="hover:text-blue-400 text-lg">Settings</a>
          <a href="#" className="hover:text-blue-400 text-lg">Privacy</a>
        </div>

        <div className="flex gap-4">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=shaheer.kas08@gmail.com&su=Dashboard%20Query&body=Hi%20Admin,"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 font-medium"
          >
            Contact Admin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
