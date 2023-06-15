import { useState, KeyboardEvent } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
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
  return role === 'assistant'
    ? `<div class="bg-gray-100 p-6" id=${generateUniqueID()}>
    ${content}
  </div>`
    : `<div class="p-6" id=${generateUniqueID()}>${content}</div>`;
};

const Chatbot = () => {
  const [prompt, setPrompt] = useState<Prompt>({ role: '', content: '' });

  const handleSubmit = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (prompt?.content === '') alert('Please enter a message.');
    if (e.type === 'click') {
      const chatArea = document.getElementById('chat-area');
      if (chatArea) {
        chatArea.innerHTML += ChatMessage({
          role: prompt.role,
          content: prompt.content,
        });
      }
    }
    await axios
      .post('http://localhost:3000/chat', {
        prompt: prompt,
      })
      .then((res) => {
        const chatArea = document.getElementById('chat-area');
        if (chatArea) {
          chatArea.innerHTML += ChatMessage({
            role: res.data.role,
            content: res.data.content,
          });
        }
      });
    setPrompt({ role: '', content: '' });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const chatArea = document.getElementById('chat-area');
      if (chatArea) {
        chatArea.innerHTML += ChatMessage({
          role: prompt.role,
          content: prompt.content,
        });
      }
      setPrompt({ role: '', content: '' });
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col gap-10 text-center h-full">
      <h1 className="text-2xl font-medium">Your AI Chatbot</h1>
      <section className="h-[400px] overflow-y-auto">
        <div id="chat-area" className="flex flex-col gap-6"></div>
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
            <button onClick={(e: any) => handleSubmit(e)}>
              <AiOutlineSend />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chatbot;
