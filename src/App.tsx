import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Display from './components/Display';
import { darkTheme, lightTheme } from './styles/themes';
import { GlobalStyle } from './styles/GlobalStyle';

const StyledContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 90rem;
    height: 100%;
    padding: 1rem;
`;

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem('theme') || false;

    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);
  

  const handleToggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle/>
      <StyledContainer>
        <Display onToggleTheme={handleToggleTheme} />
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;