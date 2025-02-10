import { UserPlusIcon } from "lucide-react";

export default function NewUser({ name }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow-md animate-slide-in max-w-full">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-200 shadow-inner shrink-0">
        <UserPlusIcon className="w-6 h-6 text-green-800" />
      </div>
      <p className="text-sm font-medium text-green-900 break-words">
        <span className="font-bold text-green-700">{name}</span> has joined the
        chat.
      </p>
    </div>
  );
}
