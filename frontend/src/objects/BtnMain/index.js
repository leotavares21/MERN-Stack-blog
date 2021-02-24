import styled from 'styled-components';

const BtnMain = styled.button`
  padding: 10px;
  border: 1.8px solid var(--dark);
  color: var(--dark);
  font-weight: bold;

  @media (max-width: 800px) {
    font-size: 0.7rem;
  }

  @media (max-width: 600px) {
    font-size: 0.6rem;
  }
`;

export default BtnMain;
