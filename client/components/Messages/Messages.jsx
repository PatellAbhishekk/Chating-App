import { useEffect, useRef, useMemo } from "react";
import Chat from "./Chat";
import { ArrowLeft, MoreVertical } from "lucide-react";

export default function Messages({ messages, id, teamName = "Abhishek Team" }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const renderedMessages = useMemo(() => {
    return messages.map((message, index) => (
      <Chat
        key={message.id || index}
        own={message.user.id === id}
        name={message.user.name}
        type={message.type}
        content={message.content}
        timestamp={message.timestamp}
      />
    ));
  }, [messages, id]);

  return (
    <div className="flex flex-col min-h-screen">
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

      {/* Messages */}
      <div className="flex-1 overflow-y-scroll px-5 py-3 custom-scrollbar">
        <section className="flex flex-col gap-3">{renderedMessages}</section>
        <div ref={scrollRef} />
      </div>
    </div>
  );
}
