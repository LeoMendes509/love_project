// Interface para as props do componente Message
interface MessageProps {
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

// Componente para exibir mensagens do chat
export function Message({ text, sender, timestamp }: MessageProps) {
  // Função para formatar o timestamp
  const formatTimestamp = (timestamp?: string): string => {
    if (!timestamp) return '';
    
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return '';
    }
  };

  return (
    <div className={`message message-${sender}`}>
      {/* Conteúdo da mensagem */}
      <div className="message-content">
        {text}
      </div>
      
      {/* Timestamp da mensagem (se disponível) */}
      {timestamp && (
        <div className="message-timestamp">
          {formatTimestamp(timestamp)}
        </div>
      )}
    </div>
  );
}