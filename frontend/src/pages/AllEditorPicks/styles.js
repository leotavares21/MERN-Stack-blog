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

  > h2 {
    ${titleStyle};
    margin-bottom: var(--medium);
  }

  > article {
    margin-bottom: 20px;
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
  }

  > span {
    color: var(--secondary);
  }

  > p {
    margin: 10px 0;
  }
`;

export const Category = styled.span`
  > span {
    ${categoryStyle};
    font-weight: bold;
  }
`;

export const PostDate = styled.span`
  @media (max-width: 1024px) {
  }

  @media (max-width: 768px) {
  }

  > span {
    text-decoration: underline;
    font-weight: bold;
    font-size: 0.85rem;
  }
`;

export const SearchMsg = styled.div`
  background-color: var(--gray);
  padding: var(--medium);
  margin: 30px 0;

  > h3 {
    color: var(--dark-gray);
  }
`;
