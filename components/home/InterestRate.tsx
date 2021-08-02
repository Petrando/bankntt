import {FC} from "react";
import styles from  "../../styles/home/Interest.module.css";

const interests = [
	{
		title:"Bunga Giro",
		rates:[
			{
				range:"Saldo s/d Rp 5 juta",
				rate:"0.00%"

			},
			{
				range:"Saldo diatas 5 juta s/d 500 juta",
				rate:"0.25%"

			},
			{
				range:"Saldo diatas 500 juta s/d 10 milyar",
				rate:"1.00%"

			},
			{
				range:"Saldo diatas 10 milyar s/d 50 milyar",
				rate:"1.25%"

			},
			{
				range:"Saldo diatas 50 milyar",
				rate:"1.50%"

			}
		],
		firstColumnTitle:"Saldo"
	},
	{
		title:"Bunga Tabungan",
		rates:[
			{
				range:"Saldo s/d Rp 50 ribu",
				rate:"1.00%"

			},
			{
				range:"Saldo diatas 50 ribu s/d 5 juta",
				rate:"1.00%"

			},
			{
				range:"Saldo diatas 5 juta s/d 100 juta",
				rate:"1.25%"

			},
			{
				range:"Saldo diatas 100 juta s/d 1 milyar",
				rate:"1.25%"

			},
			{
				range:"Saldo diatas 1 milyar",
				rate:"1.75%"

			}
		],
		firstColumnTitle:"Saldo"
	},
	{
		title:"Bunga Deposito",
		rates:[
			{
				range:"Jangka waktu 1 Bulan",
				rate:"3.50%"

			},
			{
				range:"Jangka waktu 3 Bulan",
				rate:"3.75%"

			},
			{
				range:"Jangka waktu 6 Bulan",
				rate:"4.25%"

			},
			{
				range:"Jangka waktu 9 Bulan",
				rate:"4.25%"

			},
			{
				range:"Jangka waktu 12 Bulan",
				rate:"4.50%"

			},
			{
				range:"Jangka waktu 24 Bulan",
				rate:"4.50%"

			}			
		],
		firstColumnTitle: "Jangka Waktu"
	}
]

const InterestRate = () => {
	return (
		<section className={`${styles.interestMain} ${styles.flexRule}`}>
			<div className={styles.tableCards}>
				{
					interests.map((d, i) => (<TableCard key={i} {...d} />))
				}
			</div>
		</section>
	)
}

interface RateI {
	range:string;
	rate:string;
}

interface TableCardI {
	title: string;
	rates: RateI[];
	firstColumnTitle: string;
}

const TableCard:FC<TableCardI> = ({title, rates, firstColumnTitle}) => {
	return (
		<div className={`${styles.tableCard} ${styles.flexRule}`}>
			<h2 className={styles.interestTitle}>{title}</h2>
			<table className={"interests"}>
				<tr>
					<th>
						{firstColumnTitle}
					</th>
					<th>Rate</th>
				</tr>
				{
					rates.map((d, i) => (
						<tr key={i}>
							<td>{d.range}</td>
							<td>{d.rate}</td>
						</tr>
					))
				}
			</table>
			<style jsx>
				{
					`
						.interests {  
  							border-collapse: collapse;
  							width: 95%;
  							margin-top: 0px;
  							margin-bottom: 15px;  							
						}

						.interests td, .interests th {
  							border: 1px solid #ddd;
  							padding: 8px;
						}

						.interests tr:nth-child(even){background-color: #f2f2f2;}

						.interests tr:nth-child(odd){background-color: #ffffff;}

						.interests tr:hover {background-color: #ddd;}

						.interests th {
  							padding-top: 12px;
  							padding-bottom: 12px;
  							text-align: left;
  							background-color: #04AA6D;
  							color: white;
						}

						.interests tr *:first-child {
							width: 85%;
						}

						.interests tr *:last-child {
							width: 15%;
						}
					`
				}
			</style>
		</div>
	)
}

export default InterestRate;