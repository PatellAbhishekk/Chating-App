"use client";
import { HeroUIProvider } from "@heroui/react";
import { SignUp } from "@/components";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem("user");
    if (session) {
      setUser(session);
    }
  }, []);

  return (
    <HeroUIProvider>
      <div className="min-h-screen max-h-screen">
        {!user ? <SignUp setUser={setUser} /> : `Welcome ${user}`}
      </div>
    </HeroUIProvider>
  );
}
