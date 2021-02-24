import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: var(--dark-gray);
  display: flex;
  justify-content: space-between;
  padding: 30px 80px;
  margin-top: var(--medium);

  @media (max-width: 466px) {
    padding: 30px 10px;
  }

  > ul {
    display: flex;

    > li > a {
      transition: 0.4s;
      color: var(--brand-color);

      &:hover {
        color: var(--primary);
      }

      @media (max-width: 466px) {
        font-size: 0.8rem;
      }

      @media(max-width: 300px) {
          font-size: 0.7rem;
      }
    }

    &:nth-child(1) > li {
      margin-right: 20px;
    }

    &:nth-child(2) > li {
      margin-left: 20px;

      > a {
        font-size: 0.9rem;

        @media(max-width: 300px) {
          font-size: 0.7rem;
        }
      }
    }
  }
`;
