import styled from 'styled-components';

import {
  sizeWrapperContainer,
  categoryStyle,
  titleStyle,
} from '../../styles/tools';
import { BsThreeDotsVertical } from 'react-icons/bs';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > section {
    width: 80vw;
    max-width: 800px;

    @media (max-width: 580px) {
      width: 95vw;
    }

    > h2 {
      font-size: 1.2rem;
      color: var(--dark-gray);
    }
  }
`;

export const Post = styled.article`
  ${sizeWrapperContainer};

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 624px) {
      flex-direction: column-reverse;
      align-items: flex-start;
    }

    @media (max-width: 450px) {
      align-items: center;
    }

    > h1 {
      font-size: 2.5rem;

      @media (max-width: 1024px) {
        font-size: 2rem;
      }

      @media (max-width: 768px) {
        margin-bottom: 15px;
      }

      @media (max-width: 624px) {
        font-size: 1.5rem;
      }
    }

    > img {
      margin-left: 10px;
      width: 50vw;
      max-width: 450px;

      @media (max-width: 624px) {
        margin-bottom: 10px;
        margin-left: 0;
      }

      @media (max-width: 450px) {
        width: 90vw;
      }
    }
  }

  > svg {
    color: var(--secondary);
    float: right;
    margin-right: 10px;
  }

  > strong {
    color: var(--secondary);
    > span {
      ${categoryStyle};
    }
  }

  > span {
    color: var(--secondary);
    margin-top: 10px;
    display: block;
  }

  > p {
    margin: 20px 0;
    text-align: justify;
    padding: 0 5px;
  }

  > ul {
    display: flex;
    float: right;

    & > * {
      margin-left: 15px;
    }
  }
`;

export const CommentUser = styled.ul`
  margin: 10px 0 var(--medium);
  padding-bottom: 5px;
  border-bottom: 2px solid var(--gray);

  > span {
    margin-right: 10px;
  }

  > a {
    color: var(--secondary);
    font-weight: bold;
  }
`;

export const CommentForm = styled.form`
  margin: 20px 0px 30px;
  > strong {
    color: var(--dark-gray);
  }

  > span {
    color: var(--secondary);
    cursor: pointer;
    float: right;
    text-decoration: underline;
  }

  > input {
    margin: 5px 0;
    width: 80vw;
    max-width: 800px;
    min-height: var(--medium);
    display: block;
    border: 1px solid var(--secondary);
    padding: 5px 10px;

    @media (max-width: 580px) {
      width: 95vw;
    }
  }

  > button {
    margin: 10px auto;
  }
`;

export const CommentList = styled.div`
  margin: 10px 0;
  border-bottom: 2px solid var(--gray);
  padding-bottom: 20px;
  position: relative;

  > strong {
    color: var(--dark-gray);
  }

  > span {
    float: right;
    color: var(--secondary);
    margin-right: 30px;
  }

  > p {
    margin-top: 5px;
  }
`;

export const CommentOptions = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  > ul {
    transform-origin: left;
    transform: ${(props) => (props.showoptions ? 'scaleX(1)' : 'scaleX(0)')};
    transition: 0.1s;
    background-color: var(--secondary);
    position: absolute;
    padding: 5px;
    top: -100%;
    right: -110px;

    @media (max-width: 1024px) {
      transform: ${(props) => (props.showoptions ? 'scaleY(1)' : 'scaleY(0)')};
      transform-origin: top;
      right: -142%;
      top: 110%;

      @media (max-width: 580px) {
        right: -10%;
      }
    }

    &:before {
      content: '';
      position: absolute;
      left: -5px;
      top: 50%;
      transform: translateY(-50%);
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-right: 5px solid var(--secondary);

      @media (max-width: 1024px) {
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid var(--secondary);
      }

      @media (max-width: 580px) {
        left: 85%;
      }
    }

    > li {
      color: var(--gray);
      cursor: pointer;

      @media (max-width: 1024px) {
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        margin-bottom: 7px;
      }

      > svg {
        font-size: 0.8rem;

        @media (max-width: 1024px) {
          margin-right: 5px;
        }
      }
    }
  }
`;

