import { motion } from "framer-motion";
import { UserPlusIcon } from "lucide-react";

export default function NewUser({ name }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-gray-50 border border-green-200 rounded-lg shadow-md animate-slide-in max-w-full"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 shadow-inner shrink-0">
        <UserPlusIcon className="w-6 h-6 text-green-700" />
      </div>
      <p className="text-sm font-medium text-gray-800 break-words">
        <span className="font-bold text-green-700">{name}</span> has joined the
        chat! 🎉
      </p>
    </motion.div>
  );
}
