  import React from "react";
  import { useNavigate } from "react-router-dom";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

  export default function SignUp() {
    const navigate = useNavigate();

    const signUpWithEmailPassword = async (email, password) => {
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        return userCredential.user;
      } catch (error) {
        throw error;
      }
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      const form = event.target;
      const email = form.email.value;
      const password = form.password.value;

      try {
        await signUpWithEmailPassword(email, password);
        navigate("/login");
      } catch (error) {
        console.error("Erro ao criar usuário:", error.message);
      }
    };

    return (
      <div className="login-container">
        <div className="left-side">
          <div className="login-box">
            <section className="section_form">
              <h3>Cadastro</h3>
              <form onSubmit={handleSubmit} className="feed-form">
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    required
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Digite seu email"
                  />
                </div>
                <div className="mb-3">
                  <label>Senha</label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Digite sua senha"
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="button_submit">
                    Cadastrar
                  </button>
                </div>
                <p className="forgot-password text-right">
                  Já possui <a href="/login">cadastro?</a>
                </p>
              </form>
            </section>
          </div>
        </div>
        <div className="right-side"></div>
      </div>
    );
  }
