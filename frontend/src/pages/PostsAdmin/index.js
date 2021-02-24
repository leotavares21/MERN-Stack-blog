import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import {
  ToastsContainer,
  ToastsStore,
  ToastsContainerPosition,
} from 'react-toasts';
import { formatDistanceStrict, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '../../services/api';

import BtnPainel from '../../objects/BtnPainel';
import BtnDelete from '../../objects/BtnDelete';
import BtnEdit from '../../objects/BtnEdit';
import BtnLoadMore from '../../objects/BtnLoadMore';
import ConfirmAlert from '../../objects/ConfirmAlert';
import { IoIosArrowDropdown } from 'react-icons/io';
import { Container, Post, Favorite, NotFavorite, FavContainer } from './styles';

export default function PostsAdmin() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [postId, setPostId] = useState();
  const [postImg, setPostImg] = useState();
  const [loadPosts, setLoadPosts] = useState(false);
  const [postCounter, setPostCounter] = useState(10);
  const [favText, setFavText] = useState('');
  const favRef = useRef();

  useEffect(() => {
    fetchData();
  }, [postCounter]);

  const favoritePost = async (e, postId, isFavorite) => {
    try {
      await api.put(`/api/favorite/post/${postId}`, {
        favorite: isFavorite,
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    const res = await api.get(`/api/posts`);

    if (res.data.length > postCounter) {
      setLoadPosts(true);
    } else {
      setLoadPosts(false);
    }

    const filter = res.data.filter((post, i) => {
      return i < postCounter;
    });

    setPosts(filter);
  };

  const handleOpenAlert = (id, img) => {
    setOpenAlert(true);
    setPostId(id);
    setPostImg(img);
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
      fetchData();
    } catch (err) {
      ToastsStore.error(err.response.data.error);
    }
  };

  return (
    <Container>
      <ConfirmAlert open={openAlert}>
        <p>Quer deletar essa postagem?</p>
        <div>
          <button onClick={deletePost}>OK</button>
          <button onClick={() => setOpenAlert(false)}>Cancelar</button>
        </div>
      </ConfirmAlert>

      <div>
        <h3>Postagens:</h3>
        <BtnPainel onClick={() => history.push('/admin/nova/postagem')}>
          Criar postagem
        </BtnPainel>
      </div>

      {posts.map((post) => (
        <Post key={post._id}>
          {post.imageUrl ? <img src={post.imageUrl} alt={post.title} /> : ''}

          <FavContainer>
            {post.favorite ? (
              <Favorite
                onClick={(e) => favoritePost(e, post._id, false)}
                onMouseOver={() => setFavText('Desfavoritar')}
                ref={favRef}
              />
            ) : (
              <NotFavorite
                onClick={(e) => favoritePost(e, post._id, true)}
                onMouseOver={() => setFavText('Favoritar')}
                ref={favRef}
              />
            )}
            <span>{favText}</span>
          </FavContainer>

          <h1>{post.title}</h1>
          <strong>{post.category.name}</strong>
          <span>por: {post.author.username}</span>
          <p>{post.content.substring(0, 670)}...</p>

          <div>
            <BtnEdit
              onClick={() =>
                history.push(`/admin/editar/postagem/${post.slug}`)
              }
            >
              Editar
            </BtnEdit>
            <BtnDelete onClick={() => handleOpenAlert(post._id, post.imageUrl)}>
              Deletar
            </BtnDelete>
          </div>

          <span>
            há{' '}
            {formatDistanceStrict(parseISO(post.createdAt), Date.now(), {
              locale: ptBR,
            })}
          </span>
        </Post>
      ))}

      {loadPosts ? (
        <BtnLoadMore
          onClick={() => setPostCounter((postCounter) => postCounter + 10)}
        >
          <IoIosArrowDropdown /> Ver mais postagens
        </BtnLoadMore>
      ) : (
        ''
      )}

      <ToastsContainer
        store={ToastsStore}
        position={ToastsContainerPosition.BOTTOM_CENTER}
      />
    </Container>
  );
}
