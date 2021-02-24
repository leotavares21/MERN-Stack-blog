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
    width: 50vw;
    min-width: 270px;

    @media (max-width: 768px) {
      width: 90vw;
    }

    > input:first-of-type,
    > label:first-of-type {
      opacity: ${(props) => (props.imageDisplay ? '1' : '0')};
      position: ${(props) => (props.imageDisplay ? 'relative' : 'absolute')};
      z-index: ${(props) => (props.imageDisplay ? '1' : '-2')};
      transition: ${(props) => (props.imageDisplay ? 'ease-in 0.4s' : '0')};
    }
    > input:nth-of-type(2) {
    }

    > textarea {
      max-width: 100%;
      min-height: 100px;
    }

    > p {
      color: var(--secondary);
      margin: 20px 0;
    }

    > span {
      max-width: var(--medium);
      margin-top: 10px;
      font-size: 0.8rem;
      color: var(--secondary);
      border-bottom: 2px solid var(--secondary);
      font-weight: 500;
      transition: 0.2s;
      cursor: pointer;

      &:hover {
        color: var(--dark-gray);
        border-bottom: 2px solid var(--dark-gray);
      }
    }
  }
`;

export const CurrentImage = styled.div`
  display: ${(props) => (props.imageConfig ? 'flex' : 'none')};
  align-items: center;

  @media (max-width: 853px) {
    flex-direction: column;
  }

  > img {
    min-width: ${(props) => (props.imageConfig ? '150px' : '')};
    max-width: ${(props) => (props.imageConfig ? '230px' : '')};
    height: ${(props) => (props.imageConfig ? 'auto' : '')};
    margin-bottom: ${(props) => (props.imageConfig ? '20px' : '')};
    margin-right: ${(props) => (props.imageConfig ? '10px' : '')};
  }

  > button {
    font-size: 0.8rem;
  }
`;
