import { useRef, useState } from "react";
import { Button, Input } from "@heroui/react";
import { ImageUp, SendHorizonal } from "lucide-react";
import { motion } from "framer-motion";

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
      className="fixed bottom-0 w-full flex items-center gap-2 bg-white p-4 border-t border-gray-200"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        value={input}
        placeholder="Enter a message..."
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
        className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="file"
        name="file"
        accept="image/png, image/webp, image/jpeg"
        ref={imageEl}
        onChange={onImageUpload}
        hidden
      />

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex items-center"
      >
        <Button
          type="submit"
          className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
        >
          {input ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SendHorizonal className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ImageUp className="w-5 h-5" />
            </motion.div>
          )}
        </Button>
      </motion.div>
    </form>
  );
}
