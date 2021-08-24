import { FC } from "react";
import styles from "../../styles/components/Button.module.css";

interface ButtonI {
  label: string;
  icon?:JSX.Element;
  fullwidth?: boolean;
  onClickHandler?: (event:any)=>Promise<void> | ((event:any)=>void);
  notActive?:boolean;
  isSubmitButton?:boolean;
}

const Button: FC<ButtonI> = ({ label, icon, fullwidth, onClickHandler, notActive, isSubmitButton }):JSX.Element => {
  return (
    <button
      type={isSubmitButton?"submit":"button"}
      className={`
                  ${styles.button} 
                  ${fullwidth && styles.fullwidth} 
                  ${icon && "centerRowFlex"}
                  ${notActive && "inactiveButton"}
                `}
      onClick={typeof onClickHandler!=="undefined"?onClickHandler:()=>{}}
    >
      {label}
      {
        icon && <>{icon}</>
      }
    </button>
  );
};

export const MediaQueryButton: FC<ButtonI> = ({ label, icon, fullwidth, onClickHandler, notActive }):JSX.Element => {
  return (
    <button
      type="button"
      className={`
                  ${styles.buttonWithMediaQuery} 
                  ${fullwidth && styles.fullwidth} 
                  ${icon && "centerRowFlex"}
                  ${notActive && "inactiveButton"}
                `}
      onClick={typeof onClickHandler!=="undefined"?onClickHandler:()=>{}}
    >
      {label}
      {
        icon && <>{icon}</>
      }
    </button>
  );
};

export const AquaButton = ({ label, icon, fullwidth, onClickHandler, notActive }:ButtonI):JSX.Element => {
  return (
    <button 
      type="button" 
      className={`
                  ${styles.button} 
                  ${styles.aquaButton} 
                  ${icon && "centerRowFlex"}
                  ${notActive && "inactiveButton"}
                `}
      onClick={typeof onClickHandler!=="undefined"?onClickHandler:()=>{}}
    >
      {label}
      {
        icon && <>{icon}</>
      }
    </button>
  );
};

export default Button;
