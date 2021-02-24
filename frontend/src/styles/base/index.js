import { createGlobalStyle } from 'styled-components';

const Base = createGlobalStyle`
    html, body, #root {
      height: 100vh;
    }
    *, button, input {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    }
    button {
      cursor: pointer;
    }
`;

export default Base;
