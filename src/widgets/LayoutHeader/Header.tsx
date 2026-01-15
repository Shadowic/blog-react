import { useCallback, useState } from "react";
import type { FC } from "react";
import { useModal } from "../../shared/lib/context/ModalContext";
import { ThemeSwitcher } from "../../features/ThemeSwitcher/ui/ThemeSwitcher";
import { LangSwitcher } from "../../features/LangSwitcher/ui/LangSwitcher";
import { Navigation } from "../../shared/ui/Navigation/Navigation";
import { useTranslation, Trans } from "react-i18next";

import { Button } from "../../shared/ui/Button";
import styles from "./Header.module.scss";
import { Container } from '../../shared/ui/Container/Container';

export const Header: FC = () => {
  const { t } = useTranslation();
  const { openModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAboutClick = useCallback(() => {
    openModal();
  }, [openModal]);

  return (
    <header className={styles.header}>

      <Container>

        <div className={styles.headerContent}>
          <LangSwitcher />

          <Navigation />

          <div className={styles.controls}>
            <ThemeSwitcher />
            <Button
              onClick={handleAboutClick}
              variant="Outline"
              size="Small"
              className={styles.aboutBtn}
            >
              {t("modal.openModal")}
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

      </Container>
    </header>
  );
};

export default Header;
