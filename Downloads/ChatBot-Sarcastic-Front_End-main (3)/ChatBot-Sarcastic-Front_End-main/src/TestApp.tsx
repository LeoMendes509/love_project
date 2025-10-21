import { useState } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function TestApp() {
  const [step, setStep] = useState<'register' | 'login' | 'chat'>('register');
  const [token, setToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Form states
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  // -----------------------
  // Backend calls
  // -----------------------
  const register = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, age, username, email, password })
      });

      if (!res.ok) {
        const err = await res.text();
        setError(err || 'Registration failed');
        return;
      }

      alert('Usuário registrado! Faça login.');
      setStep('login');
    } catch (err) {
      setError('Erro de conexão');
      console.error(err);
    }
  };

  const login = async () => {
    setError('');
    try {
      const res = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        const err = await res.text();
        setError(err || 'Login failed');
        return;
      }

      const data = await res.json(); // { token, username }
      setToken(data.token);
      setStep('chat');
    } catch (err) {
      setError('Erro de conexão');
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !token) return;
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await fetch('http://localhost:8081/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ message: input, username })
      });

      if (!res.ok) {
        const errMsg = await res.text();
        setMessages(prev => [...prev, { text: 'Erro: ' + errMsg, sender: 'bot' }]);
        return;
      }

      const data = await res.json(); // { response: '...' }
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
      setInput('');
    } catch (err) {
      setMessages(prev => [...prev, { text: 'Erro de conexão', sender: 'bot' }]);
      console.error(err);
    }
  };

  // -----------------------
  // Render
  // -----------------------
  if (step === 'register') {
    return (
      <div style={{ padding: 20 }}>
        <h2>Register</h2>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br/>
        <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} /><br/>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br/>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
        <button onClick={register}>Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={() => setStep('login')}>Go to Login</button>
      </div>
    );
  }

  if (step === 'login') {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
        <button onClick={login}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={() => setStep('register')}>Go to Register</button>
      </div>
    );
  }

  // Chat
  return (
    <div style={{ padding: 20 }}>
      <h2>Chat</h2>
      <div style={{ border: '1px solid #ccc', padding: 10, height: 300, overflowY: 'auto', marginBottom: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
