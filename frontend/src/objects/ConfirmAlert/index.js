import styled from 'styled-components';

const ConfirmAlert = styled.div`
  transition: all 0.2s ease;
  width: 60vw;
  min-width: 280px;
  max-width: 970px;
  background-color: var(--primary);
  padding: 20px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 10%;
  left: 50%;
  transform: ${(props) =>
    props.open ? 'scaleY(1) translateX(-50%)' : 'scaleY(0) translateX(-50%)'};
  z-index: 100;
  transform-origin: top;
  clear: both;

  @media(max-width: 725px){
    width: 90vw;
  }

  > div {
    float: right;

    > button {
      margin: 5px;
      font-weight: bold;
      padding: 5px 20px;

      &:nth-child(1) {
        background-color: var(--brand-color);
        color: var(--primary);
      }

      &:nth-child(2) {
        border: 1px solid var(--brand-color);
        color: var(--brand-color);
      }
    }
  }
`;

export default ConfirmAlert;
