import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";
import { useContext } from "react";

export function ThemeToggle() {
  // Vérifier si le ThemeProvider est disponible
  try {
    const { theme, toggleTheme } = useTheme();

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="relative h-9 w-9 px-0 transition-all-smooth hover:bg-muted focus-ring-enhanced"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Basculer le thème</span>
      </Button>
    );
  } catch (error) {
    // Fallback si pas de ThemeProvider
    const handleToggle = () => {
      const root = document.documentElement;
      if (root.classList.contains('dark')) {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    };

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        className="relative h-9 w-9 px-0 transition-all-smooth hover:bg-muted focus-ring-enhanced"
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Basculer le thème</span>
      </Button>
    );
  }
}