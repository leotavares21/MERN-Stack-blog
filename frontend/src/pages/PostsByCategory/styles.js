import styled from 'styled-components';

import { sizeWrapperContainer, titleStyle } from '../../styles/tools';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h2 {
    ${titleStyle};
  }
`;

export const PostBanner = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 350px;
  outline: 2px solid var(--secondary);
  padding: 8px;
  margin: var(--medium) 0;
  ${sizeWrapperContainer};

  @media (max-width: 620px) {
    padding: 4px;
  }

  @media (max-width: 530px) {
    flex-direction: column;
    justify-content: center;
    padding: 0px;
  }
`;

export const ArticleBanner = styled.article`
  width: 49.6%;
  padding: 8px;
  background-image: ${(props) => (props.image ? `url(${props.image})` : '')};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center;
  &:hover {
    outline: 3px solid var(--brand-color);
    background-size: 110% 110%;
  }
  transition: 0.5s;
  color: var(--primary);
  text-shadow: 1px 1.5px var(--dark);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;

  @media (max-width: 800px) {
    padding: 4px;
    background-size: cover;
  }

  @media (max-width: 530px) {
    width: 100%;
    min-height: 250px;
    margin: 3px 0;
  }

  > h1 {
    font-size: 2rem;

    @media (max-width: 800px) {
      font-size: 1.5rem;
    }
  }

  > p {
    font-size: 1.2rem;

    @media (max-width: 800px) {
      font-size: 1rem;
    }
  }
`;

export const PostList = styled.div`
  ${sizeWrapperContainer};
  > article {
    display: flex;
    align-items: center;
    margin: 30px 0 60px 0;

    @media (max-width: 610px) {
      flex-direction: column;
    }

    > div > img {
      background-color: var(--dark-gray);
      max-width: 300px;
      max-height: 200px;
      cursor: pointer;

      @media (max-width: 610px) {
        max-width: 400px;
        max-height: 300px;
        margin-bottom: 20px;
      }

      @media (max-width: 400px) {
        max-width: 300px;
        max-height: 200px;
      }
    }

    > div:nth-of-type(2) {
      padding: 0 10px;
    }

    > div > h1 {
      font-size: 1.2rem;
      margin-bottom: 5px;
    }

    > div > p {
      margin-top: 10px;
    }

    > div span {
      color: var(--secondary);
      > strong {
        text-decoration: underline;
        font-size: 0.8rem;
      }
    }
  }

  > button {
    margin-top: 60px;
  }
`;
