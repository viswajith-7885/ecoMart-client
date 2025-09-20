import { useState } from "react";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋", sender: "bot" },
    { id: 2, text: "Hello!", sender: "user" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), text: input.trim(), sender: "user" };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulated bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "Got it! 👍", sender: "bot" },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-full">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md flex items-center justify-between">
        <h1 className="text-lg font-semibold">Chat Room</h1>
      </header>

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs rounded-2xl px-4 py-2 text-sm shadow
                ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-white text-gray-800 rounded-bl-none"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </main>

      {/* Input box */}
      <form
        onSubmit={sendMessage}
        className="p-4 bg-white border-t flex items-center space-x-2"
      >
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}
