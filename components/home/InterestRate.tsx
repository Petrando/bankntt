import { FC, useState, useEffect } from "react";
import useSWR from 'swr';
import styles from  "../../styles/home/Interest.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json())

const InterestRate = () => {
	const { data, error } = useSWR('/api/interests/listInterests', fetcher);

	return (
		<section className={`${styles.interestMain} ${styles.flexRule}`}>
			<div className={styles.tableCards}>
				{
					data &&
					data.length > 0 &&
					data.map((d, i) => (<TableCard key={i} {...d} />))
				}
				{
					error &&
					<h3>Connection error</h3>
				}
				{
					!data &&
					<h3>Loading....</h3>
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
				<thead>
				<tr>
					<th>
						{firstColumnTitle}
					</th>
					<th>Rate</th>
				</tr>
				</thead>
				<tbody>
				{
					rates.map((d, i) => (
						<tr key={i}>
							<td>{d.range}</td>
							<td>{d.rate}%</td>
						</tr>
					))
				}
				</tbody>
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