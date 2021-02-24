import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BtnLoadMore from '../../objects/BtnLoadMore';
import Spinner from '../../objects/Spinner';
import { UserContext } from '../../context/UserContext';
import {
  EditorPicksContainer,
  ContentPost,
  Category,
  PostDate,
} from './styles';
import { format, parseISO } from 'date-fns';

import { IoIosArrowDropdown } from 'react-icons/io';

export default function EditorPicks() {
  const [loadPosts, setLoadPosts] = useState(false);
  const [postCounter, setPostCounter] = useState(10);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { favorites } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getPosts();
  }, [postCounter, favorites]);

  const getPosts = () => {
    const filterPosts = favorites.filter((post, i) => {
      if (i >= postCounter) {
        setLoadPosts(true);
      } else {
        setLoadPosts(false);
        setLoading(false);
      }

      return i < postCounter;
    });
    setFilteredPosts(filterPosts);
  };

  const handleLoadPosts = () => {
    setPostCounter((postCounter) => postCounter + 10);
    setLoading(true);
  };

  return (
    <EditorPicksContainer>
      <h2>Escolhas do editor</h2>

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

        {loadPosts ? (
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
    </EditorPicksContainer>
  );
}
