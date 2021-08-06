import { FC } from "react";
import styles from "../../styles/components/Button.module.css";

interface ButtonI {
  label: string;
  fullwidth?: boolean;
  onClickHandler?: ()=>void;
}

const Button: FC<ButtonI> = ({ label, fullwidth, onClickHandler }) => {

  return (
    <button
      type="button"
      className={`${styles.button} ${fullwidth && styles.fullwidth}`}
      onClick={typeof onClickHandler!=="undefined"?onClickHandler:()=>{}}
    >
      {label}
    </button>
  );
};

export const MediaQueryButton: FC<ButtonI> = ({ label, fullwidth }) => {
  return (
    <button
      type="button"
      className={`${styles.buttonWithMediaQuery} ${fullwidth && styles.fullwidth}`}
    >
      {label}
    </button>
  );
};

export const AquaButton = ({ label }) => {
  return (
    <button type="button" className={`${styles.button} ${styles.aquaButton}`}>
      {label}
    </button>
  );
};

export default Button;
