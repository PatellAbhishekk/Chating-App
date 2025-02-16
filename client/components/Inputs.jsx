import { useRef, useState, useEffect } from "react";
import { Button, Input } from "@heroui/react";
import { ImageUp, SendHorizonal } from "lucide-react";
import { motion } from "framer-motion";

export default function Inputs({ socket, name, setMessages }) {
  const [input, setInput] = useState("");
  const inputEl = useRef(null);
  const imageEl = useRef(null);

  // Auto-focus the input field when the component mounts
  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  // Handle Image Upload
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

  // Handle Message Submission
  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

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

    // Re-focus input after sending a message
    inputEl.current?.focus();
  };

  return (
    <form
      className="sticky bottom-0 left-0 w-full flex items-center gap-3 bg-white p-4 border-t border-gray-200 shadow-md z-50"
      onSubmit={onSubmit}
    >
      {/* Input Field */}
      <Input
        type="text"
        ref={inputEl} // Auto-focus the input field
        value={input}
        placeholder="Enter a message..."
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
        className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Hidden File Input */}
      <input
        type="file"
        name="file"
        accept="image/png, image/webp, image/jpeg"
        ref={imageEl}
        onChange={onImageUpload}
        hidden
      />

      {/* Select Image Button */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          type="button"
          onClick={() => imageEl.current.click()}
          className="p-3 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition-all duration-300"
        >
          <ImageUp className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Send Button */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          type="submit"
          disabled={!input.trim()}
          className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <SendHorizonal className="w-5 h-5" />
        </Button>
      </motion.div>
    </form>
  );
}
