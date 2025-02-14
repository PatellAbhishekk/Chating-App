import { useEffect, useRef } from "react";
import { ArrowLeft, Video, Phone, Search, Check } from "lucide-react";
import { motion } from "framer-motion";
import NewUser from "./NewUser"; // Import the NewUser component

export default function Messages({ messages, id, teamName = "Team Chat" }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-gray-500 text-white py-3 px-5">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <div>
            <h1 className="text-lg font-semibold">{teamName}</h1>
            <p className="text-sm text-gray-200">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Video className="w-5 h-5 cursor-pointer" />
          <Phone className="w-5 h-5 cursor-pointer" />
          <Search className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      {/* Scrollable Messages */}
      <div className="message-container flex-1 overflow-y-auto px-5 py-3 bg-gray-100">
        {messages.map((message, index) => (
          <motion.div
            key={message.id || index}
            initial={{
              x:
                message.type === "join" ? 0 : message.user.id === id ? 50 : -50,
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex ${
              message.type === "join"
                ? "justify-center"
                : message.user.id === id
                ? "justify-end"
                : "justify-start"
            } mb-4`}
          >
            {message.type === "join" ? (
              <NewUser name={message.user.name} />
            ) : (
              <div
                className={`relative max-w-md p-3 rounded-lg ${
                  message.user.id === id
                    ? "bg-gray-500 text-white"
                    : "bg-gray-300 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">
                    {message.timestamp}
                  </span>
                  {message.user.id === id && (
                    <div className="flex items-center ml-2">
                      {message.status === "sent" && (
                        <Check className="w-4 h-4 text-gray-400" />
                      )}
                      {message.status === "delivered" && (
                        <>
                          <Check className="w-4 h-4 text-gray-400" />
                          <Check className="w-4 h-4 text-gray-400 -ml-2" />
                        </>
                      )}
                      {message.status === "read" && (
                        <>
                          <Check className="w-4 h-4 text-blue-500" />
                          <Check className="w-4 h-4 text-blue-500 -ml-2" />
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ))}
        <div ref={scrollRef} />
      </div>
    </div>
  );
}
