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
  }
`;
