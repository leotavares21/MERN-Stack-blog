import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { formatDistanceStrict, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

import BtnForm from '../../objects/BtnForm';
import BtnLoadMore from '../../objects/BtnLoadMore';

import {
  Container,
  Post,
  CommentUser,
  CommentForm,
  CommentList,
  CommentOptions,
  ReplySet,
  CommentSet,
  ReplyContent,
  BtnArrow,
  ThreeDots,
  RandomArticleContainer,
  ArticleContent,
} from './styles';
import { FaShareAlt } from 'react-icons/fa';
import { IoIosArrowDropdown } from 'react-icons/io';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { GoReport } from 'react-icons/go';

import api from '../../services/api';

export default function PublicPost() {
  const history = useHistory();
  const [post, setPost] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
  const [editComment, setEditComment] = useState('');
  const [display, setDisplay] = useState('');
  const [editing, setEditing] = useState(false);
  const [showOptions, setShowOptions] = useState('');
  const [loadComments, setLoadComments] = useState(false);
  const [commentCounter, setCommentCounter] = useState(10);
  const replyRef = useRef([]);
  const btnReplyRef = useRef([]);
  const { user, setUser } = useContext(UserContext);
  const { slug } = useParams();

  useEffect(() => {
    fetchData();
  }, [commentCounter, slug]);

  const fetchData = async () => {
    const resPosts = await api.get('/api/random/posts');
    const resSlug = await api.get(`/api/post/${slug}`);
    const comment = await api.get(`/api/comment/${resSlug.data._id}`);
    if (comment.data.length > 10) {
      setLoadComments(!loadComments);
    }
    if (comment.data.length < commentCounter) {
      setLoadComments(false);
    }
    const lastestComments = comment.data.filter((comm, i) => {
      return i < commentCounter;
    });
    replyRef.current = new Array(comment.data.length);
    btnReplyRef.current = new Array(comment.data.length);
    setComments(lastestComments);
    setPost(resSlug.data);
    setPosts(resPosts.data);
  };

  const createComment = async (e) => {
    e.preventDefault();

    try {
      await api.post('/api/comment', {
        postId: post._id,
        text: newComment,
      });
      setNewComment('');
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const replyComment = async (e) => {
    e.preventDefault();

    try {
      if (newReply && !editing) {
        await api.put('/api/comment/reply', {
          commentId: display,
          postId: post._id,
          text: newReply,
        });
        setNewReply('');
        setDisplay('');
      } else {
        await api.put('/api/comment/edit', {
          commentId: display,
          text: editComment,
          editing: editing,
        });
        setEditComment('');
        setDisplay('');
        setEditing(false);
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const replyReplies = async (e, commentId, replyId) => {
    e.preventDefault();

    try {
      if (newReply && !editing) {
        await api.put('/api/comment/reply', {
          commentId: commentId,
          postId: post._id,
          text: newReply,
        });
        setNewReply('');
        setDisplay('');
      } else {
        await api.put('/api/comment/edit', {
          commentId: commentId,
          replyId: replyId,
          text: editComment,
          editing: editing,
        });
        setEditComment('');
        setDisplay('');
        setEditing(false);
      }
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowReplies = (e, i) => {
    let replyItem = replyRef.current[i];
    let replyButton = btnReplyRef.current[i];
    replyItem.classList.toggle('show');
    replyButton.classList.toggle('show');
    setShowOptions('');
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser('');
    window.location.reload();
  };

  const handleEditComment = async (e, commentId, text) => {
    setDisplay(commentId);
    setEditComment(text);
    setEditing(true);
    setShowOptions('');
  };

  const handleCommentOptions = (e, commentId) => {
    if (showOptions === commentId) {
      setShowOptions('');
    } else {
      setShowOptions(commentId);
    }
  };

  const handleEdit = (e, commentId) => {
    setDisplay(commentId);
    setEditing(true);
  };

  const handleCommentCancel = () => {
    setDisplay('');
  };

  const handleEditCancel = () => {
    setDisplay('');
    setEditing(false);
    setEditComment('');
  };

  const handleCommentReply = (e, commentId) => {
    setDisplay(commentId);
    setEditing(false);
  };

  const handleCommentDelete = async (e, commentId, replyId) => {
    if (replyId) {
      await api.delete(`/api/delete/comment/${commentId}/${replyId}`);
    } else {
      await api.delete(`/api/delete/comment/${commentId}`);
    }
    fetchData();
  };

  const handleSharing = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          url: window.location.href,
        })
        .then(() => {
          console.log('Sharinsuccessfully shared');
        })
        .catch((err) => {
          console.log('Not Shared', err);
        });
    } else {
      console.log('Share not supported');
    }
  };

  return (
    <Container>
      {post.category ? (
        <Post>
          <div>
            <h1>{post.title}</h1>
            <img src={post.imageUrl} alt={post.title} />
          </div>
          <strong>
            categoria: <span>{post.category.name}</span>
          </strong>
          <span>
            {post.author ? 'por: ' + post.author.username : ''} há{' '}
            {formatDistanceStrict(parseISO(post.createdAt), Date.now(), {
              locale: ptBR,
            })}
          </span>
          <p>{post.content}</p>

          {window.screen.width > 768 ? (
            <ul>
              <FacebookShareButton
                url={window.location.href}
                quote={post.title}
              >
                <FacebookIcon size={22} />
              </FacebookShareButton>

              <TwitterShareButton url={window.location.href} title={post.title}>
                <TwitterIcon size={22} />
              </TwitterShareButton>

              <LinkedinShareButton
                url={window.location.href}
                title={post.title}
              >
                <LinkedinIcon size={22} />
              </LinkedinShareButton>
            </ul>
          ) : (
            <FaShareAlt onClick={handleSharing} />
          )}
        </Post>
      ) : (
        ''
      )}
      <section>
        <h2>
          {comments.length === 1
            ? `${comments.length} Comentário`
            : `${comments.length} Comentários`}{' '}
        </h2>

        {localStorage.token && user.username ? (
          <CommentForm onSubmit={createComment}>
            <strong>{user.username}:</strong>
            <span onClick={handleSignOut}>Sair</span>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Deixar um comentário..."
            />
            <BtnForm type="submit">Comentar</BtnForm>
          </CommentForm>
        ) : (
          <CommentUser>
            <span>Faça login para comentar:</span>
            <Link to="/entrar">Entrar</Link>
          </CommentUser>
        )}

        {comments.map((comment, i) => (
          <CommentList key={comment._id}>
            <strong>{comment.author.username}</strong>
            <span>
              há{' '}
              {formatDistanceStrict(parseISO(comment.createdAt), Date.now(), {
                locale: ptBR,
              })}
            </span>

            <p>{comment.text}</p>

            {user._id === comment.author._id ? (
              <CommentOptions showoptions={showOptions === comment._id}>
                <ThreeDots
                  onClick={(e) => handleCommentOptions(e, comment._id)}
                  showoptions={showOptions === comment._id}
                />
                <ul>
                  <li
                    onClick={(e) =>
                      handleEditComment(e, comment._id, comment.text)
                    }
                  >
                    <AiFillEdit /> Editar
                  </li>
                  <li onClick={(e) => handleCommentDelete(e, comment._id)}>
                    <AiFillDelete /> Deletar
                  </li>
                  <li>
                    <GoReport /> Denunciar
                  </li>
                </ul>
              </CommentOptions>
            ) : (
              ''
            )}

            <CommentSet
              onSubmit={replyComment}
              replydisplay={comment._id === display}
            >
              <strong>{user.username}:</strong>
              {editing ? (
                <input
                  type="text"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  placeholder="Editar esse comentário..."
                />
              ) : (
                <input
                  type="text"
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Deixar uma resposta..."
                />
              )}

              {display === comment._id && editing && user.username ? (
                <div>
                  <button
                    type="submit"
                    onClick={(e) => handleEdit(e, comment._id)}
                  >
                    Editar
                  </button>
                  <button onClick={handleEditCancel}>Cancelar</button>
                </div>
              ) : localStorage.token && user.username ? (
                <div>
                  <button
                    type="submit"
                    onClick={(e) => handleCommentReply(e, comment._id)}
                  >
                    Responder
                  </button>

                  {comment._id === display ? (
                    <button onClick={handleCommentCancel}>Cancelar</button>
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                ''
              )}
            </CommentSet>

            <BtnArrow
              onClick={(e) => handleShowReplies(e, i)}
              hasRes={comment.replies.length === 0}
            >
              <span ref={(el) => (btnReplyRef.current[i] = el)}></span>
              {comment.replies.length === 1
                ? `${comment.replies.length} resposta`
                : `${comment.replies.length} respostas`}
            </BtnArrow>

            <ReplyContent ref={(el) => (replyRef.current[i] = el)}>
              {comment.replies.map((reply, i) => (
                <div key={reply._id}>
                  <strong>{reply.author.username}</strong>
                  <span>
                    há{' '}
                    {formatDistanceStrict(parseISO(reply.date), Date.now(), {
                      locale: ptBR,
                    })}
                  </span>
                  <p>{reply.text}</p>

                  {user._id === reply.author._id ? (
                    <CommentOptions showoptions={showOptions === reply._id}>
                      <ThreeDots
                        onClick={(e) => handleCommentOptions(e, reply._id)}
                        showoptions={showOptions === reply._id}
                      />
                      <ul>
                        <li
                          onClick={(e) =>
                            handleEditComment(e, reply._id, reply.text)
                          }
                        >
                          <AiFillEdit /> Editar
                        </li>
                        <li
                          onClick={(e) =>
                            handleCommentDelete(e, comment._id, reply._id)
                          }
                        >
                          <AiFillDelete /> Deletar
                        </li>
                        <li>
                          <GoReport /> Denunciar
                        </li>
                      </ul>
                    </CommentOptions>
                  ) : (
                    ''
                  )}

                  <ReplySet
                    onSubmit={(e) => replyReplies(e, comment._id, reply._id)}
                    replydisplay={reply._id === display}
                    makereply
                  >
                    <strong>{user.username}:</strong>
                    {editing ? (
                      <input
                        type="text"
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                        placeholder="Editar esse comentário..."
                      />
                    ) : (
                      <input
                        type="text"
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        placeholder="Deixar uma resposta..."
                      />
                    )}

                    {display === reply._id && editing && user.username ? (
                      <div>
                        <button
                          type="submit"
                          onClick={(e) => handleEdit(e, reply._id)}
                        >
                          Editar
                        </button>
                        <button onClick={handleEditCancel}>Cancelar</button>
                      </div>
                    ) : localStorage.token && user.username ? (
                      <div>
                        <button
                          type="submit"
                          onClick={(e) => handleCommentReply(e, reply._id)}
                        >
                          Responder
                        </button>

                        {reply._id === display ? (
                          <button onClick={handleCommentCancel}>
                            Cancelar
                          </button>
                        ) : (
                          ''
                        )}
                      </div>
                    ) : (
                      ''
                    )}
                  </ReplySet>
                </div>
              ))}
            </ReplyContent>
          </CommentList>
        ))}
        {loadComments ? (
          <BtnLoadMore
            onClick={() =>
              setCommentCounter((commentCounter) => commentCounter + 10)
            }
          >
            <IoIosArrowDropdown /> Ver mais comentários
          </BtnLoadMore>
        ) : (
          ''
        )}
      </section>

      <RandomArticleContainer>
        <h3>Veja também</h3>
        <div>
          {posts.map((post) => (
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
      </RandomArticleContainer>
    </Container>
  );
}
