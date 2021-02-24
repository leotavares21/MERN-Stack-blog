import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;

  @media (max-width: 760px) {
    width: 80%;
    margin-bottom: var(--medium);
  }

  @media (max-width: 400px) {
    width: 95%;
  }

  > div {
    display: flex;
    justify-content: space-between;

    > h3 {
      color: var(--dark-gray);
    }
  }
`;

export const Category = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--dark-gray);
  padding: 8px;
  margin: 20px 0;

  > strong {
    color: var(--dark-gray);
  }
`;
