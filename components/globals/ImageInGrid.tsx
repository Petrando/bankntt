import {FC} from 'react';
import Image from "next/image";
import Link from "next/link";
import LearnMore from "./LearnMore";

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
        <Link href={linkTo?linkTo:"#"}>
        <p className={"description"}>
          {about}
        </p>
        </Link>
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