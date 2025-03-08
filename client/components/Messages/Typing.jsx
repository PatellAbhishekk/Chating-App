"use client";
import { motion } from "framer-motion";

export default function Typing() {
  return (
    <motion.div
      className="text-2xl font-mono font-semibold text-gray-800 dark:text-white"
      animate={{ opacity: [0, 1, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      Typing...
    </motion.div>
  );
}
