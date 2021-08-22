import {FC} from "react"
import Link from "next/link"
import styles from "../../styles/components/Learnmore.module.css";

interface LearnLinkI {
  linkTo:string;
  label:string;
  onBrightSurface?:boolean;
}

const LearnMore: FC<LearnLinkI> = ({linkTo, label, onBrightSurface}) => {

  const arrowStroke = () =>onBrightSurface?"#4F46E5":"#49C2E0";
  
  return (
    <Link href={linkTo}>
      <span className={`${styles.learnMore} ${onBrightSurface?styles.onBrightSurface:styles.onDarkSurface}`}>
        <span className={styles.label}>{label}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: "5px", marginTop: "5px" }}
        >
          <path
            d="M2 3.5L8 8.55556L2 13"
            stroke={arrowStroke()}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.75"
            d="M10.5 4.5L15 8.55556L10.5 12"
            stroke={arrowStroke()}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
};

export default LearnMore;