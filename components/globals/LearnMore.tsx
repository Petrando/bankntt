import {FC} from "react"
import Link from "next/link"
import styles from "../../styles/components/Learnmore.module.css";

interface LearnLinkI {
  linkTo:string;
  label:string;
}

const LearnMore: FC<LearnLinkI> = ({linkTo, label}) => {
  return (
    <Link href={linkTo}>
      <span className={styles.learnMore}>
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
            stroke="#49C2E0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.75"
            d="M10.5 4.5L15 8.55556L10.5 12"
            stroke="#49C2E0"
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