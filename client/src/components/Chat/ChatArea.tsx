const ChatArea = ({ messages }: { messages: JSX.Element[] }) => {
  return (
    <>
      <h1 className="text-2xl font-medium">Your AI Chatbot</h1>
      <section className="h-[400px] overflow-y-auto">
        <div className="flex flex-col gap-6">
          {messages.map((message, idx) => (
            <div key={idx}>{message}</div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ChatArea;
