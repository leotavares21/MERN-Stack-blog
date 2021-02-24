import styled from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  z-index: 10;
  width: 100vw;
  background-color: var(--dark-gray);
  padding: 20px 80px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 865px) {
    align-items: flex-start;
  }

  @media (max-width: 460px) {
    padding: 10px;
  }

  > div {
    display: flex;
    align-items: center;

    &:nth-child(1) {
      @media (max-width: 865px) {
        position: relative;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    > button {
      position: relative;
      margin-top: ${(props) => (props.menuOpened ? '2px' : '')};
      display: none;
      outline: none;
      margin-left: 20px;

      @media (max-width: 865px) {
        display: block;
      }

      > div {
        background-color: var(--brand-color);
        width: 30px;
        height: 2px;
        margin: 6px 0;
        transition: 0.3s ease-out;

        &:nth-child(1) {
          top: ${(props) => (props.menuOpened ? '4px' : '')};
          position: ${(props) => (props.menuOpened ? 'relative' : '')};
          transform: ${(props) => (props.menuOpened ? 'rotate(45deg)' : '')};
        }

        &:nth-child(2) {
          display: ${(props) => (props.menuOpened ? 'none' : '')};
        }

        &:nth-child(3) {
          bottom: ${(props) => (props.menuOpened ? '4px' : '')};
          position: ${(props) => (props.menuOpened ? 'relative' : '')};
          transform: ${(props) => (props.menuOpened ? 'rotate(-45deg)' : '')};
        }
      }
    }

    > a {
      color: var(--brand-color);

      &:nth-child(2) {
        margin-left: 20px;
        font-size: 1.2rem;
      }

      > h1 {
        margin-right: 20px;
      }
    }
  }
`;

export const NavList = styled.ul`
  display: flex;

  > li {
    margin-left: 30px;

    > a {
      color: var(--brand-color);
      transition: all 0.4s;

      &:hover {
        color: var(--primary);
      }
    }
  }

  @media (max-width: 865px) {
    position: absolute;
    padding: 20px 80px;
    width: 100vw;
    transform: ${(props) => (props.menuOpened ? 'scaleY(1)' : 'scaleY(0)')};
    transform-origin: top;
    top: 20px;
    left: -80px;
    transition: all 0.2s;
    background-color: var(--dark-gray);
    flex-direction: column;
    margin-top: 20px;

    > li {
      margin: 10px 0;
    }
  }

  @media (max-width: 503px) {
    padding: 20px 10px;
    left: -10px;
  }
`;

export const FormSearch = styled.form`
  padding: 3px;
  display: flex;
  transition: all 0.3s;
  width: ${(props) => (props.baropened === 1 ? '180px' : '25px')};
  cursor: ${(props) => (props.baropened === 1 ? 'auto' : 'pointer')};
  border: ${(props) =>
    props.baropened === 1
      ? '1px solid var(--brand-color)'
      : '1px solid var(--dark-gray)'};

  > button {
    font-size: 1.2rem;
    color: var(--brand-color);
    cursor: ${(props) => (props.baropened === 1 ? 'pointer' : 'auto')};
    pointer-events: ${(props) => (props.baropened === 1 ? 'auto' : 'none')};
    background-color: transparent;
    outline: none;
    border: none;
  }

  > input {
    width: 140px;
    cursor: ${(props) => (props.baropened === 1 ? 'auto' : 'pointer')};
    margin-left: ${(props) => (props.baropened === 1 ? '5px' : '0')};
    text-indent: ${(props) => (props.baropened === 1 ? '0px' : '-9999px')};
    pointer-events: ${(props) => (props.baropened === 1 ? 'auto' : 'none')};
    opacity: ${(props) => (props.baropened === 1 ? '1' : '0')};
    z-index: ${(props) => (props.baropened === 1 ? '10' : '-10')};
    transition: opacity 1.1s, z-index 1.1s;
    color: var(--brand-color);
    border: none;
    &:focus,
    &:active {
      outline: none;
    }
    &::placeholder {
      color: var(--gray);
      transition: 0.3s;
    }
  }
`;

export const UserAction = styled.div`
  > section {
    display: flex;
    margin-left: var(--medium);
    position: relative;

    > ul {
      transition: transform 0.2s;
      transform: ${(props) => (props.openSetup ? 'scaleY(1)' : 'scaleY(0)')};
      transform-origin: top;
      position: absolute;
      top: var(--medium);
      left: -30px;
      background-color: var(--gray);
      padding: 5px 10px;
      box-shadow: -0.5px 1px rgba(0, 0, 0, 0.2);

      > small {
        display: block;
        margin-bottom: 5px;
        color: var(--secondary);
      }

      > a {
        color: var(--dark-gray);
      }

      > a:first-of-type > li {
        border-bottom: 1px solid var(--brand-color);
        border-top: 1px solid var(--brand-color);
      }

      > li {
        margin-bottom: 5px;
        cursor: pointer;
        color: var(--dark-gray);
      }

      > button {
        color: var(--dark-gray);
        border-bottom: 1px solid var(--dark-gray);
        font-weight: bold;
      }
    }

    > div {
      text-align: center;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 50%;
      background-color: var(--secondary);
      color: var(--primary);
      cursor: pointer;
    }

    > span {
      color: var(--brand-color);
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
`;

export const Notifications = styled.div`
  position: absolute;
  display: ${(props) => (props.shownots ? 'block' : 'none')};
  background-color: var(--secondary);
  padding: 5px 15px;
  width: 500%;
  left: -550%;
  top: 320%;

  > a {
    width: 100%;
    display: block;
    color: var(--primary);
    margin: 10px 0;
    padding: 5px;
    border: 1px solid white;
  }
`;
