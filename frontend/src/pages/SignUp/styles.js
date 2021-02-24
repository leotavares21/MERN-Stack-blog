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
      color: var(--secondary);
      font-weight: 500;
      margin: 20px auto;
    }

    > div {
      margin: 0 auto;
    }
  }
`;

export const IconButton = styled.button`
  color: ${(props) => (props.facebook ? '#2d88ff' : '')};
  color: ${(props) => (props.twitter ? '#1da1f2' : '')};
  font-size: 1.3rem;
  margin: 0 10px;
`;
