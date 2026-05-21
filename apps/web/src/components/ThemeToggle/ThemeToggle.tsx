import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';


export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={()=>{
        toggleTheme()
      }}
      className="
            rounded-xl p-3 cursor-pointer"
      type="button"
    >
      {theme === 'light' ? (
        <Moon size={20} className="hover:text-(--text-active)" />
      ) : (
        <Sun size={20} className="hover:text-yellow-400" />
      )}
    </button>
  );
};
