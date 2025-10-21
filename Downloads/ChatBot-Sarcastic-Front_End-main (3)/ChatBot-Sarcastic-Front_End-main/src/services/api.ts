// Serviço centralizado para comunicação com a API do backend
// Gerencia todas as requisições HTTP do chatbot

// Interface para mensagem do chat
export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

// Interface para requisição de envio de mensagem
export interface SendMessageRequest {
  message: string;
  username?: string;
  language?: string;
}

// Interface para resposta do chat
export interface ChatResponse {
  response: string;
}

// Classe responsável por gerenciar as chamadas à API
class ApiService {
  private baseUrl: string;

  constructor() {
    // URL base do backend Spring Boot
    this.baseUrl = 'http://localhost:8081/api';
  }

  // Método genérico para requisições HTTP
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Caso o backend retorne erro, exibe o texto e lança uma exceção
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      // Retorna o JSON da resposta
      return await response.json();
    } catch (error) {
      console.error('❌ Erro na requisição API:', error);
      throw error;
    }
  }

  // Método para enviar mensagem ao chatbot
  async sendMessage(
    message: string,
    username?: string,
    token?: string,
    sessionName: string = 'default',
    language?: string
  ): Promise<ChatResponse> {
    // Cabeçalhos padrão
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Se o token existir, adiciona ao header Authorization
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token incluído no header:', token);
    } else {
      console.warn('⚠️ Nenhum token fornecido. A requisição pode falhar com 403.');
    }

    // Corpo da requisição
    const body: SendMessageRequest = { message, username, language };

    // Faz a requisição POST para o endpoint de chat
    const response = await this.makeRequest<ChatResponse>(
      `/chat/send?sessionName=${encodeURIComponent(sessionName)}`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      }
    );

    return response;
  }

  // Método para buscar histórico completo do chat
  async getChatHistory(token?: string): Promise<ChatMessage[]> {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.makeRequest<ChatMessage[]>('/chat/history', {
      method: 'GET',
      headers,
    });
  }

  // Método para buscar mensagens de uma sessão específica
  async getChatSession(
    sessionName: string,
    token?: string
  ): Promise<ChatMessage[]> {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.makeRequest<ChatMessage[]>(
      `/chat/session?sessionName=${encodeURIComponent(sessionName)}`,
      {
        method: 'GET',
        headers,
      }
    );
  }
}

// Instância única (singleton) do serviço
export const apiService = new ApiService();
