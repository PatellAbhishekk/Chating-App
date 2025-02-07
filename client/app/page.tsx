"use client";
import { Button, HeroUIProvider } from "@heroui/react";

export default function Home() {
  return (
    <HeroUIProvider>
      <div className="min-h-screen max-h-screen grid place-items-center">
        <h1>MADE Room</h1>
        <Button>Click me</Button>
      </div>
    </HeroUIProvider>
  );
}
