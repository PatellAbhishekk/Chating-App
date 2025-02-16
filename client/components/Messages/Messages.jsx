import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Video, Phone, Search } from "lucide-react";
import Chat from "./Chat";

// Hook to check online/offline status
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

export default function Messages({ messages, id, teamName = "Team Chat" }) {
  const scrollRef = useRef(null);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-gray-800 text-white py-3 px-5 shadow-lg">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 cursor-pointer" aria-label="Go back" />
          <div>
            <h1 className="text-lg font-semibold">{teamName}</h1>
            <p
              className={`text-sm ${
                isOnline ? "text-green-400" : "text-red-400"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Video
            className="w-5 h-5 cursor-pointer"
            aria-label="Start video call"
          />
          <Phone
            className="w-5 h-5 cursor-pointer"
            aria-label="Start audio call"
          />
          <Search
            className="w-5 h-5 cursor-pointer"
            aria-label="Search messages"
          />
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 px-5 py-3 overflow-y-auto scrollbar-hide">
        <section className="flex flex-col gap-2">
          {messages.map((message, index) => (
            <Chat
              key={message.id || `${message.timestamp}-${index}`} // Ensuring a unique key
              own={message.user.id === id}
              name={message.user.name}
              type={message.type}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
        </section>
        <div ref={scrollRef}></div>
      </div>
    </div>
  );
}
