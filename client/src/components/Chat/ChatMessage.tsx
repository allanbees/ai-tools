import { AiOutlineUser, AiOutlineRobot } from 'react-icons/ai';
import { Prompt } from '../../types/prompts';

const ChatMessage = (prompt: Prompt) => {
  const generateUniqueID = (): string => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexaDecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexaDecimalString}`;
  };
  const { role, content } = prompt;
  return role === 'assistant' ? (
    <p
      className="flex p-6 w-[700px] items-center bg-gray-100 rounded-3xl"
      id={generateUniqueID()}
    >
      <span className="w-10">
        <AiOutlineRobot />
      </span>{' '}
      <span> {content}</span>
    </p>
  ) : (
    <p className="flex p-6 w-[700px] items-center" id={generateUniqueID()}>
      <span className="w-10">
        <AiOutlineUser />
      </span>{' '}
      <span> {content}</span>
    </p>
  );
};

export default ChatMessage;
