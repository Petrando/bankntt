import { FC, useState, useEffect } from "react";
import useSWR from 'swr';
import { TableCardI } from "../../../types";
import styles from  "../../../styles/home/Interest.module.css";
import tableStyles from "../../../styles/components/InterestTable.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json())

const InterestRate = () => {
	const { data, error } = useSWR('/api/interests/listInterests', fetcher);

	return (
		<section className={"interestMain"}>
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
			<style jsx>
				{
					`
						.interestMain {
							max-width: 100%;	
							width: 100%;
						  	margin-top: 0px;
							height: 100%;
							background-color: lightsteelblue;
						}
					`
				}
			</style>
		</section>
	)
}

const TableCard:FC<TableCardI> = ({title, rates, firstColumnTitle}) => {
	return (
		<div className={`${styles.tableCard} ${styles.flexRule}`}>
			<h2 className={styles.interestTitle}>{title}</h2>
			<table className={tableStyles.interests}>
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
		</div>
	)
}

export default InterestRate;