import type { FC } from "react";
import { Button } from "../../../shared/ui/Button";
import { useTranslation } from 'react-i18next';
import styles from "./LangSwitcher.module.scss";

export const LangSwitcher: FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className={styles.langSwitcher}>
            <Button
                onClick={() => changeLanguage('en')}
                variant={i18n.language === 'en' ? "Primary" : "Outline"}
                size="Small"
                className={styles.langSwitcher__btn}
                aria-label="Switch to English"
            >
                {"en"}
            </Button>
            <Button
                onClick={() => changeLanguage('ru')}
                variant={i18n.language === 'ru' ? "Primary" : "Outline"}
                size="Small"
                className={styles.langSwitcher__btn}
                aria-label="Переключить на русский язык"
            >
                {"ru"}
            </Button>
        </div>
    );
};
