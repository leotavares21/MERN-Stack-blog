import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BtnLoadMore from '../../objects/BtnLoadMore';
import { UserContext } from '../../context/UserContext';
import { PostsContainer, ContentPost, Category, PostDate } from './styles';
import { format, parseISO } from 'date-fns';

import { IoIosArrowDropdown } from 'react-icons/io';

export default function AllPosts() {
  const [loadPosts, setLoadPosts] = useState(false);
  const [postCounter, setPostCounter] = useState(10);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { posts } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getPosts();
  }, [postCounter, posts]);

  const getPosts = () => {
    const filterPosts = posts.filter((post, i) => {
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
    <PostsContainer>
      <h2>Postagens</h2>

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
        <BtnLoadMore
          onClick={() => setPostCounter((postCounter) => postCounter + 10)}
        >
          <IoIosArrowDropdown /> Ver mais postagens
        </BtnLoadMore>
      ) : (
        ''
      )}
    </PostsContainer>
  );
}
