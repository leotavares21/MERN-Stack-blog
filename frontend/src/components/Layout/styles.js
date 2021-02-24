import styled from 'styled-components';
import { sizeWrapper } from '../../styles/tools';

export const Wrapper = styled.div`
  ${sizeWrapper};
  min-height: calc(100vh - 123px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
