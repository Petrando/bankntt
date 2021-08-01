import { FC } from "react";
import Link from "next/link";
import styles from "../styles/components/Footer.module.css";

const Footer: FC = () => {
  //"mailto:robot-support@ncs.com.sg"
  return (
    <section className={styles.footerSection}>
      <div className={styles.footerContent}>        
          <p className={styles.footerTitle}>Tentang Bank NTT</p>
          <div className={styles.footerAboutDetails}>
            <p className={styles.footerAbout}>
              Didirikan dengan nama PT. Bank Pembangunan Daerah Nusa Tenggara TImur berdasarkan Akta Pendirian 
              No. 12 tanggal 18 Oktober 1961.
            </p>
            <div className={styles.footerContacts}>
              <a href={"mailto:robot-support@ncs.com.sg"} target={"_blank"}
                className={styles.textWithIcon}       
              >
                <div className={styles.textWithIcon}>
                  <img src="/images/icons/mail.svg" alt="icon" />{" "}
                  <p>robot-support@ncs.com.sg</p>
                </div>
              </a>
              <a href={"https://www.linkedin.com/company/ncs-group/"} target={"_blank"}
                className={styles.textWithIcon}
              >                
                  <img src="/images/icons/linkin.svg" alt="icon" />
                  <p>NCS Linkedin Page</p>               
              </a>                   
            </div> 
          </div>                 
      </div>
      <div className={styles.footerContent}>
        <div className={styles.footerMeta}>          
          <span>© 2021 PT Bank NTT. All rights reserved.</span>
        </div>
      </div>
    </section>
  );
};

/*
<span>Privacy</span>
          <span>Term of Services</span>
          */
export default Footer;
