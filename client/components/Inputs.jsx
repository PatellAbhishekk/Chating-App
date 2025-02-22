import { useRef, useState, useEffect } from "react";
import { Button, Input } from "@heroui/react";
import {
  ImageUp,
  SendHorizonal,
  Camera,
  MoreVertical,
  File,
  Mic,
  MapPin,
  Users,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Inputs({ socket, name, setMessages }) {
  const [input, setInput] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const inputEl = useRef(null);
  const imageEl = useRef(null);
  const fileEl = useRef(null);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  const onImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = function () {
        sendMessage("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      video.play();

      setTimeout(() => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const base64String = canvas.toDataURL("image/png");
        sendMessage("image", base64String);
        stream.getTracks().forEach((track) => track.stop());
      }, 1000);
    } catch (err) {
      console.error("Error accessing camera: ", err);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.startsWith("https") ? "link" : "text", input.trim());
    setInput("");
    inputEl.current?.focus();
  };

  const sendMessage = (type, content) => {
    const msg = {
      type,
      content,
      user: {
        id: socket.id,
        name: name,
      },
    };
    socket.emit("message", msg);
    setMessages((prevState) => [...prevState, msg]);
  };

  return (
    <form
      className="sticky bottom-0 left-0 w-full flex items-center gap-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 border-t border-gray-200 shadow-lg z-50 transition-all duration-500"
      onSubmit={onSubmit}
    >
      <Input
        type="text"
        ref={inputEl}
        value={input}
        placeholder="Enter a message..."
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
        className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gradient-to-r from-gray-100 to-gray-200 transition-all duration-300"
      />

      <input
        type="file"
        accept="image/*"
        ref={imageEl}
        onChange={onImageUpload}
        hidden
      />
      <input type="file" accept="*" ref={fileEl} hidden />

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          type="submit"
          disabled={!input.trim()}
          className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <SendHorizonal className="w-5 h-5 animate-bounce" />
        </Button>
      </motion.div>

      {/* Options Button */}
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 transition-all duration-300 shadow-lg"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-16 left-4 bg-gradient-to-r from-indigo-500 to-cyan-500 border shadow-xl rounded-lg p-3 grid grid-cols-3 gap-3 text-white"
          >
            <button
              onClick={() => imageEl.current.click()}
              className="flex flex-col items-center gap-1"
            >
              <ImageUp className="w-6 h-6 animate-pulse" /> Gallery
            </button>
            <button
              onClick={onCameraCapture}
              className="flex flex-col items-center gap-1"
            >
              <Camera className="w-6 h-6 animate-pulse" /> Camera
            </button>
            <button
              onClick={() => fileEl.current.click()}
              className="flex flex-col items-center gap-1"
            >
              <File className="w-6 h-6 animate-pulse" /> Document
            </button>
            <button className="flex flex-col items-center gap-1">
              <Mic className="w-6 h-6 animate-pulse" /> Audio
            </button>
            <button className="flex flex-col items-center gap-1">
              <MapPin className="w-6 h-6 animate-pulse" /> Location
            </button>
            <button className="flex flex-col items-center gap-1">
              <Users className="w-6 h-6 animate-pulse" /> Contact
            </button>
            <button className="flex flex-col items-center gap-1">
              <MessageCircle className="w-6 h-6 animate-pulse" /> Quick Reply
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
