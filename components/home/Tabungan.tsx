import { useState, useEffect } from 'react';
import { savingI  } from "../../types";
import ImageInGrid from "../globals/ImageInGrid";
import LearnMore from "../globals/LearnMore";
import styles from "../../styles/home/Tabungan.module.css";
import galleryStyles from "../../styles/produk/dana/GalleryTabungan.module.css";

const titleColors = ["#ed4545", "#a6b7f5", "#f7dd9c", "#bbf5a9"]

const Tabungan = ({savings}:{savings:savingI[]}):JSX.Element => {
	const [mySavings, setMySavings] = useState([]);

	useEffect(()=>{
		let mySavings = savings.slice();
		mySavings.forEach((d, i)=>{
			d.photo = JSON.parse(d.photo);
		});
		setMySavings(mySavings);
	}, []);

	return (
		<section className={styles.tabunganSection}>
			<h2 className={styles.tabunganTitle}>
				Produk Tabungan Pilihan
			</h2>
			<p className={styles.tabunganAbout}>
				Lorem Ipsum dolor sit amet, consecteur adispicin elit, sed do euismod tempor incididunt ut labore
				et dolore magna aliqua.
			</p>
			{
                    mySavings.length > 0 &&
                    <div className={`${"imageGallery"}`}>
						{
							mySavings.map((d, i) => <div key={d._id} className={galleryStyles.tabungan} >
								<ImageInGrid 
								  titleColor={titleColors[i]}
								  photo={`data:${d.photo["Content-Type"]};base64, ${d.photo["data"]}`}
								  photoWidth={d.photo.width}
								  photoHeight={d.photo.height}
								  title={d.name}
								  about={d.about}
								  linkTo={`/produk/dana/tabungan/${d._id.toString()}`}
								  learnMoreLabel={"Selengkapnya"}
								/>
							  </div>
						 )
						}
					</div>
			}
			<p className={`${"learnMoreContainer"} ${"marginTop"}`}>
				<LearnMore linkTo="/produk/dana/gallery-tabungan" 
						   label="Gallery Tabungan" 
						   onBrightSurface={true}/>
			</p>	
			<style jsx>{`
				.marginTop {
					margin-top:25px;
				}
			`}</style>	
		</section>
	)
}

/*
<div className={styles.tabunganImages}>
				{
					tabungan.map((d, i) => (<ImageInGrid key={i} {...d} 
												linkTo="#" 
												learnMoreLabel="Info Lengkap"
											/>))
				}
			</div>
*/			

export default Tabungan;