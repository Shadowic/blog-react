import { useCallback, useState } from "react";
import type { FC } from "react";
import { useModal } from "../../shared/lib/context/ModalContext";
import { ThemeSwitcher } from "../../features/ThemeSwitcher/ui/ThemeSwitcher";
import { LangSwitcher } from "../../features/LangSwitcher/ui/LangSwitcher";

import { Button } from "../../shared/ui/Button";
import styles from "./Header.module.css";

export const Header: FC = () => {
  const { openModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAboutClick = useCallback(() => {
    openModal();
  }, [openModal]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>

        <LangSwitcher />

        <div className={styles.controls}>
          <ThemeSwitcher />
          <Button
            onClick={handleAboutClick}
            variant="Outline"
            size="Small"
            className={styles.aboutBtn}
          >
            Open modal
          </Button>
          <button
            className={styles.burger}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
