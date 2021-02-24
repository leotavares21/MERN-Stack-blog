import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { LatestArticleContainer, ArticleContent } from './styles';
import BtnMain from '../../objects/BtnMain';

export default function RecentPosts() {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const { posts } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getPosts();
  }, [posts]);

  const getPosts = () => {
    const filterPosts = posts.filter((post, i) => {
      return i > 2 && i < 6;
    });
    setFilteredPosts(filterPosts);
  };

  return (
    <LatestArticleContainer>
      <h2>Postagens Recentes</h2>

      <div>
        {filteredPosts.map((post) => (
          <article key={post._id}>
            <img
              src={post.imageUrl}
              alt={post.title}
              onClick={() =>
                history.push(`/postagem/${post.category.slug}/${post.slug}`)
              }
            />
            <ArticleContent>
              <span>
                {post.category.name} - {post.author.username}
              </span>
              <h1>{post.title}</h1>
            </ArticleContent>
          </article>
        ))}
      </div>

      <BtnMain onClick={() => history.push('/postagens')}>Ver todos</BtnMain>
    </LatestArticleContainer>
  );
}
