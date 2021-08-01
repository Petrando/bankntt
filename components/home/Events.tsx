import {useState, useEffect} from "react"
import Pagination from "../globals/Pagination";
import ImageInGrid from "../globals/ImageInGrid";
import styles from "../../styles/home/Events.module.css";

 const eventData = 
 [
 	{
 		photo:"Pelantikan_Direktur_Utama_PT_BPD_NTT_",
 		title:"Pelantikan Dirut 2020-2024",
 		about:"Pelantikan Direktur Utama PT. BPD NTT Bapak Harry Alexander Riwu Kaho, SH, MM. Masa Bhakti 2020-2024"
 	},
 	{
 		photo:"Net_Bantuan_CSR_Bank_NTT",
 		title:"Bantuan Masyarakat Adat",
 		about:"Bantuan CSR Bank NTT Peduli Bagi Masyarakat Situs Kampung Adat Ubu Koba, Desa Delo, Kec. Wewewa Sela"
 	},
 	{
 		photo:"Strategi_Net",
 		title:"Pemulihan Ekonomi",
 		about:"Strategi Percepatan Pembangunan dan Pemulihan Ekonomi di Provinsi Nusa Tenggara Timur"
 	},
 	{
 		photo:"PKS_Bank_NTT_dengan_Pemkab_Sumba_Barat_Tentang_Pemanfaatan_Jasa_Bank",
 		title:"Pemanfaatan Jasa Bank",
 		about:"Penandatanganan PKS antara Bank NTT dengan Pemkab Sumba Barat tentang Pemanfaatan Jasa Bank BPD NTT"
 	},
 	{
 		photo:"IMG_9937",
 		title:"Turnamen Golf",
 		about:"Turnamen Golf Memperingati HUT Bank NTT ke 58 dan Hari Bhakti TNI AU ke - 73"
 	},
 	{
 		photo:"IMG_8631",
 		title:"Kerjasama Pemerintah",
 		about:"Penandatanganan PKS Pinjaman Daerah Antara Pemerintah Provinsi dan Bank NTT"
 	},
 	{
 		photo:"JAJARAN_KOMISARIS_DAN_DIREKSI_BANK_NTT",
 		title:"Komisaris 2019-2023",
 		about:"Jajaran Komisaris dan Direksi PT Bank NTT Periode 2019 - 2023"
 	},
 	{
 		photo:"IMG_7151",
 		title:"Pelantikan",
 		about:"Pelantikan Direktur Umum PT. Bank NTT Periode 2019 - 2023"
 	},
 	{
 		photo:"BNTT_BPJSTK_FOTObanner",
 		title:"Penandatanganan MOU Jamsos",
 		about:"Penandatanganan MOU Pinjaman Daerah & Pelaksanaan Jaminan Sosial Ketenagakerjaan di NTT"
 	},
 	{
 		photo:"semau",
 		title:"Kacab Semau",
 		about:"Bank NTT Buka Kantor di Semau 2019"
 	},
 	{
 		photo:"utkbannerweb",
 		title:"Kerjasama",
 		about:"Bank NTT Jalin Kerjasama dengan LPDB-KUMKM"
 	},
 	{
 		photo:"borobudur_jakarta",
 		title:"Investor 2019",
 		about:"Dirut Bank NTT Bahas Rencana Strategis dengan Investor 2019"
 	},
 	{
 		photo:"webbanner",
 		title:"Pengurus 2019-2023",
 		about:"Komposisi Pengurus Baru Bank NTT 2019-2023"
 	},
 	{
 		photo:"dekomDireksi2019to2023",
 		title:"Dekom Direksi 2019-2023",
 		about:"Pelantikan Dewan Komisaris & Direktur Utama Periode 2019-2023"
 	},
 	{
 		photo:"web",
 		title:"PKS Kemendagri 2019",
 		about:"Penandatanganan Kerjasama dengan Direktorat Jenderal Kependudukan dan Pencatatan Sipil Kemendagri 2019" 		
 	},
 	{
 		photo:"banner_web",
 		title:"Kerjasama Yayasan Swastisari",
 		about:"Bank NTT Jalin Kerjasama dengan Yayasan Swastisari 2019"
 	},
 	{
 		photo:"untuk_website",
 		title:"Kerjasama Pemkab TTS",
 		about:"Penandatanganan Kerjasama Bank NTT dengan Pemkab TTS tentang Pembayaran PBB-P2 Online 2019" 		
 	},
 	{
 		photo:"web_money_changer",
 		title:"Money Changer 2019",
 		about:"Peresmian Pembukaan Money Changer 2019"
 	},
 	{
 		photo:"tanganiSampah",
 		title:"Kerjasama Pemkot Kupang",
 		about:"Tangani sampah Pemkot Kupang & Bank NTT jalin Kerjasama 2019" 	
 	},
 	{
 		photo:"ukaw",
 		title:"Bank & Mahasiswa",
 		about:"Bank NTT & UKAW Ciptakan Mahasiswa Enterpreuneur Muda Berbasis Teknologi 2019" 		
 	},
 	{
 		photo:"uspdMaukaro",
 		title:"USPD",
 		about:"Peresmian USPD Maukaro - Ende 2019"
 	},
 	{
 		photo:"obligasi500M",
 		title:"Obligasi Bank NTT",
 		about:"Bank NTT Terbitkan Obligasi Rp500 Miliar 2018"
 	},
 	{
 		photo:"Bantuan_Sosial_Non_Tunai",
 		title:"Pemkot Kupang",
 		about:"Bank NTT Bantu Pemkot Kupang Salurkan BPNT"
 	},
 	{
 		photo:"Pelantikan_Dekom_Direksi",
 		title:"Pelantikan Komisaris & Direksi 2018-2022",
 		about:"Gubernur Lantik Komisaris dan Direksi Bank NTT Periode 2018-2022"
 	}
 ]

const itemPerPage = 6;

const Events = () => {
 	const [currentPage, setCurrentPage] = useState<number>(0);
 	const [pageCount, setPageCount] = useState<number>(0);

 	useEffect(()=>{
 		setPageCount(Math.ceil(eventData.length/itemPerPage));
 	}, []);
 	
 	const events = eventData.filter((d, i)=>{
    const startIdx = itemPerPage * currentPage;
    const endIdx = startIdx + itemPerPage - 1;
 		return (
 			i >= startIdx && i <= endIdx
 		)
 	});  

	return (
		<section className={styles.eventsSection}>
			<h2 className={styles.eventsTitle}>Events</h2>
			<p className={styles.eventsAbout}>
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
        laborum.
			</p>
			<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pageCount={pageCount} />
			<div className={styles.eventImages}>
				  {
          events.map((d, i) => (<ImageInGrid key={i} 
                             title={d.title} 
                             about={d.about} 
                             photo={"/images/events/" + d.photo + ".jpg"}
                      />))
        }
			</div>
		</section>
	)
}

/*
interface ImageInGridI {
  photo: string;
  title: string; 
  about: string;
}

const imageWidth = 570;
const imageHeight = 460;
const ImageInGrid: FC<ImageInGridI> = ({
  photo,
  title,
  width,
  height,
  about
}) => {
  const myImageUrl = "/images/events/" + photo + ".jpg";
  return (
    <div className={styles.imageContainer}>
      <Image src={myImageUrl} layout="fill" objectFit="cover" alt={title} />
      <div className={styles.imageHoverInfo}>
        <p className={styles.imageTitle}>{title}</p>
        <p className={styles.description}>
          {about}
        </p>
      </div>
    </div>
  );
};*/

export default Events;