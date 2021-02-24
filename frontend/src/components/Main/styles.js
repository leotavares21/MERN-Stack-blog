import styled from 'styled-components';
import { sizeWrapperContainer, categoryStyle } from '../../styles/tools';

import { IoMdPlay, IoMdPause } from 'react-icons/io';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';

export const PostContainer = styled.main`
  ${sizeWrapperContainer};
  position: relative;
  height: 50vh;
  max-height: 800px;

  @media (max-width: 1024px) {
    height: 30vh;
  }

  @media (max-width: 800px) {
    height: 35vh;
  }

  @media (max-width: 600px) {
    height: 80vh;
  }
`;

export const Post = styled.article`
  outline: 2px solid var(--secondary);
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.currentpost ? '1' : '0')};
  z-index: ${(props) => (props.currentpost ? '1' : '-1')};
  transition: 1s ease-in-out;

  > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    padding: 8px;
    left: 0;
    width: 50%;
    height: 100%;

    > h1 {
        font-size: 1.6rem;

        @media (max-width: 800px) {
          font-size: 1.2rem;
        }

        @media (max-width: 600px) {
          font-size: 1rem;
        }

      }
   
    > p {
        color: var(--secondary);
        text-align: justify;

        @media (max-width: 800px) {
          font-size: 0.9rem;
        }

        @media (max-width: 600px) {
          font-size: 0.8rem;
        }
    }
 

      @media (max-width: 600px) {
        width: 100%;
        height: 55%;
        bottom: 0;
        left: 0;
      }

      > button {
        align-self: flex-start;
      }

      > strong {
        color: var(--secondary);
        > span {
          ${categoryStyle};
        }

        @media (max-width: 800px) {
          font-size: 0.9rem;
        }

      }
  }

  > div:nth-of-type(2) {
    position: absolute;
    width: 50%;
    height: 100%;
    right: 0;

    @media (max-width: 600px) {
      width: 100%;
      height: 45%;
      top: 0;
      left: 0;
    }

    > img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    > div {
      transition: 0.2s ease-in-out;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: ${(props) => (props.play ? '1' : '0')};
      display: flex;
      align-items: center;
    }

    &:hover > div {
      opacity: 1;
    }
  }
`;

export const Play = styled(IoMdPlay)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 6rem;
  cursor: pointer;
`;

export const Pause = styled(IoMdPause)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 6rem;
  cursor: pointer;
`;

export const Prev = styled(AiFillStepBackward)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 2rem;
  cursor: pointer;
`;

export const Next = styled(AiFillStepForward)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 2rem;
  cursor: pointer;
`;
