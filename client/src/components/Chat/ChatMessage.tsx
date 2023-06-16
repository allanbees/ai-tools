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
    <p className="bg-gray-100 p-6" id={generateUniqueID()}>
      <AiOutlineRobot />: {content}
    </p>
  ) : (
    <p className="p-6" id={generateUniqueID()}>
      <AiOutlineUser />: {content}
    </p>
  );
};

export default ChatMessage;
