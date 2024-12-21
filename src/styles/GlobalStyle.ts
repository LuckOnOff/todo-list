import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    font-size: 15px;
    box-sizing: border-box;
    font-family: sans-serif;
}

a {
    text-decoration: none;
}

li {
    list-style-type: none;
}

button {
    cursor: pointer;
}

input, textarea, button {
    font-family: inherit;
}

input:focus, textarea:focus {
    outline: none;
}

#root {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.background};
    transition: background-color 0.2s ease-out;
}
  
@media (max-width: 768px) {
    html {
      font-size: 14px;
    }
}
  
@media (max-width: 576px) {
    html {
      font-size: 13px;
    }
}

@media (min-width: 2000px) {
    html {
      font-size: 20px;
    }
}
`;