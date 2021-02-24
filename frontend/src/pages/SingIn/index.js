import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';
import api from '../../services/api';
import { Container } from './styles';
import FormStyle from '../../objects/FormStyle';
import BtnForm from '../../objects/BtnForm';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const now = new Date();
      const date = now.setHours(now.getHours() + 24);

      const res = await api.post('/api/authenticate', user);

      localStorage.setItem(
        'token',
        JSON.stringify({
          jwt: res.data.token,
          expires: date,
        })
      );

      if (localStorage.token) {
        window.location.href = '/';
      }
    } catch (err) {
      ToastsStore.error(err.response.data.error);
    }
  };

  return (
    <Container>
      <h3>Entrar</h3>

      <FormStyle onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Senha"
          value={user.password}
          onChange={handleInputChange}
          required
        />

        <div>
          <Link to="/recuperar-senha">Esqueceu sua senha?</Link>
          <Link to="/cadastro">Cadastrar</Link>
        </div>

        <BtnForm type="submit">Entrar</BtnForm>
      </FormStyle>

      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_CENTER}
      />
    </Container>
  );
}
