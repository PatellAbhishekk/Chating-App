import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Video, Phone, X, Check } from "lucide-react";
import Chat from "./Chat";
import { motion } from "framer-motion";

export default function Messages({
  messages,
  id,
  teamName = "Team Chat",
  socket,
}) {
  const scrollRef = useRef(null);
  const [callIncoming, setCallIncoming] = useState(false);
  const [caller, setCaller] = useState(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return; // ✅ Prevents error when socket is undefined

    socket.on("incoming-call", ({ from }) => {
      setCaller(from);
      setCallIncoming(true);
    });

    return () => {
      socket.off("incoming-call");
    };
  }, [socket]);

  const startCall = async (type) => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia(
        type === "video" ? { video: true, audio: true } : { audio: true }
      );
      setStream(userStream);
      if (socket) {
        socket.emit("start-call", { from: id, type });
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <motion.div className="sticky top-0 z-50 flex items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 px-5 shadow-lg">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 cursor-pointer" aria-label="Go back" />
          <div>
            <h1 className="text-lg font-semibold">{teamName}</h1>
            <p className="text-sm text-green-200 animate-pulse">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <motion.div whileHover={{ scale: 1.2 }}>
            <Video
              className="w-5 h-5 cursor-pointer"
              onClick={() => startCall("video")}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2 }}>
            <Phone
              className="w-5 h-5 cursor-pointer"
              onClick={() => startCall("audio")}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Incoming Call Popup */}
      {callIncoming && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold">{caller} is calling...</h2>
            <div className="flex justify-center gap-4 mt-4">
              <button className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600">
                <Check className="w-6 h-6" />
              </button>
              <button className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <div className="flex-1 px-5 py-3 overflow-y-auto scrollbar-hide bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300">
        {messages.map((message, index) => (
          <Chat
            key={message.id || `${message.timestamp}-${index}`}
            {...message}
          />
        ))}
        <div ref={scrollRef}></div>
      </div>
    </div>
  );
}
