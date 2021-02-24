import styled from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  @media (max-width: 760px) {
    width: 80%;
  }

  @media (max-width: 400px) {
    width: 95%;
  }

  > div {
    display: flex;
    justify-content: space-between;

    > h3 {
      color: var(--dark-gray);
    }
  }
`;

export const Post = styled.article`
  border: 1px solid var(--dark-gray);
  padding: 8px;
  margin: 20px 0;

  > img {
    width: 100%;
  }

  > h1 {
    margin-bottom: 8px;
    clear: both;
  }

  > strong {
    color: var(--dark-gray);
    text-decoration: underline;
    font-size: 0.9rem;
  }

  > p {
    margin: 8px 0;
    text-align: justify;
  }

  > span {
    color: var(--secondary);
    display: block;

    &:nth-of-type(2) {
      float: right;
    }
  }
`;

export const Favorite = styled(FaHeart)`
  color: var(--brand-color);
  cursor: pointer;

  &:hover ~ span {
    opacity: 1;
  }
`;

export const NotFavorite = styled(FaRegHeart)`
  color: var(--brand-color);
  cursor: pointer;

  &:hover ~ span {
    opacity: 1;
  }
`;

export const FavContainer = styled.div`
  float: right;
  position: relative;

  > span {
    font-size: 0.8rem;
    padding: 5px;
    background-color: var(--dark-gray);
    position: absolute;
    top: -5px;
    color: var(--primary);
    margin-left: 8px;
    opacity: 0;
    transition: all ease-in 0.2s;

    &:before {
      content: '';
      position: absolute;
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-right: 5px solid var(--dark-gray);
    }
  }
`;
