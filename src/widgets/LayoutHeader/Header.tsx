import { useState } from "react";
import type { FC } from "react";
import { ThemeSwitcher } from "../../features/ThemeSwitcher/ui/ThemeSwitcher";
import { LangSwitcher } from "../../features/LangSwitcher/ui/LangSwitcher";
import { Navigation } from "../../shared/ui/Navigation/Navigation";
import { useTranslation } from "react-i18next";

import styles from "./Header.module.scss";
import { Container } from '../../shared/ui/Container/Container';

export const Header: FC = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>

      <Container>

        <div className={styles.headerContent}>
          <LangSwitcher />

          <Navigation />

          <div className={styles.controls}>
            <ThemeSwitcher />
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

      </Container>
    </header>
  );
};

export default Header;
