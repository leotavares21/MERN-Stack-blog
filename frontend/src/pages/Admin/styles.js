import styled from 'styled-components';
import { sizeWrapperContainer, titleStyle } from '../../styles/tools/';

import { MdPersonAdd } from 'react-icons/md';

export const AdminContainer = styled.div`
  ${sizeWrapperContainer};
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: var(--gray);
  position: relative;

  > h2 {
    ${titleStyle};
    margin: 20px 0 var(--medium) 0;
  }

  > a {
    position: absolute;
    right: 0;
    margin: 15px;
    color: var(--dark-gray);
    font-weight: bold;
    display: flex;
    align-items: center;

    @media (max-width: 760px) {
      font-size: 0.8rem;
    }

    @media (max-width: 500px) {
      top: 5vh;
    }
  }

  > div {
    display: flex;
    justify-content: space-evenly;
    ${sizeWrapperContainer};

    @media (max-width: 760px) {
      flex-direction: column;
      align-items: center;
    }
  }
`;

export const AddWriter = styled(MdPersonAdd)`
  color: var(--dark-gray);
  font-size: 1.2rem;
  margin-left: 10px;

  @media (max-width: 760px) {
    font-size: 1rem;
  }
`;
