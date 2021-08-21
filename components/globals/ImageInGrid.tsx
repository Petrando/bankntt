import {FC} from 'react';
import Image from "next/image";
import LearnMore from "./LearnMore";
import styles from "../../styles/home/Events.module.css";

interface ImageInGridI {
  photo: string;
  photoWidth?:number;
  photoHeight?:number;
  title: string; 
  titleColor?: string;
  about: string;
  linkTo?: string;
  learnMoreLabel?: string;
}

const ImageInGrid: FC<ImageInGridI> = ({
  photo,
  photoWidth,
  photoHeight,
  title,
  titleColor,
  about,
  linkTo, learnMoreLabel
}) => {  
  
  return (
    <div className={"imageContainer"}>
      <Image src={photo}  layout="fill" objectFit="cover" alt={title} />
      
      <div className={"imageHoverInfo"}>
        <p className={`${"imageTitle"} ${titleColor && "titleColor"}`}>{title}</p>
        <p className={"description"}>
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