export const CommentSet = styled.form`
  margin-top: 10px;
  display: grid;
  justify-content: end;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'name' 'text';

  > strong {
    color: var(--dark-gray);
    grid-area: name;
    display: ${(props) => (props.replydisplay ? 'block' : 'none')};
  }

  > input {
    width: 75vw;
    max-width: 750px;
    min-height: 30px;
    padding: 3px;
    border: 1px solid var(--secondary);
    grid-area: text;
    display: ${(props) => (props.replydisplay ? 'block' : 'none')};

    @media (max-width: 580px) {
      width: 90vw;
    }
  }

  > div {
    display: flex;
    justify-self: flex-end;

    > button {
      margin-top: 5px;
      margin-left: 10px;
      color: var(--dark-gray);

      &:nth-of-type(1) {
        font-weight: bold;
      }
    }
  }
`;

export const ReplySet = styled.form`
  padding-left: 2vw;
  display: grid;
  justify-content: end;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'name' 'text';

  > strong {
    color: var(--dark-gray);
    grid-area: name;
    margin-top: 5px;
    display: ${(props) => (props.replydisplay ? 'block' : 'none')};
  }

  > input {
    width: 70vw;
    max-width: 750px;
    min-height: 30px;
    padding: 3px;
    border: 1px solid var(--secondary);
    grid-area: text;
    display: ${(props) => (props.replydisplay ? 'block' : 'none')};

    @media (max-width: 580px) {
      width: 85vw;
    }
  }

  > div {
    display: flex;
    justify-self: flex-end;

    > button {
      margin-top: 5px;
      margin-left: 10px;
      color: var(--dark-gray);
    
      &:nth-of-type(1) {
        font-weight: bold;
      }
    }
  }
`;

export const ReplyContent = styled.section`
  display: none;
  justify-content: end;

  &.show {
    display: grid;
  }

  > div {
    border-left: 2px solid var(--gray);
    padding-left: 10px;
    width: 70vw;
    max-width: 780px;
    margin: 10px 0;
    position: relative;

    @media (max-width: 1110px) {
      width: 75vw;
    }

    @media (max-width: 580px) {
      width: 90vw;
      padding-left: 5px;
    }

    > strong {
      color: var(--dark-gray);
    }

    > span {
      color: var(--secondary);
      float: right;
      margin-right: 30px;
    }

    > p {
      margin: 5px 0;
    }
  }
`;

export const ThreeDots = styled(BsThreeDotsVertical)`
  cursor: pointer;
  border-radius: 50%;
  padding: 4px;
  font-size: 1.4rem;
  color: ${(props) => (props.showoptions ? 'var(--gray)' : 'var(--dark-gray)')};
  background-color: ${(props) => (props.showoptions ? 'var(--secondary)' : '')};
  transition: 0.2s;

  &:hover {
    color: var(--gray);
    background-color: var(--secondary);
  }
`;

export const BtnArrow = styled.button`
  display: ${(props) => (props.hasRes ? 'none' : 'flex')};
  align-items: center;
  font-size: 0.9rem;
  color: var(--secondary);
  font-weight: bold;

  > span {
    margin-right: 5px;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid var(--secondary);
    &.show {
      margin-top: 5px;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid var(--secondary);
    }
  }
`;

export const RandomArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: var(--medium);

  > h3 {
    ${titleStyle};
    margin-bottom: var(--medium);
  }

  > div {
    display: flex;
    justify-content: space-around;
    ${sizeWrapperContainer};
    position: relative;

    @media (max-width: 560px) {
      flex-direction: column;
      align-items: center;
      margin-bottom: 0;
    }

    > article {
      display: flex;
      flex-direction: column;
      width: 28%;

      @media (max-width: 560px) {
        width: 80%;
        margin-bottom: var(--medium);
      }

      > img {
        width: 100%;
        height: auto;
        object-fit: cover;
        cursor: pointer;
      }
    }
  }
`;

export const ArticleContent = styled.div`
  > span {
    ${categoryStyle};
    font-size: 0.9rem;

    @media (max-width: 1024px) {
      font-size: 0.8rem;
    }
  }
  > h1 {
    margin-top: 10px;

    @media (max-width: 1024px) {
      font-size: 1rem;
    }
  }
`;
