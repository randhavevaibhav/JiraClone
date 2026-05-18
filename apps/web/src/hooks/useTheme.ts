import { createContext, useContext } from 'react';
import type{ThemeContextType} from "@/types/types";

export const ThemeContext = createContext<ThemeContextType | null>(null);
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within an ThemeProvider');
    }
    return context;
}
