"use client";
import React from "react";
import { Paperclip, Plus, ArrowUp } from "lucide-react";

interface ChatInputBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSend?: () => void;
  onAttach?: () => void;
  onProject?: () => void;
  disabled?: boolean;
}

interface ChatInputBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSend?: () => void;
  onAttach?: () => void;
  onProject?: () => void;
  disabled?: boolean;
}

const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  placeholder = "Ask v0 a question...",
  value = "",
  onChange,
  onSend,
  onAttach,
  onProject,
  disabled = false,
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend?.();
    }
  };

  return (
    <div
      className="w-full bg-[#232428] border border-[#35363a] rounded-[2.5rem] shadow-2xl flex items-center px-8 py-6 gap-4 mx-auto"
      style={{ maxWidth: 700, minHeight: 80 }}
    >
      <button
        type="button"
        aria-label="Attach file"
        className="flex items-center justify-center rounded-lg p-3 hover:bg-[#28292d] text-gray-400 hover:text-gray-200 transition-colors"
        onClick={onAttach}
        disabled={disabled}
      >
        <Paperclip size={26} />
      </button>
      <textarea
        ref={textareaRef}
        disabled={disabled}
        rows={1}
        className="flex-1 bg-transparent border-none outline-none resize-none text-xl text-gray-200 placeholder:text-gray-400 font-semibold px-4 py-3 min-h-[48px] max-h-[180px]"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Chat message input"
      />
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Add project"
          className="flex items-center gap-2 rounded-xl px-5 py-2 bg-[#292a2e] border border-[#393a40] text-gray-200 hover:bg-[#313237] hover:text-white text-base font-semibold transition-colors shadow"
          onClick={onProject}
          disabled={disabled}
        >
          <Plus size={20} /> Project
        </button>
        <button
          type="button"
          aria-label="Send message"
          className="flex items-center justify-center rounded-xl bg-[#393a40] hover:bg-[#4b4c50] text-white w-12 h-12 ml-2 transition-colors shadow-lg"
          onClick={onSend}
          disabled={disabled || !value.trim()}
        >
          <ArrowUp size={26} />
        </button>
      </div>
    </div>
  );
};

export { ChatInputBox };
export default ChatInputBox;
