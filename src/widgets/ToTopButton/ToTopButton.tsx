import type { FC } from "react";
import { useState, useEffect } from "react";
import styles from "./ToTopButton.module.scss";
import { Button } from "../../shared/ui/Button";

export const ToTopButton: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
      <Button
          variant="Outline"
          size="Small"
          className={styles.toTop}
          onClick={scrollToTop}
          aria-label="Прокрутить наверх"
      >
        up ↑
      </Button>
  );
};
