import { useState, useRef, useEffect } from "react";
import ChatInput from "./components/ChatInput";
import PdfModal from "./components/PdfModal";
import { simulatedResponse } from "./utils/simulatedResponse";

function App() {
  const [messages, setMessages] = useState([]);
  const [pdfLink, setPdfLink] = useState(null);
  const messagesEndRef = useRef(null);

  const handleSubmit = async (input) => {
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    await new Promise((res) => setTimeout(res, 500)); // Simulated delay

    setMessages((prev) => [
      ...prev,
      {
        sender: "lexi",
        text: simulatedResponse.answer,
        citations: simulatedResponse.citations,
      },
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-lg flex flex-col w-full max-w-2xl h-[90vh]">
        {/* Header */}
        <header className="text-center py-4 border-b">
          <h1 className="text-xl font-bold text-blue-700">⚖️ Lexi Legal Assistant</h1>
        </header>

        {/* Messages Area */}
        <main className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`rounded-lg p-4 shadow max-w-md ${
                  msg.sender === "user"
                    ? "bg-gray-100 text-black"
                    : "bg-blue-100 text-gray-800"
                }`}
              >
                <p className="text-sm mb-2 font-medium">
                  {msg.sender === "user" ? "👤 You" : "🤖 Lexi Assistant"}
                </p>
                <p>{msg.text}</p>

                {msg.sender === "lexi" &&
                  msg.citations?.map((c, i) => (
                    <div key={i} className="mt-3 text-sm">
                      <p className="italic mb-1">Citation:</p>
                      <button
                        onClick={() => setPdfLink(c.link)}
                        className="text-blue-600 underline"
                      >
                        {c.text}
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>

        {/* Input */}
        <ChatInput onSubmit={handleSubmit} />
        {pdfLink && <PdfModal link={pdfLink} onClose={() => setPdfLink(null)} />}
      </div>
    </div>
  );
}

export default App;
