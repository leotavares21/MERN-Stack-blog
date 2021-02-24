import { createGlobalStyle } from 'styled-components';

const Reset = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    *, button, input {
        border: 0;
        background: none;
    }
    ul{
      list-style: none;
    }
    a{
      text-decoration: none;
    }
`;

export default Reset;
