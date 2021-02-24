import styled from 'styled-components';

const FormStyle = styled.form`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 2px solid var(--secondary);

  > label {
    color: var(--dark-gray);
    font-weight: bold;
    margin: 5px 0;
  }

  > input,
  > select {
    border: 1px solid var(--secondary);
    color: var(--dark-gray);
    padding: 5px;
    margin-bottom: 10px;
  }

  > textarea {
    border: 1px solid var(--secondary);
    padding: 5px;
  }

  > button {
    margin-top: 20px;
  }
`;

export default FormStyle;
