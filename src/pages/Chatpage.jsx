import { useState } from "react";

export default function ChatLayout() {
  const [chats] = useState([
    { id: 1, name: "Alice", avatar: "https://i.pravatar.cc/40?img=1" },
    { id: 2, name: "Bob", avatar: "https://i.pravatar.cc/40?img=2" },
    { id: 3, name: "Charlie", avatar: "https://i.pravatar.cc/40?img=3" },
  ]);
  const [activeChat, setActiveChat] = useState(1);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! 👋", sender: "bot", chatId: 1 },
    { id: 2, text: "Hello!", sender: "user", chatId: 1 },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
      chatId: activeChat,
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Got it! 👍",
          sender: "bot",
          chatId: activeChat,
        },
      ]);
    }, 800);
  };

  const currentMessages = messages.filter((m) => m.chatId === activeChat);

  return (
    <div className="w-full flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-indigo-700 to-purple-700 text-white flex flex-col">
        <header className="p-5 text-2xl font-bold tracking-wide border-b border-indigo-500/50">
          Chats
        </header>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`flex items-center w-full px-5 py-4 gap-4 hover:bg-indigo-600 transition
                ${
                  activeChat === chat.id
                    ? "bg-indigo-600/70 shadow-inner"
                    : "bg-transparent"
                }`}
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-10 h-10 rounded-full border-2 border-white/30"
              />
              <span className="text-lg font-medium">{chat.name}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat Window */}
      <div className="flex flex-col flex-1">
        {/* Chat Header */}
        <header className="sticky top-0 bg-white border-b shadow-sm p-4 flex items-center gap-3">
          <img
            src={chats.find((c) => c.id === activeChat)?.avatar}
            alt=""
            className="w-10 h-10 rounded-full border border-gray-300"
          />
          <h1 className="text-xl font-semibold text-gray-800">
            {chats.find((c) => c.id === activeChat)?.name}
          </h1>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100">
          {currentMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-sm px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed
                  ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </main>

        {/* Input Box */}
        <form
          onSubmit={sendMessage}
          className="p-4 bg-white border-t flex items-center gap-3"
        >
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2
                       rounded-full font-medium shadow transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
