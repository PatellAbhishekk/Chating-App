import { Card, CardBody, Image } from "@heroui/react";
import NewUser from "./NewUser";
import { useEffect, useState, useMemo } from "react";

// Generate a unique avatar URL using the user's name
const generateAvatarUrl = (name) =>
  name
    ? `https://api.dicebear.com/6.x/avataaars/svg?seed=${encodeURIComponent(
        name
      )}`
    : null;

export default function Chat({ content, own, type, name, timestamp }) {
  const [formattedTime, setFormattedTime] = useState("");

  // Memoize avatar URL to prevent unnecessary re-calculations
  const avatarUrl = useMemo(() => generateAvatarUrl(name), [name]);

  useEffect(() => {
    // Ensure timestamp is valid
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

  // Message styling
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
              <span className="text-xs font-medium text-gray-900">{name}</span>
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
              <div className="max-w-[250px] md:max-w-[300px] lg:max-w-[400px] overflow-hidden rounded-lg">
                <Image
                  alt="image message"
                  src={content}
                  className="rounded-lg shadow-sm w-full h-auto object-cover"
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
