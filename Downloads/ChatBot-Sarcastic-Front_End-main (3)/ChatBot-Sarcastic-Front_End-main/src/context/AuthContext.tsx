import { createContext, useState, useContext, type ReactNode } from "react";

// Interface para dados de login
export interface LoginData {
  username: string;
  password: string;
}

// Interface para dados de registro
export interface RegisterData {
  username: string;
  password: string;
  email: string;
  name: string;
  age: number;
}

// Interface para resposta de login do backend
export interface LoginResponse {
  token: string;
  username: string;
}

// Interface para o contexto de autenticação
interface AuthContextProps {
  // Estados de autenticação
    token: string | null;
  username: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Funções de autenticação
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
    logout: () => void;
  clearError: () => void;
  
  // Função para verificar se está autenticado
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provider do contexto de autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
  // Estados locais para gerenciar autenticação
  const [token, setToken] = useState<string | null>(() => 
    localStorage.getItem('auth_token')
  );
  const [username, setUsername] = useState<string | null>(() => 
    localStorage.getItem('username')
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para fazer login no backend
  const login = async (data: LoginData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || 'Erro no login');
        return false;
      }

      const loginData: LoginResponse = await response.json();
      
      // Salva os dados de autenticação
      setToken(loginData.token);
      setUsername(loginData.username);
      localStorage.setItem('auth_token', loginData.token);
      localStorage.setItem('username', loginData.username);
      
      return true;
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Erro no login:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para registrar novo usuário
  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || 'Erro no registro');
        return false;
      }

      // Registro bem-sucedido
      return true;
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Erro no registro:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Função para fazer logout
    const logout = () => {
        setToken(null);
        setUsername(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('username');
    setError(null);
  };

  // Função para limpar erros
  const clearError = () => {
    setError(null);
  };

  // Função para verificar se está autenticado
  const isAuthenticated = (): boolean => {
    return token !== null && username !== null;
    };

    return (
    <AuthContext.Provider 
      value={{
        token,
        username,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
        isAuthenticated
      }}
    >
            {children}
        </AuthContext.Provider>
    );
}

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};