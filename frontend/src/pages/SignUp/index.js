import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';
import {
  auth,
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  signOut,
} from '../../utils/firebase';

import { FaFacebookSquare, FaTwitterSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import api from '../../services/api';
import FormStyle from '../../objects/FormStyle';
import BtnForm from '../../objects/BtnForm';

import { Container, IconButton } from './styles';

export default function SignUP() {
  const history = useHistory();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  useEffect(() => {
    signOut();
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        try {
          await api.post('/api/register', {
            username: userAuth.displayName,
            email: userAuth.email,
            password: userAuth.uid,
          });
          const res = await api.post('/api/authenticate', {
            email: userAuth.email,
            password: userAuth.uid,
          });
          localStorage.setItem('token', res.data.token);

          if (localStorage.token) {
            window.location.href = '/recuperar-senha';
          }
        } catch (err) {
          ToastsStore.error(err.response.data.error);
        }
      }
    });
  }, []);

  const onChangeUser = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.password === user.passwordRepeat) {
        await api.post('/api/register', user);
        history.push('/entrar');
      } else {
        ToastsStore.error('As senhas não batem');
      }
    } catch (err) {
      ToastsStore.error('Não foi possível criar conta, tente novamente');
      console.log(err);
    }
  };

  return (
    <Container>
      <h3>Criar Conta</h3>

      <FormStyle onSubmit={handleOnSubmit}>
        <label htmlFor="username">Nome:</label>
        <input
          type="text"
          name="username"
          placeholder="Nome"
          id="username"
          value={user.username}
          onChange={onChangeUser}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          value={user.email}
          onChange={onChangeUser}
          required
        />

        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          name="password"
          placeholder="Senha"
          id="password"
          value={user.password}
          onChange={onChangeUser}
          required
        />

        <label htmlFor="passwordRepeat">Repetir senha:</label>
        <input
          type="password"
          name="passwordRepeat"
          placeholder="Repetir senha"
          id="passwordRepeat"
          value={user.passwordRepeat}
          onChange={onChangeUser}
          required
        />

        <BtnForm type="submit">Criar</BtnForm>

        <span>ou registrar com:</span>

        <div>
          <IconButton google onClick={signInWithGoogle}>
            <FcGoogle />
          </IconButton>
          <IconButton facebook onClick={signInWithFacebook}>
            <FaFacebookSquare />
          </IconButton>
          <IconButton twitter onClick={signInWithTwitter}>
            <FaTwitterSquare />
          </IconButton>
        </div>
      </FormStyle>

      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_CENTER}
      />
    </Container>
  );
}
