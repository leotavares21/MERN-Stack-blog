import React, { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';

import api from '../../services/api';
import BtnForm from '../../objects/BtnForm';
import FormStyle from '../../objects/FormStyle';
import PasswordReset from '../PasswordReset';
import EmailSender from '../EmailSender';

import { UserContext } from '../../context/UserContext';

import { Container } from './styles';

export default function ForgotPassword() {
  const { token } = useParams();
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const onChangeNewPasswordRepeat = (e) => {
    setNewPasswordRepeat(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if ((token && token.length === 40) || localStorage.token) {
      if (newPassword === newPasswordRepeat) {
        try {
          if (localStorage.token) {
            const res = await api.post(
              `/api/forgot_password/${localStorage.token}`,
              {
                newPassword: newPassword,
                userId: user._id,
              }
            );
            ToastsStore.success(res.data.success);
            history.push('/');
          } else {
            const res = await api.post(`/api/forgot_password/${token}`, {
              newPassword: newPassword,
            });
            if (res.data.success) {
              ToastsStore.success(res.data.success);
              history.push('/entrar');
            } else {
              ToastsStore.error(res.data.error);
            }
          }
        } catch (error) {
          ToastsStore.error(error.response.data.error);
        }
      } else {
        ToastsStore.error('As senhas não batem');
      }
    } else {
      try {
        const res = await api.post('/api/forgot_password', {
          email: email,
        });
        ToastsStore.success(res.data.success);
        history.push('/');
      } catch (error) {
        ToastsStore.error(error.response.data.error);
      }
    }
  };

  return (
    <Container>
      <h3>{localStorage.token ? 'Criar senha' : 'Recuperar senha'}</h3>

      <FormStyle onSubmit={handleOnSubmit}>
        {(token && token.length === 40) || localStorage.token ? (
          <PasswordReset
            newPassword={newPassword}
            newPasswordRepeat={newPasswordRepeat}
            onChangeNewPassword={onChangeNewPassword}
            onChangeNewPasswordRepeat={onChangeNewPasswordRepeat}
          />
        ) : (
          <EmailSender email={email} onChangeEmail={onChangeEmail} />
        )}

        <BtnForm type="submit">
          {localStorage.token ? 'Criar' : 'Recuperar'}
        </BtnForm>
      </FormStyle>

      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_CENTER}
      />
    </Container>
  );
}
