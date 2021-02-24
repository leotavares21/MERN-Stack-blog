import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import BtnMain from '../../objects/BtnMain';
import { PostContainer, Post, Play, Pause, Prev, Next } from './styles';

export default function Main() {
  const history = useHistory();
  const [lastestPosts, setLastestPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(0);
  const [pauseSlide, setPauseSlide] = useState(false);
  const [timer, setTimer] = useState(null);
  const { posts } = useContext(UserContext);

  useEffect(() => {
    getPosts();
  }, [posts]);

  useEffect(() => {
    if (pauseSlide) {
      clearInterval(timer);
    } else {
      if (currentPost < lastestPosts.length) {
        const interval = setInterval(
          () => setCurrentPost(currentPost + 1),
          10000
        );
        setTimer(interval);
      } else {
        setCurrentPost(0);
      }
    }
    return () => clearInterval(timer);
  }, [currentPost, pauseSlide, lastestPosts]);

  const getPosts = () => {
    const filterPosts = posts.filter((post, i) => {
      return i < 3;
    });
    setLastestPosts(filterPosts);
  };

  const handlePrev = () => {
    if (currentPost === 0) {
      setCurrentPost(2);
    } else {
      setCurrentPost(currentPost - 1);
    }
  };

  const handleNext = () => {
    if (currentPost === 2) {
      setCurrentPost(0);
    } else {
      setCurrentPost(currentPost + 1);
    }
  };

  return (
    <PostContainer>
      {lastestPosts.map((post, i) => (
        <Post key={post._id} currentpost={currentPost === i} play={pauseSlide}>
          <div>
            <strong>
              categoria: <span>{post.category.name}</span>
            </strong>
            <h1>{post.title}</h1>
            <p>{post.content.substring(0, 230)}...</p>
            <BtnMain
              onClick={() =>
                history.push(`/postagem/${post.category.slug}/${post.slug}`)
              }
            >
              Ler mais
            </BtnMain>
          </div>

          <div>
            <img src={post.imageUrl} alt={post.title} />

            <div>
              <Prev onClick={handlePrev} />
              {pauseSlide ? (
                <Play
                  onClick={() => setPauseSlide((pauseSlide) => !pauseSlide)}
                />
              ) : (
                <Pause
                  onClick={() => setPauseSlide((pauseSlide) => !pauseSlide)}
                />
              )}
              <Next onClick={handleNext} />
            </div>
          </div>
        </Post>
      ))}
    </PostContainer>
  );
}
