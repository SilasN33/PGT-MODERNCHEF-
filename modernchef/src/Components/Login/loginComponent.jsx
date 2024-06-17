import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../firebase'; // ou o caminho correto para o arquivo firebase.js
import "./loginComponent.css";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtenha o usuário autenticado usando o hook useAuth

  const handleLogin = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile'); // Redirecione o usuário para a página de perfil após o login
    } catch (error) {
      setError(error.message);
    }
  };

  // Se o usuário já estiver autenticado, redirecione-o para a página de perfil
  if (user) {
    navigate('/profile');
  }

  return (
    <div className="login-container">
      {/* Lado Esquerdo */}
      <div className="left-side">
        <div className="login-box">
          <section className="section_form">
            <h3>Login</h3>
            <form onSubmit={handleLogin} className="feed-form">
              <div className="mb-3">
                <label>Email</label>
                <input 
                  required 
                  placeholder="Digite seu e-mail" 
                  type="email" 
                  value={email} 
                  name="email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label>Senha</label>
                <input 
                  required 
                  placeholder="Digite sua senha" 
                  type="password" 
                  className="form-control"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="button_submit">Login</button>
            </form>
          </section>
        </div>
      </div>
      {/* Lado Direito */}
      <div className="right-side"></div>
    </div>
  );
}

export default Login;
