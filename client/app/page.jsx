"use client";
import { useEffect, useState } from "react";
import { HeroUIProvider } from "@heroui/react";
import { Messages, Inputs, SignUp } from "@/components";
import { io } from "socket.io-client";

const socket = io("https://madeapp-q3r5v.kinsta.app/");

export default function Home() {
  const [user, setUser] = useState(null);

  return (
    <HeroUIProvider>
      <div className="min-h-screen max-h-screen">
        {!user ? (
          <SignUp setUser={setUser} socket={socket} />
        ) : (
          <div className="relative min-h-screen max-h-screen">
            <Messages />
            <Inputs socket={socket} name={user} />
          </div>
        )}
      </div>
    </HeroUIProvider>
  );
}
