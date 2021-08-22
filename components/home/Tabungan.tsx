import { useState, useEffect } from 'react';
import { savingI  } from "../../types";
import ImageInGrid from "../globals/ImageInGrid";
import LearnMore from "../globals/LearnMore";
import styles from "../../styles/home/Tabungan.module.css";
import galleryStyles from "../../styles/produk/dana/GalleryTabungan.module.css";

const tabungan = [
	{
		photo:"/images/products/dana/tabungan/simpeda.jpg",
		title:"SIMPEDA", 
		about:"Produk Tabungan bersama BPD seluruh Indonesia dengan keunggulan Real Time Online. Dapat diakses melalui " 
			  + "jaringan ATM bersama di seluruh Indonesia karena terhubung dalam BPDNet Online.",
		titleColor:"#ed4545"
	},
	{
		photo:"/images/products/dana/tabungan/flobamora.jpg",
		title:"FLOBAMORA", 
		about:"Produk tabungan yang memberikan kemudahan dan kenyamanan dalam melakukan transaksi perbankan "
			  + " secara real time dengan berbagai fitur unggulannya dan dapat diikutsertakan dalam program berhadiah.",
		titleColor:"#a6b7f5"
	},
	{
		photo:"/images/products/dana/tabungan/tabunganku.jpg",
		title:"TABUNGANKU", 
		about:"Produk TabunganKu diinisiasi oleh Pemerintah Indonesia dan Bank Indonesia, untuk menyediakan "
			  + "kemudahan pelayanan dengan produk simpanan yang mudah dan murah bagi para pelajar dan masyarakat umum.",
		titleColor:"#f7dd9c"
	},
	{
		photo:"/images/products/dana/tabungan/ziarah.jpg",
		title:"ZIARAH", 
		about:"Tabungan perjalanan wisata dan ziarah. Merupakan tabungan yang khusus disediakan Bank NTT untuk "
			  + "memfasilitasi nasabah untuk bisa melakukan perjalanan wisata ataupun ziarah.",
		titleColor:"#bbf5a9"
	}
]

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