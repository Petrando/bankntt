import { FC, useState, useEffect } from "react";
import useSWR from 'swr';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { TableCardI } from "../../../types";
import styles from  "../../../styles/home/Interest.module.css";
import tableStyles from "../../../styles/components/InterestTable.module.css";
import ModalLayout from "../../globals/ModalLayout";

const fetcher = (url) => fetch(url).then((res) => res.json())

const InterestRate = () => {
	const { data, error } = useSWR('/api/interests/listInterests', fetcher);
	const [editedIdx, setEditedIdx] = useState<number>(-1);

	const editedData = data?data.filter((d, i)=>i===editedIdx)[0]:{};
	return (
		<section className={"interestMain"}>
			<div className={`${styles.tableCards} ${"tableCards"}`}>
				{
					data &&
					data.length > 0 &&
					data.map((d, i) => (<TableCard key={i} {...d} setEdited={()=>{setEditedIdx(i);}}/>))
				}
				{
					editedIdx !== -1 &&
					<ModalLayout closeModal={()=>{setEditedIdx(-1);}}>
						<div className={"editedContainer"}>
							<EditedTableCard {...editedData} setEdited={()=>{setEditedIdx(-1)}} />
						</div>
					</ModalLayout>
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
						.editedContainer {
							width:648px;
							height:auto;
							background-color:#ffffff;
							display:flex;justify-content:space-around;align-items:center;
							border-radius:5px;
						}
						@media (max-width:648px) {
							.editedContainer {
								width:90%;
							}
						}
					`
				}
			</style>
		</section>
	)
}

const TableCard:FC<TableCardI> = ({title, rates, firstColumnTitle, setEdited}) => {
	return (
		<div className={`${styles.tableCard} ${styles.flexRule}`}>
			<div className={tableStyles.titleContainer}>
				<h2 className={`${styles.interestTitle}`}>{title}</h2>
				<span className={tableStyles.editButton} onClick={setEdited}>
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
		</div>
	)
}

const EditedTableCard:FC<TableCardI> = ({title, rates, firstColumnTitle, setEdited}) => {
	return (
		<div className={`${styles.tableCard} ${styles.flexRule} ${styles.editedTableCard}`}>
			<div className={tableStyles.titleContainer}>
				<h2 className={`${styles.interestTitle}`}>{title}</h2>
				<span className={tableStyles.editButton} onClick={setEdited}>					
					<CheckCircleOutlineIcon fontSize="large" />
				</span>
			</div>			
			<table className={`${tableStyles.interests} ${tableStyles.editedInterest}`}>
				<thead>
				<tr>
					<th>
						{firstColumnTitle}
					</th>
					<th>Rate</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{
					rates.map((d, i) => (
						<tr key={i}>
							<td>{d.range}</td>
							<td>{d.rate}%</td>
							<td></td>
						</tr>
					))
				}
				</tbody>
			</table>
		</div>
	)
}
export default InterestRate;