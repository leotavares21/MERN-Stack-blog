import styled from 'styled-components';
import { titleStyle } from '../../styles/tools';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > h3 {
    ${titleStyle};
  }

  > form {
    width: 20vw;
    min-width: 250px;

    > span {
      max-width: var(--medium);
      margin-top: 10px;
      font-size: 0.8rem;
      color: var(--secondary);
      border-bottom: 2px solid var(--secondary);
      font-weight: 500;
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        color: var(--dark-gray);
        border-bottom: 2px solid var(--dark-gray);
      }
    }
  }
`;
