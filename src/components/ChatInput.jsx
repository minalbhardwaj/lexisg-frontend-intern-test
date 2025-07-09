import { useState } from "react";

export default function ChatInput({ onSubmit }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    setLoading(true);
    await onSubmit(query.trim());
    setQuery("");
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t px-4 py-3 bg-white flex items-center">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your legal question...    "
        className="flex-1 resize-none border rounded-md p-2 focus:outline-none focus:ring"
        rows={1}
        style={{ overflow: "hidden" }}
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "..." : "Send"}
      </button>
    </div>
  );
}
