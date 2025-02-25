import { useRef, useState } from "react";
import { Button, Input } from "@heroui/react";
import { ImageUpIcon, SendHorizonalIcon } from "lucide-react";

export default function Inputs({ socket, name, setMessages }) {
  const [input, setInput] = useState("");
  const imageEl = useRef(null);
  const inputEl = useRef(null);

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

    if (!input) {
      imageEl.current.click();
      return;
    }

    const msg = {
      type: input.startsWith("https") ? "link" : "text",
      content: input,
      user: {
        id: socket.id,
        name: name,
      },
    };

    socket.emit("message", msg);
    setMessages((prevState) => [...prevState, msg]);

    setInput("");
    inputEl.current.focus();
  };

  return (
    <form
      className="absolute bottom-3 w-full flex items-center gap-3 px-4 max-w-4xl left-1/2 -translate-x-1/2 bg-white shadow-md rounded-full py-2"
      onSubmit={onSubmit}
    >
      {/* Input Field */}
      <Input
        ref={inputEl}
        type="text"
        value={input}
        placeholder="Type a message..."
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
        className="flex-1 px-4 py-2 text-gray-800 border-none focus:ring-0 outline-none rounded-full bg-gray-100"
      />

      {/* Hidden Image Upload */}
      <input
        type="file"
        name="file"
        accept="image/png, image/webp, image/jpeg"
        ref={imageEl}
        onChange={onImageUpload}
        hidden
      />

      {/* Send / Upload Button */}
      <Button
        type="submit"
        className="p-2 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        {input ? <SendHorizonalIcon size={20} /> : <ImageUpIcon size={20} />}
      </Button>
    </form>
  );
}
