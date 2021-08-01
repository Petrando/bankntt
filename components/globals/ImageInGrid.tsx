import {FC} from 'react';
import Image from "next/image";
import LearnMore from "./LearnMore";
import styles from "../../styles/home/Events.module.css";

interface ImageInGridI {
  photo: string;
  title: string; 
  titleColor?: string;
  about: string;
  linkTo?: string;
  learnMoreLabel?: string;
}

const ImageInGrid: FC<ImageInGridI> = ({
  photo,
  title,
  titleColor,
  width,
  height,
  about,
  linkTo, learnMoreLabel
}) => {  
  
  return (
    <div className={styles.imageContainer}>
      <Image src={photo} layout="fill" objectFit="cover" alt={title} />
      <div className={styles.imageHoverInfo}>
        <p className={`${styles.imageTitle} ${typeof titleColor !== "undefined" && "titleColor"}`}>{title}</p>
        <p className={styles.description}>
          {about}
        </p>
        {
          typeof linkTo !== "undefined" &&
          <LearnMore linkTo={linkTo} label={learnMoreLabel} />
        }
      </div>
      <style jsx>
        {
          `
            .titleColor {
              color:${titleColor};
            }
          `
        }
      </style>
    </div>
  );
};

export default ImageInGrid;