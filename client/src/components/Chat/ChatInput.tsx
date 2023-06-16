import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineSend } from 'react-icons/ai';
import { Prompt } from '../../types/prompts';
import { MouseEventHandler } from 'react';

const ChatInput = ({
  content,
  setPrompt,
  handleKeyDown,
  handleClick,
}: {
  content: Prompt;
  setPrompt: React.Dispatch<React.SetStateAction<Prompt>>;
  handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement>;
  handleClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="bottom-0 left-0 w-full border-t md:border-t-0 md:border-transparent md:bg-vert-light-gradient md:!bg-transparent pt-2 md:-left-2 z-10">
      <div className="mx-2 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="flex gap-2 w-full py-[10px] flex-grow md:py-4 md:pl-4 relative border border-black/10 bg-white rounded-xl shadow-lg">
          <TextareaAutosize
            rows={1}
            name="prompt"
            value={content.content}
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
    </div>
  );
};

export default ChatInput;
