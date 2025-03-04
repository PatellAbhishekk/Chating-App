import { useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import { ArrowLeft, Video, Phone } from "lucide-react";

// network status
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
  return (
    <>
      {/* Navbar */}
      <div className="flex justify-between bg-gradient-to-r from-green-200 to-gray-100 border border-green-200 rounded-lg shadow-md animate-slide-in max-w-full px-5 py-3 gap-2">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          <ArrowLeft className="w-5 h-5 cursor-pointer" aria-label="Go back" />
          <h1>Network: {useOnlineStatus() ? "online" : "offline"}</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center bg-gradient-to-r from-green-100 to-gray-50 border border-green-300 rounded-md shadow px-4 py-2 gap-4">
          <Video
            className="w-5 h-5 cursor-pointer"
            aria-label="Start video call"
          />
          <Phone
            className="w-5 h-5 cursor-pointer"
            aria-label="Start audio call"
          />
        </div>
      </div>

      {/* Messages */}
      <div className="container mx-auto pt-5 px-5 py-3">
        <section className="flex gap-1 flex-col">
          {messages.map((message, index) => (
            <Chat
              key={message.id || `${message.timestamp}-${index}`}
              own={message.user.id === id}
              name={message.user.name}
              type={message.type}
              content={message.content}
              timestamp={message.timestamp}
            />
          ))}
        </section>
      </div>
    </>
  );
}
