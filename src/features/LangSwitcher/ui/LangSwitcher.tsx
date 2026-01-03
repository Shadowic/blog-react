import type { FC } from "react";
import { Button } from "../../../shared/ui/Button";
import styles from "./LangSwitcher.module.scss";

export const LangSwitcher: FC = () => {

  return (
      <div className={styles.langSwitcher}>
        <Button
          variant="Outline"
          size="Small"
          className={styles.langSwitcher__btn}
          aria-label="Переключить язык"
        >
          {"en"}
        </Button>
        <Button
          variant="Outline"
          size="Small"
          className={styles.langSwitcher__btn}
          aria-label="Переключить язык"
        >
          {"ru"}
        </Button>
      </div>
  );
};
