import React from 'react';
import { ThemeProvider as MaterialTailwindThemeProvider } from '@material-tailwind/react';

function ThemeProvider({ children }) {
  return (
    <MaterialTailwindThemeProvider>
      {children}
    </MaterialTailwindThemeProvider>
  );
}

export default ThemeProvider;
