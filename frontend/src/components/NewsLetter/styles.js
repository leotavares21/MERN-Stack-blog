import styled from 'styled-components';

export const NewsLetterStyle = styled.section`
  text-align: center;
  margin-top: var(--medium);
  > span {
    color: var(--secondary);
    text-transform: uppercase;
    font-size: 0.6rem;
    font-weight: bold;

    @media (max-width: 800px) {
      font-size: 0.5rem;
    }
  }

  > h3 {
    color: var(--dark-gray);
    font-size: 1.5rem;
    margin-bottom: 10px;

    @media (max-width: 800px) {
      font-size: 1.2rem;
    }
  }

  > form {
    display: flex;
    align-items: center;
    outline: 1px solid var(--dark-gray);

    > input {
      padding: 10px;
      width: 70vw;
      max-width: 280px;
      outline: none;

      @media (max-width: 800px) {
        width: 60vw;
        max-width: 250px;
      }
    }

    > input::placeholder {
      text-transform: uppercase;
      font-size: 0.6rem;
    }
    > input::-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      text-transform: uppercase;
    }

    > input::-ms-input-placeholder {
      /* Microsoft Edge */
      text-transform: uppercase;
    }
  }
`;
