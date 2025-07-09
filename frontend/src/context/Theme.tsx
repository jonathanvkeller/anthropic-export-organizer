import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
    background: #393f5f;
    color: #ffe69d;
  }
  button {
    margin-left: 0.5rem;
    background: #e96d5e;
    color: #ffe69d;
    border: none;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }
  input {
    background: #6a7e6a;
    color: #ffe69d;
    border: none;
    padding: 0.25rem;
  }
`;

const theme = {
  accent: '#e96d5e',
  secondary: '#ff9760',
  tertiary: '#ffe69d',
  quaternary: '#6a7e6a',
  background: '#393f5f',
};

export const DarkTheme: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Global />
    {children}
  </ThemeProvider>
);
