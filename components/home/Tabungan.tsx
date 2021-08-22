import ImageInGrid from "../globals/ImageInGrid";
import LearnMore from "../globals/LearnMore";
import styles from "../../styles/home/Tabungan.module.css";

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

const Tabungan = () => {
	
	return (
		<section className={styles.tabunganSection}>
			<h2 className={styles.tabunganTitle}>
				Produk Tabungan Pilihan
			</h2>
			<p className={styles.tabunganAbout}>
				Lorem Ipsum dolor sit amet, consecteur adispicin elit, sed do euismod tempor incididunt ut labore
				et dolore magna aliqua.
			</p>
			<div className={styles.tabunganImages}>
				{
					tabungan.map((d, i) => (<ImageInGrid key={i} {...d} 
												linkTo="#" 
												learnMoreLabel="Info Lengkap"
											/>))
				}
			</div>
			<p className={"learnMoreContainer"}>
				<LearnMore linkTo="/produk/dana/gallery-tabungan" 
						   label="Gallery Tabungan" 
						   onBrightSurface={true}/>
			</p>		
		</section>
	)
}

export default Tabungan;