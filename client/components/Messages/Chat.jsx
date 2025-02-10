import { Card, CardBody, Avatar, Image } from "@heroui/react";
import NewUser from "./NewUser";
import { useEffect, useState } from "react";

export default function Chat({ content, own, type, name, timestamp }) {
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const validTimestamp = timestamp || new Date().toISOString(); // Fallback to current time if timestamp is missing
    const date = new Date(validTimestamp);

    if (!isNaN(date.getTime())) {
      const options = { hour: "2-digit", minute: "2-digit", hour12: false };
      setFormattedTime(date.toLocaleTimeString("en-US", options));
    } else {
      setFormattedTime("Invalid Time");
    }
  }, [timestamp]);

  const getMessageContent = () => {
    switch (type) {
      case "user":
        return <NewUser name={name} />;
      case "text":
        return <p className="text-gray-800">{content}</p>;
      case "link":
        return (
          <p className="underline text-blue-600 hover:text-blue-800">
            <a href={content} target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          </p>
        );
      case "image":
        return (
          <Image
            alt="image message"
            src={content}
            width={400}
            onError={(e) => (e.target.src = "/fallback-image.png")}
          />
        );
      default:
        return <p className="text-red-500">Unsupported message type</p>;
    }
  };

  return (
    <div className="my-4">
      <Card
        className={`w-fit max-w-xs sm:max-w-md lg:max-w-lg bg-transparent shadow-md p-2 rounded-lg ${
          own ? "ml-auto bg-blue-200" : "bg-gray-100"
        } ${type === "user" && "mx-auto bg-green-50"}`}
      >
        <CardBody className="flex flex-col gap-1">
          {/* Only show avatar and name if it's not your message */}
          {!own && (
            <div className="flex items-center gap-2 mb-1">
              <Avatar
                isBordered
                color="default"
                src={`https://ui-avatars.com/api/?name=${name}&background=random`}
                size="sm"
                name={name}
              />
              <span className="text-sm font-medium text-gray-800">{name}</span>
            </div>
          )}

          {/* Message Content */}
          <div>{getMessageContent()}</div>

          {/* Timestamp */}
          <span
            className={`text-xs text-gray-500 mt-1 ${own ? "self-end" : ""}`}
          >
            {formattedTime}
          </span>
        </CardBody>
      </Card>
    </div>
  );
}
