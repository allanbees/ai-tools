import { useState } from 'react';
import axios from 'axios';
const Chatbot = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const request = new FormData(e.target).get('prompt');
    await axios
      .post('http://localhost:3000/chat', {
        prompt: request,
      })
      .then((res) => setResponse(res.data));
  };

  return (
    <div className="flex flex-col gap-10 text-center h-full">
      <h1 className="text-2xl font-medium">Your AI Chatbot</h1>
      <section className="h-[400px]">
        <div>{response}</div>
      </section>
      <section>
        <form method="post" onSubmit={handleSubmit}>
          <input
            name="prompt"
            value={prompt}
            placeholder="Type a message to start a conversation"
            onChange={(e) => setPrompt(e.target.value)}
            className="bg-gray-100 border-[1px] border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-2/5 resize-none"
          />
          <input type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
};

export default Chatbot;
