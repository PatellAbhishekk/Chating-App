"use client";
import { HeroUIProvider } from "@heroui/react";
import { SignUp } from "@/components";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState("");

  return (
    <HeroUIProvider>
      <div className="min-h-screen max-h-screen">
        {!user ? <SignUp setUser={setUser} /> : `Welcome ${user.name}`}
      </div>
    </HeroUIProvider>
  );
}
