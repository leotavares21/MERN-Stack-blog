import styled from 'styled-components';

const BtnPainel = styled.button`
  color: var(--gray);
  padding: 10px 30px;
  background-color: var(--dark-gray);
  transition: all 0.2s;
  &:hover {
    background-color: var(--secondary);
  }

  @media (max-width: 540px) {
    padding: 8px 20px;
    font-size: 0.8rem;
  }
`;

export default BtnPainel;
