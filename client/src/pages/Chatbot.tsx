import { useState } from 'react';
import { AiOutlineSend, AiOutlineUser, AiOutlineRobot } from 'react-icons/ai';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';

type Prompt = {
  role: string;
  content: string;
};

const ChatMessage = (prompt: Prompt) => {
  const generateUniqueID = (): string => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexaDecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexaDecimalString}`;
  };
  const { role, content } = prompt;
  return role === 'assistant' ? (
    <p className="bg-gray-100 p-6" id={generateUniqueID()}>
      <AiOutlineRobot />: {content}
    </p>
  ) : (
    <p className="p-6" id={generateUniqueID()}>
      <AiOutlineUser />: {content}
    </p>
  );
};

const Chatbot = () => {
  const [prompt, setPrompt] = useState<Prompt>({ role: '', content: '' });
  const [messages, setMessages] = useState<JSX.Element[]>([]);

  const handleClick = async () => {
    if (prompt.content === '') {
      alert('Please enter a message.');
      return;
    }
    const role = prompt.role;
    const content = prompt.content;
    setPrompt({ role: '', content: '' });

    let messagesNew = [...messages, ChatMessage({ role, content })];
    setMessages(messagesNew);
    const response = await axios.post('http://localhost:3000/chat', {
      prompt: prompt,
    });
    const data = await response.data;
    messagesNew = [...messagesNew, ChatMessage(data)];
    setMessages(messagesNew);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (prompt.content === '') {
        alert('Please enter a message.');
        return;
      }
      e.preventDefault();
      const role = prompt.role;
      const content = prompt.content;
      setPrompt({ role: '', content: '' });

      let messagesNew = [...messages, ChatMessage({ role, content })];
      setMessages(messagesNew);
      const response = await axios.post('http://localhost:3000/chat', {
        prompt: prompt,
      });
      const data = await response.data;
      messagesNew = [...messagesNew, ChatMessage(data)];
      setMessages(messagesNew);
    }
  };

  return (
    <div className="flex flex-col gap-10 text-center h-full">
      <h1 className="text-2xl font-medium">Your AI Chatbot</h1>
      <section className="h-[400px] overflow-y-auto">
        <div className="flex flex-col gap-6">
          {messages.map((message, idx) => (
            <div key={idx}>{message}</div>
          ))}
        </div>
      </section>
      <section className="absolute bottom-0 left-0 w-full border-t md:border-t-0 md:border-transparent md:bg-vert-light-gradient md:!bg-transparent pt-2 md:-left-2">
        <div className="mx-2 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
          <div className="flex gap-2 w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-white rounded-xl shadow-lg">
            <TextareaAutosize
              rows={1}
              name="prompt"
              value={prompt.content}
              placeholder="Send a message."
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPrompt({ role: 'user', content: e.target.value })
              }
              onKeyDown={handleKeyDown}
              className="m-0 w-[90%] resize-none border-0 bg-transparent p-0 pr-10 outline-none pl-3 md:pl-0"
            />
            <button onClick={handleClick}>
              <AiOutlineSend />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chatbot;
