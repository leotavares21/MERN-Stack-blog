import styled from 'styled-components';

import { sizeWrapperContainer, titleStyle } from '../../styles/tools';

export const Container = styled.div`
  background-color: var(--gray);
  ${sizeWrapperContainer};
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    margin-top: 20px;

    > button {
      margin: 0 10px;
      color: var(--dark-gray);
      font-weight: bold;

      &:hover {
        color: var(--secondary);
      }
    }
  }

  > form {
    width: 20vw;
    min-width: 250px;
    display: ${(props) => (props.open ? 'flex' : 'none')};
  }

  > h2 {
    ${titleStyle};
  }
`;

export const Btn = styled.button`
  border-bottom: 2px solid var(--secondary);
  display: block;
  margin: 20px auto 0 auto;
  color: var(--secondary);

  &:hover {
    color: var(--dark);
  }
`;

export const Posts = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 600px) {
    width: 98%;
  }

  > article {
    display: ${(props) => (props.open ? 'block' : 'none')};
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
      float: right;
    }
  }
`;
