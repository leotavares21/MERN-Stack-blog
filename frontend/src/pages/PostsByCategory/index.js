import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import BtnLoadMore from '../../objects/BtnLoadMore';
import { format, parseISO } from 'date-fns';

import api from '../../services/api';

import Spinner from '../../objects/Spinner';
import { Container, PostBanner, ArticleBanner, PostList } from './styles';
import { IoIosArrowDropdown } from 'react-icons/io';

export default function PostsByCategory() {
  const { slug } = useParams();
  const history = useHistory();
  const [loadPosts, setLoadPosts] = useState(false);
  const [postCounter, setPostCounter] = useState(10);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [bannerPosts, setBannerPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPostsByCategory(slug);
  }, [slug, postCounter]);

  const getPostsByCategory = async (slug) => {
    try {
      if (slug) {
        const res = await api.get(`/api/category/post/${slug}`);
        const banner = res.data.filter((post, i) => {
          return i < 2;
        });
        const filter = res.data.filter((post, i) => {
          if (i >= postCounter) {
            setLoadPosts(true);
          } else {
            setLoadPosts(false);
            setLoading(false);
          }

          return i < postCounter;
        });

        setBannerPosts(banner);
        setFilteredPosts(filter);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadPosts = () => {
    setPostCounter((postCounter) => postCounter + 10);
    setLoading(true);
  };

  return (
    <Container>
      <h2>{slug}</h2>
      <PostBanner>
        {bannerPosts.map((post) => (
          <ArticleBanner
            key={post._id}
            image={post.imageUrl}
            onClick={() =>
              history.push(`/postagem/${post.category.slug}/${post.slug}`)
            }
          >
            <h1>{post.title}</h1>
            <p>{post.content.substring(0, 100)}...</p>
          </ArticleBanner>
        ))}
      </PostBanner>

      <PostList>
        {filteredPosts.map((post) => (
          <article key={post._id}>
            <div
              onClick={() =>
                history.push(`/postagem/${post.category.slug}/${post.slug}`)
              }
            >
              <img src={post.imageUrl} alt={post.title}></img>
            </div>

            <div>
              <h1>{post.title}</h1>
              <span>
                postado em:{' '}
                <strong>
                  {format(parseISO(post.createdAt), 'dd/MM/yyyy')}
                </strong>
              </span>
              <p>{post.content.substring(0, 200)}...</p>
            </div>
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
      </PostList>
    </Container>
  );
}
