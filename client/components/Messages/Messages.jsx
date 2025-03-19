"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Chat from "./Chat";
import { ArrowLeft, Video, Phone, SendHorizontal } from "lucide-react";

// Network status hook
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

export default function Messages({ messages, id }) {
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    // Auto scroll to the bottom of the chat on new messages
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle message sending
  const handleSendMessage = () => {
    if (input.trim()) {
      console.log("Sending message:", input);
      setInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300">
      {/* ✅ Fixed Navbar */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="flex justify-between items-center bg-gradient-to-r from-yellow-200 to-blue-300 
                   border border-green-400 rounded-lg shadow-md px-4 py-2 mb-2"
      >
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <ArrowLeft
            className="w-6 h-6 cursor-pointer text-gray-700 hover:text-gray-900"
            aria-label="Go back"
          />
          <h1 className="text-sm font-medium text-gray-700">
            Network:{" "}
            <span
              className={`font-semibold ${
                useOnlineStatus() ? "text-green-600" : "text-red-500"
              }`}
            >
              {useOnlineStatus() ? "Online" : "Offline"}
            </span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div
            className="p-2 bg-white/70 border border-gray-300 rounded-full shadow-md 
                  backdrop-blur-md cursor-pointer transition duration-300 
                  hover:bg-green-100 hover:scale-110"
          >
            <Video
              className="w-6 h-6 text-gray-700 hover:text-green-600"
              aria-label="Start video call"
            />
          </div>

          <div
            className="p-2 bg-white/70 border border-gray-300 rounded-full shadow-md 
                  backdrop-blur-md cursor-pointer transition duration-300 
                  hover:bg-green-100 hover:scale-110"
          >
            <Phone
              className="w-6 h-6 text-gray-700 hover:text-green-600"
              aria-label="Start audio call"
            />
          </div>
        </div>
      </motion.div>

      {/* ✅ Chat Section with Gradient Background */}
      <div className="flex-1 overflow-y-auto px-4 py-3 bg-gradient-to-br from-yellow-200 to-blue-400 rounded-lg shadow-inner">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          {messages.map((message, index) => (
            <motion.div
              key={message.id || `${message.timestamp}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Chat
                own={message.user.id === id}
                name={message.user.name}
                type={message.type}
                content={message.content}
                timestamp={message.timestamp}
              />
            </motion.div>
          ))}
          {/* Scroll to latest message */}
          <div ref={scrollRef}></div>
        </motion.section>
      </div>
    </div>
  );
}
