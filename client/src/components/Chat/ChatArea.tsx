import { useEffect, useRef } from 'react';

const ChatArea = ({ messages }: { messages: JSX.Element[] }) => {
  const chatRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div ref={chatRef} className="h-[550px] overflow-y-auto">
      <h1 className="text-2xl font-medium sticky top-0 bg-white">
        Your AI Chatbot
      </h1>
      <div className="flex flex-col gap-6 items-center">
        {messages.map((message, idx) => (
          <div key={idx}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default ChatArea;
