import React, { useState, useEffect } from 'react';

import BtnForm from '../../objects/BtnForm';
import FormStyle from '../../objects/FormStyle';

import api from '../../services/api';

import { Container } from './styles';

export default function AddWriter() {
  const [user, setUser] = useState('');
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    getWriters();
  }, []);

  const getWriters = async () => {
    const res = await api.get('/api/writers');
    setWriters(res.data);
  };

  const handleAddRole = async (e) => {
    e.preventDefault();
    try {
      await api.put('/api/add/writer', {
        email: user,
      });
      getWriters();
    } catch (err) {
      console.log(err);
    }
    setUser('');
  };

  const handleRemove = async (e, id) => {
    try {
      await api.put(`/api/delete/writer/${id}`);
      getWriters();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h2>Adicionar escritor</h2>

      <div>
        <FormStyle onSubmit={handleAddRole}>
          <label For="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Adicionar escritor"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <BtnForm type="submit">Adicionar</BtnForm>
        </FormStyle>

        <div>
          <h3>Lista de escritores</h3>

          {writers.map((writer) => (
            <ul>
              <li>
                {writer.username}
                <span onClick={(e) => handleRemove(e, writer._id)}>
                  remover
                </span>
              </li>
            </ul>
          ))}

          {writers.length === 0 ? <span>Nenhum escritor</span> : ''}
        </div>
      </div>
    </Container>
  );
}
