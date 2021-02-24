import { createGlobalStyle } from 'styled-components';

const GlobalColors = createGlobalStyle`
    :root{
        --primary: #ffffff;
        --brand-color: #40e0d0;
        --secondary: #707070;
        --dark-gray: #343a40;
        --gray: #f3f3f3;
        --dark: #000000;
    }
`;

export default GlobalColors;
