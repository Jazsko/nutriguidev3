import { AlertCircle } from "lucide-react";

export interface Message {
  type: "error" | "success" | "info";
  text: string;
}

export function FormMessage({ message }: { message?: Message }) {
  if (!message) return null;

  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-md ${
        message.type === "error"
          ? "bg-red-100 text-red-700"
          : message.type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-blue-100 text-blue-700"
      }`}
    >
      <AlertCircle className="w-4 h-4" />
      <span className="text-sm">{message.text}</span>
    </div>
  );
}
