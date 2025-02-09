import { useEffect, useRef } from "react";
import Chat from "./Chat";

export default function Messages({ messages, id }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: "smooth" });
    }
  }, [messages]);

  return (
    <div className="container mx-auto pt-5 min-h-[90vh] max-h-[90vh] overflow-scroll scrollbar-hidden px-5 py-3">
      <section className="flex gap-1 flex-col">
        {messages.map((message, index) => (
          <Chat
            key={index}
            own={message.user.id === id}
            name={message.user.name}
            type={message.type}
            content={message.content}
          />
        ))}
      </section>

      <div className="auto-scroll" ref={scrollRef}></div>
    </div>
  );
}
