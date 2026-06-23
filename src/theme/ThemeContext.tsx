import React, { createContext, useContext, useState, ReactNode } from 'react';

// Childlike & Playful Design Language Colors
export const defaultTheme = {
  primary: '#FFE08A', // Warm Yellow
  background: '#FFF8F0',
  text: '#333333',
  secondary: '#A8D8EA', // Baby Blue
  accent: '#FFB6C1', // Soft Pink
  success: '#7ED957', // Mint Green
  card: '#FFFFFF',
  shadow: 'rgba(0, 0, 0, 0.05)',
  radius: {
    sm: 16,
    md: 24,
    lg: 32,
    round: 9999,
  },
};

export type Theme = typeof defaultTheme;

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
