import type { FC } from "react";
import { ThemeSwitcher } from "../../features/ThemeSwitcher/ui/ThemeSwitcher";
import { LangSwitcher } from "../../features/LangSwitcher/ui/LangSwitcher";
import { Navigation } from "../../shared/ui/Navigation/Navigation";
import { useTranslation } from "react-i18next";

import styles from "./Header.module.scss";
import { Container } from '../../shared/ui/Container/Container';

interface HeaderProps {
  isMenuMobileOpen: boolean;
  onToggleMenu: () => void;
}

export const Header: FC<HeaderProps> = ({ isMenuMobileOpen, onToggleMenu }) => {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>

      <Container>

        <div className={styles.headerContent}>
          <LangSwitcher />

          <Navigation />

          <div className={styles.controls}>
            <ThemeSwitcher />
            <button
                className={`${styles.burger} ${isMenuMobileOpen ? styles.active : ''}`}
                onClick={onToggleMenu}
                aria-label={isMenuMobileOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isMenuMobileOpen}
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
