import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';
import { formatDistance, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import api from '../../services/api';

import FormStyle from '../../objects/FormStyle';
import BtnForm from '../../objects/BtnForm';
import BtnEdit from '../../objects/BtnEdit';
import BtnDelete from '../../objects/BtnDelete';
import BtnLoadMore from '../../objects/BtnLoadMore';
import ConfirmAlert from '../../objects/ConfirmAlert';
import Spinner from '../../objects/Spinner';

import { IoIosArrowDropdown } from 'react-icons/io';

import { Container, Posts } from './styles';

export default function UserConfig() {
  const [editUser, setEditUser] = useState({
    username: '',
    password: '',
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [postId, setPostId] = useState();
  const [postImg, setPostImg] = useState();
  const [postCounter, setPostCounter] = useState(10);
  const [loadPosts, setLoadPosts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [open, setOpen] = useState(false);
  const [writerPosts, setWriterPosts] = useState([]);
  const history = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchWriterPost();
  }, [postCounter]);

  const onSubmitEditUser = async (e) => {
    e.preventDefault();
    try {
      if (editUser.password === passwordRepeat) {
        await api.post('/api/edit/user', editUser);
        window.location.href = '/';
      } else {
        console.log('senhas não batem');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeUser = (e) => {
    const value = e.target.value;
    setEditUser({
      ...editUser,
      [e.target.name]: value,
    });
  };

  const fetchWriterPost = async () => {
    try {
      const res = await api.get('/api/writer/posts');
      
      const filter = res.data.filter((post, i) => {
        if (i >= postCounter) {
          setLoadPosts(true);
        } else {
          setLoadPosts(false);
          setLoading(false);
        }

        return i < postCounter;
      });

      setWriterPosts(filter);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenAlert = (id, img) => {
    setOpenAlert(true);
    setPostId(id);
    setPostImg(img);
  };

  const handleLoadPosts = () => {
    setPostCounter((postCounter) => postCounter + 10);
    setLoading(true);
  };

  const deletePost = async () => {
    try {
      const res = await api.delete(`api/delete/post/${postId}/?img=${postImg}`);
      if (res.data.error) {
        ToastsStore.error(res.data.error);
      } else {
        ToastsStore.success(res.data.success);
      }
      setOpenAlert(false);
      fetchWriterPost();
    } catch (err) {
      ToastsStore.error(err.response.data.error);
    }
  };

  return (
    <Container open={'form' === open}>
      <h2>Configurações</h2>

      <div>
        <button onClick={() => setOpen('form')}>Editar perfil</button>
        {localStorage.token && user.role === 'writer' ? (
          <button onClick={() => history.push('/escritor/nova/postagem')}>
            Criar postagem
          </button>
        ) : (
          ''
        )}
        {(localStorage.token && user.role === 'admin') ||
        user.role === 'writer' ? (
          <button onClick={() => setOpen('posts')}>
            Editar minhas postagens
          </button>
        ) : (
          ''
        )}
      </div>

      <FormStyle onSubmit={onSubmitEditUser}>
        <label htmlFor="username">Novo nome:</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Novo nome"
          value={editUser.username}
          onChange={onChangeUser}
        />
        <label htmlFor="password">Nova senha:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Nova senha"
          value={editUser.password}
          onChange={onChangeUser}
        />
        <label htmlFor="repeatPassword">Repitir senha:</label>
        <input
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          placeholder="Repetir senha"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />

        <BtnForm type="submit">Editar</BtnForm>
      </FormStyle>

      <Posts open={'posts' === open}>
        {writerPosts.map((post) => (
          <article key={post._id}>
            {post.imageUrl ? <img src={post.imageUrl} alt={post.title} /> : ''}

            <h1>{post.title}</h1>
            <strong>{post.category.name}</strong>
            <p>{post.content.substring(0, 670)}...</p>

            <div>
              <BtnEdit
                onClick={() =>
                  history.push(`/escritor/editar/postagem/${post.slug}`)
                }
              >
                Editar
              </BtnEdit>
              <BtnDelete
                onClick={() => handleOpenAlert(post._id, post.imageUrl)}
              >
                Deletar
              </BtnDelete>
            </div>

            <span>
              há{' '}
              {formatDistance(parseISO(post.createdAt), Date.now(), {
                locale: ptBR,
              })}
            </span>
          </article>
        ))}
      </Posts>

      {loadPosts && open === 'posts' ? (
        <BtnLoadMore onClick={handleLoadPosts}>
          {loading ? (
            <Spinner load={loading} />
          ) : (
            <>
              <IoIosArrowDropdown /> Ver mais postagens
            </>
          )}
        </BtnLoadMore>
      ) : (
        ''
      )}

      <ConfirmAlert open={openAlert}>
        <p>Quer deletar essa postagem?</p>
        <div>
          <button onClick={deletePost}>OK</button>
          <button onClick={() => setOpenAlert(false)}>Cancelar</button>
        </div>
      </ConfirmAlert>

      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_CENTER}
      />
    </Container>
  );
}
