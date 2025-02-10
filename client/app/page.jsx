"use client";
import { useEffect, useState } from "react";
import { HeroUIProvider } from "@heroui/react";
import { Messages, Inputs, SignUp } from "@/components";
import { io } from "socket.io-client";

const socket = io("https://chating-app-h2oq1.kinsta.app/", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  autoConnect: true,
});

export default function Home() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Handle new messages and new users
    const handleNewMessage = (msg) => {
      setMessages((prevState) => [...prevState, msg]);
    };

    const handleNewUser = (name) => {
      const msg = {
        type: "user",
        content: name,
        user: {
          id: 0,
          name: "New User",
        },
        timestamp: new Date().toISOString(),
      };
      setMessages((prevState) => [...prevState, msg]);
    };

    socket.on("new_message", handleNewMessage);
    socket.on("new_user", handleNewUser);

    // Cleanup listeners on unmount
    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("new_user", handleNewUser);
    };
  }, []);

  return (
    <HeroUIProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {!user ? (
          <SignUp setUser={setUser} socket={socket} />
        ) : (
          <div className="relative flex flex-col min-h-screen">
            <Messages messages={messages} id={socket.id} />
            <Inputs socket={socket} name={user} setMessages={setMessages} />
          </div>
        )}
      </div>
    </HeroUIProvider>
  );
}
