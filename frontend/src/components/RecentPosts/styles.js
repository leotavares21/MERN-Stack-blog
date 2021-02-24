import styled from 'styled-components';
import {
  titleStyle,
  categoryStyle,
  sizeWrapperContainer,
} from '../../styles/tools';

export const LatestArticleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: var(--medium);

  > h2 {
    ${titleStyle};
    margin-bottom: var(--medium);
  }

  > button {
    margin: var(--medium) 0 80px 0;

    @media(max-width: 700px){
      margin-top: 0;
      margin-bottom: var(--medium);
    }
  }

  > div {
    display: flex;
    justify-content: space-around;
    ${sizeWrapperContainer};
    position: relative;

    @media (max-width: 700px) {
      flex-direction: column;
      align-items: center;
      margin-bottom: 0;
    }

    > article {
      display: flex;
      flex-direction: column;
      width: 28%;

      @media (max-width: 700px) {
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
