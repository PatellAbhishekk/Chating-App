import { useEffect, useRef } from "react";
import { ArrowLeft, Video, Phone } from "lucide-react";
import Chat from "./Chat";

export default function Messages({ messages, id, teamName = "Team Chat" }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen ">
      {/* Navbar */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-gray-800 text-white py-3 px-5 shadow-lg">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 cursor-pointer" aria-label="Go back" />
          <div>
            <h1 className="text-lg font-semibold">{teamName}</h1>
            <p className="text-sm text-green-400">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
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

      {/* Chat Container */}
      <div className="flex-1 px-5 py-3 overflow-y-auto scrollbar-hide">
        <section className="flex flex-col gap-2">
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
        <div ref={scrollRef}></div>
      </div>
    </div>
  );
}
