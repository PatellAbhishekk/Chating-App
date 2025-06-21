// Chat.jsx
import { Card, CardBody, Image } from "@heroui/react";
// import { useState } from "react";
import NewUser from "./NewUser";
import { useEffect, useState, useMemo } from "react";

// Generate a unique avatar URL using the user's name
const generateAvatarUrl = (name) =>
  name
    ? `https://api.dicebear.com/6.x/avataaars/svg?seed=${encodeURIComponent(
        name
      )}`
    : null;

// Generate a consistent color based on the user's name
const getColorFromName = (name) => {
  const colors = [
    "text-red-500",
    "text-green-500",
    "text-blue-500",
    "text-yellow-500",
    "text-purple-500",
    "text-pink-500",
    "text-teal-500",
    "text-orange-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export default function Chat({ content, own, type, name, timestamp }) {
  const [formattedTime, setFormattedTime] = useState("");

  // Memoize avatar URL and color to prevent unnecessary re-calculations
  const avatarUrl = useMemo(() => generateAvatarUrl(name), [name]);
  const nameColor = useMemo(() => getColorFromName(name), [name]);

  useEffect(() => {
    const validTimestamp = timestamp || new Date().toISOString();
    const date = new Date(validTimestamp);

    setFormattedTime(
      !isNaN(date.getTime())
        ? date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : "Invalid Time"
    );
  }, [timestamp]);

  const messageStyle = `w-fit max-w-[85%] md:max-w-md lg:max-w-lg shadow-md p-2 rounded-xl ${
    type === "user"
      ? "mx-auto bg-green-100"
      : own
      ? "ml-auto bg-blue-100"
      : "bg-gray-200"
  }`;

  const messageTextStyle = `text-sm ${
    own ? "text-right text-gray-800" : "text-left text-gray-700"
  }`;

  return (
    <div className="mb-3">
      <Card className={messageStyle}>
        <CardBody className="flex flex-col gap-2">
          {/* Avatar and Name (Only for non-user messages) */}
          {!own && type !== "user" && avatarUrl && (
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 rounded-full border"
                src={avatarUrl}
                alt={name}
              />
              <span className={`text-xs font-medium ${nameColor}`}>{name}</span>
            </div>
          )}

          {/* Message Content */}
          <div className={messageTextStyle}>
            {type === "user" && <NewUser name={content} />}
            {type === "text" && <p className="break-words">{content}</p>}
            {type === "link" && (
              <a
                href={content}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-gray-700 hover:text-gray-900 break-words"
              >
                {content}
              </a>
            )}
            {type === "image" && content && (
              <div className="max-w-[200px] md:max-w-[250px] lg:max-w-[300px] overflow-hidden rounded-md border border-gray-300">
                <Image
                  alt="image message"
                  src={content}
                  className="rounded-md shadow-sm w-full h-auto object-contain"
                />
              </div>
            )}
          </div>

          {/* Timestamp */}
          <span
            className={`text-[10px] text-gray-500 ${own ? "self-end" : ""}`}
          >
            {formattedTime}
          </span>
        </CardBody>
      </Card>
    </div>
  );
}
