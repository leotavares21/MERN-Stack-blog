import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import BtnMain from '../../objects/BtnMain';
import { UserContext } from '../../context/UserContext';

import {
  EditorPicksContainer,
  ContentPost,
  Category,
  PostDate,
} from './styles';

export default function EditorPicks() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { favorites } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getPosts();
  }, [favorites]);

  const getPosts = () => {
    const filterPosts = favorites.filter((post, i) => {
      return i < 3;
    });
    setFilteredPosts(filterPosts);
  };

  return (
    <EditorPicksContainer>
      <h3>Escolhas do Editor</h3>

      {filteredPosts.map((post) => (
        <article key={post._id}>
          <img
            src={post.imageUrl}
            alt={post.title}
            onClick={() =>
              history.push(`/postagem/${post.category.slug}/${post.slug}`)
            }
          />
          <ContentPost>
            <Category>
              categoria: <span>{post.category.name}</span>
            </Category>
            <h1>{post.title}</h1>
            <PostDate>
              Postado em:{' '}
              <span>{format(parseISO(post.createdAt), 'dd/MM/yyyy')}</span>
            </PostDate>
            <p>{post.content.substring(0, 180)}...</p>
          </ContentPost>
        </article>
      ))}
      <BtnMain onClick={() => history.push(`/escolhas-do-editor`)}>
        Ver todos
      </BtnMain>
    </EditorPicksContainer>
  );
}
