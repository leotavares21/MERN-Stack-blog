import styled from 'styled-components';

import { titleStyle } from '../../styles/tools';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h2 {
    ${titleStyle};
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    > form {
      width: 20vw;
      min-width: 250px;
    }

    > div {
      width: 20vw;
      min-width: 250px;
      border: 2px solid var(--secondary);
      padding: 10px;

      > h3 {
        color: var(--dark-gray);
        font-size: 1rem;
        margin-bottom: 10px;
      }

      > ul > li {
        display: flex;
        justify-content: space-between;
        margin: 5px;
        padding: 3px 0;
        border-bottom: 1px solid var(--gray);
        color: var(--secondary);

        > span {
          color: var(--dark-gray);
          font-weight: bold;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
  }
`;
