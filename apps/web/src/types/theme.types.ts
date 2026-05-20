export type Theme = 'light' | 'dark';
export type ThemeContextType = {
  toggleTheme:()=>void;
  theme:Theme;
}