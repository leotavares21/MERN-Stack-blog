import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';

import api from '../../services/api';

import { Container, CurrentImage } from './styles';

import FormStyle from '../../objects/FormStyle';
import BtnForm from '../../objects/BtnForm';
import BtnDelete from '../../objects/BtnDelete';
import Spinner from '../../objects/Spinner';

export default function NewPost() {
  const history = useHistory();
  const location = useLocation();
  const { slug } = useParams();
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageDisplay, setImageDisplay] = useState(false);
  const [postCategory, setPostCategory] = useState([]);
  const [post, setPost] = useState({
    image: '',
    title: '',
    content: '',
    category: '',
  });

  useEffect(() => {
    fetchData(slug);
  }, [slug]);

  const fetchData = async (slug) => {
    const resCategory = await api.get(`/api/categories`);
    setPostCategory(resCategory.data);

    if (slug) {
      try {
        const res = await api.get(`/api/post/${slug}`);
        setPost(res.data);
        setId(res.data._id);
        setEditing(true);
      } catch (err) {
        ToastsStore.error(err.response.data.error);
      }
    } else {
      if (resCategory.data.length > 0) {
        setPost({ category: resCategory.data[0]._id });
      }
    }
  };

  const onChangePost = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const onChangeImage = (e) => {
    setPost({ ...post, image: e.target.files[0] });
  };

  const handleLoading = (e) => {
    if (post.title && post.content && post.category) {
      setLoading(true);
    }
  };

  const handleDeleteImg = (e) => {
    e.preventDefault();
    setPost({ ...post, image: '', imageUrl: '' });
    setImageDisplay(true);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(post).forEach((key) => {
      formData.append(key, post[key]);
    });

    if (editing) {
      try {
        const res = await api.put(`/api/edit/post/${id}`, formData);
        if (location.pathname === '/escritor/nova/postagem') {
          history.push('/config', { success: res.data.success });
        } else {
          history.push('/admin', { success: res.data.success });
        }
      } catch (err) {
        setLoading(false);
        ToastsStore.error(err.response.data.error);
      }
    } else {
      try {
        const res = await api.post('/api/new/post', formData);
        if (location.pathname === '/escritor/nova/postagem') {
          history.push('/', { success: res.data.success });
        } else {
          history.push('/admin', { success: res.data.success });
        }
      } catch (err) {
        setLoading(false);
        ToastsStore.error(err.response.data.error);
      }
    }
  };

  return (
    <Container imageDisplay={imageDisplay === editing || !post.imageUrl}>
      <h3>{editing ? 'Editar postagem' : 'Criar postagem'}</h3>

      <FormStyle onSubmit={handleOnSubmit}>
        {editing ? (
          <CurrentImage imageConfig={post.imageUrl}>
            <img
              src={post.imageUrl ? post.imageUrl : ''}
              alt={post.imageUrl ? post.title : ''}
            />
            <BtnDelete onClick={handleDeleteImg}>Deletar imagem ?</BtnDelete>
          </CurrentImage>
        ) : (
          ''
        )}

        <label htmlFor="image">Imagem:</label>
        <input type="file" name="image" id="image" onChange={onChangeImage} />

        <label htmlFor="title">Título:</label>
        <input
          type="text"
          placeholder="Título"
          name="title"
          id="title"
          onChange={onChangePost}
          value={post.title}
          required
        />

        <label htmlFor="content">Conteúdo:</label>
        <textarea
          placeholder="Conteúdo"
          name="content"
          id="content"
          onChange={onChangePost}
          value={post.content}
          required
        />

        <label htmlFor="category">Categoria:</label>
        {postCategory.length > 0 ? (
          <select
            name="category"
            id="category"
            onChange={onChangePost}
            value={post.category._id}
            required
          >
            {postCategory.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        ) : (
          <p>Nenhuma categoria criada!</p>
        )}

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
