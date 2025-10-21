// Sistema de traduções centralizado para o chatbot
// Suporta português brasileiro e inglês

export type Language = 'pt-BR' | 'en';

// Interface para definir a estrutura das traduções
export interface Translations {
  // Traduções para o chat
  chat: {
    placeholder: string;
    send: string;
    newChat: string;
    emptyState: string;
    botName: string;
  };
  
  // Traduções para autenticação
  auth: {
    loginTitle: string;
    registerTitle: string;
    forgotTitle: string;
    username: string;
    password: string;
    email: string;
    name: string;
    age: string;
    login: string;
    register: string;
    forgot: string;
    backToLogin: string;
    logout: string;
    welcome: string;
  };
  
  // Traduções para menu
  menu: {
    history: string;
    login: string;
    info: string;
    language: string;
  };
  
  // Traduções para mensagens de erro/sucesso
  messages: {
    loginSuccess: string;
    registerSuccess: string;
    loginError: string;
    registerError: string;
    networkError: string;
    serverError: string;
    forgotPasswordSent: string;
    connectionError: string;
  };
  
  // Traduções para informações
  info: {
    title: string;
    description: string;
  };
}

// Objeto com todas as traduções
export const translations: Record<Language, Translations> = {
  'pt-BR': {
    chat: {
      placeholder: 'Digite sua mensagem...',
      send: 'Enviar',
      newChat: 'Novo Chat',
      emptyState: 'Comece uma conversa com o SarcasticBot',
      botName: 'SarcasticBot'
    },
    auth: {
      loginTitle: 'Entrar',
      registerTitle: 'Registrar',
      forgotTitle: 'Esqueci minha senha',
      username: 'Usuário',
      password: 'Senha',
      email: 'E-mail',
      name: 'Nome',
      age: 'Idade',
      login: 'Entrar',
      register: 'Registrar',
      forgot: 'Esqueci minha senha',
      backToLogin: '← Voltar ao Login',
      logout: 'Sair',
      welcome: 'Bem-vindo'
    },
    menu: {
      history: 'Histórico de Chat',
      login: 'Login / Conta',
      info: 'Informações',
      language: 'Idioma'
    },
    messages: {
      loginSuccess: 'Login realizado com sucesso!',
      registerSuccess: 'Conta criada com sucesso! Faça login para continuar.',
      loginError: 'Erro no login. Verifique suas credenciais.',
      registerError: 'Erro no registro. Tente novamente.',
      networkError: 'Erro de conexão com o servidor.',
      serverError: 'Erro interno do servidor.',
      forgotPasswordSent: 'Se o e-mail existir, você receberá instruções para redefinir sua senha.',
      connectionError: 'Falha de rede ao falar com servidor'
    },
    info: {
      title: 'Informações',
      description: 'Sou um bot sarcástico para testar integrações.'
    }
  },
  en: {
    chat: {
      placeholder: 'Type your message...',
      send: 'Send',
      newChat: 'New Chat',
      emptyState: 'Start a conversation with SarcasticBot',
      botName: 'SarcasticBot'
    },
    auth: {
      loginTitle: 'Sign In',
      registerTitle: 'Register',
      forgotTitle: 'Forgot Password',
      username: 'Username',
      password: 'Password',
      email: 'Email',
      name: 'Name',
      age: 'Age',
      login: 'Sign In',
      register: 'Register',
      forgot: 'Forgot Password',
      backToLogin: '← Back to Login',
      logout: 'Logout',
      welcome: 'Welcome'
    },
    menu: {
      history: 'Chat History',
      login: 'Login / Account',
      info: 'Information',
      language: 'Language'
    },
    messages: {
      loginSuccess: 'Login successful!',
      registerSuccess: 'Account created successfully! Please login to continue.',
      loginError: 'Login error. Please check your credentials.',
      registerError: 'Registration error. Please try again.',
      networkError: 'Connection error with server.',
      serverError: 'Internal server error.',
      forgotPasswordSent: 'If the email exists, you will receive instructions to reset your password.',
      connectionError: 'Network failure when talking to server'
    },
    info: {
      title: 'Information',
      description: 'I am a sarcastic bot to test integrations.'
    }
  }
};

// Hook para usar traduções no componente
export const useTranslations = (language: Language) => {
  return translations[language];
};
