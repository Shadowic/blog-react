import type { FC, ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonVariant = "Primary" | "Secondary" | "Outline";
type ButtonSize = "Small" | "Medium" | "Large";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = "Primary",
  size = "Medium",
  className = "",
  ...props
}) => {
  const buttonClasses = [
    styles.btn,
    styles[`btn${variant}`],
    styles[`btn${size}`],
    className,
  ]
    .filter((cls) => cls)
    .join(" ");

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};
