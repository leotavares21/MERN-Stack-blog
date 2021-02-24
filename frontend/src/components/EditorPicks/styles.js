import styled from 'styled-components';
import {
  sizeWrapperContainer,
  titleStyle,
  categoryStyle,
} from '../../styles/tools';

export const EditorPicksContainer = styled.div`
  ${sizeWrapperContainer};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--medium);

  > h3 {
    ${titleStyle};
    margin-bottom: var(--medium);
  }

  > button {
    margin-top: 20px;
  }

  > article {
    margin:10px 0;
    display: flex;
    align-items: center;

    @media (max-width: 600px) {
      flex-direction: column;
    }

    > img {
      max-width: 250px;
      max-height: 200px;
      cursor: pointer;

      @media (max-width: 600px) {
        max-width: 330px;
        max-height: 270px;
      }

      @media (max-width: 320px) {
        max-width: 220px;
        max-height: 170px;
      }
    }
  }
`;

export const ContentPost = styled.div`
  padding: 8px 10px;

  h1 {
    font-size: 1.2rem;
    margin: 10px 0 5px 0;

    @media (max-width: 780px) {
      font-size: 1rem;
    }
  }

  > span {
    color: var(--secondary);

    @media (max-width: 780px) {
      font-size: 0.8rem;
    }
  }

  > p {
    margin: 10px 0;

    @media (max-width: 780px) {
      font-size: 0.9rem;
    }
  }
`;

export const Category = styled.span`
  > span {
    ${categoryStyle};
    font-weight: bold;

    @media (max-width: 780px) {
      font-size: 0.8rem;
    }
  }
`;

export const PostDate = styled.span`
  > span {
    text-decoration: underline;
    font-weight: bold;
    font-size: 0.85rem;

    @media (max-width: 780px) {
      font-size: 0.75rem;
    }
  }
`;
