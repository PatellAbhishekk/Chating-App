import { Card, CardBody, Avatar, Image } from "@heroui/react";
import NewUser from "./NewUser";
import { useEffect, useState } from "react";

export default function Chat({ content, own, type, name, timestamp }) {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const validTimestamp = timestamp || new Date().toISOString();
    const date = new Date(validTimestamp);

    if (!isNaN(date.getTime())) {
      const options = { hour: "2-digit", minute: "2-digit", hour12: false };
      setFormattedTime(date.toLocaleTimeString("en-US", options));
    } else {
      setFormattedTime("Invalid Time");
    }
  }, [timestamp]);

  const messageStyle = `w-fit max-w-[85%] md:max-w-md lg:max-w-lg shadow-md p-3 rounded-xl ${
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
          {/* Avatar and Name for non-user messages */}
          {!own && type !== "user" && (
            <div className="flex items-center gap-2">
              <Avatar
                isBordered
                size="sm"
                src="https://avatar.iran.liara.run/public"
                name={name}
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
                className="underline text-blue-700 hover:text-blue-900 break-words"
              >
                {content}
              </a>
            )}
            {type === "image" && (
              <Image
                alt="image message"
                src={content}
                className="rounded-lg shadow-sm max-w-full h-auto"
              />
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
