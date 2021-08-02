import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import Button, { AquaButton } from "../globals/Button";
import styles from "../../styles/home/Hero.module.css";

const Hero = () => 
{
	
	return (
		<main className={styles.hero}>			
			<div className={styles.heroOverlay} />
			<h2 className={styles.heroTitle}>
				Bank Nusa Tenggara Timur
			</h2>
			<p className={styles.heroAbout}>
				Terlibat bersama dalam keseharian mewujudkan kesejahteraan masyarakat Flobamora
			</p>	
			<div className={styles.heroButtons}>
          		<Link href="/#">
            		<a>
              			<Button label="Produk Dana" />
            		</a>
          		</Link>
          		<button type="button" className={styles.betweenButtons}>
            			{""}
          		</button>
          		<Link href="/#">
            		<a>
              			<AquaButton label="Produk Kredit" />
            		</a>
          		</Link>
        	</div>      		
		</main>
	)
}

export default Hero;