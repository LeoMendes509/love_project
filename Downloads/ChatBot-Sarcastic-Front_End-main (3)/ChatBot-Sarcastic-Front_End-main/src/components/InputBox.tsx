import { useTranslations, type Language } from '../utils/translations';

// Interface para as props do componente InputBox
interface InputBoxProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  language: Language;
  disabled?: boolean;
}

// Componente para a caixa de input do chat
export function InputBox({ input, setInput, onSend, language, disabled = false }: InputBoxProps) {
  // Hook para acessar as traduções
  const t = useTranslations(language);

  // Função para lidar com o envio da mensagem
  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend();
    }
  };

  // Função para lidar com teclas pressionadas
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-box">
      {/* Campo de input para a mensagem */}
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.chat.placeholder}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="message-input"
      />
      
      {/* Botão de envio */}
      <button 
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="send-button"
      >
        {t.chat.send}
      </button>
    </div>
  );
}