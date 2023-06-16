import { useState } from 'react';
import axios from 'axios';
import { Prompt } from '../types/prompts';
import ChatMessage from '../components/Chat/ChatMessage';
import ChatInput from '../components/Chat/ChatInput';
import ChatArea from '../components/Chat/ChatArea';

const Chatbot = () => {
  const [prompt, setPrompt] = useState<Prompt>({ role: '', content: '' });
  const [messages, setMessages] = useState<JSX.Element[]>([]);

  const requestBody = async () => {
    const role = prompt.role;
    const content = prompt.content;
    setPrompt({ role: '', content: '' });

    let messagesNew = [
      ...messages,
      <ChatMessage role={role} content={content} />,
    ];
    setMessages(messagesNew);
    const response = await axios.post('http://localhost:3000/chat', {
      prompt: prompt,
    });
    const data = await response.data;
    messagesNew = [...messagesNew, ChatMessage(data)];
    setMessages(messagesNew);
  };

  const handleClick = async () => {
    if (prompt.content === '') {
      alert('Please enter a message.');
      return;
    }
    await requestBody();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (prompt.content === '') {
        alert('Please enter a message.');
        return;
      }
      e.preventDefault();
      await requestBody();
    }
  };

  return (
    <div className="flex flex-col gap-10 text-center h-full">
      <ChatArea messages={messages} />
      <ChatInput
        content={prompt}
        setPrompt={setPrompt}
        handleClick={handleClick}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Chatbot;
