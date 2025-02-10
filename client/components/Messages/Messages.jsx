import { useEffect, useRef } from "react";
import Chat from "./Chat";
import { ArrowLeft, MoreVertical } from "lucide-react";

export default function Messages({ messages, id, teamName = "Abhishek Team" }) {
  const scrollRef = useRef(null);

  // Scroll to the latest message when the messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-blue-500 text-white py-3 px-5">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
          <div>
            <h1 className="text-lg font-semibold">{teamName}</h1>
            <p className="text-sm text-gray-200">Online</p>
          </div>
        </div>
        <MoreVertical className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Scrollable Messages */}
      <div className="message-container flex-1 overflow-y-auto px-5 py-3">
        {messages.map((message, index) => (
          <Chat
            key={message.id || index}
            own={message.user.id === id}
            name={message.user.name}
            type={message.type}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
        <div ref={scrollRef} />
      </div>
    </div>
  );
}
