"use client";

import { useState, useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";

interface Message {
  role: "bot";
  content: string;
}

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const messageIndexRef = useRef(0);

  const botScript: string[] = [
    "👋 Welcome to Afrometaliq!",
    "1️⃣ Login to your account.",
    "2️⃣ Add products to your cart.",
    "3️⃣ Send a quotation request.",
    "4️⃣ Check your email for the quotation.",
    "5️⃣ Our sales team will call you.",
    "💡 Need help?",
    "📧 sales@afrometaliq.com",
    "📞 +258872526610",
    "📊 Quick Tips:",
    "- Use filters to find products faster.",
    "- Track your orders in the dashboard.",
    "- Save your favorite products in the wishlist.",
    "✅ Thank you for using Afrometaliq!",
  ];

  // Play audio
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        console.warn("Autoplay blocked by browser");
      });
    }
  };

  useEffect(() => {
    if (!isChatOpen) return;

    setMessages([]); // reset messages
    messageIndexRef.current = 0;

    const showMessage = () => {
      const idx = messageIndexRef.current;
      if (idx < botScript.length) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: botScript[idx] },
        ]);
        playSound(); // play sound for every message
        messageIndexRef.current += 1;

        // Next message after 2 seconds
        setTimeout(showMessage, 3000);
      }
    };

    // Start showing messages
    showMessage();
  }, [isChatOpen]);

  return (
    <>
      {/* Audio */}
      <audio ref={audioRef}>
        <source
          src="https://afrometaliq.s3.us-east-1.amazonaws.com/products/live-chat-353605.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Chatbot Icon */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed lg:bottom-[10rem] bottom-[14rem] right-4 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform duration-300"
      >
        <FaRobot size={24} />
      </button>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-[6rem] right-4 w-80 h-96 bg-white shadow-xl rounded-2xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-purple-600 text-white p-3 flex justify-between items-center rounded-t-2xl">
            <span className="font-semibold">Afrometaliq Assistant</span>
            <button onClick={() => setIsChatOpen(false)}>✖</button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-3 overflow-y-auto text-sm text-gray-700 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg max-w-[95%] whitespace-pre-line bg-gray-100 text-gray-800"
              >
                {msg.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
