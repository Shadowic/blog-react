import type { FC } from "react";
import { useTheme } from "../../../shared/lib/theme";
import { Button } from "../../../shared/ui/Button";
import styles from "./ThemeSwitcher.module.scss";

export const ThemeSwitcher: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="Outline"
      size="Small"
      className={styles.themeSwitcher}
      aria-label="Переключить тему"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </Button>
  );
};
