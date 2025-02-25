import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { FaComments, FaFacebook, FaInstagram, FaLinkedin, FaRobot, FaTwitter } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";

const Home = () => {
  const [language, setLanguage] = useState("English");
  const [showBot, setShowBot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, user: true }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "I'm here to help! How can I assist you?", user: false }]);
      }, 1000);
    }
  };

  return (
    <div className="font-poppins text-gray-900">
          <motion.nav 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="bg-[#00B6BA] text-white py-4 px-6 flex justify-between items-center shadow-lg w-full"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img 
          src="/assets/parental-guidance.png" 
          alt="EduMitra Logo" 
          className="w-12 h-12 border-4 border-gray-700 rounded-full shadow-lg" 
        />
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">EduMitra</h1>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white text-2xl" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes/> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <div className={`md:flex md:items-center md:gap-6 absolute md:static top-16 left-0 w-full md:w-auto bg-[#00B6BA] md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
      {/* <Link to="/TeacherDashboard" className="block md:inline-block px-6 py-3 md:py-0 hover:bg-[#008A8E] md:hover:bg-transparent">Teacher Dashboard</Link> */}
        {/* <Link to="/dashboard" className="block md:inline-block px-6 py-3 md:py-0 hover:bg-[#008A8E] md:hover:bg-transparent">Dashboard</Link> */}
        <select
          className="block md:inline-block bg-white text-gray-900 px-3 py-2 rounded-lg border border-gray-300 hover:border-[#00B6BA] mx-6 md:mx-0 my-2 md:my-0"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
        {/* <Link to="/login" className="block md:inline-block px-6 py-3 md:py-0 hover:bg-[#008A8E] md:hover:bg-transparent">Login</Link> */}
        <Link to="/signin" className="block md:inline-block px-6 py-3 md:py-0 hover:bg-[#008A8E] md:hover:bg-transparent">SignIn</Link>
      </div>
    </motion.nav>

      
      {/* Hero Section */}
<div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-10 md:py-16 gap-6 w-full">
  {/* Text Section */}
  <motion.div 
    initial={{ opacity: 0, x: -50 }} 
    animate={{ opacity: 1, x: 0 }} 
    transition={{ duration: 0.8 }}
    className="md:w-1/2 text-center md:text-left"
  >
    <h2 className="text-3xl md:text-5xl font-bold text-[#00B6BA] leading-tight">
      <Typewriter 
        options={{
          strings: [
            "Bridging the Gap Between Parents & Education",
            "Stay Connected with Your Child's Learning",
            "Making Parent-Teacher Talks Effortless"
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </h2>
    <p className="text-lg md:text-xl text-gray-700 mt-6 leading-relaxed">
      EduMitra makes it effortless for parents to stay engaged with their child's education. Get real-time updates, track academic progress, and communicate seamlessly with teachers – all in one place.
    </p>
  </motion.div>

  {/* Image Section */}
  <motion.div 
    initial={{ opacity: 0, x: 50 }} 
    animate={{ opacity: 1, x: 0 }} 
    transition={{ duration: 0.8 }}
    className="w-full md:w-1/2 flex justify-center"
  >
    <img 
      src="/assets/thumbnail.jpg" 
      alt="Educational Illustration" 
      className="w-full md:w-4/5 h-auto object-cover rounded-lg shadow-2xl"
    />
  </motion.div>
</div>


      {/* Feature Section */}
      <div className="px-6 md:px-12 py-16 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#00B6BA] mb-8">Our Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[ 
            { img: "/assets/mood-board.png", title: "Notice Board", desc: "Stay updated with school notices and announcements." },
            { img: "/assets/robot.png", title: "AskBot", desc: "AI-powered assistant to answer all academic queries." },
            { img: "/assets/mentor.png", title: "Teacher Connect", desc: "Seamless parent-teacher communication." }
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-xl flex flex-col items-center text-center border border-gray-300 hover:shadow-2xl transition transform hover:scale-105"
            >
              <img src={feature.img} alt={feature.title} className="w-14 md:w-16 h-14 md:h-16 mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          {[ 
            { img: "/assets/performance.png", title: "Performance Tracker", desc: "Monitor student progress with analytics." },
            { img: "/assets/report.png", title: "Reports", desc: "Download and review academic reports anytime." }
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-xl flex flex-col items-center text-center border border-gray-300 hover:shadow-2xl transition transform hover:scale-105"
            >
              <img src={feature.img} alt={feature.title} className="w-14 md:w-16 h-14 md:h-16 mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>


      {/* How It Works Section */}
      <div className="px-6 md:px-12 py-16 bg-white flex flex-col md:flex-row items-center gap-12">
        <motion.video 
          initial={{ opacity: 0.8 }}
          whileHover={{ scale: 1.08, boxShadow: "0px 12px 30px rgba(0, 182, 186, 0.5)" }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[42rem] rounded-xl shadow-2xl border-4 border-[#00B6BA] hover:border-[#008A8E] transition-all"
          controls poster="/assets/thumbnail2.jpg"
        >
          <source src="/assets/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </motion.video>
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#00B6BA] mb-6 drop-shadow-lg">How EduMitra Works</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-4 leading-relaxed font-semibold tracking-wide">
            EduMitra bridges the gap between parents and educators, providing real-time updates, 
            seamless communication, and progress tracking. With intuitive features and an easy-to-use 
            interface, parents can stay informed about their child's academic journey.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-semibold tracking-wide">
            Watch the video to learn more about how EduConnect enhances parental involvement in education.
          </p>
        </div>
      </div>
     
     
     
        
      {/* Motivation Quote */}
      <div className="bg-gray-100 py-20 ">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.1, boxShadow: "0px 10px 25px rgba(0, 182, 186, 0.5)" }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto px-12 py-10 bg-gradient-to-r from-[#abedf6] to-[#00B6BA] text-center rounded-2xl shadow-2xl border border-[#008A8E] hover:scale-105 transition-all"
        >
          <h2 className="text-3xl font-extrabold text-white mb-4 italic drop-shadow-lg hover:text-[#FFFAFA] transition-all">"Education is the most powerful weapon which you can use to change the world."</h2>
          <p className="text-lg font-semibold text-white hover:text-[#FFF5EE] transition-all">- Nelson Mandela</p>
        </motion.div>
      </div>
    
        

 {/* Footer Section */}
 <footer className="bg-[#00B6BA] text-white pt-6 text-center mt-0">
        <div className="flex justify-center gap-6 md:gap-16 mb-4 flex-wrap">
          <a href="#" className="hover:text-gray-700 transition transform hover:scale-125 hover:rotate-6"><FaFacebook size={30} /></a>
          <a href="#" className="hover:text-gray-700 transition transform hover:scale-125 hover:rotate-6"><FaTwitter size={30} /></a>
          <a href="#" className="hover:text-gray-700 transition transform hover:scale-125 hover:rotate-6"><FaInstagram size={30} /></a>
          <a href="#" className="hover:text-gray-700 transition transform hover:scale-125 hover:rotate-6"><FaLinkedin size={30} /></a>
        </div>
        <p className="text-lg md:text-xl mt-5 mb-5">&copy; {new Date().getFullYear()} EduMitra. All Rights Reserved.</p>
        <div className="mt-2 flex flex-wrap justify-center gap-2 md:gap-4">
          <Link to="/privacy" className="text-white hover:text-gray-300">Privacy Policy</Link>
          <span className="hidden md:inline">|</span>
          <Link to="/terms" className="text-white hover:text-gray-300">Terms of Service</Link>
          <span className="hidden md:inline">|</span>
          <Link to="/contact" className="text-white hover:text-gray-300">Contact Us</Link>
        </div>
      </footer>
      
      {/* Floating AI Bot */}
      <motion.div 
        animate={{ rotate: [0, 7, -7, 7, -7, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="fixed bottom-8 right-8 z-50 "
      >
        <button 
          onClick={() => setShowBot(!showBot)}
          className="bg-[#00B6BA] text-white p-6 rounded-full shadow-lg hover:bg-[#008A8E] transition transform hover:scale-110"
        >
          <img src="/assets/assistant.png" alt="AI Bot" className="w-10 h-10" />
        </button>
      </motion.div>
      
     
{/* AI Bot */}
{showBot && (
  <div className="fixed bottom-6 right-6 bg-white w-80 p-4 rounded-xl shadow-xl border md:bottom-24 md:right-28 z-50">
    
    {/* Close Button */}
    <button 
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition"
      onClick={() => setShowBot(false)} // Close the bot when clicked
    >
      ❌
    </button>

    <h2 className="text-xl font-bold text-center text-[#00B6BA] mb-2">EduMitra AI Bot</h2>
    
    {/* Chat Messages */}
    <div className="h-48 overflow-y-auto border p-2 rounded-lg bg-gray-50 flex flex-col space-y-2 pb-12">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`p-2 my-1 rounded-lg max-w-[75%] ${msg.user ? 'bg-[#00B6BA] text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}
        >
          {msg.text}
        </div>
      ))}
    </div>

    {/* Input Field & Send Button */}
    <div className="flex mt-2">
      <input 
        type="text" 
        className="flex-1 p-2 border rounded-l-lg focus:outline-none text-sm sm:text-base" 
        placeholder="Ask me anything..." 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
      />
      <button 
        className="bg-[#00B6BA] text-white px-4 py-2 rounded-r-lg hover:bg-[#008A8E] transition text-sm sm:text-base" 
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  </div>
)}


        
      </div>
   
  );
};

export default Home;