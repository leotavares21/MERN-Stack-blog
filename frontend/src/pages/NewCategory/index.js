import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';

import api from '../../services/api';

import FormStyle from '../../objects/FormStyle';
import BtnForm from '../../objects/BtnForm';
import Spinner from '../../objects/Spinner';

import { Container } from './styles';

export default function NewCategory() {
  const history = useHistory();
  const { slug } = useParams();
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    name: '',
  });

  useEffect(() => {
    if (slug) {
      fetchData(slug);
      setEditing(true);
    }
  }, [slug]);

  const fetchData = async (slug) => {
    try {
      const res = await api.get(`/api/categories/${slug}`);
      setCategory(res.data);
      setId(res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeCategory = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoading = (e) => {
    if (category.name) {
      setLoading(true);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (localStorage.token) {
      if (editing) {
        try {
          const res = await api.put(`/api/edit/category/${id}`, category);
          history.push('/admin', { success: res.data.success });
        } catch (err) {
          ToastsStore.error(err.response.data.error);
        }
      } else {
        try {
          const res = await api.post('/api/new/category', category);
          history.push('/admin', { success: res.data.success });
        } catch (err) {
          ToastsStore.error(err.response.data.error);
        }
      }
    }
  };

  return (
    <Container>
      {editing ? <h3>Editar Categoria</h3> : <h3>Criar Categoria</h3>}

      <FormStyle onSubmit={handleOnSubmit}>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          id="name"
          value={category.name}
          onChange={onChangeCategory}
          required
        />

        <span onClick={() => history.goBack()}>Voltar</span>
        <BtnForm type="submit" onClick={handleLoading}>
          {editing ? (
            <Spinner load={loading}>Editar</Spinner>
          ) : (
            <Spinner load={loading}>Criar</Spinner>
          )}
        </BtnForm>
      </FormStyle>

      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_CENTER}
      />
    </Container>
  );
}
