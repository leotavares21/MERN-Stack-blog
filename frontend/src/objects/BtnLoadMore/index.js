import styled from 'styled-components';

const BtnLoadMore = styled.button`
  font-weight: bold;
  color: var(--brand-color);
  display: flex;
  align-items: center;
  margin: 30px auto;
  > svg {
    color: var(--dark);
    margin: 0 5px;
    font-size: 1rem;
  }
`;

export default BtnLoadMore;
