import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthPage } from './pages/AuthPage';
import { ChatPage } from './pages/ChatPage';
import { type Language } from './utils/translations';
import './App.css';

// Componente principal da aplicação
function App() {
  // Estado para controlar o idioma da aplicação
  const [language, setLanguage] = useState<Language>(() => {
    // Tenta ler o idioma salvo no localStorage para persistência
    const saved = localStorage.getItem('app_language') as Language | null;
    return saved ?? 'pt-BR';
  });

  // Hook para acessar o contexto de autenticação
  const { isAuthenticated } = useAuth();

  // Efeito para salvar o idioma no localStorage quando ele muda
  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  // Função para alterar o idioma
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  // Renderiza a página de autenticação se não estiver logado
  if (!isAuthenticated()) {
    return (
      <div className="app-wrapper">
        <AuthPage 
          language={language} 
          onLanguageChange={handleLanguageChange} 
        />
      </div>
    );
  }

  // Renderiza a página do chat se estiver logado
  return (
    <div className="app-wrapper">
      <ChatPage 
        language={language} 
        onLanguageChange={handleLanguageChange} 
      />
    </div>
  );
}

// Componente raiz que envolve a aplicação com o provider de autenticação
function AppWithProviders() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithProviders;
