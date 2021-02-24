import styled from 'styled-components';

const BtnForm = styled.button`
  display: block;
  margin: 0 auto;
  color: var(--gray);
  width: 100px;
  height: var(--medium);
  background-color: var(--dark-gray);
  border: 1px solid var(--secondary);
  transition: all ease-in 0.2s;
  &:hover {
    background-color: var(--secondary);
  }
`;

export default BtnForm;
