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

    > div {
      display: flex;
      justify-content: space-between;

      > a {
        margin-top: 20px;
        font-weight: 500;
        font-size: 0.8rem;
        color: var(--secondary);
        border-bottom: 1px solid var(--secondary);
        transition: 0.2s;

        &:hover {
          color: var(--dark);
        }
      }
    }
  }
`;
