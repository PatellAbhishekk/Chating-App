"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { HeroUIProvider } from "@heroui/react";
import { Messages, Inputs, SignUp } from "@/components";

const socket = io(
  "https://congenial-zebra-69r46pjwvr6vf6pw-8000.app.github.dev/"
);

console.log(socket);

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = sessionStorage.getItem("user");
    if (session) {
      setUser(session);
    }
  }, []);

  return (
    <HeroUIProvider>
      <div className="min-h-screen max-h-screen">
        {!user ? (
          <SignUp setUser={setUser} socket={socket} />
        ) : (
          <div className="relative min-h-screen max-h-screen">
            <Messages />
            <Inputs />
          </div>
        )}
      </div>
    </HeroUIProvider>
  );
}
