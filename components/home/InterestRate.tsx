import { FC, useState, useEffect } from "react";
//import useSWR from 'swr';
import { interestI } from "../../types";
import styles from  "../../styles/home/Interest.module.css";
import tableStyles from "../../styles/components/InterestTable.module.css";

//const fetcher = (url) => fetch(url).then((res) => res.json())

const InterestRate = ({interests}:{interests:interestI[]}) => {
	//const { data, error } = useSWR('/api/interests/listInterests', fetcher);

	return (
		<section className={`${styles.interestMain} ${styles.flexRule}`}>
			<div className={styles.tableCards}>
				{
					interests &&
					interests.length > 0 &&
					interests.map((d, i) => (<TableCard key={i} {...d} />))
				}
			</div>
		</section>
	)
}

/*
{
					error &&
					<h3>Connection error</h3>
				}
				{
					!data &&
					<h3>Loading....</h3>
				}
			*/

const TableCard:FC<interestI> = ({title, rates, firstColumnTitle}):JSX.Element => {
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