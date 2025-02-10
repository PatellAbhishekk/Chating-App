import { useRef, useState } from "react";
import { Button, Input } from "@heroui/react";
import { ImageUpIcon, SendHorizonalIcon } from "lucide-react";

export default function Inputs({ socket, name, setMessages }) {
  const [input, setInput] = useState("");
  const imageEl = useRef(null);

  const onImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        const base64String = reader.result;
        const msg = {
          type: "image",
          content: base64String,
          user: {
            id: socket.id,
            name: name,
          },
        };
        socket.emit("message", msg);
        setMessages((prevState) => [...prevState, msg]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      imageEl.current.click();
      return;
    }

    const msg = {
      type: input.startsWith("https") ? "link" : "text",
      content: input.trim(),
      user: {
        id: socket.id,
        name: name,
      },
    };

    socket.emit("message", msg);
    setMessages((prevState) => [...prevState, msg]);
    setInput("");
  };

  return (
    <form
      className="fixed bottom-0 w-full flex gap-2 bg-white p-3 border-t border-gray-200 z-10"
      style={{ zIndex: 10 }}
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        value={input}
        placeholder="Enter a message..."
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
        className="flex-1"
      />

      <input
        type="file"
        name="file"
        accept="image/png, image/webp, image/jpeg"
        ref={imageEl}
        onChange={onImageUpload}
        hidden
      />

      <Button type="submit" className="bg-blue-500 text-white">
        {input ? <SendHorizonalIcon /> : <ImageUpIcon />}
      </Button>
    </form>
  );
}
