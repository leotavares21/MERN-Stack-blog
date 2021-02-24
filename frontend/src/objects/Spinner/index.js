import styled from 'styled-components';

const Spinner = styled.div`
  ${(props) =>
    props.load
      ? `border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: var(--brand-color);
  height: 20px;
  width: 20px;
  margin: 0 auto;
  border-radius: 50%;
  animation: spin 0.5s linear infinite;
  text-indent: -9999px;`
      : `text-indent: 0;
  `}
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
