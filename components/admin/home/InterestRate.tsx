import { FC, useState, useEffect } from "react";
import useSWR from 'swr';
import EditIcon from '@material-ui/icons/Edit';
import { TableCardI } from "../../../types";
import styles from  "../../../styles/home/Interest.module.css";
import tableStyles from "../../../styles/components/InterestTable.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json())

const InterestRate = () => {
	const { data, error } = useSWR('/api/interests/listInterests', fetcher);

	return (
		<section className={"interestMain"}>
			<div className={`${styles.tableCards} ${"tableCards"}`}>
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
							display:flex;justify-content:space-around;align-items:center;
						}
						.tableCards {
							width:95%;
							height:auto;
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
			<div className={"titleContainer"}>
				<h2 className={`${styles.interestTitle}`}>{title}</h2>
				<span className={"editButton"}>
					Edit
					<EditIcon fontSize="inherit" />
				</span>
			</div>			
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
			<style jsx>
				{`
					.titleContainer {
						margin-top:15px;
						width:95%;
						display:flex; justify-content:space-between;align-items:center;
						margin:0px; padding:0px;
						margin-bottom: 5px;						
					}	
					.editButton {
						display:flex;justify-content:center;align-items:center;
						cursor:pointer;
						font-size:16px;
						padding:5px 8px;						
						border-radius: 3px;
						transition:all 0.25s;
						margin-top:15px;
					}
					.editButton:hover {
						background-color: rgba(0, 0, 0, 0.8);
						color:#ffffff;
					}
				`}
			</style>		
		</div>
	)
}

export default InterestRate;