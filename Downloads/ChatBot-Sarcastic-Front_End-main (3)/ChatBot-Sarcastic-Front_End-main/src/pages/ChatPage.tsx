import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslations, type Language } from '../utils/translations';
import { apiService, type ChatMessage } from '../services/api';
import { Message } from '../components/Message';
import { InputBox } from '../components/InputBox';

// Interface para as props do componente ChatPage
interface ChatPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

// Componente da página do chat
export function ChatPage({ language, onLanguageChange }: ChatPageProps) {
  // Hook para acessar o contexto de autenticação
  const { token, username, logout } = useAuth();
  
  // Hook para acessar as traduções
  const t = useTranslations(language);
  
  // Estados locais para o chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Ref para o container de mensagens (para scroll automático)
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Função para fazer scroll automático para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Efeito para scroll automático quando novas mensagens são adicionadas
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Função para enviar mensagem para o backend
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      text: input.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    // Adiciona a mensagem do usuário imediatamente
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Envia mensagem para o backend
      const sessionName = 'default';

      const response = await apiService.sendMessage(
        userMessage.text,
        username || undefined,
        token || undefined,
        sessionName,
        language
      );

      // Adiciona a resposta do bot
      const botMessage: ChatMessage = {
        text: response.response,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      // Em caso de erro, adiciona mensagem de erro
      const errorMessage: ChatMessage = {
        text: language === 'pt-BR' 
          ? 'Erro ao enviar mensagem. Tente novamente.' 
          : 'Error sending message. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para iniciar novo chat
  const handleNewChat = () => {
    setMessages([]);
    setError(null);
  };

  // Função para fazer logout
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="chat-container">
      {/* Header do chat */}
      <header className="chat-header">
        <div className="header-left">
          {/* Menu dropdown */}
          <div className="menu">
            <span className="menu-icon">&#x2630;</span>
            <div className="menu-dropdown">
              <ul>
                <li onClick={handleNewChat}>{t.chat.newChat}</li>
                <li onClick={handleLogout}>
                  {t.auth.logout} ({username})
                </li>
                <li className="language-option">
                  <div>{t.menu.language}</div>
                  <select
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value as Language)}
                    className="language-select"
                  >
                    <option value="pt-BR">🇧🇷 Português</option>
                    <option value="en">🇺🇸 English</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Nome do bot */}
        <div className="bot-name">
          {t.chat.botName}
        </div>

        {/* Botão de novo chat */}
        <div className="new-chat">
          <button onClick={handleNewChat}>
            {t.chat.newChat}
          </button>
        </div>
      </header>

      {/* Área principal do chat */}
      <main className="main-area">
        {/* Container das mensagens */}
        <div className="chat-box" id="chat-box">
          {/* Estado vazio quando não há mensagens */}
          {messages.length === 0 && (
            <div className="empty-state">
              <p>{t.chat.emptyState}</p>
            </div>
          )}

          {/* Lista de mensagens */}
          {messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              sender={message.sender}
              timestamp={message.timestamp}
            />
          ))}

          {/* Indicador de carregamento */}
          {isLoading && (
            <div className="message message-bot">
              <div className="message-content">
                {language === 'pt-BR' ? 'Digitando...' : 'Typing...'}
              </div>
            </div>
          )}

          {/* Ref para scroll automático */}
          <div ref={messagesEndRef} />
        </div>

        {/* Caixa de input */}
        <InputBox
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          language={language}
          disabled={isLoading}
        />
      </main>

      {/* Exibição de erros */}
      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}
    </div>
  );
}
