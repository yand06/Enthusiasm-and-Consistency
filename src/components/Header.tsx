import { useTheme } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "./icon";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full max-w-6xl mb-6 flex justify-between items-center animate-fade-in">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-textPrimary dark:text-white">
          Enthusiasm & Consistency Tracker
        </h1>
        <p className="text-sm sm:text-base text-textSecondary dark:text-gray-400 mt-1">
          Stay consistent, success will follow.
        </p>
      </div>

      <button
        onClick={toggleTheme}
        className="p-3 rounded-xl bg-white dark:bg-darkCard shadow-lg hover:shadow-xl 
                   transform hover:scale-110 transition-all duration-300 
                   border border-border dark:border-darkBorder group"
        aria-label="Toggle theme"
      >
        {theme === "light" ? (
          <MoonIcon className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform" />
        ) : (
          <SunIcon className="w-6 h-6 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
        )}
      </button>
    </header>
  );
}

export default Header;
