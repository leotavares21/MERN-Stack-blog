import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import BtnLoadMore from '../../objects/BtnLoadMore';
import {
  SearchsContainer,
  ContentPost,
  Category,
  PostDate,
  SearchMsg,
} from './styles';
import { IoIosArrowDropdown } from 'react-icons/io';

export default function Searchs() {
  const [loadPosts, setLoadPosts] = useState(false);
  const [postCounter, setPostCounter] = useState(10);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const history = useHistory();
  const search = history.location.state.search;

  useEffect(() => {
    getPosts();
  }, [search, postCounter]);

  const getPosts = () => {
    const filterPosts = search.filter((post, i) => {
      if (i >= postCounter) {
        setLoadPosts(true);
      } else {
        setLoadPosts(false);
      }

      return i < postCounter;
    });
    setFilteredPosts(filterPosts);
  };

  return (
    <SearchsContainer>
      <h2>Resultado</h2>

      {search.length !== 0 ? (
        <>
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
        </>
      ) : (
        <SearchMsg>
          <h3>Nenhum resultado encontrado</h3>
        </SearchMsg>
      )}

      {loadPosts ? (
        <BtnLoadMore
          onClick={() => setPostCounter((postCounter) => postCounter + 10)}
        >
          <IoIosArrowDropdown /> Ver mais postagens
        </BtnLoadMore>
      ) : (
        ''
      )}
    </SearchsContainer>
  );
}
