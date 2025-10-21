import { Message } from "./Message";

interface ChatBotProps {
    messages: {text: string, sender: 'user' | 'bot' ; timestamp?: string}[];
}

export function ChatBot ({ messages }: ChatBotProps) {
    return (
        <div className="chat-box">
            {messages.map((msg, idx) => (
                <Message key={idx} text={msg.text} sender={msg.sender} />
            ))}
        </div>
    );
}