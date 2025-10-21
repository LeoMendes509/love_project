import { useState, useEffect } from 'react';
import { useAuth, type LoginData, type RegisterData } from '../context/AuthContext';
import { useTranslations, type Language } from '../utils/translations';

// Interface para as props do componente AuthPage
interface AuthPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

// Componente da página de autenticação
export function AuthPage({ language, onLanguageChange }: AuthPageProps) {
  // Hook para acessar o contexto de autenticação
  const { login, register, isLoading, error, clearError } = useAuth();
  
  // Hook para acessar as traduções
  const t = useTranslations(language);
  
  // Estados locais para controlar o formulário
  const [formMode, setFormMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    age: ''
  });

  // Limpa erros quando muda o modo do formulário
  useEffect(() => {
    clearError();
  }, [formMode, clearError]);

  // Função para atualizar os dados do formulário
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função para lidar com o envio do formulário de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      return;
    }

    const loginData: LoginData = {
      username: formData.username.trim(),
      password: formData.password
    };

    const success = await login(loginData);
    if (success) {
      // Login bem-sucedido - o contexto já gerencia o redirecionamento
      setFormData({ username: '', password: '', email: '', name: '', age: '' });
    }
  };

  // Função para lidar com o envio do formulário de registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim() || 
        !formData.email.trim() || !formData.name.trim() || !formData.age.trim()) {
      return;
    }

    const registerData: RegisterData = {
      username: formData.username.trim(),
      password: formData.password,
      email: formData.email.trim(),
      name: formData.name.trim(),
      age: parseInt(formData.age)
    };

    const success = await register(registerData);
    if (success) {
      // Registro bem-sucedido - muda para modo de login
      setFormMode('login');
      setFormData({ username: '', password: '', email: '', name: '', age: '' });
    }
  };

  // Função para alternar entre login e registro
  const toggleFormMode = () => {
    setFormMode(prev => prev === 'login' ? 'register' : 'login');
    setFormData({ username: '', password: '', email: '', name: '', age: '' });
    clearError();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header com título e seletor de idioma */}
        <div className="auth-header">
          <h1>{formMode === 'login' ? t.auth.loginTitle : t.auth.registerTitle}</h1>
          
          {/* Seletor de idioma */}
          <div className="language-selector">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="language-select"
            >
              <option value="pt-BR">🇧🇷 Português</option>
              <option value="en">🇺🇸 English</option>
            </select>
          </div>
        </div>

        {/* Formulário de Login */}
        {formMode === 'login' && (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">{t.auth.username}</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder={t.auth.username}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t.auth.password}</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder={t.auth.password}
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="auth-button primary"
              disabled={isLoading}
            >
              {isLoading ? '...' : t.auth.login}
            </button>

            <button 
              type="button" 
              className="auth-button secondary"
              onClick={toggleFormMode}
              disabled={isLoading}
            >
              {t.auth.registerTitle}
            </button>
          </form>
        )}

        {/* Formulário de Registro */}
        {formMode === 'register' && (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label htmlFor="reg-username">{t.auth.username}</label>
              <input
                id="reg-username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder={t.auth.username}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-name">{t.auth.name}</label>
              <input
                id="reg-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={t.auth.name}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">{t.auth.email}</label>
              <input
                id="reg-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={t.auth.email}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-age">{t.auth.age}</label>
              <input
                id="reg-age"
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder={t.auth.age}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">{t.auth.password}</label>
              <input
                id="reg-password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder={t.auth.password}
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="auth-button primary"
              disabled={isLoading}
            >
              {isLoading ? '...' : t.auth.register}
            </button>

            <button 
              type="button" 
              className="auth-button secondary"
              onClick={toggleFormMode}
              disabled={isLoading}
            >
              {t.auth.backToLogin}
            </button>
          </form>
        )}

        {/* Exibição de erros */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
